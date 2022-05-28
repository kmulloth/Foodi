import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <nav className="Navigation">
      <div>
        <NavLink exact to="/">Home</NavLink>
      </div>
      <div> idk ill put smt here eventually</div>
      <div id='sessionButtons'>
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
