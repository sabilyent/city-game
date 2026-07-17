/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, Type } from "@google/genai";
import { AIGoal, BuildingType, CityStats, Grid, NewsItem } from "../types";
import { BUILDINGS } from "../constants";
import { Language } from "../translations";

// Safely get the API key to prevent crashes in browser environments
const getApiKey = (): string | undefined => {
  try {
    const key = process.env.API_KEY;
    if (key && key !== "undefined" && key.trim() !== "") return key;
  } catch (e) {}

  try {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "undefined" && key.trim() !== "") return key;
  } catch (e) {}

  return undefined;
};

let aiInstance: GoogleGenAI | null = null;
const getAI = (): GoogleGenAI | null => {
  if (aiInstance) return aiInstance;
  const key = getApiKey();
  if (!key) return null;
  try {
    aiInstance = new GoogleGenAI({ apiKey: key });
    return aiInstance;
  } catch (e) {
    console.error("Error initializing GoogleGenAI:", e);
    return null;
  }
};

const modelId = 'gemini-2.5-flash';

// --- Offline/Fallback Goal & News Generation ---

const getOfflineGoal = (stats: CityStats, grid: Grid, lang: Language): AIGoal => {
  const isBM = lang === 'bm';
  const goals = [
    {
      description: isBM 
        ? "Bina sekurang-kurangnya 3 buah Rumah untuk menampung lebih ramai penduduk baru!" 
        : "Build at least 3 Residential houses to accommodate more citizens!",
      targetType: 'building_count' as const,
      buildingType: BuildingType.Residential,
      targetValue: 3,
      reward: 300,
    },
    {
      description: isBM 
        ? "Bina 2 buah Kedai komersil untuk merancakkan ekonomi tempatan!" 
        : "Build 2 Commercial shops to boost the local economy!",
      targetType: 'building_count' as const,
      buildingType: BuildingType.Commercial,
      targetValue: 2,
      reward: 400,
    },
    {
      description: isBM 
        ? "Kumpulkan wang sebanyak $1,500 dalam perbendaharaan bandar." 
        : "Amass $1,500 in the city treasury.",
      targetType: 'money' as const,
      targetValue: 1500,
      reward: 200,
    },
    {
      description: isBM 
        ? "Tingkatkan jumlah penduduk bandar anda sehingga mencapai 100 orang." 
        : "Grow your city's population to reach 100 citizens.",
      targetType: 'population' as const,
      targetValue: 100,
      reward: 500,
    },
    {
      description: isBM 
        ? "Bina 1 buah Kilang industri berat untuk meningkatkan pendapatan harian." 
        : "Build 1 Industrial factory to boost your daily income.",
      targetType: 'building_count' as const,
      buildingType: BuildingType.Industrial,
      targetValue: 1,
      reward: 600,
    },
    {
      description: isBM 
        ? "Bina 2 buah Taman rekreasi untuk mengindahkan pemandangan metropolis anda." 
        : "Build 2 Parks to beautify your metropolis.",
      targetType: 'building_count' as const,
      buildingType: BuildingType.Park,
      targetValue: 2,
      reward: 250,
    }
  ];

  // Count existing buildings
  const counts: Record<string, number> = {};
  grid.flat().forEach(tile => {
    counts[tile.buildingType] = (counts[tile.buildingType] || 0) + 1;
  });

  // Filter out goals the player has already achieved
  const eligibleGoals = goals.filter(g => {
    if (g.targetType === 'money' && stats.money >= g.targetValue) return false;
    if (g.targetType === 'population' && stats.population >= g.targetValue) return false;
    if (g.targetType === 'building_count' && g.buildingType) {
      if ((counts[g.buildingType] || 0) >= g.targetValue) return false;
    }
    return true;
  });

  const selected = eligibleGoals.length > 0 
    ? eligibleGoals[Math.floor(Math.random() * eligibleGoals.length)] 
    : goals[Math.floor(Math.random() * goals.length)];

  return { ...selected, completed: false };
};

const getOfflineNews = (stats: CityStats, lang: Language): NewsItem => {
  const isBM = lang === 'bm';
  const headlines = [
    { text: isBM ? "Cuaca hari ini amat redup dan damai di SkyMetropolis." : "The weather is calm and peaceful in SkyMetropolis today.", type: 'neutral' as const },
    { text: isBM ? "Penduduk mencadangkan pembinaan lebih banyak taman rekreasi." : "Citizens suggest building more recreational parks.", type: 'neutral' as const },
    { text: isBM ? "Kadar migrasi ke bandar semakin meningkat tinggi!" : "Migration rates to the city are hitting record highs!", type: 'positive' as const },
    { text: isBM ? "Ahli ekonomi tempatan meramalkan pertumbuhan pesat tahun ini." : "Local economists predict rapid growth this year.", type: 'positive' as const },
    { text: isBM ? "Kesesakan lalu lintas di jalan raya mula dilaporkan pagi tadi." : "Traffic congestion was reported on local streets this morning.", type: 'negative' as const },
    { text: isBM ? "Penduduk menyukai reka bentuk landskap bandar yang isometrik." : "Citizens express love for the city's isometric layout.", type: 'positive' as const },
    { text: isBM ? "Bilangan rumah yang tidak mencukupi boleh menyebabkan penduduk berpindah keluar." : "Insufficient housing space might cause residents to move away.", type: 'negative' as const },
    { text: isBM ? "Kilang-kilang baru dilaporkan meningkatkan produktiviti industri." : "New factories report boosted industrial productivity.", type: 'positive' as const }
  ];

  const selected = headlines[Math.floor(Math.random() * headlines.length)];
  return {
    id: Date.now().toString() + Math.random(),
    text: selected.text,
    type: selected.type
  };
};

