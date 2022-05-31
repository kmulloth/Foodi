import React from "react";
import * as reviewActions from "../../store/reviews.js";
import * as businessActions from "../../store/businesses.js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function ConfirmDeleteReview({ reviewId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const businessId = useSelector(state => Object.values(state?.businesses)[0]?.id);
  const business = useSelector(state => state?.businesses[businessId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviews = Object.values(business?.Reviews)
    let sum = 0
    reviews.forEach(review => sum += review?.value);
    const avg = sum / reviews.length;
    const newBusiness = {...business, rating: avg};
    console.log(newBusiness);

    dispatch(reviewActions.deleteOneReview(reviewId));
    dispatch(businessActions.editBusiness(newBusiness));
    history.push(`/api/businesses/${businessId}`);
  };

  return (
    <form
      action={`/api/reviews/${reviewId}`}
      method="delete"
      onSubmit={(e) => handleSubmit(e)}
    >
      <p>Are you sure you want to Delete this review?</p>
      <button type="submit" value="Delete review">
        Yes
      </button>
    </form>
  );
}

export default ConfirmDeleteReview;
