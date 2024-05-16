import React from "react";
import './App.css';
import { TweetsComponent } from "./tweets";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>Tweets:</h2>
          <div>
            <TweetsComponent/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
