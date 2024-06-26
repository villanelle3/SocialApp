function handleTweetFormError(msg, display){
    var myErrorDiv = document.getElementById("tweet-create-form-error")
    if (display===true){
        // show error
        myErrorDiv.setAttribute("class", "d-block alert alert-danger")
        myErrorDiv.innerText = msg
    }else{
        // hide error
        myErrorDiv.setAttribute("class", "d-none alert alert-danger")
    }
}

function handleFormDidSubmit(event){
    event.preventDefault();
    const myForm = event.target;
    const myFormData = new FormData(myForm);
    const endPoint = myForm.getAttribute("action");
    const method = myForm.getAttribute("method");
    const xhr = new XMLHttpRequest();
    const responseType = "json";

    xhr.responseType = responseType;
    xhr.open(method, endPoint);
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH", "XMLHttpRequest");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xhr.onload = function() {
        if (xhr.status === 201){
            handleTweetFormError("", false)
            const newTweetJson = xhr.response;
            const newTweetElement = formatTweet(newTweetJson);
            tweetsContainerElement.insertAdjacentHTML('afterbegin', newTweetElement);
            myForm.reset();
        }else if(xhr.status === 400){
            const errorJson = xhr.response
            const contentError = errorJson.content
            let contentErrorMsg;
            if(contentError){
                contentErrorMsg = contentError[0]
                if(contentErrorMsg){
                    handleTweetFormError(contentErrorMsg, true)
                }else{
                    alert("An error  occurred. Please, try again later")
                }
            }
            // alert(contentErrorMsg)
        }else if(xhr.status === 500){
            alert("There was a server error. Please, try again later")
        }
    };
    xhr.onerror = function(){
        alert("An error  occurred. Please, try again later")
    }
    xhr.send(myFormData);
}

const tweetCreateFormEl = document.getElementById("tweet-create-form");
tweetCreateFormEl.addEventListener("submit", handleFormDidSubmit);

const tweetsContainerElement = document.getElementById("tweets");

function loadTweets(tweetElement){
    const xhr = new XMLHttpRequest();
    const method = "GET";
    const url = "/tweets";
    const responseType = "json";

    xhr.responseType = responseType;
    xhr.open(method, url);
    xhr.onload = function() {
        const serverResponse = xhr.response;
        const listedItems = serverResponse.response;
        let finalTweetStr = "";
        for (let i = 0; i < listedItems.length; i++){
            var currentItem = formatTweet(listedItems[i]);
            finalTweetStr += currentItem;
        }
        tweetElement.innerHTML = finalTweetStr; // Define o HTML após o loop
    };
    xhr.send();
}

loadTweets(tweetsContainerElement);

// Função para manipular o botão de curtir
function handleDidLike(tweet_id, current_count){
    alert(tweet_id);
}

// Função para formatar o tweet
function formatTweet(tweet){
    return "<div class='col-12 col-md-10 mx-auto border rounded py-3 mb-4 tweet' id='tweet-" + tweet.id + "'>" +
            "<p>" + tweet.content + "</p>" + "<div>" + likeBtn(tweet) + "</div></div>";
}

// Função para criar o botão de curtir
function likeBtn(tweet){
    return "<button class='btn btn-primary btn-sm' onclick='handleDidLike("+tweet.id+", "+tweet.likes+")'>"+tweet.likes+" Likes</button>";
}
