// PolyCity AI 3D - Vanilla Game Engine

// --- Configuration & Constants ---
const GRID_SIZE = 15;
const TICK_RATE_MS = 2000;
const INITIAL_MONEY = 1000;

const BuildingType = {
  None: 'None',
  Road: 'Road',
  Residential: 'Residential',
  Commercial: 'Commercial',
  Industrial: 'Industrial',
  Park: 'Park',
};

const BUILDINGS = {
  [BuildingType.None]: {
    type: BuildingType.None,
    cost: 0,
    name: 'Bulldoze',
    nameBm: 'Runtuh',
    color: '#ef4444',
    popGen: 0,
    incomeGen: 0,
    desc: 'Clear a tile',
    descBm: 'Kosongkan petak'
  },
  [BuildingType.Road]: {
    type: BuildingType.Road,
    cost: 10,
    name: 'Road',
    nameBm: 'Jalan',
    color: '#374151',
    popGen: 0,
    incomeGen: 0,
    desc: 'Connects buildings',
    descBm: 'Menghubungkan bangunan'
  },
  [BuildingType.Residential]: {
    type: BuildingType.Residential,
    cost: 100,
    name: 'House',
    nameBm: 'Rumah',
    color: '#f87171',
    popGen: 5,
    incomeGen: 0,
    desc: '+5 Citizens/hour',
    descBm: '+5 Penduduk/jam'
  },
  [BuildingType.Commercial]: {
    type: BuildingType.Commercial,
    cost: 200,
    name: 'Shop',
    nameBm: 'Kedai',
    color: '#60a5fa',
    popGen: 0,
    incomeGen: 15,
    desc: '+$15/hour',
    descBm: '+$15/jam'
  },
  [BuildingType.Industrial]: {
    type: BuildingType.Industrial,
    cost: 400,
    name: 'Factory',
    nameBm: 'Kilang',
    color: '#facc15',
    popGen: 0,
    incomeGen: 40,
    desc: '+$40/hour',
    descBm: '+$40/jam'
  },
  [BuildingType.Park]: {
    type: BuildingType.Park,
    cost: 50,
    name: 'Park',
    nameBm: 'Taman',
    color: '#4ade80',
    popGen: 1,
    incomeGen: 0,
    desc: 'Looks nice',
    descBm: 'Kelihatan cantik'
  },
};

const TRANSLATIONS = {
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
    time: "Time",
    sandbox: "Sandbox Mode",
    thinking: "Thinking...",
    analyzingData: "Analyzing city data...",
    freePlay: "Free play active.",
    goalLabel: "Goal",
    collectReward: "Collect Reward",
    goalAchieved: "Goal achieved! ${reward} deposited to treasury.",
    insufficientFunds: "Treasury insufficient for {name}.",
    demolitionCostError: "Cannot afford demolition costs.",
    terrainComplete: "Welcome to SkyMetropolis. Terrain generation complete.",
    cityFeed: "City Feed",
    noNews: "No active news stream.",
    build: "Build",
    exportBtn: "Export",
    importBtn: "Import",
    
    // New Startup/Password Translations
    unlockTitle: "Unlock Existing City",
    unlockDesc: "Welcome back, Mayor! Enter your password to load your city.",
    password: "Password",
    enterPassword: "Enter password...",
    unlockLoad: "Unlock & Load",
    newCity: "New City",
    importSave: "Import Save",
    incorrectPassword: "Incorrect password. Please try again.",
    secureTitle: "Secure Existing City",
    secureDesc: "Existing city found (unsecured). Create a password to protect your city!",
    newPassword: "New Password",
    createPassword: "Create password...",
    confirmPassword: "Confirm Password",
    confirmPasswordPlaceholder: "Confirm password...",
    secureLoad: "Secure & Load City",
    passwordMismatch: "Passwords do not match or are too short (min 3 chars).",
    newTitle: "Start New City",
    newDesc: "Start a new metropolis! Create a password to protect your city.",
    createStart: "Create & Start Building",
    back: "Back",
    fileUnlockTitle: "Unlock Imported City",
    fileUnlockDesc: "Imported save is password-protected. Enter password to load it.",
    unlockImport: "Unlock & Import",
    cancel: "Cancel",
    fileSecureTitle: "Secure Imported City",
    fileSecureDesc: "Imported save has no password. Create a password to protect it.",
    secureImport: "Secure & Import",
    overwriteWarning: "Are you sure you want to start a new city? Your current save will be lost."
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
    time: "Masa",
    sandbox: "Mod Bebas",
    thinking: "Berfikir...",
    analyzingData: "Menganalisis data bandar...",
    freePlay: "Permainan bebas aktif.",
    goalLabel: "Sasaran",
    collectReward: "Tuntut Ganjaran",
    goalAchieved: "Sasaran tercapai! ${reward} dimasukkan ke perbendaharaan.",
    insufficientFunds: "Perbendaharaan tidak mencukupi untuk {name}.",
    demolitionCostError: "Tidak mampu membayar kos peruntuhan.",
    terrainComplete: "Selamat datang ke SkyMetropolis. Penjanaan rupa bumi selesai.",
    cityFeed: "Suapan Bandar",
    noNews: "Tiada suapan berita aktif.",
    build: "Bina",
    exportBtn: "Eksport",
    importBtn: "Import",
    
    // New Startup/Password Translations (BM)
    unlockTitle: "Nyahkunci Bandar Sedia Ada",
    unlockDesc: "Selamat kembali, Datuk Bandar! Masukkan kata laluan untuk memuatkan bandar anda.",
    password: "Kata Laluan",
    enterPassword: "Masukkan kata laluan...",
    unlockLoad: "Nyahkunci & Muat",
    newCity: "Bandar Baru",
    importSave: "Import Fail",
    incorrectPassword: "Kata laluan salah. Sila cuba lagi.",
    secureTitle: "Lindungi Bandar Sedia Ada",
    secureDesc: "Bandar sedia ada ditemui (tanpa perlindungan). Cipta kata laluan untuk melindungi bandar anda!",
    newPassword: "Kata Laluan Baru",
    createPassword: "Cipta kata laluan...",
    confirmPassword: "Sahkan Kata Laluan",
    confirmPasswordPlaceholder: "Sahkan kata laluan...",
    secureLoad: "Lindungi & Muat Bandar",
    passwordMismatch: "Kata laluan tidak sepadan atau terlalu pendek (min 3 aksara).",
    newTitle: "Mula Bandar Baru",
    newDesc: "Mula bandar metropolis baru! Cipta kata laluan untuk melindungi bandar anda.",
    createStart: "Cipta & Mula Membina",
    back: "Kembali",
    fileUnlockTitle: "Nyahkunci Bandar Diimport",
    fileUnlockDesc: "Fail simpanan diimport dilindungi kata laluan. Masukkan kata laluan untuk memuatkannya.",
    unlockImport: "Nyahkunci & Import",
    cancel: "Batal",
    fileSecureTitle: "Lindungi Bandar Diimport",
    fileSecureDesc: "Fail simpanan diimport tiada kata laluan. Cipta kata laluan untuk melindunginya.",
    secureImport: "Lindungi & Import",
    overwriteWarning: "Adakah anda pasti mahu memulakan bandar baru? Rekod simpanan sedia ada akan dipadamkan."
  }
};

// --- Game State Variables ---
let currentLang = 'en';
let gameStarted = false;
let aiEnabled = true;
let sessionPassword = "";
let pendingStateToLoad = null;
let importedStateToLoad = null;


let stats = {
  money: INITIAL_MONEY,
  population: 0,
  day: 1,
  hour: 0,
  minute: 0,
};

let selectedTool = BuildingType.Road;
let currentGoal = null;
let isGeneratingGoal = false;
let newsFeed = [];
let grid = [];

// --- Three.js Variables ---
let scene, camera, renderer, controls;
let raycaster, mouse;
let worldOffset = GRID_SIZE / 2 - 0.5;

// Geometries shared for high performance
let boxGeo, cylinderGeo, coneGeo, sphereGeo;

// Lists of meshes/groups to update during rendering
let groundTiles = []; // 2D array coordinates mapping to GroundMesh
let buildingGroups = {}; // key "x,y" mapping to Group containing procedural building
let carSystem = null;
let citizenSystem = null;
let cloudGroups = [];
let birdGroups = [];
let smokeParticles = [];

let hoveredTile = null;
let previewGroup = null;
let cursorMesh = null;
let clickStartX = 0;
let clickStartY = 0;
let gameIntervalId = null;

// Helper to map coordinates
const gridToWorld = (x, y) => [x - worldOffset, 0, y - worldOffset];
const getHash = (x, y) => Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
const getRandomRange = (min, max) => Math.random() * (max - min) + min;

// --- API Helpers ---
const getApiKey = () => {
  // 1. Try URL parameters first (very useful for quick testing on deployed static links)
  const urlParams = new URLSearchParams(window.location.search);
  let key = urlParams.get('key') || urlParams.get('api_key') || urlParams.get('gemini_api_key');
  if (key && key.trim() !== "") return key;
  
  // 2. Try window config
  if (window.GEMINI_API_KEY && window.GEMINI_API_KEY !== "undefined") return window.GEMINI_API_KEY;

  // 3. Fallback undefined
  return undefined;
};

