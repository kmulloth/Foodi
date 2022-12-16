import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import MapForm from '../MapForm';
import './BusinessForm.css';

function BusinessForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [key, setKey] = useState()

    const [name, setName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [body, setBody] = useState('');
    const [openTimes, setOpenTimes] = useState(Array(7).fill('11:00'));
    const [closeTimes, setCloseTimes] = useState(Array(7).fill('22:00'));
    const [location, setLocation] = useState('')
    const [lat, setLat] = useState(0.0)
    const [lng, setLng]= useState(0.0);
    const [rating, setRating] = useState(0);
    const [likes, setLikes] = useState(0);
    const [errors, setErrors] = useState([]);

    const {createBusiness} = require("../../store/businesses.js");

    useEffect(() => {
        const errors = [];
        // console.log('SCHEDULE ::', openTimes, closeTimes);
        // console.log('date:', date, '--- today:', today);
        if (!name) errors.push('Title is required');
        if (!body) errors.push('Body is required');
        if (openTimes.includes('') || closeTimes.includes('')) errors.push('Schedule is required');

        setErrors(errors);
    }, [name, body, openTimes, closeTimes]);

    useEffect(() => {
      console.log(lat, lng)
    }, [lat, lng])

    const handleSubmit = (e) => {
        e.preventDefault();
        const owner_id = sessionUser.id;
        let openingTimes = openTimes.join(',');
        let closingTimes = closeTimes.join(',');
        console.log('SCHEDULE ::', openingTimes, closingTimes);

        const business = {name, imgUrl, owner_id, body, openTimes: openingTimes, closeTimes: closingTimes, location, lat, lng, rating, likes};

        dispatch(createBusiness(business)).then(() => history.push('/'));
    }

    return (
      <div className="business-form">
        <div className="business-form-container">
            <form id='submit-business-form' onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Title</label>
                <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label htmlFor="location">Location</label>
                <input type="text" name="location" id="location" value={location} onChange={e => setLocation(e.target.value)} />
                <div id='mapform-container'>
                  <MapForm lat={lat} setLat={setLat} lng={lng} setLng={setLng}/>
                </div>
              </div>
              <div>
                <label htmlFor="imgUrl">Cover Image (URL)</label>
                <input type="text" name="imgUrl" id="imgUrl" value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
              </div>
              <div>
                <label htmlFor="body">Body</label>
                <textarea name="body" id="body" value={body} onChange={e => setBody(e.target.value)} />
              </div>
              <div>
                <label htmlFor="schedule">Hours</label>
                <div id='schedule-fields'>
                  <label htmlFor="schedule-0">Sunday</label>
                    <div className='schedule-field'>
                      <input type="time" name="schedule-0-open" id="schedule-0-open" value={openTimes[0]} onChange={e => setOpenTimes([ e.target.value, ...openTimes.slice(1)])} />
                      <input type="time" name="schedule-0-close" id="schedule-0-close" value={closeTimes[0]} onChange={e => setCloseTimes([ e.target.value, ...closeTimes.slice(1)])} />
                    </div>
                  <label htmlFor="schedule-0">Monday</label>
                    <div className='schedule-field'>
                      <input type="time" name="schedule-1-open" id="schedule-1-open" value={openTimes[1]} onChange={e => setOpenTimes([ openTimes[0], e.target.value, ...openTimes.slice(2)])} />
                      <input type="time" name="schedule-1-close" id="schedule-1-close" value={closeTimes[1]} onChange={e => setCloseTimes([closeTimes[0], e.target.value, ...closeTimes.slice(2)])}/>
                    </div>
                  <label htmlFor="schedule-0">Tuesday</label>
                    <div className='schedule-field'>
                      <input type="time" name="schedule-2-open" id="schedule-2-open" value={openTimes[2]} onChange={e => setOpenTimes([ ...openTimes.slice(0, 2), e.target.value, ...openTimes.slice(3)])}/>
                      <input type="time" name="schedule-2-close" id="schedule-2-close" value={closeTimes[2]} onChange={e => setCloseTimes([ ...closeTimes.slice(0, 2), e.target.value, ...closeTimes.slice(3)])}/>
                    </div>
                  <label htmlFor="schedule-0">Wednesday</label>
                    <div className='schedule-field'>
                      <input type="time" name="schedule-3-open" id="schedule-3-open" value={openTimes[3]} onChange={e => setOpenTimes([...openTimes.slice(0, 3), e.target.value, ...openTimes.slice(4)])}/>
                      <input type="time" name="schedule-3-close" id="schedule-3-close" value={closeTimes[3]} onChange={e => setCloseTimes([...closeTimes.slice(0, 3), e.target.value, ...closeTimes.slice(4)])}/>
                    </div>
                  <label htmlFor="schedule-0">Thursday</label>
                    <div className='schedule-field'>
                      <input type="time" name="schedule-4-open" id="schedule-4-open" value={openTimes[4]} onChange={e => setOpenTimes([ ...openTimes.slice(0, 4), e.target.value, ...openTimes.slice(5)])}/>
                      <input type="time" name="schedule-4-close" id="schedule-4-close" value={closeTimes[4]} onChange={e => setCloseTimes([...closeTimes.slice(0, 4), e.target.value, ...closeTimes.slice(5)])}/>
                    </div>
                  <label htmlFor="schedule-0">Friday</label>
                    <div className='schedule-field'>
                      <input type="time" name="schedule-5-open" id="schedule-5-open" value={openTimes[5]} onChange={e => setOpenTimes([...openTimes.slice(0, 5) ,e.target.value, openTimes[6]])}/>
                      <input type="time" name="schedule-5-close" id="schedule-5-close" value={closeTimes[5]} onChange={e => setCloseTimes([...closeTimes.slice(0, 5), e.target.value, closeTimes[6]])}/>
                    </div>
                  <label htmlFor="schedule-0">Saturday</label>
                    <div className='schedule-field'>
                      <input type="time" name="schedule-6-open" id="schedule-6-open" value={openTimes[6]} onChange={e => setOpenTimes([...openTimes.splice(0, 6), e.target.value])}/>
                      <input type="time" name="schedule-6-close" id="schedule-6-close" value={closeTimes[6]} onChange={e => setCloseTimes([...closeTimes.splice(0, 6), e.target.value])}/>
                    </div>
                </div>
              </div>
              <button type="submit" disabled={errors.length > 0}>Submit</button>
              <ul id='errors'>
                  {errors.map(error => <li key={error}>{error}</li>)}
              </ul>
            </form>
        </div>
      </div>
    )
}

export default BusinessForm;
