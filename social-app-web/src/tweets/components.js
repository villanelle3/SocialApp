import React, {useState} from "react";
import { TweetsList } from "./list";
import { TweetCreate } from "./create";

export function TweetsComponent(props){
    const [newTweets, setNewTweets] = useState([])

    const canTweet = props.canTweet === "false" ? false : true

    const handleNewTweet = (newTweet) =>{
        // backend api response handler
        const tempNewTweets = [...newTweets];
        tempNewTweets.unshift(newTweet)
        setNewTweets(tempNewTweets)
    }
    
    return (
        <div className={props.className}>
            {canTweet === true && <TweetCreate didTweet={handleNewTweet} className="col-12 mb-3"/>}
            <TweetsList newTweets={newTweets} {...props} />
        </div>
    )
}