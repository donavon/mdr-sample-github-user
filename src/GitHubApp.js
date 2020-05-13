import React, { useState } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';

export const GitHubApp = () => {
  const navigate = useNavigate();
  const { username: defaultUsername } = useParams();
  const [username, setUsername] = useState(defaultUsername);

  return (
    <div className="container">
      <h1>Marauder Sample App: GitHub User</h1>
      <Outlet />
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
        <input
          type="text"
          defaultValue={defaultUsername}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <button type="submit" onClick={() => navigate(`/${username}`)}>
          Search
        </button>
      </form>
    </div>
  );
};
