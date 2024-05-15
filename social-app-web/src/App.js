import React, {useEffect, useState} from "react";
import './App.css';

function loadTweets(callback){
  const xhr = new XMLHttpRequest();
  const method = "GET";
  const url = "http://localhost:8000/tweets/";
  const responseType = "json";

  xhr.responseType = responseType;
  xhr.open(method, url);
  xhr.onload = function() {
      callback(xhr.response, xhr.status)
  };
  xhr.onerror = function (e){
    console.log(e)
    callback({"message": "The request was an error"}, 400)
  }
  xhr.send();
}

function Tweet(props){
  const {tweet} = props
  const className = props.className ? props.className : "col-10 mx-auto col-md-6"
  return <div className={className}>
    <p>{tweet.content}</p>
  </div>
}

function App() {
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

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>Tweets:</h2>
          <div>
            {tweets.map((item, index) => (
              <Tweet tweet={item} key={index} className="my-5 py-5 bg-white text-dark"/>
            ))}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
