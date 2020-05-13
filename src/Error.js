import React from 'react';
import octocat from './octocat-shrug.png';

export const Error = ({ error }) => {
  const message =
    error.name === 'ThwackResponseError' && error.thwackResponse.status === 404
      ? 'GitHub user not found'
      : error.message;

  return (
    <div className="github-container">
      <div className="avatar">
        <img src={octocat} alt="octocat shrugging" />
      </div>
      <h2>{message}</h2>
    </div>
  );
};
