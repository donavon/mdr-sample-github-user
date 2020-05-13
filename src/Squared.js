import React from 'react';
import { useRouteData } from 'marauder';
import { sleep } from './sleep';

// This is what loads the answer. It's a simple arithmetic operation,
// but here we're using a sleep() to simulate hitting a back-end
// supercomputer to make the calculations. But notice that when you
// go to a number that has already been calculated, the UI is rendered
// immediately. This is because we told Marauder to cache loads for
// 5 minutes in index.js.

export const load = async ({ props }) => {
  await sleep(2000);
  const squared = props.num * props.num;
  return { data: squared };
};

// In the "render" method (`default` unless you specify a `methodName`
// in the `load` config), we retrieve the data previously loaded using
// the `useRouteData` hook. `useRouteData` returns an array, a pattern
// that should be familiar to you if you've used `useState`. The first
// element of the array is the value returned from `load`.

const Squared = ({ num }) => {
  const [{ data: squared }] = useRouteData();
  return <div className="answer">{`${num} x ${num} equals ${squared}`}</div>;
};

export default Squared;
