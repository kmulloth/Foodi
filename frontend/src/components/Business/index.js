import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import * as businessActions from '../../store/businesses.js';
import * as reviewActions from '../../store/reviews';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import ConfirmDeleteReviewModal from '../ConfirmDeleteReviewModal';
import AddReviewModal from '../AddReviewModal/index.js';
import ImgCarousel from './ImgCarousel.js';
import './Business.css';

function Business(){
    const { businessId } = useParams();
    const dispatch = useDispatch();
    const business = useSelector(state => state?.businesses[businessId])
    const reviews = useSelector(state => state?.reviews);
    const user = useSelector(state => state?.session?.user);

    useEffect(() => {
        dispatch(businessActions.getBusinesses());
        dispatch(reviewActions.getReviews());
    }, [dispatch]);

    const location = {
        pathname: `/businesses/${businessId}/edit`,
        state: {businesses: business}
    }

    return (
        <div className="Business">
            <ImgCarousel />
            <div className="Business-header">
                <h2>{business?.name}</h2>
                {user?.id === business?.owner_id && (
                    <div className='owner-buttons'>
                        <ConfirmDeleteModal businessId={business?.id}/>
                        <NavLink to={location}><i class="fa-solid fa-pen-to-square"></i></NavLink>
                    </div>
                )}
                <div className="Business-info">
                    <h3>{business?.rating?.toFixed(1)}</h3>
                </div>
            </div>
            <div className="Business-info">
                <div className="Business-address">
                    <p>{business?.location}</p>
                    {user?.id !== business?.owner_id && (<AddReviewModal businessId={business?.id}/>)}
                </div>
                <div className="Business-body">
                    <p>{business?.body}</p>
                </div>
            <div className="Business-reviews">
                <h3>Reviews</h3>
                {Object.values(reviews).filter(review => review?.business_id === business?.id).map(review => (
                    <div className="Business-review" key={review?.id}>
                        <div className="review-img">
                            <img src={review?.img ? URL.createObjectURL(review?.img) : '/images/foodtruck.jpg'} alt="user-img" />
                        </div>
                        <div className="review-header">
                            <h4>{review?.User?.username}</h4>
                            <div className="review-rating">
                                <h3>{review?.value}</h3>
                                {user?.id === review?.user_id && (<ConfirmDeleteReviewModal reviewId={review?.id}/>)}
                            </div>
                        </div>
                        <p>{review?.body}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )

};

export default Business;
