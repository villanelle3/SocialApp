import React, {useState} from "react";
import { ActionBtn } from "./buttons";
import {
    UserDisplay,
    UserPicture
} from '../profiles'


export function ParentTweet(props){
    const {tweet} = props
    return( tweet.parent ?
            <Tweet isRetweet retweeter={props.retweeter} hideActions className={" "} tweet={tweet.parent}/>
        : null
    )
}

export function Tweet(props){
    const {tweet, didRtweet, hideActions, isRetweet, retweeter} = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)
    let className = props.className ? props.className : "col-10 mx-auto col-md-6"
    className = isRetweet === true ? `${className} py-2 border rounded` : className

    const path = window.location.pathname
    const match = path.match(/(?<tweetid>\d+)/)
    const URLtweetId = match ? match.groups.tweetid : -1
        
    const isDetail = `${tweet.id}` === `${URLtweetId}`;

    const handleLink = (event) => {
        event.preventDefault()
        window.location.href = `/${tweet.id}`
    }

    const handlePerformAction = (newActionTweet, status) =>{
        if(status === 200){
            setActionTweet(newActionTweet)
        }else if (status === 201){
            if(didRtweet){
                didRtweet(newActionTweet)
            }
        }
    }
    
    return <div className={className} >
        {isRetweet === true && <div className="mb-2">
            <span className="small text-muted">Retweeted by <UserDisplay user={retweeter}/></span>
        </div>}
        <div className="d-flex">
            <div className="">
                <UserPicture user={tweet.user} />
            </div>

            <div className="col-11">
                <div>
                    <p>
                        <UserDisplay includeFullName user={tweet.user}/>
                    </p>
                    <p>{tweet.content}</p>
                    <ParentTweet tweet={tweet} retweeter={tweet.user} />
                </div>
                <div className="btn btn-group px-0">
                    {(actionTweet && hideActions !== true) && <React.Fragment>
                        <ActionBtn tweet={actionTweet} didPeformAction={handlePerformAction} action={{type:"Like", display:"Likes"}}/>
                        <ActionBtn tweet={actionTweet} didPeformAction={handlePerformAction} action={{type:"unlike", display:"Unlike"}}/>
                        <ActionBtn tweet={actionTweet} didPeformAction={handlePerformAction} action={{type:"retweet", display:"Retweet"}}/>
                    </React.Fragment>}
                    {isDetail === true ? null : <button onClick={handleLink} className="btn btn-outline-primary btn-small">View</button>}
                </div>
            </div>    
        </div>
    </div>
}

