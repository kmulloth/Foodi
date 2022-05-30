import  { csrfFetch } from './csrf';

const GET_ALL_REVIEWS = 'reviews/GET_ALL_REVIEWS';
const ADD_REVIEW = 'reviews/ADD_REVIEW';
const EDIT_REVIEW = 'reviews/EDIT_REVIEW';
const DELETE_REVIEW = 'reviews/DELETE_REVIEW';

const addReview = review => {
  return {
      type: ADD_REVIEW,
      payload: review
  };
};
const editOneReview = review => {
  return {
      type: EDIT_REVIEW,
      payload: review
  };
};
const deleteReview = (id) => {
  return {
      type: DELETE_REVIEW,
      payload: id
  };
};
const getAllReviews = (reviews) => {


    return {
        type: GET_ALL_REVIEWS,
        payload: reviews
    }
}
export const createReview = (review) => async (dispatch) => {
  console.log('REVIEW: ', review)
  const response = await csrfFetch(`/api/reviews/new`, {
      method: 'POST',
      body: JSON.stringify(review),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  const newReview = await response.json();
  dispatch(addReview(newReview));
  dispatch(getReviews())
}

export const getReviews = () => async dispatch => {
  const response = await csrfFetch(`/api/reviews/all`);

  if (response.ok) {
    const reviews = await response.json();
    dispatch(getAllReviews(reviews));
    return reviews;
  }
};

export const editReview = (review) => async (dispatch) => {
  console.log(review)
  const response = await csrfFetch(`/api/reviews/${review?.id}`, {
      method: 'PUT',
      body: JSON.stringify(review),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  const editedReview = await response.json();
  dispatch(editOneReview(editedReview));
}

export const deleteOneReview = id => async (dispatch) => {
  await csrfFetch(`/api/reviews/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({id}),
      headers: {
          'Content-Type': 'application/json'
      }
  });

    dispatch(deleteReview(id));

}

const initialState = {
};

const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_REVIEWS:
          const allReviews = {}
            action.payload.forEach((event) => {
                if (event.id) allReviews[event.id] = event
            })
            return { ...allReviews }
        case EDIT_REVIEW:
            const newEditState = {
              ...state,
              [action.payload.review.id]: action.payload.review
            }
            // const eventList = newState.map(id => newState[id]);
            // eventList.push(action.payload)
            return newEditState

        case ADD_REVIEW:

            const newAddState = {
              ...state,
              [action.payload.review.id]: action.payload.review
            }
            // newState[action.payload.event.id]= action.payload
            // const eventList = newState.map(id => newState[id]);
            // eventList.push(action.payload)
            return newAddState
        case DELETE_REVIEW:
          const newDeleteState = {...state}
          delete newDeleteState[action.payload]
          return newDeleteState

        default:
            return state;
    }
};

export default reviewReducer;
