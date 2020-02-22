import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return isSignedIn ? (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        className="f3 link dim black underline pa3 pointer"
        onClick={() => onRouteChange('signout')}>
        Sign Out
      </p>
    </nav>
  ) : (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <p
        className="f3 link dim black underline pa3 pointer"
        onClick={() => onRouteChange('signin')}>
        SignIn
      </p>
      <p
        className="f3 link dim black underline pa3 pointer"
        onClick={() => onRouteChange('register')}>
        Register
      </p>
    </nav>
  );
};

export default Navigation;
