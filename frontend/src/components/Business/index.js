import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import * as businessActions from '../../store/businesses.js';
import * as reviewActions from '../../store/reviews';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import ConfirmDeleteReviewModal from '../ConfirmDeleteReviewModal';
import AddReviewModal from '../AddReviewModal/index.js';
import ImgCarousel from './ImgCarousel.js';
import Bizmap from './Bizmap.js';
import './Business.css';

function Business(){
    const dispatch = useDispatch();
    const { businessId } = useParams();
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

    const schedule = {
        open: business?.openTimes.split(','),
        close: business?.closeTimes.split(',')
    }

    const today = new Date()

    const isOpen = () => {
        const day = today.getDay()
        const times = {
            open: schedule.open[day].split(':'),
            close: schedule.close[day].split(':')
         }

        if (today.getHours() < times.open[0] || today.getHours() > times.close[0]){
            if (today.getMinutes() < times.open[1] || today.getMinutes() > times.close[1]) return false
            return true
        }return true
    }

    return schedule.open && (
        <div className="Business">
            {business && <ImgCarousel business={business} reviews={business?.Reviews}/>}
            <div className="Business-body">
                <div className="Business-address">
                    <p>{business?.location}</p>
                    {user && user?.id !== business?.owner_id && (
                        <AddReviewModal businessId={business?.id}/>)
                    }
                    {user?.id === business?.owner_id && (
                        <div className='owner-buttons'>
                            <ConfirmDeleteModal businessId={business?.id}/>
                            <NavLink to={location}><i className="fa-solid fa-pen-to-square"></i></NavLink>
                        </div>
                    )}
                </div>
                <div className='bizmap-schedule'>
                    <div className='bizmap-container'>
                        <Bizmap lat={business?.lat} lng={business?.lng}/>
                    </div>
                    <div className='time'>
                        <table id='time-fields'>
                            <tr className='time-field'>
                                <td><strong>Sun</strong></td>
                                <td>{new Date('1970-01-01T'+schedule.open[0]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})} -</td>
                                <td>{new Date('1970-01-01T'+schedule.close[0]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})}</td>
                                <td>{today.getDay() === 0 && (
                                    <strong
                                        style={{color: isOpen() ? 'green' : 'red'}}>
                                        {isOpen() ? 'Open' : "Closed"}
                                    </strong>
                                )}</td>
                            </tr>
                            <tr className='time-field'>
                                <td><strong>Mon</strong></td>
                                <td>{new Date('1970-01-01T'+schedule.open[1]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})} -</td>
                                <td>{new Date('1970-01-01T'+schedule.close[1]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})}</td>
                                <td>{today.getDay() === 1 && (
                                    <strong
                                        style={{color: isOpen() ? 'green' : 'red'}}>
                                        {isOpen() ? 'Open' : "Closed"}
                                    </strong>
                                )}</td>
                            </tr>
                            <tr className='time-field'>
                                <td><strong>Tue</strong></td>
                                <td>{new Date('1970-01-01T'+schedule.open[2]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})} -</td>
                                <td>{new Date('1970-01-01T'+schedule.close[2]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})}</td>
                                <td>{today.getDay() === 2 && (
                                    <strong
                                        style={{color: isOpen() ? 'green' : 'red'}}>
                                        {isOpen() ? 'Open' : "Closed"}
                                    </strong>
                                )}</td>
                            </tr>
                            <tr className='time-field'>
                                <td><strong>Wed</strong></td>
                                <td>{new Date('1970-01-01T'+schedule.open[3]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})} -</td>
                                <td>{new Date('1970-01-01T'+schedule.close[3]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})}</td>
                                <td>{today.getDay() === 3 && (
                                    <strong
                                        style={{color: isOpen() ? 'green' : 'red'}}>
                                        {isOpen() ? 'Open' : "Closed"}
                                    </strong>
                                )}</td>
                            </tr>
                            <tr className='time-field'>
                                <td><strong>Thu</strong></td>
                                <td>{new Date('1970-01-01T'+schedule.open[4]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})} -</td>
                                <td>{new Date('1970-01-01T'+schedule.close[4]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})}</td>
                                <td>{today.getDay() === 4 && (
                                    <strong
                                        style={{color: isOpen() ? 'green' : 'red'}}>
                                        {isOpen() ? 'Open' : "Closed"}
                                    </strong>
                                )}</td>
                            </tr>
                            <tr className='time-field'>
                                <td><strong>Fri</strong></td>
                                <td>{new Date('1970-01-01T'+schedule.open[5]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})} -</td>
                                <td>{new Date('1970-01-01T'+schedule.close[5]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})}</td>
                                <td>{today.getDay() === 5 && (
                                    <strong
                                        style={{color: isOpen() ? 'green' : 'red'}}>
                                        {isOpen() ? 'Open' : "Closed"}
                                    </strong>
                                )}</td>
                            </tr>
                            <tr className='time-field'>
                                <td><strong>Sat</strong></td>
                                <td>{new Date('1970-01-01T'+schedule.open[6]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})} -</td>
                                <td>{new Date('1970-01-01T'+schedule.close[6]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})}</td>
                                <td>{today.getDay() === 6 && (
                                    <strong
                                        style={{color: isOpen() ? 'green' : 'red'}}>
                                        {isOpen() ? 'Open' : "Closed"}
                                    </strong>
                                )}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className="Business-desc">
                    <p>{business?.body}</p>
                </div>
            <div className="Business-reviews">
                <h3>Reviews</h3>
                {Object.values(reviews).filter(review => review?.business_id === business?.id).map(review => (
                    <div className="Business-review" key={review?.id}>
                        <div className="review-img">
                            <img src={review?.img ? review?.img : '/images/foodtruck.jpg'} alt="user-img" />
                        </div>
                        <div className="review-content">
                            <div className="review-header">
                                <h4>{review?.User?.username}</h4>
                                <div className="review-rating">
                                    <h3>{review?.value}</h3>
                                    {user?.id === review?.user_id && (<ConfirmDeleteReviewModal reviewId={review?.id}/>)}
                                </div>
                            </div>
                            <p>{review?.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )

};

export default Business;
