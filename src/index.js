import React from 'react';
import ReactDOM from 'react-dom';
import { MarauderProvider } from 'marauder';
import thwack from 'thwack';
import JSON_ from 'json_';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Setup defaults for our API call
thwack.defaults.headers = {
  accept: 'application/vnd.github.v3+json',
};
thwack.defaults.baseURL = 'https://api.github.com';

// convert all incoming GitHub JSON to camelCase instead of snake_case
// i.e. prevent a leaky abstraction.
thwack.addEventListener('response', async (event) => {
  const { thwackResponse } = event;
  const { response, options, ...rest } = thwackResponse;
  event.preventDefault();
  event.stopPropagation();
  const data = await JSON_.parse(response);
  return new thwack.ThwackResponse({ ...rest, data }, options);
});

// Wrap the <App> in a <MarauderProvider> and pass in an optional
// `config` object. For a complete list of options, see below:
// https://github.com/tannerlinsley/react-query#options

const config = {
  staleTime: 1000 * 60 * 5, // data becomes stale after 5 mins
  retry: false, // fail imediately on error
};

ReactDOM.render(
  <MarauderProvider config={config}>
    <App />
  </MarauderProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
