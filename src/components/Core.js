import React from 'react';
import Link from 'react-router/es/Link';

/**
 * <Core />
 * Wraps all our child components to provide navigation on all pages.
 * This makes it simple to have a component at the index '/' route
 * of our application.
 */
const Core = ({ children }) =>
  <div>
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/about'>About</Link>
      <Link to='/users'>Users</Link>
    </nav>
    <main>
      { children }
    </main>
  </div>;

export default Core;
