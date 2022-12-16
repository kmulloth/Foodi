import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getBusinesses } from '../../store/businesses';
import { useEffect, useState } from 'react';


function Search () {

    const dispatch = useDispatch();

    const [query, setQuery] = useState('');

    useEffect(() => {
      dispatch(getBusinesses());
    }, [dispatch]);

    // useEffect(() => {
    //   document.addEventListener('click', setQuery(''))
    // }, [setQuery]);

    const businesses = useSelector(state => state?.businesses);

    return (
        <div id='search'>
        <div id='search-bar'>
          <input placeholder='Search' value={query} onChange={e => setQuery(e.target.value)}/>
          <NavLink exact to={query === ''? '/businesses' : `/search/${query}`} onClick={e => setQuery('')} ><i className="fa-solid fa-magnifying-glass"></i></NavLink>
        </div>
        <div id='search-results'>
            {
            Object.values(businesses).filter(business => {
              if (query === '') {
                return;
              } else if (business?.name?.toLowerCase().includes(query?.toLowerCase()) || business?.body?.toLowerCase().includes(query?.toLowerCase())) {
              return business
            }}).map(business => {
              return (
                <div className='business-search-card' key={business.id} >
                  <NavLink to={`/businesses/${business.id}`} className='business-card-link' onClick={e => setQuery('')}><p>{business?.name}</p></NavLink>
                </div>
              )
            })}
        </div>
      </div>
    )
}

export default Search;