// Offline generator fallback goals
// Offline generator fallback goals
const getOfflineGoal = (lang) => {
  const isBm = lang === 'bm';
  
  // Count existing buildings
  const counts = {};
  grid.flat().forEach(tile => {
    counts[tile.buildingType] = (counts[tile.buildingType] || 0) + 1;
  });

  const resCount = counts[BuildingType.Residential] || 0;
  const comCount = counts[BuildingType.Commercial] || 0;
  const indCount = counts[BuildingType.Industrial] || 0;
  const parkCount = counts[BuildingType.Park] || 0;

  // We will define a list of dynamic generators that are guaranteed to require effort
  const goalGenerators = [
    {
      // House build
      generate: () => {
        const targetValue = resCount + 3;
        return {
          description: isBm 
            ? `Bina sekurang-kurangnya ${targetValue} buah Rumah untuk menampung lebih ramai penduduk baru!` 
            : `Build at least ${targetValue} Residential houses to accommodate more citizens!`,
          targetType: 'building_count',
          buildingType: BuildingType.Residential,
          targetValue: targetValue,
          reward: 300,
        };
      }
    },
    {
      // Shop build
      generate: () => {
        const targetValue = comCount + 2;
        return {
          description: isBm 
            ? `Bina sekurang-kurangnya ${targetValue} buah Kedai komersil untuk merancakkan ekonomi tempatan!` 
            : `Build at least ${targetValue} Commercial shops to boost the local economy!`,
          targetType: 'building_count',
          buildingType: BuildingType.Commercial,
          targetValue: targetValue,
          reward: 400,
        };
      }
    },
    {
      // Money goal
      generate: () => {
        const targetValue = Math.ceil((stats.money + 500) / 500) * 500;
        return {
          description: isBm 
            ? `Kumpulkan wang sebanyak $${targetValue.toLocaleString()} dalam perbendaharaan bandar.` 
            : `Amass $${targetValue.toLocaleString()} in the city treasury.`,
          targetType: 'money',
          targetValue: targetValue,
          reward: 200,
        };
      }
    },
    {
      // Population goal
      generate: () => {
        const currentPop = stats.population;
        const targetValue = Math.max(10, Math.ceil((currentPop + 15) / 10) * 10);
        return {
          description: isBm 
            ? `Tingkatkan jumlah penduduk bandar anda sehingga mencapai ${targetValue} orang.` 
            : `Grow your city's population to reach ${targetValue} citizens.`,
          targetType: 'population',
          targetValue: targetValue,
          reward: 500,
        };
      }
    },
    {
      // Factory build
      generate: () => {
        const targetValue = indCount + 1;
        return {
          description: isBm 
            ? `Bina sekurang-kurangnya ${targetValue} buah Kilang industri berat untuk meningkatkan pendapatan.` 
            : `Build at least ${targetValue} Industrial factories to boost your income.`,
          targetType: 'building_count',
          buildingType: BuildingType.Industrial,
          targetValue: targetValue,
          reward: 600,
        };
      }
    },
    {
      // Park build
      generate: () => {
        const targetValue = parkCount + 2;
        return {
          description: isBm 
            ? `Bina sekurang-kurangnya ${targetValue} buah Taman rekreasi untuk mengindahkan pemandangan.` 
            : `Build at least ${targetValue} Parks to beautify your metropolis.`,
          targetType: 'building_count',
          buildingType: BuildingType.Park,
          targetValue: targetValue,
          reward: 250,
        };
      }
    }
  ];

  // Pick one at random
  const generator = goalGenerators[Math.floor(Math.random() * goalGenerators.length)];
  const goal = generator.generate();
  return { ...goal, completed: false };
};

const getOfflineNews = (lang) => {
  const isBm = lang === 'bm';
  const headlines = [
    { text: isBm ? "Cuaca hari ini amat redup dan damai di SkyMetropolis." : "The weather is calm and peaceful in SkyMetropolis today.", type: 'neutral' },
    { text: isBm ? "Penduduk mencadangkan pembinaan lebih banyak taman rekreasi." : "Citizens suggest building more recreational parks.", type: 'neutral' },
    { text: isBm ? "Kadar migrasi ke bandar semakin meningkat tinggi!" : "Migration rates to the city are hitting record highs!", type: 'positive' },
    { text: isBm ? "Ahli ekonomi tempatan meramalkan pertumbuhan pesat tahun ini." : "Local economists predict rapid growth this year.", type: 'positive' },
    { text: isBm ? "Kesesakan lalu lintas di jalan raya mula dilaporkan pagi tadi." : "Traffic congestion was reported on local streets this morning.", type: 'negative' },
    { text: isBm ? "Penduduk menyukai reka bentuk landskap bandar yang isometrik." : "Citizens express love for the city's isometric layout.", type: 'positive' },
    { text: isBm ? "Bilangan rumah yang tidak mencukupi boleh menyebabkan penduduk berpindah keluar." : "Insufficient housing space might cause residents to move away.", type: 'negative' },
    { text: isBm ? "Kilang-kilang baru dilaporkan meningkatkan produktiviti industri." : "New factories report boosted industrial productivity.", type: 'positive' }
  ];

  const selected = headlines[Math.floor(Math.random() * headlines.length)];
  return {
    id: Date.now().toString() + Math.random(),
    text: selected.text,
    type: selected.type
  };
};

const generateCityGoal = async (stats, grid, lang) => {
  const apiKey = getApiKey();
  if (!apiKey) return getOfflineGoal(lang);

  const counts = {};
  grid.flat().forEach(tile => {
    counts[tile.buildingType] = (counts[tile.buildingType] || 0) + 1;
  });

  const context = `
    Current City Stats:
    Day: ${stats.day}
    Money: $${stats.money}
    Population: ${stats.population}
    Buildings: ${JSON.stringify(counts)}
  `;

  const prompt = `You are the AI City Advisor for a simulation game. Based on the current city stats, generate a challenging but achievable short-term goal for the player to help the city grow. Return JSON.
  IMPORTANT: The goal must NOT be already met by the current city stats. If they have $${stats.money}, the money target must be greater. If they have ${stats.population} citizens, the population target must be greater. If they have building counts: ${JSON.stringify(counts)}, the building targets must be greater than current counts.
  
  JSON Schema structure:
  {
    "description": "A short description of the goal",
    "targetType": "population" | "money" | "building_count",
    "targetValue": integer,
    "buildingType": "Residential" | "Commercial" | "Industrial" | "Park" | "Road" (required if targetType is building_count),
    "reward": integer
  }
  ${lang === 'bm' ? 'IMPORTANT: You must write the "description" field of the JSON in Bahasa Melayu, making it feel friendly, natural and encouraging.' : 'You must write the "description" field in English.'}`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${context}\n${prompt}` }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const goalData = JSON.parse(text);
      
      // Validate the goalData against current stats to make sure it's not already met!
      let isAlreadyMet = false;
      
      if (goalData.targetType === 'money' && stats.money >= goalData.targetValue) {
        isAlreadyMet = true;
      } else if (goalData.targetType === 'population' && stats.population >= goalData.targetValue) {
        isAlreadyMet = true;
      } else if (goalData.targetType === 'building_count' && goalData.buildingType) {
        const count = counts[goalData.buildingType] || 0;
        if (count >= goalData.targetValue) {
          isAlreadyMet = true;
        }
      }
      
      if (isAlreadyMet) {
        // Fallback to a dynamically generated goal that is guaranteed not to be met
        return getOfflineGoal(lang);
      }
      
      return { ...goalData, completed: false };
    }
  } catch (error) {
    console.error("Error calling Gemini API for goal:", error);
  }
  return getOfflineGoal(lang);
};

const generateNewsEvent = async (stats, lang) => {
  const apiKey = getApiKey();
  if (!apiKey) return getOfflineNews(lang);

  const context = `City Stats - Pop: ${stats.population}, Money: ${stats.money}, Day: ${stats.day}`;
  const prompt = `Generate a very short, isometric-sim-city style news headline based on the city state. Can be funny, cynical, or celebratory. Return JSON.
  JSON Schema structure:
  {
    "text": "A one-sentence news headline representing life in the city.",
    "type": "positive" | "negative" | "neutral"
  }
  ${lang === 'bm' ? 'IMPORTANT: You must write the "text" field of the JSON in Bahasa Melayu, capturing a quirky, humorous, or witty SimCity-style vibe.' : 'You must write the "text" field of the JSON in English.'}`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${context}\n${prompt}` }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 1.1,
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      const text = data.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(text);
      return {
        id: Date.now().toString() + Math.random(),
        text: parsed.text,
        type: parsed.type,
      };
    }
  } catch (error) {
    console.error("Error calling Gemini API for news:", error);
  }
  return getOfflineNews(lang);
};


// --- UI Overlay Updates ---
const addNewsItem = (item) => {
  newsFeed.push(item);
  if (newsFeed.length > 12) newsFeed.shift();
  
  const newsBody = document.getElementById('news-body');
  if (!newsBody) return;
  
  newsBody.innerHTML = '';
  newsFeed.forEach(n => {
    const div = document.createElement('div');
    div.className = `news-item ${n.type}`;
    div.innerText = n.text;
    newsBody.appendChild(div);
  });
  newsBody.scrollTop = newsBody.scrollHeight;
};

// --- Cryptographic Security Helpers (AES-GCM) ---
const bufToHex = (buf) => {
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

const hexToBuf = (hex) => {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes.buffer;
};

const deriveKey = async (password, salt) => {
  const encoder = new TextEncoder();
  const pwData = encoder.encode(password + salt);
  const hash = await crypto.subtle.digest('SHA-256', pwData);
  return crypto.subtle.importKey(
    'raw',
    hash,
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
};

const encryptData = async (plainText, password) => {
  const saltBytes = crypto.getRandomValues(new Uint8Array(8));
  const ivBytes = crypto.getRandomValues(new Uint8Array(12));
  const salt = bufToHex(saltBytes);
  const iv = bufToHex(ivBytes);
  
  const key = await deriveKey(password, salt);
  const encoder = new TextEncoder();
  const plainBytes = encoder.encode(plainText);
  
  const cipherBuffer = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: ivBytes },
    key,
    plainBytes
  );
  
  return {
    version: "1.1",
    salt,
    iv,
    ciphertext: bufToHex(cipherBuffer)
  };
};

const decryptData = async (encryptedObj, password) => {
  const { salt, iv, ciphertext } = encryptedObj;
  const ivBytes = hexToBuf(iv);
  const cipherBytes = hexToBuf(ciphertext);
  
  const key = await deriveKey(password, salt);
  const plainBuffer = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: ivBytes },
    key,
    cipherBytes
  );
  
  const decoder = new TextDecoder();
  return decoder.decode(plainBuffer);
};

// // --- Save/Load and Export/Import Logic ---
const saveGameLocal = async () => {
  if (!sessionPassword) return;
  const state = {
    stats,
    grid,
    currentLang,
    aiEnabled,
    currentGoal,
    newsFeed,
    gameStarted
  };
  try {
    const plainText = JSON.stringify(state);
    const encrypted = await encryptData(plainText, sessionPassword);
    localStorage.setItem('skymetropolis_save', JSON.stringify(encrypted));
  } catch (e) {
    console.error("Failed to auto-save locally:", e);
  }
};

