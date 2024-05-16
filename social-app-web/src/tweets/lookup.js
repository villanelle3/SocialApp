import { backendLookup } from "../lookup"

export function apiTweetCreate(newTweet, callback){
    backendLookup("POST", "create-tweet", callback, {content: newTweet})
} 

export function apiTweetList(callback){
    backendLookup("GET", "tweets", callback)
}