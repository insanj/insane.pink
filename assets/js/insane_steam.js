let insane_updatableDivContents = '<a title="ONLINE 🔴 on Steam right now playing Rainbow Six Siege! Click to access Steam profile and play with me." id="steam__status" style="color:rgba(231,120,10,1); display:none" href="https://steamcommunity.com/id/insanj/">🎮 Playing Siege Right Now 🎮</a>';

function insane_buildSteamProfileURL(steam_apiKey, steam_steamId) {
	return "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+steam_apiKey+"&steamids="+steam_steamId;
}

function insane_getSteamProfile(steam_apiKey, steam_steamId, steam_profileCompletion) {
	let apiURL = insane_buildSteamProfileURL(steam_apiKey, steam_steamId);
	$.getJSON(apiURL, function (data) {
		if (data == null || data["response"] == null || data["response"]["players"] == null) {
			steam_profileCompletion(null);
		} else {
			let steamPlayers = data["response"]["players"];
			if (steamPlayers.length <= 0) {
				steam_profileCompletion(null);
			} else {
				let steamFirstPlayer = steamPlayers[0];
				steam_profileCompletion(steamFirstPlayer);
			}
		}
	});
}

function insane_getSteamProfileLastOnlineMetadata(steam_apiKey, steam_steamId, steam_profileMetadataCompletion) {
	insane_getSteamProfile(steam_apiKey, steam_steamId, function (steam_profileResponse) {
		if (steam_profileResponse != null) {
			let steam_isOnline = steam_profileResponse["personastate"] == "1";
			let steam_currentGame = steam_profileResponse["gameextrainfo"];
			let steam_profileURL = steam_profileResponse["profileurl"];
			steam_profileMetadataCompletion(steam_isOnline, steam_currentGame, steam_profileURL);
		} else {
			steam_profileMetadataCompletion(null, null, null);
		}
	});
}

function insane_generateDivFromLastOnlineMetadata(steam_last_isOnline, steam_last_currentGame, steam_last_profileURL) {
	return "<div class='steamlastonline'>" + steam_last_currentGame + "</div>";
}

function insane_updateLastOnlineMetadataDiv(steam_updatedDiv) {
	$(insane_updatableDivId).replaceWith(steam_updatedDiv);
}

/////

function insane_steamTestRuntime() {
	console.log("insane_steamTestRuntime...");
	insane_getSteamProfileLastOnlineMetadata(steam_creds_apiKey, steam_creds_steamId, function (s_isOnline, s_currentGame, s_profileURL) {
		console.log("insane_getSteamProfileLastOnlineMetadata: " + s_isOnline + s_currentGame + s_profileURL);
	});
}

$(".header").ready(function() {
	console.log("ready...");

	insane_getSteamProfileLastOnlineMetadata(steam_creds_apiKey, steam_creds_steamId, function (s_isOnline, s_currentGame, s_profileURL) {
		console.log("insane_getSteamProfileLastOnlineMetadata: " + s_isOnline + s_currentGame + s_profileURL);

		if (s_isOnline === true && s_currentGame.includes("Rainbow Six Siege")) {
			$(".header").append(insane_updatableDivContents);
		}
	});
});