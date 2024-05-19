import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ProfileBadgeComponent } from './profiles';
import { TweetsComponent, TweetDetailComponent, FeedComponent } from './tweets';

const appEl = document.getElementById('root');
if (appEl) {
  ReactDOM.createRoot(appEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

const renderTweetsComponent = () => {
  const tweetsEl = document.getElementById('social-app');
  if (tweetsEl) {
    ReactDOM.createRoot(tweetsEl).render(<TweetsComponent {...tweetsEl.dataset} />);
  }
}

const renderFeedComponent = () => {
  const tweetsFeedEl = document.getElementById('social-app-feed');
  if (tweetsFeedEl) {
    ReactDOM.createRoot(tweetsFeedEl).render(<FeedComponent {...tweetsFeedEl.dataset} />);
  }
}

const renderTweetDetailComponents = () => {
  const tweetDetailElements = document.querySelectorAll(".social-app-detail");
  tweetDetailElements.forEach(container => {
    ReactDOM.createRoot(container).render(<TweetDetailComponent {...container.dataset} />);
  });
}

const renderUserProfileBadgeComponents = () => {
  const userProfileBadgeElements = document.querySelectorAll(".social-app-profile-badge");
  userProfileBadgeElements.forEach(container => {
    ReactDOM.createRoot(container).render(<ProfileBadgeComponent {...container.dataset} />);
  });
}

renderTweetsComponent();
renderFeedComponent();
renderTweetDetailComponents();
renderUserProfileBadgeComponents();

reportWebVitals();


// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import {ProfileBadgeComponent} from './profiles';
// import { TweetsComponent, TweetDetailComponent, FeedComponent } from './tweets';

// // Renderiza o componente App no elemento com o id "root" (se existir)
// const appEl = document.getElementById('root');
// if (appEl) {
//   ReactDOM.createRoot(appEl).render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// }

// // Renderiza o componente TweetsComponent no elemento com o id "social-app" (se existir)
// const e = React.createElement
// const tweetsEl = document.getElementById('social-app');
// if (tweetsEl) {
//   console.log(tweetsEl.dataset)
//   ReactDOM.createRoot(tweetsEl).render(e(TweetsComponent, tweetsEl.dataset), tweetsEl);
// }

// const tweetsFeedEl = document.getElementById('social-app-feed');
// if (tweetsFeedEl) {
//   console.log(tweetsFeedEl.dataset)
//   ReactDOM.createRoot(tweetsFeedEl).render(e(FeedComponent, tweetsFeedEl.dataset), tweetsFeedEl);
// }

// const tweetDetailElement = document.querySelectorAll(".social-app-detail")
// tweetDetailElement.forEach(container => {
//   ReactDOM.createRoot(container).render(e(TweetDetailComponent, container.dataset), container);
// })

// const userProfileBadgeElements = document.querySelectorAll(".social-app-profile-badge")
// userProfileBadgeElements.forEach(container => {
//   ReactDOM.createRoot(container).render(e(ProfileBadgeComponent, container.dataset), container);
// })

// reportWebVitals();

