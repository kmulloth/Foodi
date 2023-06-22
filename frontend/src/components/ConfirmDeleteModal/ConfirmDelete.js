import * as businessActions from "../../store/businesses.js";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function ConfirmDelete({ businessId }) {
  // console.log("DELETE BUSINESS:", businessId);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(businessActions.deleteOneBusiness(businessId));
    history.push("/");
  };

  return (
    <form
      action={`/api/businesses/${businessId}`}
      method="delete"
      onSubmit={(e) => handleSubmit(e)}
    >
      <p>Are you sure you want to Delete this business?</p>
      <button type="submit" value="Delete business">
        Yes
      </button>
    </form>
  );
}

export default ConfirmDelete;
