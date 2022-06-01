import React, {useState, useEffect} from "react";
import * as reviewActions from "../../store/reviews";
import * as businessActions from "../../store/businesses";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";

function AddReview({businessId, setShowModal}) {
    const dispatch = useDispatch();

    const user_id = useSelector(state => state?.session?.user?.id);
    const [value, setValue] = useState(0);
    const [body, setBody] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        const review = {user_id, business_id: businessId, value, body};
        console.log('REVIEW: ',review);
        dispatch(reviewActions.createReview(review))

        setShowModal(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="rating">Rating
                    <input type="radio" name="rating" value="1" onChange={(e) => setValue(parseInt(e.target.value))}/>
                    <input type="radio" name="rating" value="2" onChange={(e) => setValue(parseInt(e.target.value))}/>
                    <input type="radio" name="rating" value="3" onChange={(e) => setValue(parseInt(e.target.value))}/>
                    <input type="radio" name="rating" value="4" onChange={(e) => setValue(parseInt(e.target.value))}/>
                    <input type="radio" name="rating" value="5" onChange={(e) => setValue(parseInt(e.target.value))}/>
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