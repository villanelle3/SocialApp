const tweetElement = document.getElementById("tweets"); // Get HTML element
// tweetElement.innerHTML = "Loading..."   // Set HTML in that element

const xhr = new XMLHttpRequest();
const method = "GET";
const url = "/tweets";
const responseType = "json";

function handleDidLike(tweet_id, current_count) {
    alert(tweet_id);
}

function likeBtn(tweet) {
    return "<button class='btn btn-primary btn-sm' onclick='handleDidLike(" + tweet.id + ", " + tweet.likes + ")'>" + tweet.likes + " Likes</button>";
}

function formatTweet(tweet) {
    var formatedTweet = "<div class='mb-4 tweet' id='tweet-" + tweet.id + "'>" +
        "<p>" + tweet.content + "</p>" + "<div>" + likeBtn(tweet) + "</div></div>";
    return formatedTweet;
}

xhr.responseType = responseType;
xhr.open(method, url);
xhr.onload = function () {
    // console.log(xhr.response);
    const serverResponse = xhr.response;
    const listedItems = serverResponse.response;
    let finalTweetStr = "";
    var i;
    for (i = 0; i < listedItems.length; i++) {
        console.log(listedItems[i]);
        var currentItem = formatTweet(listedItems[i]);
        finalTweetStr += currentItem;
        tweetElement.innerHTML = finalTweetStr;
    }
};
xhr.send();
