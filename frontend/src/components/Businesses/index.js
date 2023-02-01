import { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getBusinesses } from '../../store/businesses';
import Map from '../Map';
import './Businesses.css';

function Businesses () {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const businesses = useSelector(state => state?.businesses);

    useEffect(() => {
        dispatch(getBusinesses({include:[{model: 'User'}]}));
    }, [dispatch]);

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
                <div className="business-list">
                    {Object.values(businesses).map(business => (
                        <div className="business-item" key={business?.id}>
                        <NavLink to={`/businesses/${business?.id}`}>
                            <img src={business?.imgUrl} alt={business?.name} />
                            <div className='business-info'>
                                <div className='business-info-header'>
                                    <h2>{business?.name}</h2>
                                    <div
                                        className="Stars"
                                        style={{'--rating': business?.rating}}
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
                    ))}
                </div>
            </div>
            <div id='map-container'>
                <Map businesses={businesses}/>
            </div>
        </div>
    );
}

export default Businesses;