const restoreGameState = (state) => {
  stats = state.stats;
  if (stats.hour === undefined) stats.hour = 0;
  if (stats.minute === undefined) stats.minute = 0;
  
  currentLang = state.currentLang || 'en';
  aiEnabled = state.aiEnabled !== undefined ? state.aiEnabled : true;
  currentGoal = state.currentGoal;
  newsFeed = state.newsFeed || [];
  gameStarted = state.gameStarted || false;
  
  grid = state.grid;
  
  // Set UI controls
  if (currentLang === 'bm') {
    document.getElementById('hud-lang-bm').classList.add('active');
    document.getElementById('hud-lang-en').classList.remove('active');
    document.getElementById('start-lang-bm').classList.add('active');
    document.getElementById('start-lang-en').classList.remove('active');
  } else {
    document.getElementById('hud-lang-en').classList.add('active');
    document.getElementById('hud-lang-bm').classList.remove('active');
    document.getElementById('start-lang-en').classList.add('active');
    document.getElementById('start-lang-bm').classList.remove('active');
  }
  
  document.getElementById('advisor-toggle').checked = aiEnabled;
  const badge = document.getElementById('start-badge-dot');
  if (badge) {
    if (aiEnabled) {
      badge.classList.add('active');
    } else {
      badge.classList.remove('active');
    }
  }
  
  // Clean all building models from scene
  Object.keys(buildingGroups).forEach(key => {
    scene.remove(buildingGroups[key]);
  });
  buildingGroups = {};
  
  // Re-build all tile meshes
  grid.forEach(row => row.forEach(tile => {
    updateTileMesh(tile.x, tile.y, tile.buildingType);
  }));
  
  if (gameStarted) {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('hud-overlay').style.display = 'flex';
    initGameLoop();
  }
  
  updateUI();
  
  // Restore news feed DOM logs
  const newsBody = document.getElementById('news-body');
  if (newsBody && newsFeed.length > 0) {
    newsBody.innerHTML = '';
    newsFeed.forEach(n => {
      const div = document.createElement('div');
      div.className = `news-item ${n.type}`;
      div.innerText = n.text;
      newsBody.appendChild(div);
    });
    newsBody.scrollTop = newsBody.scrollHeight;
  }
};

const loadGameLocal = () => {
  // Deprecated in favor of checkStartupSave, but left as stub
  return false;
};

