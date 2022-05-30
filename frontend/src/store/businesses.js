import  { csrfFetch } from './csrf';

const GET_ALL_BUSINESSES = 'businesses/GET_ALL_BUSINESSES';
const ADD_BUSINESS = 'businesses/ADD_BUSINESS';
const EDIT_BUSINESS = 'businesses/EDIT_BUSINESS';
const DELETE_BUSINESS = 'businesses/DELETE_BUSINESS';

const addBusiness = business => {
  return {
      type: ADD_BUSINESS,
      payload: business
  };
};
const editOneBusiness = business => {
  return {
      type: EDIT_BUSINESS,
      payload: business
  };
};
const deleteBusiness = (id) => {
  return {
      type: DELETE_BUSINESS,
      payload: id
  };
};
const getAllBusinesses = (businesses) => {


    return {
        type: GET_ALL_BUSINESSES,
        payload: businesses
    }
}
export const createBusiness = (business) => async (dispatch) => {
  const response = await csrfFetch('/api/businesses/new', {
      method: 'POST',
      body: JSON.stringify(business),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  const newBusiness = await response.json();
  dispatch(addBusiness(newBusiness));
  dispatch(getBusinesses())
}

export const getBusinesses = () => async dispatch => {
  const response = await csrfFetch(`/api/businesses/all`);

  if (response.ok) {
    const businesses = await response.json();
    dispatch(getAllBusinesses(businesses));
    return businesses;
  }
};

export const editBusiness = (business) => async (dispatch) => {
  console.log(business)
  const response = await csrfFetch(`/api/businesses/${business?.id}`, {
      method: 'PUT',
      body: JSON.stringify(business),
      headers: {
          'Content-Type': 'application/json'
      }
  });
  const editedBusiness = await response.json();
  dispatch(editOneBusiness(editedBusiness));
}

export const deleteOneBusiness = id => async (dispatch) => {
  await csrfFetch(`/api/businesses/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({id}),
      headers: {
          'Content-Type': 'application/json'
      }
  });

    dispatch(deleteBusiness(id));

}

const initialState = {
};

const businessReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BUSINESSES:
          const allBusinesses = {}
            action.payload.forEach((event) => {
                if (event.id) allBusinesses[event.id] = event
            })
            return { ...allBusinesses }
        case EDIT_BUSINESS:
            const newEditState = {
              ...state,
              [action.payload.business.id]: action.payload.business
            }
            // const eventList = newState.map(id => newState[id]);
            // eventList.push(action.payload)
            return newEditState

        case ADD_BUSINESS:

            const newAddState = {
              ...state,
              [action.payload.business.id]: action.payload.business
            }
            // newState[action.payload.event.id]= action.payload
            // const eventList = newState.map(id => newState[id]);
            // eventList.push(action.payload)
            return newAddState
        case DELETE_BUSINESS:
          const newDeleteState = {...state}
          delete newDeleteState[action.payload]
          return newDeleteState

        default:
            return state;
    }
};

export default businessReducer;
