import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import * as businessActions from '../../store/businesses.js';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import './Business.css';

function Business(){
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const business = useSelector(state => state?.businesses[businessId])
    const user = useSelector(state => state?.session?.user);

    useEffect(() => {
        dispatch(businessActions.getBusinesses());
    }, [dispatch]);

    const location = {
        pathname: `/api/businesses/${businessId}/edit`,
        state: {businesses: business}
    }

    return (
        <div className="Business">
            <div className="Business-header">
                <h2>{business?.name}</h2>
                {user?.id === business?.owner_id && (
                    <div className='owner-buttons'>
                        <ConfirmDeleteModal businessId={business?.id}/>
                        <NavLink to={location}>Edit</NavLink>
                    </div>
                )}
            </div>
            <div className="Business-info">
                <div className="Business-address">
                    <p>{business?.location}</p>
                    <p>{business?.body}</p>
                </div>
            <div className="Business-reviews">
                <h3>Reviews</h3>
                <p>TODO</p>
            </div>
        </div>
    </div>
    )

};

export default Business;
