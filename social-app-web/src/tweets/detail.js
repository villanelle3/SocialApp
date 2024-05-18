import React, {useState} from "react";
import { ActionBtn } from "./buttons";


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
        <div>
            <p>{tweet.content}</p>
            <ParentTweet tweet={tweet} />
        </div>
        <div className="btn btn-group">
            {(actionTweet && hideActions !== true) && <React.Fragment>
                <ActionBtn tweet={actionTweet} didPeformAction={handlePerformAction} action={{type:"Like", display:"Likes"}}/>
                <ActionBtn tweet={actionTweet} didPeformAction={handlePerformAction} action={{type:"unlike", display:"Unlike"}}/>
                <ActionBtn tweet={actionTweet} didPeformAction={handlePerformAction} action={{type:"retweet", display:"Retweet"}}/>
            </React.Fragment>}
            {isDetail === true ? null : <button onClick={handleLink} className="btn btn-outline-primary btn-small">View</button>}
        </div>
    </div>
}

