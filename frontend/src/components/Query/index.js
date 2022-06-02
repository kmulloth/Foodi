import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getBusinesses } from '../../store/businesses';
import './Query.css';

function Query () {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const businesses = useSelector(state => state?.businesses);
    const { query } = useParams();

    useEffect(() => {
        dispatch(getBusinesses({include:[{model: 'User'}]}));
    }, [dispatch]);

    return (
        <div className="content">
            <div className="businesses">
                <h1>Businesses</h1>
                <div className="business-list">
                    {Object.values(businesses).filter(business => {
                        if (query === '') {
                          return;
                        } else if (business?.name?.toLowerCase().includes(query?.toLowerCase()) || business?.body?.toLowerCase().includes(query?.toLowerCase())) {
                        return business
                        }}).map(business => (
                        <div className="business-item" key={business?.id}>
                            <NavLink to={`/businesses/${business?.id}`}>
                                <img src={business?.imgUrl} alt={business?.name} />
                                <div className='business-info'>
                                    <h2>{business?.name}</h2>
                                    <p>{Object.values(business?.Reviews).length} Reviews</p>
                                </div>
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Query;
