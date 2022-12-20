import {useState, useEffect} from "react";
import * as reviewActions from "../../store/reviews";
import * as businessActions from "../../store/businesses";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import StarRating from "../StarRating";

function AddReview({businessId, setShowModal}) {
    const dispatch = useDispatch();

    const user_id = useSelector(state => state?.session?.user?.id);
    const business = useSelector(state => state.businesses[businessId])
    console.log(business.Reviews)
    const [value, setValue] = useState(0);
    const [body, setBody] = useState('');
    const [img, setImg] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const review = {user_id, business_id: businessId, value, body, img};
        const newBusiness = {
            id: businessId,
            name: business?.name,
            imgUrl: business?.imgUrl,
            owner_id: business?.owner_id,
            body: business?.body,
            type: business?.type,
            cusine: business?.cusine,
            location: business?.location,
            lat: business?.lat,
            lng: business?.lng,
            rating: business.Reviews.reduce((a, b) => a + b)/business.Reviews.length,
            likes: business?.likes};

        dispatch(reviewActions.createReview(review)).then(
            dispatch(businessActions.editBusiness())
        )

        setShowModal(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <div className="rating">Rating
                    <StarRating value={value} setValue={setValue} />
                </div>
                <label htmlFor="body">Review</label>
                <textarea
                    className="form-control"
                    id="body"
                    value={body}
                    onChange={e => setBody(e.target.value)}
                />
                <div className="img-upload">
                  <input
                    type="text"
                    name="myImage"
                    onChange={e => setImg(e.target.value)}
                />
                {img && (
                    <div>
                    <img alt="not found" width={"90px"} src={img} />
                    <br />
                    <button onClick={()=>setImg(null)}>Remove</button>
                    </div>
                  )}
                </div>
            </div>
            <button type="submit" disabled={value === 0}>Submit</button>
        </form>
    )
}

export default AddReview;
