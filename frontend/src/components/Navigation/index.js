import {useEffect, useState} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import SignupFormModal from '../SignupFormModal';
import LoginFormModal from '../LoginFormModal';
import ProfileButton from './ProfileButton';
import Search from './Search';
import './Navigation.css';

function Navigation({ loaded }){
  const sessionUser = useSelector(state => state?.session?.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [isHome, setIsHome] = useState(window.location.pathname === '/' ? 'Home' : 'inactive');

  const handleDemoSubmit = (e) => {
    e.preventDefault();

    const credential = e.target[0].value;
    const password = e.target[1].value;
    // console.log('TARGET: ', e.target)
    // console.log('CREDENTIAL: ',credential,'PWORD: ', password, 'E: ', e);
    return dispatch(sessionActions.login({ credential, password }))
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
        <form action='/api/session' method='POST' onSubmit={handleDemoSubmit}>
          <input type='hidden' name='userName' value='Demo-lition' />
          <input type='hidden' name='password' value='password' />
          <button type='submit'>Demo</button>
        </form>
      </>
    );
  }

  useEffect(() => {
    history.listen((location) => {
      if (location.pathname === '/') {
        setIsHome('Home');
      } else {
        setIsHome('');
      }
    })
    console.log(isHome)
  }, [history]);

  return (
    loaded && <nav className={`Navigation ${isHome}`} >
      <div className='title'>
        <NavLink exact to="/"
          // isActive={(match, location) => {
          //         if(location?.pathname === '/') setIsHome('Home');
          //         else if(location?.pathname !== '/') setIsHome('inactive');
          // }}
          className='title'>foodi
        </NavLink>
      </div>
      <Search />
      <div id='buttons'>
        <div data-active={sessionUser ? 'true' : 'false'} id='add-business'>
          {sessionUser && <NavLink to="/businesses/new">Add Business</NavLink>}
        </div>
        <div id='sessionButtons'>
          {sessionLinks}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
