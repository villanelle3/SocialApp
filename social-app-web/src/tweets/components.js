import React, {useEffect, useState} from "react";
import {loadTweets} from "../lookup"

export function TweetsList(props){
    const [tweets, setTweets] = useState([])
    useEffect(() => {
        const myCallback = (response, status) => {
            if (status===200){
            setTweets(response)
            }else{
            alert("There was an error")
            }
        }
        loadTweets(myCallback)
        }, [])
        return(
        tweets.map((item, index) => (
            <Tweet tweet={item} key={index} className="my-5 py-5 bg-white text-dark"/>
        ))
        )
}

export function ActionBtn(props){
    const {tweet, action} = props;

    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0);
    const [userLike, setUserLike] = useState(tweet.userLike === true ? true : false)

    const className = props.className ? props.className : "btn btn-primary btn-sm";
    const actionDisplay = action.display ? action.display : "Action";

    const handleClick = (event) => {
        event.preventDefault();
        if (action.type === "Like"){
            if (userLike){
                setLikes(likes - 1);
                setUserLike(false);
            }else{
                setLikes(likes + 1);
                setUserLike(true);
            }
        }
    };
    
    const display = action.type === "Like" ? `${likes} ${actionDisplay}` : actionDisplay;
    
    return <button className={className} onClick={handleClick}> {display} </button>;
}

export function Tweet(props){
    const {tweet} = props
    const className = props.className ? props.className : "col-10 mx-auto col-md-6"
    return <div className={className}>
        <p>{tweet.content}</p>
        <div className="btn btn-group">
            <ActionBtn tweet={tweet} action={{type:"Like", display:"Likes"}}/>
            <ActionBtn tweet={tweet} action={{type:"unlike", display:"Unlike"}}/>
            <ActionBtn tweet={tweet} action={{type:"retweet", display:"Retweet"}}/>
        </div>
    </div>
}

