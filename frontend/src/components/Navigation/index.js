import React, {useState} from 'react';
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

  return (
    <nav className="Navigation">
      <div>
        <NavLink exact to="/">Home</NavLink>
      </div>
      <Search query={query} setQuery={setQuery}/>
      <div id='add-business'>
        <NavLink to={sessionUser? "/businesses/new" : "/signup"}>Add Business</NavLink>
      </div>
      <div id='sessionButtons'>
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;
