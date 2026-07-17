/**
 * SkyMetropolis Google Sheets Backend Script
 * 
 * Instructions:
 * 1. Create a Google Sheet.
 * 2. Click Extensions > Apps Script.
 * 3. Delete any default code and paste this script.
 * 4. Save the project (Ctrl+S / Cmd+S).
 * 5. Click Deploy > New deployment.
 * 6. Select "Web app" as the type.
 * 7. Set "Execute as" to "Me" and "Who has access" to "Anyone".
 * 8. Click Deploy, authorize permissions, and copy the Web App URL.
 * 9. Paste the Web App URL into your SkyMetropolis cloud settings.
 */

function doGet(e) {
  try {
    var action = e.parameter.action;
    if (action === "getLeaderboard") {
      return handleGetLeaderboard();
    } else {
      return jsonResponse({ status: "error", message: "Unknown GET action: " + action });
    }
  } catch (error) {
    return jsonResponse({ status: "error", message: error.toString() });
  }
}

function doPost(e) {
  try {
    if (!e.postData || !e.postData.contents) {
      return jsonResponse({ status: "error", message: "No post data found" });
    }
    
    var params = JSON.parse(e.postData.contents);
    var action = params.action;
    
    if (action === "save") {
      return handleSave(params);
    } else if (action === "getSave") {
      return handleGetSave(params);
    } else {
      return jsonResponse({ status: "error", message: "Unknown POST action: " + action });
    }
  } catch (error) {
    return jsonResponse({ status: "error", message: error.toString() });
  }
}

// Helpers
function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("SkyMetropolisSaves");
  if (!sheet) {
    sheet = ss.insertSheet("SkyMetropolisSaves");
    sheet.appendRow(["Username", "PasswordHash", "SaveData", "Population", "Money", "Timestamp"]);
    sheet.setFrozenRows(1);
    
    // Auto-adjust column widths
    sheet.setColumnWidth(1, 150); // Username
    sheet.setColumnWidth(2, 200); // PasswordHash
    sheet.setColumnWidth(3, 300); // SaveData (large payload)
    sheet.setColumnWidth(4, 100); // Population
    sheet.setColumnWidth(5, 100); // Money
    sheet.setColumnWidth(6, 150); // Timestamp
  }
  return sheet;
}

// Actions
function handleSave(params) {
  var username = params.username;
  var passwordHash = params.passwordHash;
  var saveData = typeof params.saveData === "string" ? params.saveData : JSON.stringify(params.saveData);
  var population = Number(params.population || 0);
  var money = Number(params.money || 0);
  var timestamp = Number(params.timestamp || Date.now());
  
  if (!username || !passwordHash || !saveData) {
    return jsonResponse({ status: "error", message: "Missing required parameters: username, passwordHash, and saveData are required." });
  }
  
  // Enforce username validation
  username = username.trim();
  if (username.length < 3) {
    return jsonResponse({ status: "error", message: "Username must be at least 3 characters." });
  }
  
  var sheet = getOrCreateSheet();
  var data = sheet.getDataRange().getValues();
  var foundRowIndex = -1;
  
  // Find row by Username (case-insensitive)
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] && data[i][0].toString().toLowerCase() === username.toLowerCase()) {
      foundRowIndex = i + 1; // Apps Script sheet rows are 1-indexed
      break;
    }
  }
  
  if (foundRowIndex !== -1) {
    // Row exists. Verify password hash matches
    var storedHash = data[foundRowIndex - 1][1];
    if (storedHash !== passwordHash) {
      return jsonResponse({ status: "auth_error", message: "Username is already registered. Password mismatch." });
    }
    
    // Compare timestamps to prevent older client saves from overwriting newer cloud progress
    var storedTimestamp = Number(data[foundRowIndex - 1][5] || 0);
    if (storedTimestamp > timestamp) {
      return jsonResponse({
        status: "conflict",
        message: "Cloud save is newer than incoming save.",
        cloudSave: {
          saveData: JSON.parse(data[foundRowIndex - 1][2]),
          timestamp: storedTimestamp,
          population: Number(data[foundRowIndex - 1][3] || 0),
          money: Number(data[foundRowIndex - 1][4] || 0)
        }
      });
    }
    
    // Update existing row (Columns: A=1, B=2, C=3, D=4, E=5, F=6)
    sheet.getRange(foundRowIndex, 3).setValue(saveData); // SaveData
    sheet.getRange(foundRowIndex, 4).setValue(population); // Population
    sheet.getRange(foundRowIndex, 5).setValue(money); // Money
    sheet.getRange(foundRowIndex, 6).setValue(timestamp); // Timestamp
  } else {
    // New registration
    sheet.appendRow([username, passwordHash, saveData, population, money, timestamp]);
  }
  
  return jsonResponse({ status: "success", message: "Saved successfully!" });
}

function handleGetSave(params) {
  var username = params.username;
  var passwordHash = params.passwordHash;
  
  if (!username || !passwordHash) {
    return jsonResponse({ status: "error", message: "Username and password hash are required to fetch a save." });
  }
  
  username = username.trim();
  
  var sheet = getOrCreateSheet();
  var data = sheet.getDataRange().getValues();
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0] && data[i][0].toString().toLowerCase() === username.toLowerCase()) {
      var storedHash = data[i][1];
      if (storedHash !== passwordHash) {
        return jsonResponse({ status: "auth_error", message: "Incorrect password." });
      }
      
      var saveData = data[i][2];
      try {
        saveData = JSON.parse(saveData);
      } catch (err) {
        // Keep as string if it's already string
      }
      
      return jsonResponse({
        status: "success",
        saveData: saveData,
        timestamp: Number(data[i][5] || 0)
      });
    }
  }
  
  return jsonResponse({ status: "not_found", message: "Username not registered in the cloud." });
}

function handleGetLeaderboard() {
  var sheet = getOrCreateSheet();
  var data = sheet.getDataRange().getValues();
  var players = [];
  
  for (var i = 1; i < data.length; i++) {
    if (data[i][0]) { // Ensure username exists
      players.push({
        username: data[i][0],
        population: Number(data[i][3] || 0),
        money: Number(data[i][4] || 0),
        timestamp: Number(data[i][5] || Date.now())
      });
    }
  }
  
  // Sort descending by population, secondary sort descending by money
  players.sort(function(a, b) {
    if (b.population !== a.population) {
      return b.population - a.population;
    }
    return b.money - a.money;
  });
  
  // Slice top 10
  var top10 = players.slice(0, 10);
  
  return jsonResponse({
    status: "success",
    leaderboard: top10
  });
}
