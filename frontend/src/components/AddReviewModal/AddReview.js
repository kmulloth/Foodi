import {useState, useEffect} from "react";
import * as reviewActions from "../../store/reviews";
import * as businessActions from "../../store/businesses";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import StarRating from "../StarRating";

function AddReview({businessId, setShowModal}) {
    const dispatch = useDispatch();

    const user_id = useSelector(state => state?.session?.user?.id);
    const [value, setValue] = useState(0);
    const [body, setBody] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const review = {user_id, business_id: businessId, value, body, img: selectedImage};

        dispatch(reviewActions.createReview(review))

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
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                        console.log(event.target.files[0]);
                        setSelectedImage(event.target.files[0]);
                    }}
                    />
                {selectedImage && (
                    <div>
                    <img alt="not fount" width={"90px"} src={URL.createObjectURL(selectedImage)} />
                    <br />
                    <button onClick={()=>setSelectedImage(null)}>Remove</button>
                    </div>
                  )}
                </div>
            </div>
            <button type="submit" disabled={value === 0}>Submit</button>
        </form>
    )
}

export default AddReview;
