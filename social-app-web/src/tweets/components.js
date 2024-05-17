import React, {useEffect, useState} from "react";
import {apiTweetList, apiTweetCreate, apiTweetAction} from "./lookup"

export function TweetsComponent(props){
    const textAreaRef = React.createRef()
    const [newTweets, setNewTweets] = useState([])

    const handleBackendUpdate = (response, status) =>{
        // backend api response handler
        const tempNewTweets = [...newTweets];
        // push -> final da lista
        // unshift -> inicio da lista
        if (status === 201){
            // tempNewTweets.unshift({content: newVal, likes: 0, id: 123123})
            tempNewTweets.unshift(response)
            setNewTweets(tempNewTweets)
        }else{
            console.log(response)
            alert("An error occurred. Please, try again")
        }  
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        const newVal = textAreaRef.current.value;
        // backend api request
        apiTweetCreate(newVal, handleBackendUpdate)
        textAreaRef.current.value = ""
    }

    return (
        <div className={props.className}>
            <div className="col-12 mb-3">
                <form onSubmit={handleSubmit}>
                    <textarea ref={textAreaRef} required={true} className="form-control" name="tweet">
                    </textarea>
                    <button type="submit" className="btn btn-success my-3">Tweet</button>
                </form>
            </div>
            <TweetsList newTweets={newTweets} />
        </div>
    )
}

export function TweetsList(props){
    const [tweetsInit, setTweetsInit] = useState(props.newTweets ? props.newTweets : []);
    const [tweets, setTweets] = useState([]);
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
                    const finalTweetsInit = [...response].concat(tweetsInit)
                    setTweetsInit(finalTweetsInit);
                    setTweetsDidSet(true)
                } else {
                    alert("There was an error");
                }
            };
            apiTweetList(handleTweetListLookup);
        }
        
    }, [tweetsInit, tweetsDidSet, setTweetsDidSet]);

    const handleDidRetweet = (newTweet) =>{
        const updateTweetsInit = [...tweetsInit]
        updateTweetsInit.unshift(newTweet)
        setTweetsInit(updateTweetsInit)

        const updateFinalTweets = [...tweets]
        updateFinalTweets.unshift(tweets)
        setTweets(updateFinalTweets)

    }

    return (
        tweets.map((item, index) => (
            <Tweet 
                tweet={item} 
                didRtweet = {handleDidRetweet}
                key={index} 
                className="my-5 py-5 bg-white text-dark"
            />
        ))
    );
}


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

export function ParentTweet(props){
    const {tweet} = props
    return( tweet.parent ?
        <div className="row">
            <div className="col-11 mx-auto p-3 border rounded">
                <p className="mb-0 text-muted small">Retweet</p>
                    <Tweet hideActions className={" "} tweet={tweet.parent}/>
                </div>
        </div>
        : null
    )
}

export function Tweet(props){
    const {tweet, didRtweet, hideActions} = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    const className = props.className ? props.className : "col-10 mx-auto col-md-6"
    
    const handlePerformAction = (newActionTweet, status) =>{
        if(status === 200){
            setActionTweet(newActionTweet)
        }else if (status === 201){
            if(didRtweet){
                didRtweet(newActionTweet)
            }
        }
    }
    
    return <div className={className}>
        <div>
            <p>{tweet.content}</p>
            <ParentTweet tweet={tweet} />
        </div>
        {(actionTweet && hideActions !== true) && <div className="btn btn-group">
            <ActionBtn tweet={actionTweet} didPeformAction={handlePerformAction} action={{type:"Like", display:"Likes"}}/>
            <ActionBtn tweet={actionTweet} didPeformAction={handlePerformAction} action={{type:"unlike", display:"Unlike"}}/>
            <ActionBtn tweet={actionTweet} didPeformAction={handlePerformAction} action={{type:"retweet", display:"Retweet"}}/>
        </div>}
    </div>
}

