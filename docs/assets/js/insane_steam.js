function insane_buildSteamProfileURL(steam_apiKey, steam_steamId) {
	return "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key="+steam_apiKey+"&steamids="+steam_steamId;
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

$("body").ready(function() {
	insane_getSteamProfileLastOnlineMetadata(steam_creds_apiKey, steam_creds_steamId, function (s_isOnline, s_currentGame, s_profileURL) {
		if (s_isOnline === true && s_currentGame != null && s_currentGame.includes("Rainbow Six Siege")) {
			console.log("🎉 insane.jpg is online on Steam! showing banner...");
		    var cookieAlert = document.querySelector(".cookiealert");
		    cookieAlert.offsetHeight; // Force browser to trigger reflow (https://stackoverflow.com/a/39451131)
		    cookieAlert.classList.add("show");
		}
	}); 
});