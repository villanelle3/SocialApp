import React from "react";
import {apiTweetAction} from "./lookup"

export function ActionBtn(props){
    const {tweet, action, didPeformAction} = props;
    const likes = tweet.likes ? tweet.likes : 0

    const className = props.className ? props.className : "btn btn-primary btn-sm";
    const actionDisplay = action.display ? action.display : "Action";

    const handleActionBackendEvent = (response, status) =>{
        if((status === 200 || status === 201) && didPeformAction){
            didPeformAction(response, status)
        }
    }

    const handleClick = (event) => {
        event.preventDefault();
        apiTweetAction(tweet.id, action.type, handleActionBackendEvent)  
    };
    
    const display = action.type === "Like" ? `${likes} ${actionDisplay}` : actionDisplay;
    
    return <button className={className} onClick={handleClick}> {display} </button>;
}