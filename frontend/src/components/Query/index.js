import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getBusinesses } from '../../store/businesses';
import Map from '../Map';
import './Query.css';

function Query () {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    const businesses = useSelector(state => state?.businesses);
    const { query } = useParams();

    useEffect(() => console.log(query), [query])

    useEffect(() => {
        dispatch(getBusinesses({include:[{model: 'User'}]}));
    }, [dispatch]);

    const querySelector = () => {
        console.log(Object.values(businesses))
        if (query === '') return Object.values(businesses)

        else return Object.values(businesses).filter(business => (business?.name?.toLowerCase().includes(query?.toLowerCase()) || business?.type.toLowerCase().includes(query?.toLowerCase()) || business?.cusine.toLowerCase().includes(query.toLowerCase())))
    }

    return (
        <div className="content">
            {/* <div id='sidebar'>
                <div className='sidebar-header'>
                    <strong>Filters</strong>
                </div>
                <div className='sidebar-body'>
                </div>
            </div> */}
            <div className="businesses">
                <h1>Businesses</h1>
                <div className="business-list">
                    {query !== '' ? querySelector().map(business => (
                        <div className="business-item" key={business?.id}>
                            <NavLink to={`/businesses/${business?.id}`}>
                                <img src={business?.imgUrl} alt={business?.name} />
                                <div className='business-info'>
                                    <div className='business-info-header'>
                                        <h2>{business?.name}</h2>
                                        <div
                                            className="Stars"
                                            style={{'--rating': business?.rating.toFixed(1)}}
                                            aria-label={`Rating of this business is ${business?.rating / 5 * 100}%`}
                                        >
                                            <p>&ensp;{business?.Reviews?.length} reviews</p>
                                        </div>
                                    </div>
                                    <div className='business-type'>
                                        <p>{business.cusine} {business.type === 'truck' ? 'Food Truck' : business.type}</p>
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                    )) : Object.values(businesses).map(business => (
                        <div className="business-item" key={business?.id}>
                            <NavLink to={`/businesses/${business?.id}`}>
                                <img src={business?.imgUrl} alt={business?.name} />
                                <div className='business-info'>
                                    <h2>{business?.name}</h2>
                                    <p>({Object.values(business?.Reviews).length})</p>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
            <div id='map-container'>
                <Map businesses={querySelector()}/>
            </div>
        </div>
    );
}

export default Query;
