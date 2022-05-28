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
      <div> !!! Search Bar Goes Here !!!</div>
      <div id='add-business'>
        <NavLink to={sessionUser? "/api/businesses/new" : "/signup"}>Add Business</NavLink>
      </div>
      <div id='sessionButtons'>
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
