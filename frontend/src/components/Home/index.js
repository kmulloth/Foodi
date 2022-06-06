import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ImgCarousel from './ImgCarousel';
import ConfirmDeleteReviewModal from '../ConfirmDeleteReviewModal';
import * as reviewActions from '../../store/reviews';
import './Home.css';

function Home () {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state?.reviews);
    const user = useSelector(state => state?.session?.user);

    useEffect(() => {
        dispatch(reviewActions.getReviews());
    }, [dispatch]);

    return (
        <>
        <ImgCarousel />
        <div className="recent-reviews">
            <h1>Recent Reviews</h1>
            {Object.values(reviews).map(review => (
                <NavLink to={`/businesses/${review?.business_id}`} key={review?.id} className='to-biz'>
                    <div className="review" key={review?.id}>
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
                    </div>
                </NavLink>
            ))}
        </div>
        </>
    );
}

export default Home;
