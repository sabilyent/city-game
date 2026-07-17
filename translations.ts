/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { BuildingType } from './types';

export type Language = 'en' | 'bm';

export interface TranslationSet {
  // Start Screen
  title: string;
  subtitle: string;
  aiAdvisor: string;
  aiAdvisorDesc: string;
  startBuilding: string;
  createdBy: string;
  
  // Top stats bar
  treasury: string;
  citizens: string;
  day: string;
  sandbox: string;
  thinking: string;
  analyzingData: string;
  freePlay: string;
  
  // Goals
  goalLabel: string;
  collectReward: string;
  goalAchieved: string;
  insufficientFunds: string;
  demolitionCostError: string;
  terrainComplete: string;

  // News & Interface
  cityFeed: string;
  noNews: string;
  build: string;

  // Building descriptions & names
  bulldozeName: string;
  bulldozeDesc: string;
  roadName: string;
  roadDesc: string;
  residentialName: string;
  residentialDesc: string;
  commercialName: string;
  commercialDesc: string;
  industrialName: string;
  industrialDesc: string;
  parkName: string;
  parkDesc: string;
}

export const TRANSLATIONS: Record<Language, TranslationSet> = {
  en: {
    title: "SkyMetropolis",
    subtitle: "Isometric City Builder",
    aiAdvisor: "AI City Advisor",
    aiAdvisorDesc: "Enable dynamic quests & news events via Gemini API",
    startBuilding: "Start Building",
    createdBy: "Created by",
    treasury: "Treasury",
    citizens: "Citizens",
    day: "Day",
    sandbox: "Sandbox",
    thinking: "Thinking...",
    analyzingData: "Analyzing city data...",
    freePlay: "Free play active.",
    goalLabel: "Goal",
    collectReward: "Collect Reward",
    goalAchieved: "Goal achieved! {reward} deposited to treasury.",
    insufficientFunds: "Treasury insufficient for {name}.",
    demolitionCostError: "Cannot afford demolition costs.",
    terrainComplete: "Welcome to SkyMetropolis. Terrain generation complete.",
    cityFeed: "City Feed",
    noNews: "No active news stream.",
    build: "Build",
    
    // Buildings
    bulldozeName: "Bulldoze",
    bulldozeDesc: "Clear a tile",
    roadName: "Road",
    roadDesc: "Connects buildings.",
    residentialName: "House",
    residentialDesc: "+5 Pop/day",
    commercialName: "Shop",
    commercialDesc: "+$15/day",
    industrialName: "Factory",
    industrialDesc: "+$40/day",
    parkName: "Park",
    parkDesc: "Looks nice.",
  },
  bm: {
    title: "SkyMetropolis",
    subtitle: "Pembina Bandar Isometrik",
    aiAdvisor: "Penasihat Bandar AI",
    aiAdvisorDesc: "Aktifkan tugasan dinamik & berita melalui Gemini API",
    startBuilding: "Mula Membina",
    createdBy: "Dibuat oleh",
    treasury: "Perbendaharaan",
    citizens: "Penduduk",
    day: "Hari",
    sandbox: "Mod Bebas",
    thinking: "Berfikir...",
    analyzingData: "Menganalisis data bandar...",
    freePlay: "Permainan bebas aktif.",
    goalLabel: "Sasaran",
    collectReward: "Tuntut Ganjaran",
    goalAchieved: "Sasaran tercapai! {reward} dimasukkan ke perbendaharaan.",
    insufficientFunds: "Perbendaharaan tidak mencukupi untuk {name}.",
    demolitionCostError: "Tidak mampu membayar kos peruntuhan.",
    terrainComplete: "Selamat datang ke SkyMetropolis. Penjanaan rupa bumi selesai.",
    cityFeed: "Suapan Bandar",
    noNews: "Tiada suapan berita aktif.",
    build: "Bina",
    
    // Buildings
    bulldozeName: "Runtuh",
    bulldozeDesc: "Kosongkan petak",
    roadName: "Jalan",
    roadDesc: "Menghubungkan bangunan.",
    residentialName: "Rumah",
    residentialDesc: "+5 Penduduk/hari",
    commercialName: "Kedai",
    commercialDesc: "+$15/hari",
    industrialName: "Kilang",
    industrialDesc: "+$40/hari",
    parkName: "Taman",
    parkDesc: "Kelihatan cantik.",
  }
};

export const getBuildingName = (type: BuildingType, lang: Language): string => {
  switch (type) {
    case BuildingType.None: return TRANSLATIONS[lang].bulldozeName;
    case BuildingType.Road: return TRANSLATIONS[lang].roadName;
    case BuildingType.Residential: return TRANSLATIONS[lang].residentialName;
    case BuildingType.Commercial: return TRANSLATIONS[lang].commercialName;
    case BuildingType.Industrial: return TRANSLATIONS[lang].industrialName;
    case BuildingType.Park: return TRANSLATIONS[lang].parkName;
    default: return "";
  }
};

export const getBuildingDesc = (type: BuildingType, lang: Language): string => {
  switch (type) {
    case BuildingType.None: return TRANSLATIONS[lang].bulldozeDesc;
    case BuildingType.Road: return TRANSLATIONS[lang].roadDesc;
    case BuildingType.Residential: return TRANSLATIONS[lang].residentialDesc;
    case BuildingType.Commercial: return TRANSLATIONS[lang].commercialDesc;
    case BuildingType.Industrial: return TRANSLATIONS[lang].industrialDesc;
    case BuildingType.Park: return TRANSLATIONS[lang].parkDesc;
    default: return "";
  }
};
