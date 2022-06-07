import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import './BusinessForm.css';

function BusinessForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [name, setName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [body, setBody] = useState('');
    const [openTimes, setOpenTimes] = useState({0: '08:00', 1: '08:00', 2: '08:00', 3: '08:00', 4: '08:00', 5: '08:00', 6: '08:00'});
    const [closeTimes, setCloseTimes] = useState({0: '20:00', 1: '20:00', 2: '20:00', 3: '20:00', 4: '20:00', 5: '20:00', 6: '20:00'});
    const [location, setLocation] = useState('');
    const [rating, setRating] = useState(0);
    const [likes, setLikes] = useState(0);
    const [errors, setErrors] = useState([]);

    const {createBusiness} = require("../../store/businesses.js");

    useEffect(() => {
        const errors = [];
        console.log('SCHEDULE ::', openTimes, closeTimes);
        // console.log('date:', date, '--- today:', today);
        if (!name) errors.push('Title is required');
        if (!body) errors.push('Body is required');

        setErrors(errors);
    }, [name, body, openTimes, closeTimes]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const owner_id = sessionUser.id;
        const business = {name, imgUrl, owner_id, body, location, rating, likes};
        console.log('business:', business);
        dispatch(createBusiness(business)).then(() => history.push('/'));
    }
    return (
      <div className="business-form">
        <div className="business-form-container">
          <div id='img-sidebar'>
            <img src={imgUrl ? imgUrl : 'https://www.ppa.com/assets/images/ppmag_articles/2019320160929_ftinc_286_2.jpg'} alt="business-img" />
          </div>
            <form id='submit-business-form' onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Title</label>
                <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
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
                     <input type="time" name="schedule-0-open" id="schedule-0-open" value={openTimes[0]} onChange={e => setOpenTimes({...openTimes, 0: e.target.value})} />
                     <input type="time" name="schedule-0-close" id="schedule-0-close" value={closeTimes[0]} onChange={e => setCloseTimes({...closeTimes, 0: e.target.value})} />
                  <label htmlFor="schedule-0">Monday</label>
                     <input type="time" name="schedule-1-open" id="schedule-1-open" value={openTimes[1]} onChange={e => setOpenTimes({...openTimes, 1: e.target.value})} />
                     <input type="time" name="schedule-1-close" id="schedule-1-close" value={closeTimes[1]} onChange={e => setCloseTimes({...closeTimes, 1: e.target.value})} />
                  <label htmlFor="schedule-0">Tuesday</label>
                     <input type="time" name="schedule-2-open" id="schedule-2-open" value={openTimes[2]} onChange={e => setOpenTimes({...openTimes, 2: e.target.value})} />
                     <input type="time" name="schedule-2-close" id="schedule-2-close" value={closeTimes[2]} onChange={e => setCloseTimes({...closeTimes, 2: e.target.value})} />
                  <label htmlFor="schedule-0">Wednesday</label>
                     <input type="time" name="schedule-3-open" id="schedule-3-open" value={openTimes[3]} onChange={e => setOpenTimes({...openTimes, 3: e.target.value})} />
                     <input type="time" name="schedule-3-close" id="schedule-3-close" value={closeTimes[3]} onChange={e => setCloseTimes({...closeTimes, 3: e.target.value})} />
                  <label htmlFor="schedule-0">Thursday</label>
                     <input type="time" name="schedule-4-open" id="schedule-4-open" value={openTimes[4]} onChange={e => setOpenTimes({...openTimes, 4: e.target.value})} />
                     <input type="time" name="schedule-4-close" id="schedule-4-close" value={closeTimes[4]} onChange={e => setCloseTimes({...closeTimes, 4: e.target.value})} />
                  <label htmlFor="schedule-0">Friday</label>
                     <input type="time" name="schedule-5-open" id="schedule-5-open" value={openTimes[5]} onChange={e => setOpenTimes({...openTimes, 5: e.target.value})} />
                     <input type="time" name="schedule-5-close" id="schedule-5-close" value={closeTimes[5]} onChange={e => setOpenTimes({...closeTimes, 5: e.target.value})} />
                  <label htmlFor="schedule-0">Saturday</label>
                     <input type="time" name="schedule-6-open" id="schedule-6-open" value={openTimes[6]} onChange={e => setOpenTimes({...openTimes, 6: e.target.value})} />
                     <input type="time" name="schedule-6-close" id="schedule-6-close" value={closeTimes[6]} onChange={e => setCloseTimes({...closeTimes, 6: e.target.value})} />
                </div>
              </div>
              <div>
                <label htmlFor="location">Location</label>
                <input type="text" name="location" id="location" value={location} onChange={e => setLocation(e.target.value)} />
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
