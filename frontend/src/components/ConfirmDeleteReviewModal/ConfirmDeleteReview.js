import React from "react";
import * as reviewActions from "../../store/reviews.js";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function ConfirmDeleteReview({ reviewId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const businessId = useSelector(state => Object.values(state?.businesses)[0]?.id);
  console.log(businessId)

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(reviewActions.deleteOneReview(reviewId));
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
