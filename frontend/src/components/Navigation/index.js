import {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Search from './Search';
import './Navigation.css';

function Navigation({ loaded }){
  const sessionUser = useSelector(state => state?.session?.user);

  const [query, setQuery] = useState('');
  const [isHome, setIsHome] = useState('');

  let sessionLinks;
  if (sessionUser) {
    console.log(sessionUser)
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    console.log('no user')
    sessionLinks = (
      <>
        <NavLink to="/login">Log In</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  useEffect(() => {

    if (window.location.pathname === '/') {
      setIsHome('Home');
    } else {
      setIsHome('');
    }
  }, [isHome]);

  return (
    <nav className={`Navigation ${isHome}`}>
      <div className='title'>

        <NavLink exact to="/"
          isActive={(match, location) => {
                  console.log(match, location);
                  if(location?.pathname === '/') setIsHome('Home');
                  else if(location?.pathname !== '/') setIsHome('inactive');
          }}
          className='title'>foodi
        </NavLink>

      </div>
      <Search query={query} setQuery={setQuery}/>
      <div id='buttons'>
        <div id='add-business'>
          <NavLink to={sessionUser ? "/businesses/new" : "/signup"}>Add Business</NavLink>
        </div>
        <div id='sessionButtons'>
          {loaded && sessionLinks}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
