import React, {useEffect, useState} from "react";
import {loadTweets} from "../lookup"

export function TweetsComponent(props){
    const textAreaRef = React.createRef()
    const [newTweets, setNewTweets] = useState([])
    const handleSubmit = (event) =>{
        event.preventDefault();
        const newVal = textAreaRef.current.value;
        const tempNewTweets = [...newTweets];
        // push -> final da lista
        // unshift -> inicio da lista
        tempNewTweets.unshift({
            content: newVal,
            likes: 0,
            id: 123123
        })
        setNewTweets(tempNewTweets)
        textAreaRef.current.value = ""
    }
    return (
        <div className={props.className}>
            <div className="col-12 mb-3">
                <form onSubmit={handleSubmit}>
                    <textarea ref={textAreaRef} required={true} className="form-control" name="tweet">
                    </textarea>
                    <button type="submit" className="btn btn-primary my-3">Tweet</button>
                </form>
            </div>
            <TweetsList newTweets={newTweets} />
        </div>
    )
}

export function TweetsList(props){
    const [tweetsInit, setTweetsInit] = useState(props.newTweets ? props.newTweets : []);
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const final = [...props.newTweets].concat(tweetsInit);
        if(final.length !== tweets.length){
            setTweets(final);
        }
    }, [props.newTweets, tweets, tweetsInit]);

    useEffect(() => {
        const myCallback = (response, status) => {
            if (status === 200) {
                const finalTweetsInit = [...response].concat(tweetsInit)
                setTweetsInit(finalTweetsInit);
            } else {
                alert("There was an error");
            }
        };
        loadTweets(myCallback);
    }, [tweetsInit]);

    return (
        tweets.map((item, index) => (
            <Tweet tweet={item} key={index} className="my-5 py-5 bg-white text-dark"/>
        ))
    );
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

