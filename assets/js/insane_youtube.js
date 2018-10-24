

function composeInsaneDiv(postTitle, youtubeLink, thumbnailSrc, contentText) {
	let compose_articleDiv = '<article class="posts__post" itemprop="blogPost" itemscope itemtype="http://schema.org/BlogPosting">';
	let compose_headerLink = '<a class="posts__link" href="' + youtubeLink + '" itemprop="url">';
	let compose_img  = '<figure class="posts__img"> <img src="' + thumbnailSrc + '" alt="' + postTitle + '" data-aos="fade-in" itemprop="image"/></figure>';
	let compose_contentDiv = '<div><h2 class="posts__text"><strong itemprop="name">' + postTitle + '</strong> — ';
	let compose_bodyDiv = '<span itemprop="description">' + contentText + '</span></h2></div></a></article>';
	let composedDiv = compose_articleDiv + compose_headerLink + compose_img + compose_contentDiv + compose_bodyDiv;
	return composedDiv;
}

function renderInsaneDiv(insaneDiv) {
	$(".posts__container").append(insaneDiv);
}

// let youtubeChannelDetailsURL = "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=insanj&key=AIzaSyBqtpFKMmzVplgamkwVSS5-troG3qEn4VA";\
// 	let channelPlaylistId = data["items"][0]["id"];
let youtubeChannelVideosURL = "https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UU2Oy-7hKqxLI1w_b_kfUgYA&key=AIzaSyBqtpFKMmzVplgamkwVSS5-troG3qEn4VA&fields=items&part=snippet&maxResults=6";

$.getJSON(youtubeChannelVideosURL, function (data) {
	let youtubeVideos = data["items"];
	$.each(youtubeVideos, function(i,val) {
		let youtubeVideoSnippet = val["snippet"];
		let youtubeVideoName = youtubeVideoSnippet["title"];
		let youtubeVideoId = youtubeVideoSnippet["resourceId"]["videoId"];
		let youtubeVideoURL = "https://youtube.com/watch?v=" + youtubeVideoId;
		let youtubeVideoThumbnailURL = youtubeVideoSnippet["thumbnails"]["default"]["url"];
		let youtubeVideoDescription = youtubeVideoSnippet["description"].split("\n")[0];
		
		let youtubeDiv = composeInsaneDiv(youtubeVideoName, youtubeVideoURL, youtubeVideoThumbnailURL, youtubeVideoDescription);
		renderInsaneDiv(youtubeDiv);
	});
});

