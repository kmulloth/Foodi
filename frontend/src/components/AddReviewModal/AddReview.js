import React, {useState, useEffect} from "react";
import * as reviewActions from "../../store/reviews";
import * as businessActions from "../../store/businesses";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";

function AddReview({businessId, setShowModal}) {
    const dispatch = useDispatch();

    const user_id = useSelector(state => state?.session?.user?.id);
    const business = useSelector(state => state?.businesses[businessId]);
    const [value, setValue] = useState(0);
    const [body, setBody] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        const review = {user_id, business_id: businessId, value, body};
        let newBusiness;

        dispatch(reviewActions.createReview(review))

        dispatch(reviewActions.getReviews()).then(() => {
            const reviews = Object.values(business?.Reviews)
            console.log(reviews)

            let sum = 0
            reviews.forEach(review => sum += review.value);
            const avg = sum / reviews.length;

            console.log(sum, reviews.length, avg);

            newBusiness = {...business, rating: avg};

            console.log(newBusiness);
        });

        dispatch(businessActions.editBusiness(newBusiness));


        setShowModal(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="rating">Rating
                    <input type="radio" name="rating" value="1" onChange={(e) => setValue(e.target.value)}/>
                    <input type="radio" name="rating" value="2" onChange={(e) => setValue(e.target.value)}/>
                    <input type="radio" name="rating" value="3" onChange={(e) => setValue(e.target.value)}/>
                    <input type="radio" name="rating" value="4" onChange={(e) => setValue(e.target.value)}/>
                    <input type="radio" name="rating" value="5" onChange={(e) => setValue(e.target.value)}/>
                </div>
                <label htmlFor="body">Review</label>
                <textarea
                    className="form-control"
                    id="body"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                />
            </div>
            <button type="submit" >Submit</button>
        </form>
    )
}

export default AddReview;