// --- Goal Generation ---

// @google/genai-schema-fix: The `Schema` type is not exported from @google/genai. Use a const object for the schema.
const goalSchema = {
  type: Type.OBJECT,
  properties: {
    description: {
      type: Type.STRING,
      description: "A short, creative description of the goal from the perspective of city council or citizens.",
    },
    targetType: {
      type: Type.STRING,
      enum: ['population', 'money', 'building_count'],
      description: "The metric to track.",
    },
    targetValue: {
      type: Type.INTEGER,
      description: "The target numeric value to reach.",
    },
    buildingType: {
      type: Type.STRING,
      enum: [BuildingType.Residential, BuildingType.Commercial, BuildingType.Industrial, BuildingType.Park, BuildingType.Road],
      description: "Required if targetType is building_count.",
    },
    reward: {
      type: Type.INTEGER,
      description: "Monetary reward for completion.",
    },
  },
  required: ['description', 'targetType', 'targetValue', 'reward'],
};

export const generateCityGoal = async (stats: CityStats, grid: Grid, lang: Language = 'en'): Promise<AIGoal | null> => {
  // @google/genai-api-key-fix: The API key must be obtained exclusively from the environment variable `process.env.API_KEY`. Do not add checks for its existence.

  const ai = getAI();
  if (!ai) {
    return getOfflineGoal(stats, grid, lang);
  }

  // Count buildings
  const counts: Record<string, number> = {};
  grid.flat().forEach(tile => {
    counts[tile.buildingType] = (counts[tile.buildingType] || 0) + 1;
  });

  const context = `
    Current City Stats:
    Day: ${stats.day}
    Money: $${stats.money}
    Population: ${stats.population}
    Buildings: ${JSON.stringify(counts)}
    Building Costs/Stats: ${JSON.stringify(
      Object.values(BUILDINGS).filter(b => b.type !== BuildingType.None).map(b => ({type: b.type, cost: b.cost, pop: b.popGen, income: b.incomeGen}))
    )}
  `;

  const prompt = `You are the AI City Advisor for a simulation game. Based on the current city stats, generate a challenging but achievable short-term goal for the player to help the city grow. Return JSON.
  ${lang === 'bm' ? 'IMPORTANT: You must write the "description" field of the JSON in Bahasa Melayu, making it feel friendly, natural and encouraging.' : 'You must write the "description" field in English.'}`;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      // @google/genai-generate-content-fix: For text-only prompts, `contents` should be a single string.
      contents: `${context}\n${prompt}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: goalSchema,
        temperature: 0.7,
      },
    });

    // @google/genai-response-text-fix: Access the `text` property directly from the response.
    if (response.text) {
      const goalData = JSON.parse(response.text) as Omit<AIGoal, 'completed'>;
      return { ...goalData, completed: false };
    }
  } catch (error) {
    console.error("Error generating goal:", error);
  }
  // Return offline fallback if AI fails (e.g. rate limit, bad request, API key mismatch)
  return getOfflineGoal(stats, grid, lang);
};

// --- News Feed Generation ---

// @google/genai-schema-fix: The `Schema` type is not exported from @google/genai. Use a const object for the schema.
const newsSchema = {
  type: Type.OBJECT,
  properties: {
    text: { type: Type.STRING, description: "A one-sentence news headline representing life in the city." },
    type: { type: Type.STRING, enum: ['positive', 'negative', 'neutral'] },
  },
  required: ['text', 'type'],
};

export const generateNewsEvent = async (stats: CityStats, recentAction: string | null, lang: Language = 'en'): Promise<NewsItem | null> => {
  // @google/genai-api-key-fix: The API key must be obtained exclusively from the environment variable `process.env.API_KEY`. Do not add checks for its existence.

  const ai = getAI();
  if (!ai) {
    return getOfflineNews(stats, lang);
  }

  const context = `City Stats - Pop: ${stats.population}, Money: ${stats.money}, Day: ${stats.day}. ${recentAction ? `Recent Action: ${recentAction}` : ''}`;
  const prompt = `Generate a very short, isometric-sim-city style news headline based on the city state. Can be funny, cynical, or celebratory.
  ${lang === 'bm' ? 'IMPORTANT: You must write the "text" field of the JSON in Bahasa Melayu, capturing a quirky, humorous, or witty SimCity-style vibe.' : 'You must write the "text" field of the JSON in English.'}`;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      // @google/genai-generate-content-fix: For text-only prompts, `contents` should be a single string.
      contents: `${context}\n${prompt}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: newsSchema,
        temperature: 1.1, // High temp for variety
      },
    });

    // @google/genai-response-text-fix: Access the `text` property directly from the response.
    if (response.text) {
      const data = JSON.parse(response.text);
      return {
        id: Date.now().toString() + Math.random(),
        text: data.text,
        type: data.type,
      };
    }
  } catch (error) {
    console.error("Error generating news:", error);
  }
  // Return offline fallback news if API fails
  return getOfflineNews(stats, lang);
};