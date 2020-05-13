import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { load } from 'marauder';

import { GitHubApp } from './GitHubApp';
import { Error } from './Error';
import { Loading } from './Loading';

// Dynamically load the `GitHubUser` component, and its data,
// givng it a loading fallback (to render while loading) and
// an error fallback (to render if the `load` method throws).
// Normally `load` renders the `default` export, like
// `React.lazy` does, but here we override and render the
// `GitHubUser` export instead.

const GitHubUser = load(() => import('./GitHubUser'), {
  fallback: <Loading />,
  error: <Error />,
  methodName: 'GitHubUser',
});

const App = () => (
  <Routes>
    <Route path=":username" element={<GitHubApp />}>
      <Route path={'/'} element={<GitHubUser />} />
    </Route>
    <Navigate exact from="/" to="/donavon" />
  </Routes>
);

export default App;