const exportGame = async () => {
  if (!sessionPassword) return;
  const state = {
    stats,
    grid,
    currentLang,
    aiEnabled,
    currentGoal,
    newsFeed,
    gameStarted
  };
  
  try {
    const plainText = JSON.stringify(state);
    const encrypted = await encryptData(plainText, sessionPassword);
    
    const blob = new Blob([JSON.stringify(encrypted, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `skymetropolis-save-${stats.day}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    addNewsItem({
      id: Date.now().toString(),
      text: currentLang === 'bm' ? "Permainan berjaya dieksport!" : "Game save exported successfully!",
      type: 'positive'
    });
  } catch (e) {
    console.error("Export failed:", e);
    alert(currentLang === 'bm' ? "Eksport gagal." : "Export failed.");
  }
};

const importGame = (file) => {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const state = JSON.parse(e.target.result);
      if (!state) {
        throw new Error("Invalid save structure");
      }
      
      importedStateToLoad = state;
      if (state.ciphertext) {
        showStartupPanel('panel-file-unlock');
      } else if (state.grid && state.stats) {
        showStartupPanel('panel-file-secure');
      } else {
        throw new Error("Invalid save structure");
      }
    } catch (err) {
      console.error("Import failed:", err);
      alert(currentLang === 'bm' ? "Fail simpanan tidak sah." : "Invalid save file.");
    }
  };
  reader.readAsText(file);
};

const showStartupPanel = (panelId) => {
  const panels = ['panel-unlock', 'panel-secure-old', 'panel-new-game', 'panel-file-unlock', 'panel-file-secure'];
  panels.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = id === panelId ? 'block' : 'none';
  });
  
  const btnCancelNew = document.getElementById('btn-new-cancel');
  if (btnCancelNew) {
    btnCancelNew.style.display = pendingStateToLoad ? 'block' : 'none';
  }

  // Clear inputs and hide errors
  const inputs = document.querySelectorAll('.start-input');
  inputs.forEach(input => input.value = '');
  const errors = document.querySelectorAll('.error-message');
  errors.forEach(err => err.style.display = 'none');
};

const checkStartupSave = () => {
  try {
    const raw = localStorage.getItem('skymetropolis_save');
    if (!raw) {
      showStartupPanel('panel-new-game');
      return;
    }
    const state = JSON.parse(raw);
    if (!state) {
      showStartupPanel('panel-new-game');
      return;
    }
    
    if (state.ciphertext) {
      pendingStateToLoad = state;
      showStartupPanel('panel-unlock');
    } else if (state.grid && state.stats) {
      pendingStateToLoad = state;
      showStartupPanel('panel-secure-old');
    } else {
      showStartupPanel('panel-new-game');
    }
  } catch (e) {
    console.error("Error checking startup save:", e);
    showStartupPanel('panel-new-game');
  }
};

const formatTime = (h, m) => {
  return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
};

const updateUI = () => {
  const t = TRANSLATIONS[currentLang];
  
  // Stats
  document.getElementById('stat-money-val').innerText = stats.money.toLocaleString();
  document.getElementById('stat-pop-val').innerText = stats.population.toLocaleString();
  document.getElementById('stat-day-val').innerText = stats.day;
  document.getElementById('stat-time-val').innerText = formatTime(stats.hour, stats.minute);
  
  document.getElementById('treasury-lbl').innerText = t.treasury;
  document.getElementById('citizens-lbl').innerText = t.citizens;
  document.getElementById('day-lbl').innerText = t.day;
  document.getElementById('time-lbl').innerText = t.time;
  
  // Export/Import Labels
  document.getElementById('export-lbl').innerText = t.exportBtn;
  const importLbl = document.getElementById('import-lbl');
  if (importLbl) importLbl.innerText = t.importBtn;
  
  // Toolbar labels
  document.getElementById('toolbar-label').innerText = t.build;
  document.getElementById('news-header-lbl').innerText = t.cityFeed;
  
  // Goal Panel Headers
  const advisorBadge = document.getElementById('advisor-badge-dot');
  const advisorTitle = document.getElementById('advisor-title-lbl');
  
  if (aiEnabled) {
    advisorTitle.innerText = t.aiAdvisor;
    advisorBadge.className = `goal-status-indicator pulse`;
  } else {
    advisorTitle.innerText = t.sandbox;
    advisorBadge.className = `goal-status-indicator`;
  }
  
  // Goal Panel Body
  const goalDesc = document.getElementById('goal-desc');
  const goalProgress = document.getElementById('goal-progress');
  const goalReward = document.getElementById('goal-reward-val');
  const rewardBtn = document.getElementById('claim-reward-btn');
  
  rewardBtn.innerText = t.collectReward;
  
  if (aiEnabled) {
    if (isGeneratingGoal) {
      goalDesc.innerText = t.analyzingData;
      goalProgress.style.width = '20%';
      goalProgress.style.background = 'var(--color-yellow)';
      goalReward.innerText = '';
      rewardBtn.disabled = true;
    } else if (currentGoal) {
      goalDesc.innerText = currentGoal.description;
      goalReward.innerText = `+$${currentGoal.reward}`;
      
      // Calculate progress percentage
      let pct = 0;
      let buildingCounts = {};
      grid.flat().forEach(tile => {
        if (tile.buildingType !== BuildingType.None) {
          buildingCounts[tile.buildingType] = (buildingCounts[tile.buildingType] || 0) + 1;
        }
      });
      
      if (currentGoal.targetType === 'money') {
        pct = Math.min(100, (stats.money / currentGoal.targetValue) * 100);
      } else if (currentGoal.targetType === 'population') {
        pct = Math.min(100, (stats.population / currentGoal.targetValue) * 100);
      } else if (currentGoal.targetType === 'building_count') {
        const count = buildingCounts[currentGoal.buildingType] || 0;
        pct = Math.min(100, (count / currentGoal.targetValue) * 100);
      }
      
      goalProgress.style.width = `${pct}%`;
      goalProgress.style.background = pct >= 100 ? 'var(--color-green)' : 'var(--color-cyan)';
      rewardBtn.disabled = !currentGoal.completed;
    } else {
      goalDesc.innerText = t.thinking;
      goalProgress.style.width = '0%';
      goalReward.innerText = '';
      rewardBtn.disabled = true;
    }
  } else {
    goalDesc.innerText = t.freePlay;
    goalProgress.style.width = '100%';
    goalProgress.style.background = 'var(--color-green)';
    goalReward.innerText = '';
    rewardBtn.disabled = true;
  }
  
  // Tool buttons afford check & localized labels
  Object.keys(BUILDINGS).forEach(type => {
    const btn = document.getElementById(`tool-btn-${type}`);
    if (!btn) return;
    
    const config = BUILDINGS[type];
    const isBulldoze = type === BuildingType.None;
    const canAfford = stats.money >= config.cost;
    
    btn.disabled = !isBulldoze && !canAfford;
    
    // Label update
    const lbl = btn.querySelector('.tool-name');
    if (lbl) {
      lbl.innerText = currentLang === 'bm' ? config.nameBm : config.name;
    }
    
    // Update active class
    if (selectedTool === type) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
};

const setupStartScreen = () => {
  const t = TRANSLATIONS[currentLang];
  document.getElementById('start-title').innerText = t.title;
  document.getElementById('start-subtitle').innerText = t.subtitle;
  document.getElementById('start-advisor-title').innerText = t.aiAdvisor;
  document.getElementById('start-advisor-desc').innerText = t.aiAdvisorDesc;
  document.getElementById('created-by-lbl').innerText = `${t.createdBy} @ammaar`;
  
  // Set translations for unlock panel
  document.getElementById('unlock-title').innerText = t.unlockTitle;
  document.getElementById('unlock-desc').innerText = t.unlockDesc;
  document.getElementById('unlock-password-lbl').innerText = t.password;
  document.getElementById('unlock-password').placeholder = t.enterPassword;
  document.getElementById('btn-unlock-load').innerText = t.unlockLoad;
  document.getElementById('btn-unlock-new').innerText = t.newCity;
  document.getElementById('btn-unlock-import').innerText = t.importSave;
  document.getElementById('unlock-error').innerText = t.incorrectPassword;

  // Set translations for secure old panel
  document.getElementById('secure-title').innerText = t.secureTitle;
  document.getElementById('secure-desc').innerText = t.secureDesc;
  document.getElementById('secure-pw-lbl').innerText = t.newPassword;
  document.getElementById('secure-password').placeholder = t.createPassword;
  document.getElementById('secure-confirm-lbl').innerText = t.confirmPassword;
  document.getElementById('secure-confirm').placeholder = t.confirmPasswordPlaceholder;
  document.getElementById('btn-secure-load').innerText = t.secureLoad;
  document.getElementById('btn-secure-new').innerText = t.newCity;
  document.getElementById('btn-secure-import').innerText = t.importSave;
  document.getElementById('secure-error').innerText = t.passwordMismatch;

  // Set translations for new game panel
  document.getElementById('new-title').innerText = t.newTitle;
  document.getElementById('new-desc').innerText = t.newDesc;
  document.getElementById('new-pw-lbl').innerText = t.password;
  document.getElementById('new-password').placeholder = t.createPassword;
  document.getElementById('new-confirm-lbl').innerText = t.confirmPassword;
  document.getElementById('new-confirm').placeholder = t.confirmPasswordPlaceholder;
  document.getElementById('btn-create-start').innerText = t.createStart;
  document.getElementById('btn-new-cancel').innerText = t.back;
  document.getElementById('btn-new-import').innerText = t.importSave;
  document.getElementById('new-error').innerText = t.passwordMismatch;

  // Set translations for file unlock panel
  document.getElementById('file-unlock-title').innerText = t.fileUnlockTitle;
  document.getElementById('file-unlock-desc').innerText = t.fileUnlockDesc;
  document.getElementById('file-unlock-password-lbl').innerText = t.password;
  document.getElementById('file-unlock-password').placeholder = t.enterPassword;
  document.getElementById('btn-file-unlock-load').innerText = t.unlockImport;
  document.getElementById('btn-file-unlock-cancel').innerText = t.cancel;
  document.getElementById('file-unlock-error').innerText = t.incorrectPassword;

  // Set translations for file secure panel
  document.getElementById('file-secure-title').innerText = t.fileSecureTitle;
  document.getElementById('file-secure-desc').innerText = t.fileSecureDesc;
  document.getElementById('file-secure-pw-lbl').innerText = t.password;
  document.getElementById('file-secure-pw').placeholder = t.createPassword;
  document.getElementById('file-secure-confirm-lbl').innerText = t.confirmPassword;
  document.getElementById('file-secure-confirm').placeholder = t.confirmPasswordPlaceholder;
  document.getElementById('btn-file-secure-load').innerText = t.secureImport;
  document.getElementById('btn-file-secure-cancel').innerText = t.cancel;
  document.getElementById('file-secure-error').innerText = t.passwordMismatch;
};


// --- Simulation Loops ---
const startGoalGenerator = async () => {
  if (isGeneratingGoal || !aiEnabled) return;
  isGeneratingGoal = true;
  updateUI();
  
  const newGoal = await generateCityGoal(stats, grid, currentLang);
  if (newGoal && aiEnabled) {
    currentGoal = newGoal;
  }
  
  isGeneratingGoal = false;
  updateUI();
};

const triggerNewsFeed = async () => {
  if (!aiEnabled || Math.random() > 0.2) return;
  const news = await generateNewsEvent(stats, currentLang);
  if (news && aiEnabled) {
    addNewsItem(news);
  }
};

const initGameLoop = () => {
  if (gameIntervalId) clearInterval(gameIntervalId);
  gameIntervalId = setInterval(() => {
    if (!gameStarted) return;
    
    // 1. Advance Game Time: 1 second real time = 1 minute game time
    stats.minute += 1;
    let hourPassed = false;
    if (stats.minute >= 60) {
      stats.minute = 0;
      stats.hour += 1;
      hourPassed = true;
      if (stats.hour >= 24) {
        stats.hour = 0;
        stats.day += 1;
      }
    }
    
    // 2. Calculate building counts
    let hourlyIncome = 0;
    let hourlyPopGrowth = 0;
    let buildingCounts = {};
    
    grid.flat().forEach(tile => {
      if (tile.buildingType !== BuildingType.None) {
        const config = BUILDINGS[tile.buildingType];
        hourlyIncome += config.incomeGen;
        hourlyPopGrowth += config.popGen;
        buildingCounts[tile.buildingType] = (buildingCounts[tile.buildingType] || 0) + 1;
      }
    });
    
    const resCount = buildingCounts[BuildingType.Residential] || 0;
    const maxPop = resCount * 50; // Cap
    
    // 3. Hourly Payout (when hour changes)
    if (hourPassed) {
      let newPop = stats.population + hourlyPopGrowth;
      if (newPop > maxPop) newPop = maxPop;
      if (resCount === 0 && stats.population > 0) newPop = Math.max(0, stats.population - 5);
      
      stats.money += hourlyIncome;
      stats.population = newPop;
      
      triggerNewsFeed();
      saveGameLocal();
    }
    
    // 4. Verify current goal (every second for maximum responsiveness)
    if (aiEnabled && currentGoal && !currentGoal.completed) {
      let isMet = false;
      if (currentGoal.targetType === 'money' && stats.money >= currentGoal.targetValue) isMet = true;
      if (currentGoal.targetType === 'population' && stats.population >= currentGoal.targetValue) isMet = true;
      if (currentGoal.targetType === 'building_count' && currentGoal.buildingType) {
        const count = buildingCounts[currentGoal.buildingType] || 0;
        if (count >= currentGoal.targetValue) isMet = true;
      }
      
      if (isMet) {
        currentGoal.completed = true;
        addNewsItem({
          id: Date.now().toString(),
          text: currentLang === 'bm' ? "Tugasan selesai! Tuntut ganjaran anda segera." : "Goal completed! Collect your reward now.",
          type: 'positive'
        });
      }
    }
    
    // 5. Update UI & Systems (every second)
    updateUI();
    updateTrafficAndCitizensCount();
    
  }, 1000); // 1 second interval
};

// Dynamically scales active visual cars/agents based on roads/population
const updateTrafficAndCitizensCount = () => {
  if (!carSystem || !citizenSystem) return;
  
  // Update cars active state
  let roadTiles = [];
  grid.forEach(row => row.forEach(tile => {
    if (tile.buildingType === BuildingType.Road) roadTiles.push({x: tile.x, y: tile.y});
  }));
  
  carSystem.roadNodes = roadTiles;
  
  // Update citizen count
  const targetCitizens = Math.min(Math.floor(stats.population / 2), 150);
  citizenSystem.setTargetCount(targetCitizens);
};


// --- Interaction Logic ---
const handleTileClick = (x, y) => {
  if (!gameStarted || x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return;
  
  const tile = grid[y][x];
  const tool = selectedTool;
  const buildingConfig = BUILDINGS[tool];
  
  // Bulldoze
  if (tool === BuildingType.None) {
    if (tile.buildingType !== BuildingType.None) {
      const demolishCost = 5;
      if (stats.money >= demolishCost) {
        stats.money -= demolishCost;
        tile.buildingType = BuildingType.None;
        updateTileMesh(x, y, BuildingType.None);
        updateUI();
        saveGameLocal();
      } else {
        addNewsItem({
          id: Date.now().toString(),
          text: TRANSLATIONS[currentLang].demolitionCostError,
          type: 'negative'
        });
      }
    }
    return;
  }
  
  // Build
  if (tile.buildingType === BuildingType.None) {
    if (stats.money >= buildingConfig.cost) {
      stats.money -= buildingConfig.cost;
      tile.buildingType = tool;
      updateTileMesh(x, y, tool);
      updateUI();
      saveGameLocal();
    } else {
      const localizedName = currentLang === 'bm' ? buildingConfig.nameBm : buildingConfig.name;
      addNewsItem({
        id: Date.now().toString(),
        text: TRANSLATIONS[currentLang].insufficientFunds.replace('{name}', localizedName),
        type: 'negative'
      });
    }
  }
};

const handleClaimReward = () => {
  if (currentGoal && currentGoal.completed) {
    const rewardBtn = document.getElementById('claim-reward-btn');
    if (rewardBtn) rewardBtn.disabled = true;
    
    stats.money += currentGoal.reward;
    addNewsItem({
      id: Date.now().toString(),
      text: TRANSLATIONS[currentLang].goalAchieved.replace('{reward}', currentGoal.reward.toString()),
      type: 'positive'
    });
    currentGoal = null;
    updateUI();
    startGoalGenerator();
    saveGameLocal();
  }
};


// --- Three.js Scene Setup ---
const init3D = () => {
  const container = document.getElementById('canvas-container');
  
  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#0c4a6e'); // sky-900
  scene.fog = new THREE.FogExp2('#0c4a6e', 0.015);
  
  // Camera (Isometric view using OrthographicCamera)
  const aspect = window.innerWidth / window.innerHeight;
  const d = 11;
  camera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, -100, 1000);
  camera.position.set(20, 20, 20);
  camera.lookAt(0, -0.5, 0);
  
  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);
  
  // Orbit/Map Controls
  controls = new THREE.MapControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minZoom = 10;
  controls.maxZoom = 40;
  controls.maxPolarAngle = Math.PI / 2.2;
  controls.minPolarAngle = 0.1;
  controls.target.set(0, -0.5, 0);
  
  // Ambient & Directional Lighting
  const ambient = new THREE.AmbientLight('#cceeff', 0.6);
  scene.add(ambient);
  
  const sunLight = new THREE.DirectionalLight('#fffbeb', 1.8);
  sunLight.position.set(20, 25, 12);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 1024;
  sunLight.shadow.mapSize.height = 1024;
  sunLight.shadow.camera.left = -16;
  sunLight.shadow.camera.right = 16;
  sunLight.shadow.camera.top = 16;
  sunLight.shadow.camera.bottom = -16;
  sunLight.shadow.camera.near = 0.1;
  sunLight.shadow.camera.far = 100;
  sunLight.shadow.bias = -0.0005;
  scene.add(sunLight);
  
  // Geometries
  boxGeo = new THREE.BoxGeometry(1, 1, 1);
  cylinderGeo = new THREE.CylinderGeometry(1, 1, 1, 8);
  coneGeo = new THREE.ConeGeometry(1, 1, 4);
  sphereGeo = new THREE.SphereGeometry(1, 8, 8);
  
  // Base Water Plane
  const waterGeo = new THREE.PlaneGeometry(GRID_SIZE * 4, GRID_SIZE * 4);
  const waterMat = new THREE.MeshStandardMaterial({
    color: '#1d4ed8',
    roughness: 0.15,
    metalness: 0.6,
    transparent: true,
    opacity: 0.85
  });
  const water = new THREE.Mesh(waterGeo, waterMat);
  water.rotation.x = -Math.PI / 2;
  water.position.y = -0.61;
  water.receiveShadow = true;
  scene.add(water);
  
  // Selection Cursor
  const cursorGeo = new THREE.PlaneGeometry(0.95, 0.95);
  const cursorMat = new THREE.MeshBasicMaterial({
    color: '#ffffff',
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  cursorMesh = new THREE.Mesh(cursorGeo, cursorMat);
  cursorMesh.rotation.x = -Math.PI / 2;
  cursorMesh.position.y = -0.24;
  cursorMesh.visible = false;
  scene.add(cursorMesh);
  
  // Raycasting
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  
  // Events
  window.addEventListener('resize', onWindowResize);
  renderer.domElement.addEventListener('pointermove', onPointerMove);
  renderer.domElement.addEventListener('pointerdown', onPointerDown);
  renderer.domElement.addEventListener('pointerup', onPointerUp);
  renderer.domElement.addEventListener('pointerleave', () => {
    hoveredTile = null;
    cursorMesh.visible = false;
    if (previewGroup) previewGroup.visible = false;
  });
  
  // Initialize dynamic sub-systems
  initEnvironment();
  initGrid();
  
  // Try to load auto-save
  checkStartupSave();
  
  // Loop
  animate();
};

const onWindowResize = () => {
  const aspect = window.innerWidth / window.innerHeight;
  const d = 11;
  camera.left = -d * aspect;
  camera.right = d * aspect;
  camera.top = d;
  camera.bottom = -d;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const onPointerMove = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(groundTiles);
  
  if (intersects.length > 0) {
    const tile = intersects[0].object;
    hoveredTile = { x: tile.userData.x, y: tile.userData.y };
    
    // Position cursor
    const [wx, _, wz] = gridToWorld(hoveredTile.x, hoveredTile.y);
    cursorMesh.position.x = wx;
    cursorMesh.position.z = wz;
    cursorMesh.visible = true;
    
    // Cursor color
    if (selectedTool === BuildingType.None) {
      cursorMesh.material.color.set('#ef4444');
    } else {
      const targetBuilding = grid[hoveredTile.y][hoveredTile.x].buildingType;
      if (targetBuilding === BuildingType.None) {
        cursorMesh.material.color.set('#ffffff');
      } else {
        cursorMesh.material.color.set('#000000');
      }
    }
    
    // Preview Building floating
    updatePlacementPreview(hoveredTile.x, hoveredTile.y);
  } else {
    hoveredTile = null;
    cursorMesh.visible = false;
    if (previewGroup) previewGroup.visible = false;
  }
};

const onPointerDown = (e) => {
  if (e.button === 0) {
    clickStartX = e.clientX;
    clickStartY = e.clientY;
  }
};

const onPointerUp = (e) => {
  if (e.button === 0) {
    const dx = e.clientX - clickStartX;
    const dy = e.clientY - clickStartY;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    // Trigger build only if dragging distance is very small (less than 5px)
    if (dist < 5 && hoveredTile) {
      handleTileClick(hoveredTile.x, hoveredTile.y);
      onPointerMove(e);
    }
  }
};


// --- Environment (Clouds & Birds) ---
const initEnvironment = () => {
  // Clouds
  const cloudSpawnX = [-15, 0, 15];
  const cloudZ = [6, -8, 10];
  const cloudScale = [1.5, 1.1, 1.8];
  
  for(let i=0; i<3; i++) {
    const group = new THREE.Group();
    group.position.set(cloudSpawnX[i], 8 + i*0.5, cloudZ[i]);
    
    // Create soft cloud bubble structures
    const count = 5 + Math.floor(Math.random() * 4);
    for(let j=0; j<count; j++) {
      const bubbleMat = new THREE.MeshStandardMaterial({
        color: '#ffffff',
        roughness: 0.9,
        transparent: true,
        opacity: 0.8,
        flatShading: true
      });
      const bubble = new THREE.Mesh(sphereGeo, bubbleMat);
      bubble.position.set(
        getRandomRange(-1.2, 1.2),
        getRandomRange(-0.4, 0.4),
        getRandomRange(-1.2, 1.2)
      );
      bubble.scale.setScalar(getRandomRange(0.6, 1.3));
      bubble.castShadow = true;
      group.add(bubble);
    }
    group.scale.setScalar(cloudScale[i]);
    scene.add(group);
    cloudGroups.push({ mesh: group, speed: 0.2 + i*0.1 });
  }
  
  // Birds
  for(let i=0; i<3; i++) {
    const group = new THREE.Group();
    group.position.set(0, 5, 0);
    
    const wingL = new THREE.Mesh(boxGeo, new THREE.MeshBasicMaterial({color: '#2d3748'}));
    wingL.scale.set(0.2, 0.03, 0.05);
    wingL.position.set(0.1, 0, 0);
    wingL.rotation.y = Math.PI / 4;
    group.add(wingL);
    
    const wingR = new THREE.Mesh(boxGeo, new THREE.MeshBasicMaterial({color: '#2d3748'}));
    wingR.scale.set(0.2, 0.03, 0.05);
    wingR.position.set(-0.1, 0, 0);
    wingR.rotation.y = -Math.PI / 4;
    group.add(wingR);
    
    scene.add(group);
    birdGroups.push({
      mesh: group,
      speed: 0.6,
      offset: i * 1.5,
      radiusX: GRID_SIZE * 0.8,
      radiusZ: GRID_SIZE * 0.4
    });
  }
};


// --- Grid and Procedural Buildings Engine ---
const initGrid = () => {
  // Generate data structure
  for (let y = 0; y < GRID_SIZE; y++) {
    const row = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      row.push({ x, y, buildingType: BuildingType.None });
    }
    grid.push(row);
  }
  
  // Create 3D Ground Plate Tiles
  const thickness = 0.5;
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      const [wx, _, wz] = gridToWorld(x, y);
      
      const noise = getHash(x, y);
      const colorVal = noise > 0.7 ? '#059669' : noise > 0.3 ? '#10b981' : '#34d399';
      const topY = -0.3 - noise * 0.1;
      
      const tileMat = new THREE.MeshStandardMaterial({
        color: colorVal,
        flatShading: true,
        roughness: 1.0
      });
      const tileMesh = new THREE.Mesh(boxGeo, tileMat);
      tileMesh.scale.set(1, thickness, 1);
      tileMesh.position.set(wx, topY - thickness/2, wz);
      tileMesh.receiveShadow = true;
      tileMesh.castShadow = true;
      
      tileMesh.userData = { x, y, baseColor: colorVal, thickness, topY };
      scene.add(tileMesh);
      groundTiles.push(tileMesh);
    }
  }
  
  // Initialize traffic & citizens systems
  initTrafficSystem();
  initCitizenSystem();
};

const updateTileMesh = (x, y, type) => {
  const tile = groundTiles.find(t => t.userData.x === x && t.userData.y === y);
  if (!tile) return;
  
  // 1. Remove existing building model
  const key = `${x},${y}`;
  if (buildingGroups[key]) {
    // Clean up geometries and materials to avoid memory leaks
    buildingGroups[key].traverse(child => {
      if (child.isMesh) {
        child.geometry.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach(m => m.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
    scene.remove(buildingGroups[key]);
    delete buildingGroups[key];
  }
  
  // 2. Adjust Ground Tile Color & Height
  let color = tile.userData.baseColor;
  let topY = tile.userData.topY;
  
  if (type === BuildingType.Road) {
    color = '#374151'; // gray-700
    topY = -0.29;
  } else if (type !== BuildingType.None) {
    color = '#d1d5db'; // concrete base
    topY = -0.28;
  }
  
  tile.material.color.set(color);
  tile.position.y = topY - tile.userData.thickness/2;
  
  // 3. Re-evaluate adjacent road markings
  updateAdjacentRoadMarkings(x, y);
  
  // 4. Instantiates and adds new procedural building model
  if (type !== BuildingType.None && type !== BuildingType.Road) {
    const [wx, _, wz] = gridToWorld(x, y);
    const group = createProceduralBuildingModel(type, x, y, BUILDINGS[type].color, topY);
    group.position.set(wx, 0, wz);
    scene.add(group);
    buildingGroups[key] = group;
  }
};

const updateAdjacentRoadMarkings = (x, y) => {
  // Re-render road markings for current tile and neighbors
  const tilesToUpdate = [
    {x, y},
    {x: x+1, y}, {x: x-1, y},
    {x, y: y+1}, {x, y: y-1}
  ];
  
  tilesToUpdate.forEach(pos => {
    if (pos.x < 0 || pos.x >= GRID_SIZE || pos.y < 0 || pos.y >= GRID_SIZE) return;
    const currentType = grid[pos.y][pos.x].buildingType;
    const tile = groundTiles.find(t => t.userData.x === pos.x && t.userData.y === pos.y);
    if (!tile) return;
    
    // Clear previous markings if any
    const prevMarkings = tile.getObjectByName('roadMarkings');
    if (prevMarkings) tile.remove(prevMarkings);
    
    if (currentType === BuildingType.Road) {
      const markings = buildRoadMarkingsMesh(pos.x, pos.y);
      markings.name = 'roadMarkings';
      tile.add(markings);
    }
  });
};

const buildRoadMarkingsMesh = (x, y) => {
  const group = new THREE.Group();
  // Thin plane geometries offset to avoid z-fighting on road surface
  const lineGeo = new THREE.PlaneGeometry(0.1, 0.45);
  const lineMat = new THREE.MeshStandardMaterial({
    color: '#fbbf24', // Amber line
    roughness: 0.8
  });
  
  const hasUp = y > 0 && grid[y - 1][x].buildingType === BuildingType.Road;
  const hasDown = y < GRID_SIZE - 1 && grid[y + 1][x].buildingType === BuildingType.Road;
  const hasLeft = x > 0 && grid[y][x - 1].buildingType === BuildingType.Road;
  const hasRight = x < GRID_SIZE - 1 && grid[y][x + 1].buildingType === BuildingType.Road;
  
  const connections = [hasUp, hasDown, hasLeft, hasRight].filter(Boolean).length;
  const heightOffset = 0.5 / 2 + 0.002; // sit on top of 0.5 thickness ground
  
  if (connections === 0) {
    const mesh = new THREE.Mesh(lineGeo, lineMat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(0, heightOffset, 0);
    group.add(mesh);
  } else {
    // Center point junction
    if ((hasUp || hasDown) && (hasLeft || hasRight)) {
      const center = new THREE.Mesh(new THREE.PlaneGeometry(0.12, 0.12), lineMat);
      center.rotation.x = -Math.PI / 2;
      center.position.set(0, heightOffset + 0.001, 0);
      group.add(center);
    }
    
    if (hasUp) {
      const mesh = new THREE.Mesh(lineGeo, lineMat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(0, heightOffset, -0.25);
      group.add(mesh);
    }
    if (hasDown) {
      const mesh = new THREE.Mesh(lineGeo, lineMat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(0, heightOffset, 0.25);
      group.add(mesh);
    }
    if (hasLeft) {
      const mesh = new THREE.Mesh(lineGeo, lineMat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.rotation.z = Math.PI / 2;
      mesh.position.set(-0.25, heightOffset, 0);
      group.add(mesh);
    }
    if (hasRight) {
      const mesh = new THREE.Mesh(lineGeo, lineMat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.rotation.z = Math.PI / 2;
      mesh.position.set(0.25, heightOffset, 0);
      group.add(mesh);
    }
  }
  return group;
};

// Generates procedural architectural structures matching React version
const createProceduralBuildingModel = (type, x, y, baseHex, groundY, isPreview = false) => {
  const group = new THREE.Group();
  const hash = getHash(x, y);
  const variant = Math.floor(hash * 100);
  const rotAngle = Math.floor(hash * 4) * (Math.PI / 2);
  
  // Custom Materials
  const baseColor = new THREE.Color(baseHex);
  baseColor.offsetHSL(hash * 0.1 - 0.05, 0, hash * 0.2 - 0.1);
  
  const mainMat = new THREE.MeshStandardMaterial({
    color: baseColor,
    flatShading: true,
    roughness: 0.8,
    transparent: isPreview,
    opacity: isPreview ? 0.6 : 1.0
  });
  
  const accentMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(baseColor).multiplyScalar(0.7),
    flatShading: true,
    transparent: isPreview,
    opacity: isPreview ? 0.6 : 1.0
  });
  
  const roofMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(baseColor).multiplyScalar(0.5).offsetHSL(0, 0, -0.1),
    flatShading: true,
    transparent: isPreview,
    opacity: isPreview ? 0.6 : 1.0
  });
  
  const windowMat = new THREE.MeshStandardMaterial({
    color: '#bfdbfe',
    emissive: '#bfdbfe',
    emissiveIntensity: 0.25,
    roughness: 0.1,
    metalness: 0.8,
    transparent: isPreview,
    opacity: isPreview ? 0.6 : 1.0
  });
  
  // Helpers to add meshes
  const addBlock = (geo, mat, pos, scale, rot = [0,0,0]) => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(pos[0], pos[1] + groundY, pos[2]);
    mesh.scale.set(scale[0], scale[1], scale[2]);
    mesh.rotation.set(rot[0], rot[1], rot[2]);
    mesh.castShadow = !isPreview;
    mesh.receiveShadow = !isPreview;
    group.add(mesh);
  };
  
  const addWindow = (pos, scale) => {
    addBlock(boxGeo, windowMat, pos, scale);
  };
  
  // Group sits at [0, 0, 0] base local coords
  group.rotation.y = rotAngle;
  
  switch(type) {
    case BuildingType.Residential:
      if (variant < 33) {
        // Cozy Cottage
        addBlock(boxGeo, mainMat, [0, 0.3, 0], [0.7, 0.6, 0.6]);
        addBlock(coneGeo, roofMat, [0, 0.75, 0], [0.6, 0.4, 0.6], [0, Math.PI/4, 0]);
        // Windows
        addWindow([0.2, 0.3, 0.31], [0.15, 0.2, 0.02]);
        addWindow([-0.2, 0.3, 0.31], [0.15, 0.2, 0.02]);
        // Door
        addBlock(boxGeo, accentMat, [0, 0.1, 0.32], [0.15, 0.2, 0.02]);
      } else if (variant < 66) {
        // Modern Boxy
        addBlock(boxGeo, mainMat, [-0.1, 0.35, 0], [0.6, 0.7, 0.8]);
        addBlock(boxGeo, accentMat, [0.25, 0.25, 0.1], [0.4, 0.5, 0.6]);
        addWindow([-0.1, 0.5, 0.41], [0.4, 0.2, 0.02]);
      } else {
        // Townhouse
        addBlock(boxGeo, mainMat, [0, 0.5, 0], [0.5, 1, 0.6]);
        addBlock(boxGeo, roofMat, [0, 1.05, 0], [0.55, 0.1, 0.65]);
        addWindow([0, 0.75, 0.31], [0.3, 0.2, 0.02]);
        addWindow([0, 0.35, 0.31], [0.3, 0.2, 0.02]);
      }
      break;
      
    case BuildingType.Commercial:
      if (variant < 40) {
        // High-rise Skyscraper
        const height = 1.6 + hash * 1.4;
        addBlock(boxGeo, mainMat, [0, height/2, 0], [0.7, height, 0.7]);
        
        // Stack windows
        const windowLayers = Math.floor(height * 3);
        for(let i=0; i<windowLayers; i++) {
          addWindow([0, 0.2 + i*0.3, 0], [0.72, 0.12, 0.72]);
        }
        addBlock(boxGeo, accentMat, [0, height + 0.1, 0], [0.4, 0.2, 0.4]);
      } else if (variant < 70) {
        // Standard Shop
        addBlock(boxGeo, mainMat, [0, 0.4, 0], [0.9, 0.8, 0.8]);
        addWindow([0, 0.3, 0.41], [0.8, 0.4, 0.02]);
        
        const canopyColor = hash > 0.5 ? '#ef4444' : '#3b82f6';
        const canopyMat = new THREE.MeshStandardMaterial({color: canopyColor});
        addBlock(boxGeo, canopyMat, [0, 0.55, 0.5], [0.9, 0.08, 0.2], [Math.PI/6, 0, 0]);
      } else {
        // Corner Store
        addBlock(boxGeo, mainMat, [-0.2, 0.5, -0.2], [0.5, 1, 0.5]);
        addBlock(boxGeo, accentMat, [0.1, 0.3, 0.1], [0.7, 0.6, 0.7]);
        addWindow([0.1, 0.3, 0.46], [0.6, 0.3, 0.02]);
        addBlock(boxGeo, new THREE.MeshStandardMaterial({color: '#9ca3af'}), [0.2, 0.65, 0.2], [0.2, 0.1, 0.2]);
      }
      break;
      
    case BuildingType.Industrial:
      if (variant < 50) {
        // Factory
        addBlock(boxGeo, mainMat, [0, 0.4, 0], [0.9, 0.8, 0.8]);
        addBlock(boxGeo, roofMat, [-0.2, 0.9, 0], [0.4, 0.2, 0.8], [0, 0, Math.PI/4]);
        addBlock(boxGeo, roofMat, [0.2, 0.9, 0], [0.4, 0.2, 0.8], [0, 0, Math.PI/4]);
        
        // Smoke Stack
        addBlock(cylinderGeo, new THREE.MeshStandardMaterial({color: '#4b5563'}), [0.35, 0.5, 0.3], [0.15, 1.0, 0.15]);
        
        // Create smoke stack registry to emit particles in animate loop
        if (!isPreview) {
          smokeParticles.push({
            x: x, y: y,
            stackX: 0.35, stackY: 1.0 + groundY, stackZ: 0.3,
            particles: []
          });
        }
      } else {
        // Large Warehouse
        addBlock(boxGeo, mainMat, [-0.2, 0.3, 0], [0.5, 0.6, 0.9]);
        addBlock(cylinderGeo, accentMat, [0.25, 0.4, -0.2], [0.1, 0.8, 0.1]);
        addBlock(cylinderGeo, accentMat, [0.25, 0.4, 0.25], [0.1, 0.8, 0.1]);
        addBlock(boxGeo, new THREE.MeshStandardMaterial({color: '#6b7280'}), [0.25, 0.7, 0], [0.03, 0.03, 0.5]);
      }
      break;
      
    case BuildingType.Park:
      // Grass plane overlay
      const lawnMat = new THREE.MeshStandardMaterial({color: '#86efac', roughness: 0.9});
      addBlock(boxGeo, lawnMat, [0, 0.01, 0], [0.92, 0.02, 0.92]);
      
      if (variant < 30) {
        // Round pond/fountain base
        addBlock(cylinderGeo, new THREE.MeshStandardMaterial({color: '#cbd5e1'}), [0, 0.05, 0], [0.2, 0.08, 0.2]);
        addBlock(cylinderGeo, new THREE.MeshStandardMaterial({color: '#3b82f6', roughness: 0.1}), [0, 0.09, 0], [0.16, 0.04, 0.16]);
      }
      
      // Trees
      const treeCount = 1 + Math.floor(hash * 3);
      const positions = [[-0.23, -0.23], [0.23, 0.23], [-0.23, 0.23], [0.23, -0.23]];
      
      for(let i=0; i<treeCount; i++) {
        const pos = positions[i % positions.length];
        const scale = 0.45 + getHash(x+i, y-i) * 0.4;
        const treeColor = new THREE.Color("#166534").offsetHSL(0, 0, getHash(x, y+i)*0.25);
        
        const trunkMat = new THREE.MeshStandardMaterial({color: '#78350f'});
        const foliageMat = new THREE.MeshStandardMaterial({color: treeColor, flatShading: true});
        
        addBlock(cylinderGeo, trunkMat, [pos[0], 0.15*scale, pos[1]], [0.05*scale, 0.3*scale, 0.05*scale]);
        addBlock(coneGeo, foliageMat, [pos[0], 0.4*scale, pos[1]], [0.22*scale, 0.5*scale, 0.22*scale]);
        addBlock(coneGeo, foliageMat, [pos[0], 0.58*scale, pos[1]], [0.16*scale, 0.4*scale, 0.16*scale]);
      }
      break;
  }
  return group;
};

// Placement preview transparency model
const updatePlacementPreview = (x, y) => {
  if (selectedTool === BuildingType.None || grid[y][x].buildingType !== BuildingType.None) {
    if (previewGroup) previewGroup.visible = false;
    return;
  }
  
  if (previewGroup) scene.remove(previewGroup);
  
  const tile = groundTiles.find(t => t.userData.x === x && t.userData.y === y);
  const topY = tile ? tile.userData.topY : -0.3;
  const [wx, _, wz] = gridToWorld(x, y);
  
  previewGroup = createProceduralBuildingModel(selectedTool, x, y, BUILDINGS[selectedTool].color, topY, true);
  previewGroup.position.set(wx, 0.05, wz); // Float slightly
  scene.add(previewGroup);
};


// --- Dynamic Systems (Instanced Vehicles & Citizens) ---
const initTrafficSystem = () => {
  const maxCars = 35;
  const carGeometry = new THREE.BoxGeometry(0.32, 0.12, 0.18);
  const carMaterial = new THREE.MeshStandardMaterial({ roughness: 0.5, metalness: 0.3 });
  
  const instancedMesh = new THREE.InstancedMesh(carGeometry, carMaterial, maxCars);
  instancedMesh.castShadow = true;
  scene.add(instancedMesh);
  
  carSystem = {
    mesh: instancedMesh,
    maxCount: maxCars,
    roadNodes: [],
    cars: []
  };
};

const updateTrafficSystem = () => {
  if (!carSystem || carSystem.roadNodes.length < 2) {
    carSystem.mesh.visible = false;
    return;
  }
  carSystem.mesh.visible = true;
  
  const dummy = new THREE.Object3D();
  const nodes = carSystem.roadNodes;
  
  // Replenish cars state
  if (carSystem.cars.length === 0) {
    for(let i=0; i<carSystem.maxCount; i++) {
      const start = nodes[Math.floor(Math.random() * nodes.length)];
      const color = new THREE.Color(carColors[Math.floor(Math.random() * carColors.length)]);
      carSystem.cars.push({
        curX: start.x, curY: start.y,
        tarX: start.x, tarY: start.y,
        progress: 1.0,
        speed: getRandomRange(0.012, 0.026),
        color: color
      });
      carSystem.mesh.setColorAt(i, color);
    }
    carSystem.mesh.instanceColor.needsUpdate = true;
  }
  
  for(let i=0; i<carSystem.maxCount; i++) {
    const car = carSystem.cars[i];
    car.progress += car.speed;
    
    if (car.progress >= 1.0) {
      car.curX = car.tarX;
      car.curY = car.tarY;
      car.progress = 0.0;
      
      // Filter next road tiles
      const neighbors = nodes.filter(n => 
        (Math.abs(n.x - car.curX) === 1 && n.y === car.curY) ||
        (Math.abs(n.y - car.curY) === 1 && n.x === car.curX)
      );
      
      if (neighbors.length > 0) {
        car.tarX = neighbors[Math.floor(Math.random() * neighbors.length)].x;
        car.tarY = neighbors[Math.floor(Math.random() * neighbors.length)].y;
      } else {
        // Respawn if stuck
        const rand = nodes[Math.floor(Math.random() * nodes.length)];
        car.curX = rand.x; car.curY = rand.y;
        car.tarX = rand.x; car.tarY = rand.y;
      }
    }
    
    // Lerp positions
    const gx = THREE.MathUtils.lerp(car.curX, car.tarX, car.progress);
    const gy = THREE.MathUtils.lerp(car.curY, car.tarY, car.progress);
    
    // Offset driving lane
    const dx = car.tarX - car.curX;
    const dy = car.tarY - car.curY;
    const angle = Math.atan2(dy, dx);
    const len = Math.sqrt(dx*dx + dy*dy) || 1;
    const offX = (-dy / len) * 0.15;
    const offY = (dx / len) * 0.15;
    
    const [wx, _, wz] = gridToWorld(gx + offX, gy + offY);
    dummy.position.set(wx, -0.3 + 0.06, wz);
    dummy.rotation.set(0, -angle, 0);
    dummy.updateMatrix();
    carSystem.mesh.setMatrixAt(i, dummy.matrix);
  }
  
  carSystem.mesh.instanceMatrix.needsUpdate = true;
};

const carColors = ['#ef4444', '#3b82f6', '#eab308', '#ffffff', '#1e293b', '#f97316'];

const initCitizenSystem = () => {
  const maxCitizens = 150;
  const pGeometry = new THREE.BoxGeometry(0.06, 0.16, 0.06);
  const pMaterial = new THREE.MeshStandardMaterial({ roughness: 0.8 });
  
  const instancedMesh = new THREE.InstancedMesh(pGeometry, pMaterial, maxCitizens);
  instancedMesh.castShadow = true;
  scene.add(instancedMesh);
  
  citizenSystem = {
    mesh: instancedMesh,
    maxCount: maxCitizens,
    activeCount: 0,
    agents: []
  };
};

const updateCitizenSystem = (time) => {
  if (!citizenSystem || citizenSystem.activeCount === 0) {
    citizenSystem.mesh.visible = false;
    return;
  }
  citizenSystem.mesh.visible = true;
  
  const dummy = new THREE.Object3D();
  
  // Find walkable tiles (Roads, Parks, and Empty Green tiles)
  const walkable = [];
  grid.forEach(row => row.forEach(tile => {
    if (tile.buildingType === BuildingType.Road || tile.buildingType === BuildingType.Park || tile.buildingType === BuildingType.None) {
      walkable.push({x: tile.x, y: tile.y});
    }
  }));
  
  if (walkable.length === 0) return;
  
  const agents = citizenSystem.agents;
  const clothesColors = ['#f87171', '#60a5fa', '#34d399', '#facc15', '#a78bfa', '#f472b6', '#ffffff'];
  
  // Populate agents up to activeCount
  while (agents.length < citizenSystem.activeCount) {
    const node = walkable[Math.floor(Math.random() * walkable.length)];
    const x = node.x + getRandomRange(-0.4, 0.4);
    const y = node.y + getRandomRange(-0.4, 0.4);
    
    const target = walkable[Math.floor(Math.random() * walkable.length)];
    
    const color = new THREE.Color(clothesColors[Math.floor(Math.random() * clothesColors.length)]);
    agents.push({
      x, y,
      tx: target.x + getRandomRange(-0.4, 0.4),
      ty: target.y + getRandomRange(-0.4, 0.4),
      speed: getRandomRange(0.006, 0.015),
      animOffset: Math.random() * Math.PI * 2,
      color: color
    });
    citizenSystem.mesh.setColorAt(agents.length - 1, color);
  }
  citizenSystem.mesh.instanceColor.needsUpdate = true;
  
  // Shrink agent pool if population dropped
  if (agents.length > citizenSystem.activeCount) {
    agents.splice(citizenSystem.activeCount);
  }
  
  for(let i=0; i<citizenSystem.activeCount; i++) {
    const a = agents[i];
    const dx = a.tx - a.x;
    const dy = a.ty - a.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    if (dist < 0.1) {
      // Pick new target
      const node = walkable[Math.floor(Math.random() * walkable.length)];
      a.tx = node.x + getRandomRange(-0.4, 0.4);
      a.ty = node.y + getRandomRange(-0.4, 0.4);
    } else {
      a.x += (dx / dist) * a.speed;
      a.y += (dy / dist) * a.speed;
    }
    
    const [wx, _, wz] = gridToWorld(a.x, a.y);
    const bounce = Math.abs(Math.sin(time * 10 + a.animOffset)) * 0.03;
    
    dummy.position.set(wx, -0.34 + 0.08 + bounce, wz);
    dummy.rotation.set(0, -Math.atan2(dy, dx), 0);
    dummy.updateMatrix();
    citizenSystem.mesh.setMatrixAt(i, dummy.matrix);
  }
  
  // Set matrices to hidden for remainder slots
  for(let i=citizenSystem.activeCount; i<citizenSystem.maxCount; i++) {
    dummy.position.set(999, 999, 999);
    dummy.updateMatrix();
    citizenSystem.mesh.setMatrixAt(i, dummy.matrix);
  }
  
  citizenSystem.mesh.instanceMatrix.needsUpdate = true;
};

citizenSystem = {
  setTargetCount(val) {
    this.activeCount = Math.min(val, this.maxCount);
  }
};


// --- Chimney Smoke System ---
const updateSmokeParticles = () => {
  const dummy = new THREE.Object3D();
  
  smokeParticles.forEach(stack => {
    // Check if building still exists
    const tile = grid[stack.y][stack.x];
    if (tile.buildingType !== BuildingType.Industrial) {
      // Clear stack meshes
      stack.particles.forEach(p => scene.remove(p));
      stack.particles = [];
      return;
    }
    
    // Spawn new particle
    if (Math.random() < 0.06 && stack.particles.length < 5) {
      const pMat = new THREE.MeshStandardMaterial({
        color: '#d1d5db',
        transparent: true,
        opacity: 0.6,
        flatShading: true
      });
      const p = new THREE.Mesh(sphereGeo, pMat);
      const [wx, _, wz] = gridToWorld(stack.x, stack.y);
      p.position.set(
        wx + stack.stackX + getRandomRange(-0.05, 0.05),
        stack.stackY,
        wz + stack.stackZ + getRandomRange(-0.05, 0.05)
      );
      p.scale.setScalar(0.1);
      scene.add(p);
      stack.particles.push(p);
    }
    
    // Update and animate active particles
    for (let i = stack.particles.length - 1; i >= 0; i--) {
      const p = stack.particles[i];
      p.position.y += 0.008;
      p.scale.addScalar(0.003);
      p.material.opacity -= 0.006;
      
      if (p.material.opacity <= 0 || p.position.y > stack.stackY + 1.2) {
        scene.remove(p);
        p.geometry.dispose();
        p.material.dispose();
        stack.particles.splice(i, 1);
      }
    }
  });
  
  // Filter out destroyed chimney stacks
  smokeParticles = smokeParticles.filter(stack => grid[stack.y][stack.x].buildingType === BuildingType.Industrial);
};


// --- Render & Animation Loop ---
const animate = (time) => {
  requestAnimationFrame(animate);
  const delta = 0.016; // Approx 60fps delta
  const seconds = time * 0.001 || 0;
  
  if (controls) controls.update();
  
  // Clouds float
  cloudGroups.forEach(c => {
    c.mesh.position.x += c.speed * delta;
    if (c.mesh.position.x > GRID_SIZE * 1.5) {
      c.mesh.position.x = -GRID_SIZE * 1.5;
    }
  });
  
  // Birds fly
  birdGroups.forEach(b => {
    const angle = seconds * b.speed + b.offset;
    b.mesh.position.x = Math.sin(angle) * b.radiusX;
    b.mesh.position.z = Math.cos(angle) * b.radiusZ;
    b.mesh.rotation.y = -angle + Math.PI;
    // Wing flap bounce
    b.mesh.scale.y = 1 + Math.sin(seconds * 15) * 0.35;
  });
  
  // Preview hover scale bounce
  if (previewGroup && previewGroup.visible !== false) {
    previewGroup.position.y = 0.05 + Math.sin(seconds * 3.5) * 0.04;
  }
  
  // Animate dynamic systems
  if (gameStarted) {
    updateTrafficSystem();
    updateCitizenSystem(seconds);
    updateSmokeParticles();
  }
  
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
  }
};


// --- DOM Event Bindings & Initializer ---
document.addEventListener('DOMContentLoaded', () => {
  
  // Initialize default language
  currentLang = 'en';
  setupStartScreen();
  
  // Language Selector buttons
  document.getElementById('start-lang-en').addEventListener('click', () => {
    currentLang = 'en';
    document.getElementById('start-lang-en').classList.add('active');
    document.getElementById('start-lang-bm').classList.remove('active');
    setupStartScreen();
  });
  
  document.getElementById('start-lang-bm').addEventListener('click', () => {
    currentLang = 'bm';
    document.getElementById('start-lang-bm').classList.add('active');
    document.getElementById('start-lang-en').classList.remove('active');
    setupStartScreen();
  });
  
  document.getElementById('hud-lang-en').addEventListener('click', () => {
    currentLang = 'en';
    document.getElementById('hud-lang-en').classList.add('active');
    document.getElementById('hud-lang-bm').classList.remove('active');
    updateUI();
  });
  
  document.getElementById('hud-lang-bm').addEventListener('click', () => {
    currentLang = 'bm';
    document.getElementById('hud-lang-bm').classList.add('active');
    document.getElementById('hud-lang-en').classList.remove('active');
    updateUI();
  });
  
  // Penasihat AI toggle switch
  document.getElementById('advisor-toggle').addEventListener('change', (e) => {
    aiEnabled = e.target.checked;
    
    // Start Screen Badge state update
    const badge = document.getElementById('start-badge-dot');
    if (aiEnabled) {
      badge.classList.add('active');
    } else {
      badge.classList.remove('active');
    }
  });
  
  // Claim Reward button click
  document.getElementById('claim-reward-btn').addEventListener('click', handleClaimReward);
  
  // Export Save Game
  document.getElementById('export-btn').addEventListener('click', exportGame);
  document.getElementById('import-file-input').addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      importGame(e.target.files[0]);
    }
  });
  
  // Game session triggers and password screen button listeners
  const startGameSession = () => {
    gameStarted = true;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('hud-overlay').style.display = 'flex';
    
    addNewsItem({
      id: Date.now().toString(),
      text: TRANSLATIONS[currentLang].terrainComplete,
      type: 'positive'
    });
    
    updateUI();
    if (aiEnabled) {
      startGoalGenerator();
    }
    initGameLoop();
  };

  document.getElementById('btn-unlock-load').addEventListener('click', async () => {
    const pw = document.getElementById('unlock-password').value;
    const errorEl = document.getElementById('unlock-error');
    if (!pw) {
      errorEl.innerText = currentLang === 'bm' ? "Sila masukkan kata laluan." : "Please enter password.";
      errorEl.style.display = 'block';
      return;
    }
    
    try {
      const decryptedText = await decryptData(pendingStateToLoad, pw);
      const state = JSON.parse(decryptedText);
      if (!state || !state.grid || !state.stats) {
        throw new Error("Invalid state structure");
      }
      sessionPassword = pw;
      restoreGameState(state);
      startGameSession();
    } catch (err) {
      console.error("Decryption failed:", err);
      errorEl.innerText = TRANSLATIONS[currentLang].incorrectPassword;
      errorEl.style.display = 'block';
    }
  });

  document.getElementById('btn-unlock-new').addEventListener('click', () => {
    const confirmMsg = TRANSLATIONS[currentLang].overwriteWarning;
    if (confirm(confirmMsg)) {
      showStartupPanel('panel-new-game');
    }
  });

  document.getElementById('btn-unlock-import').addEventListener('click', () => {
    document.getElementById('import-file-input').click();
  });

  document.getElementById('btn-secure-load').addEventListener('click', async () => {
    const pw = document.getElementById('secure-password').value;
    const confirmPw = document.getElementById('secure-confirm').value;
    const errorEl = document.getElementById('secure-error');
    
    if (!pw || pw.length < 3) {
      errorEl.innerText = TRANSLATIONS[currentLang].passwordMismatch;
      errorEl.style.display = 'block';
      return;
    }
    if (pw !== confirmPw) {
      errorEl.innerText = TRANSLATIONS[currentLang].passwordMismatch;
      errorEl.style.display = 'block';
      return;
    }
    
    sessionPassword = pw;
    restoreGameState(pendingStateToLoad);
    await saveGameLocal();
    startGameSession();
  });

  document.getElementById('btn-secure-new').addEventListener('click', () => {
    const confirmMsg = TRANSLATIONS[currentLang].overwriteWarning;
    if (confirm(confirmMsg)) {
      showStartupPanel('panel-new-game');
    }
  });

  document.getElementById('btn-secure-import').addEventListener('click', () => {
    document.getElementById('import-file-input').click();
  });

  document.getElementById('btn-create-start').addEventListener('click', async () => {
    const pw = document.getElementById('new-password').value;
    const confirmPw = document.getElementById('new-confirm').value;
    const errorEl = document.getElementById('new-error');
    
    if (!pw || pw.length < 3) {
      errorEl.innerText = TRANSLATIONS[currentLang].passwordMismatch;
      errorEl.style.display = 'block';
      return;
    }
    if (pw !== confirmPw) {
      errorEl.innerText = TRANSLATIONS[currentLang].passwordMismatch;
      errorEl.style.display = 'block';
      return;
    }
    
    sessionPassword = pw;
    
    // Reset stats & game grid
    stats = {
      money: INITIAL_MONEY,
      population: 0,
      day: 1,
      hour: 0,
      minute: 0
    };
    
    Object.keys(buildingGroups).forEach(key => {
      scene.remove(buildingGroups[key]);
    });
    buildingGroups = {};
    
    grid = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      const row = [];
      for (let x = 0; x < GRID_SIZE; x++) {
        row.push({ x, y, buildingType: BuildingType.None });
      }
      grid.push(row);
    }
    
    grid.forEach(row => row.forEach(tile => {
      updateTileMesh(tile.x, tile.y, tile.buildingType);
    }));
    
    newsFeed = [];
    const newsBody = document.getElementById('news-body');
    if (newsBody) {
      newsBody.innerHTML = `<div class="news-item neutral">${TRANSLATIONS[currentLang].terrainComplete}</div>`;
    }
    
    await saveGameLocal();
    startGameSession();
  });

  document.getElementById('btn-new-cancel').addEventListener('click', () => {
    if (pendingStateToLoad) {
      if (pendingStateToLoad.ciphertext) {
        showStartupPanel('panel-unlock');
      } else {
        showStartupPanel('panel-secure-old');
      }
    } else {
      showStartupPanel('panel-new-game');
    }
  });

  document.getElementById('btn-new-import').addEventListener('click', () => {
    document.getElementById('import-file-input').click();
  });

  document.getElementById('btn-file-unlock-load').addEventListener('click', async () => {
    const pw = document.getElementById('file-unlock-password').value;
    const errorEl = document.getElementById('file-unlock-error');
    if (!pw) {
      errorEl.innerText = currentLang === 'bm' ? "Sila masukkan kata laluan." : "Please enter password.";
      errorEl.style.display = 'block';
      return;
    }
    
    try {
      const decryptedText = await decryptData(importedStateToLoad, pw);
      const state = JSON.parse(decryptedText);
      if (!state || !state.grid || !state.stats) {
        throw new Error("Invalid state structure");
      }
      sessionPassword = pw;
      restoreGameState(state);
      await saveGameLocal();
      startGameSession();
      addNewsItem({
        id: Date.now().toString(),
        text: currentLang === 'bm' ? "Permainan berjaya diimport!" : "Game save imported successfully!",
        type: 'positive'
      });
    } catch (err) {
      console.error("Import decryption failed:", err);
      errorEl.innerText = TRANSLATIONS[currentLang].incorrectPassword;
      errorEl.style.display = 'block';
    }
  });

  document.getElementById('btn-file-unlock-cancel').addEventListener('click', () => {
    importedStateToLoad = null;
    checkStartupSave();
  });

  document.getElementById('btn-file-secure-load').addEventListener('click', async () => {
    const pw = document.getElementById('file-secure-pw').value;
    const confirmPw = document.getElementById('file-secure-confirm').value;
    const errorEl = document.getElementById('file-secure-error');
    
    if (!pw || pw.length < 3) {
      errorEl.innerText = TRANSLATIONS[currentLang].passwordMismatch;
      errorEl.style.display = 'block';
      return;
    }
    if (pw !== confirmPw) {
      errorEl.innerText = TRANSLATIONS[currentLang].passwordMismatch;
      errorEl.style.display = 'block';
      return;
    }
    
    sessionPassword = pw;
    restoreGameState(importedStateToLoad);
    await saveGameLocal();
    startGameSession();
    addNewsItem({
      id: Date.now().toString(),
      text: currentLang === 'bm' ? "Permainan berjaya diimport!" : "Game save imported successfully!",
      type: 'positive'
    });
  });

  document.getElementById('btn-file-secure-cancel').addEventListener('click', () => {
    importedStateToLoad = null;
    checkStartupSave();
  });
  
  // Bind Toolbar Buttons
  Object.keys(BUILDINGS).forEach(type => {
    const btn = document.getElementById(`tool-btn-${type}`);
    if (!btn) return;
    
    btn.addEventListener('click', () => {
      selectedTool = type;
      updateUI();
      
      // Update preview model
      if (hoveredTile) {
        updatePlacementPreview(hoveredTile.x, hoveredTile.y);
      }
    });
  });
  
  // Camera Zoom Handlers
  const zoomIn = () => {
    camera.zoom = Math.min(5.0, camera.zoom * 1.25);
    camera.updateProjectionMatrix();
    controls.update();
  };
  
  const zoomOut = () => {
    camera.zoom = Math.max(0.2, camera.zoom * 0.8);
    camera.updateProjectionMatrix();
    controls.update();
  };
  
  const resetCamera = () => {
    camera.zoom = 1.0;
    camera.position.set(20, 20, 20);
    controls.target.set(0, 0, 0);
    camera.updateProjectionMatrix();
    controls.update();
  };
  
  document.getElementById('zoom-in-btn').addEventListener('click', zoomIn);
  document.getElementById('zoom-out-btn').addEventListener('click', zoomOut);
  document.getElementById('zoom-reset-btn').addEventListener('click', resetCamera);
  
  // Initialize ThreeJS scene
  init3D();
});
