import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state?.session?.user);
  const businesses = useSelector(state => state?.businesses);

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
      <div id='search'>
        <input placeholder='Search' onChange={e => setQuery(e.target.value)}/>
        <div id='search-results'>
            {
            Object.values(businesses).filter(business => {
              if (query === '') {
                return;
              } else if (business?.name?.toLowerCase().includes(query?.toLowerCase())) {
              return business
            }}).map(business => {
              return (
                <div className='business-search-card' key={business.id} >
                  <NavLink to={`/businesses/${business.id}`} className='business-card-link' ><p>{business?.name}</p></NavLink>
                </div>
              )
            })}
        </div>
      </div>
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
