import React from 'react';
import { useRouteData } from 'marauder';
import thwack from 'thwack';

// Load the GitHub user record for the username specified
// in `params.username`. If successful (i.e. a 2xx status code),
// return the `user` record. On an error (e.g. a 404 Not Found),
// Thwack will throw an exception thich will be caught by
// Marauder, in which case the `error` element specified in the
// `load` config will render.

export const load = async ({ params }) => {
  const { username } = params;
  const { data: user } = await thwack.get('users/:username', {
    params: { username },
  });
  return { data: user };
};

// Retreive the `user` record from above by calling the
// `useRouteData` hook. An array is returned with the first
// element set to the returned value of the `load` method above,

export const GitHubUser = ({ num }) => {
  const [{ data: user }] = useRouteData();
  const { name, avatarUrl, htmlUrl } = user;

  return (
    <div className="github-container">
      <div className="avatar">
        <img src={avatarUrl} alt={name} />
      </div>
      <h2>
        <a href={htmlUrl} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      </h2>
    </div>
  );
};
