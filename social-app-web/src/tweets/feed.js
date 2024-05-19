import React, {useEffect, useState} from "react";
import {apiTweetFeed} from "./lookup";
import { Tweet } from "./detail";

export function FeedList(props){
    const [tweetsInit, setTweetsInit] = useState(props.newTweets ? props.newTweets : []);
    const [tweets, setTweets] = useState([]);
    const [nextURL, setNextURL] = useState(null);
    const [tweetsDidSet, setTweetsDidSet] = useState(false);

    useEffect(() => {
        const final = [...props.newTweets].concat(tweetsInit);
        if(final.length !== tweets.length){
            setTweets(final);
        }
    }, [props.newTweets, tweets, tweetsInit]);

    useEffect(() => {
        if (tweetsDidSet === false){
            const handleTweetListLookup = (response, status) => {
                if (status === 200) {
                    // const finalTweetsInit = [...response].concat(tweetsInit)
                    setNextURL(response.next)
                    setTweetsInit(response.results);
                    setTweetsDidSet(true)
                }
            };
            apiTweetFeed(handleTweetListLookup);
        }
        
    }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username]);

    const handleDidRetweet = (newTweet) =>{
        const updateTweetsInit = [...tweetsInit]
        updateTweetsInit.unshift(newTweet)
        setTweetsInit(updateTweetsInit)

        const updateFinalTweets = [...tweets]
        updateFinalTweets.unshift(tweets)
        setTweets(updateFinalTweets)
    }
    const handleLoadNext = (event) =>{
        event.preventDefault()
        if(nextURL !== null){
            const handleLoadNextResponse = (response, status) => {
                    if (status === 200) {
                        setNextURL(response.next)
                        const newTweets = [...tweets].concat(response.results)
                        setTweetsInit(newTweets);
                        setTweets(newTweets);
                    }
            }
            apiTweetFeed(handleLoadNextResponse, nextURL)
        }
    }

    return (
        <React.Fragment>
            {tweets.map((item, index) => (
            <Tweet 
                tweet={item} 
                didRtweet = {handleDidRetweet}
                key={index} 
                className="my-5 py-5 bg-white text-dark"
            />
            ))}
            {nextURL !== null && <button onClick={handleLoadNext} className="btn btn-outline-primary">Next</button>}
        </React.Fragment> 
    );
}
