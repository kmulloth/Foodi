import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as businessActions from '../../store/businesses.js';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import './Business.css';

function Business(){
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const business = useSelector(state => state?.businesses[businessId])
    const user = useSelector(state => state?.session?.user);
    console.log(user?.id, business?.owner_Id)

    useEffect(() => {
        dispatch(businessActions.getBusinesses());
    }, [dispatch]);

    return (
        <div className="Business">
            <div className="Business-header">
                <h2>{business?.name}</h2>
                {user?.id === business?.owner_id && (
                    <>
                        <ConfirmDeleteModal businessId={business?.id}/>
                        <button className='edit' >Edit</button>
                    </>
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
