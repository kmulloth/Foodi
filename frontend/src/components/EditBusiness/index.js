import React,{useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import './EditBusiness.css';

function EditBusiness() {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [body, setBody] = useState('');
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState(0);
    const [likes, setLikes] = useState(0);
    const [errors, setErrors] = useState([]);

    const {editBusiness} = require("../../store/businesses.js");
    const {businessId} = useParams();

    useEffect(() => {
        const errors = [];

        if (!name) errors.push('Title is required');
        if (!body) errors.push('Body is required');

        setErrors(errors);
    }, [name, body]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const owner_id = sessionUser.id;
        const business = { id: businessId, name, imgUrl, owner_id, body, location, rating, likes};
        console.log('business:', business);
        dispatch(editBusiness(business)).then(() => history.push(`/businesses/${businessId}`));
    }
    return (
        <div className="business-form-container">
            <ul id='errors'>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Title:</label>
                    <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
                <label htmlFor="imgUrl">Image URL:</label>
                    <input type="text" name="imgUrl" id="imgUrl" value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
                <label htmlFor="body">Body:</label>
                    <textarea name="body" id="body" value={body} onChange={e => setBody(e.target.value)} />
                <label htmlFor="location">Location:</label>
                    <input type="text" name="location" id="location" value={location} onChange={e => setLocation(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditBusiness;
