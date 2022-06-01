import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Search from './Search';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state?.session?.user);

  const [query, setQuery] = useState('');

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

  let isHome = '';
  const checkUrl = useEffect(() => {
    console.log(window.location.pathname === '/');
    if (window.location.pathname === '/') {
      isHome = 'Home';
    } else {
      isHome = '';
    }
  });

  return (
    <nav className={`Navigation ${isHome}`}>
      <div>
        <NavLink exact to="/" >Home</NavLink>
      </div>
      <Search query={query} setQuery={setQuery}/>
      <div id='buttons'>
        <div id='add-business'>
          <NavLink to={sessionUser? "/businesses/new" : "/signup"}>Add Business</NavLink>
        </div>
        <div id='sessionButtons'>
          {isLoaded && sessionLinks}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
