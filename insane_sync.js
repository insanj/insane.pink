"use strict";

function writeNewPostFile(data, filename) {
	var filepath = '_posts/' + filename;
	var fs = require('fs');
	fs.writeFile(filepath, data, function(err, data){
	    if (err) console.log("insane_sync writeNewPostFile:" + err);
	    console.log("insane_sync writeNewPostFile: Successfully Written to File.");
	});
}

function composePostFromYoutubeDiv(youtubeDiv) {
	let templateString = "---\nlayout: post\ntitle: <TITLE>\ndate: <DATE>\nimage: <IMAGE>\nyoutube_url: <URL>\n---\n\n<DESCRIPTION>";
	var youtubeComposedString = templateString.replace("<TITLE>", youtubeDiv.youtubeVideoName);
	youtubeComposedString = youtubeComposedString.replace("<DATE>", youtubeDiv.youtubeVideoDate);
	youtubeComposedString = youtubeComposedString.replace("<IMAGE>", youtubeDiv.youtubeVideoThumbnailURL);
	youtubeComposedString = youtubeComposedString.replace("<URL>", youtubeDiv.youtubeVideoURL);
	youtubeComposedString = youtubeComposedString.replace("<DESCRIPTION>", youtubeDiv.youtubeVideoDescription);
	return youtubeComposedString;
}

function composePostFilenameFromYoutubeDiv(youtubeDiv) {
	var strippedTitleElements = youtubeDiv.youtubeVideoName.toLowerCase().split(" ");
	var strippedTitleReplacement = "";
	for (var i = 0; i < 6; i++) {
		strippedTitleReplacement += "-" + strippedTitleElements[i];
	}
	var composedFilename = youtubeDiv.youtubeVideoDate + strippedTitleReplacement + ".markdown";
	return composedFilename;
}

function writeNewPostFileFromYoutubeDiv(youtubeDiv) {
	var composedPostFilename = composePostFilenameFromYoutubeDiv(youtubeDiv);
	var composedPostString = composePostFromYoutubeDiv(youtubeDiv);
	writeNewPostFile(composedPostString, composedPostFilename);
}

function getYoutubeVideosFromInternet(limit, completion) {
	// let youtubeChannelDetailsURL = "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=insanj&key=AIzaSyBqtpFKMmzVplgamkwVSS5-troG3qEn4VA";\
	// 	let channelPlaylistId = data["items"][0]["id"];
	let youtubeChannelVideosURL = "https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UU2Oy-7hKqxLI1w_b_kfUgYA&key=AIzaSyBqtpFKMmzVplgamkwVSS5-troG3qEn4VA&fields=items&part=snippet&maxResults=" + limit;
	let youtubeChannelVideosPath = "/youtube/v3/playlistItems?playlistId=UU2Oy-7hKqxLI1w_b_kfUgYA&key=AIzaSyBqtpFKMmzVplgamkwVSS5-troG3qEn4VA&fields=items&part=snippet&maxResults=" + limit;
	console.log("Going to " + youtubeChannelVideosURL);

	var https = require('https');

    var completeData = '';
	var httpReq = https.request({
		host: "www.googleapis.com",
		path: youtubeChannelVideosPath,
		method: "GET",
	}, function(res) {
		  res.setEncoding('utf8');
		  res.on('data', function (data) {
		  	completeData += data;
			console.log("data = " + data);
		  });
		  res.on('end', function () {
		  	let jsonData = JSON.parse(completeData);
		  	let youtubeVideos = jsonData["items"];
			var youtubeDivs = [];
			for (var i = 0; i < youtubeVideos.length; i++) {
				var val = youtubeVideos[i];
				var youtubeVideoSnippet = val["snippet"];
				var	youtubeVideoId = youtubeVideoSnippet["resourceId"]["videoId"];
				var youtubeDiv = {
					youtubeVideoName: youtubeVideoSnippet["title"],
					youtubeVideoURL: "https://youtube.com/watch?v=" + youtubeVideoId,
					youtubeVideoThumbnailURL: youtubeVideoSnippet["thumbnails"]["maxres"]["url"],
					youtubeVideoDescription: youtubeVideoSnippet["description"].split("\n")[0],
					youtubeVideoDate: youtubeVideoSnippet["publishedAt"].split("T")[0]
				};
				
				youtubeDivs.push(youtubeDiv);
			}

			completion(youtubeDivs);
		  })
	});

	httpReq.on('uncaughtException', function (err) {
	    console.log(err);
	}); 

	httpReq.on('error', function(e) {
  		console.log('problem with request: ' + e.message);
	});

	httpReq.end();
}

function writeLatestYoutubeDivToFile() {
	getYoutubeVideosFromInternet(1, function(youtubeDivs) {
		writeNewPostFileFromYoutubeDiv(youtubeDivs[0]);
	});
}

console.log("Let's begin!");
writeLatestYoutubeDivToFile();