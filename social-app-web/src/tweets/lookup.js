import { backendLookup } from "../lookup"

export function apiTweetCreate(newTweet, callback){
    backendLookup("POST", "create-tweet", callback, {content: newTweet})
} 

export function apiTweetList(callback){
    backendLookup("GET", "tweets", callback)
}

export function apiTweetAction(tweetId, action, callback){
    const data = {id: tweetId, action: action};
    backendLookup("POST", "api/tweets/action", callback, data)
}
