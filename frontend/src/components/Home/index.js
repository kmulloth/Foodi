import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Home.css';

function Home () {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const businesses = useSelector(state => state?.businesses);

    return (
        <div className="content">
            <div className="businesses">
                <h1>Businesses</h1>
                <div className="business-list">
                    {Object.values(businesses).map(business => (
                        <div className="business-item" key={business?.id}>
                            <NavLink to={`/businesses/${business?.id}`}>
                                <h2>{business?.name}</h2>
                                <img src={business?.imgUrl} alt={business?.name} />
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
