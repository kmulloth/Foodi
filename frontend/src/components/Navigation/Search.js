import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Search ({query, setQuery}) {

    const businesses = useSelector(state => state?.businesses);

    return (
        <div id='search'>
        <div id='search-bar'>
          <input placeholder='Search' onChange={e => setQuery(e.target.value)}/>
          <NavLink exact to={query ? `/search/${query}` : '/businesses'} onClick={e => setQuery('')} ><i class="fa-solid fa-magnifying-glass"></i></NavLink>
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
