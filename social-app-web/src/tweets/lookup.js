import { backendLookup } from "../lookup"

export function apiTweetCreate(newTweet, callback){
    backendLookup("POST", "create-tweet/", callback, {content: newTweet})
} 

export function apiTweetFeed(callback, nextUrl){
    let endpoint = "api/tweets/feed/"
    if(nextUrl !== null && nextUrl !== undefined){
        endpoint = nextUrl.replace("http://localhost:8000/", "")
    }
    backendLookup("GET", endpoint, callback)
}

export function apiTweetList(username, callback, nextUrl){
    let endpoint = "tweets/"
    if(username){
        //http://127.0.0.1:8000/julia
        endpoint = `tweets/?username=${username}`
    }
    if(nextUrl !== null && nextUrl !== undefined){
        endpoint = nextUrl.replace("http://localhost:8000/", "")
    }
    backendLookup("GET", endpoint, callback)
}

export function apiTweetDetail(tweetId, callback){
    backendLookup("GET", `tweets/${tweetId}/`, callback)
}

export function apiTweetAction(tweetId, action, callback){
    const data = {id: tweetId, action: action};
    backendLookup("POST", "api/tweets/action/", callback, data)
}
