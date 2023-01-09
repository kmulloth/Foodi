import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import MapForm from '../MapForm';
import './EditBusiness.css';

function EditBusiness() {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const businesses = useSelector(state => state.businesses)
    const {editBusiness} = require("../../store/businesses.js");
    const {businessId} = useParams();
    const business = businesses[businessId]

    const [name, setName] = useState(business?.name);
    const [imgUrl, setImgUrl] = useState(business?.imgUrl);
    const [body, setBody] = useState(business?.body);
    const [type, setType] = useState(business?.type)
    const [cusine, setCusine] = useState(business?.cusine)
    const [openTimes, setOpenTimes] = useState(business?.openTimes.split(','));
    const [closeTimes, setCloseTimes] = useState(business.closeTimes.split(','));
    const [location, setLocation] = useState(business?.location)
    const [lat, setLat] = useState(business?.lat)
    const [lng, setLng]= useState(business?.lng);
    const [rating, setRating] = useState(business?.rating);
    const [likes, setLikes] = useState(business?.likes);
    const [errors, setErrors] = useState([]);
    const regex = /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg)(\?[^\s[",><]*)?/

    useEffect(() => {
        const errors = [];
        // console.log('SCHEDULE ::', openTimes, closeTimes);
        // console.log('type::', type, 'cusine::', cusine);
        if (!location) errors.push('Click on the map to select a location')
        if (!name) errors.push('Title is required');
        if (!body) errors.push('Body is required');
        if (!regex.test(imgUrl)) errors.push('Cover Image is required')
        if (openTimes.includes('') || closeTimes.includes('')) errors.push('Schedule is required');

        setErrors(errors);
    }, [name, body, type, cusine, imgUrl, location, openTimes, closeTimes]);

    useEffect(() => console.log(type, cusine), [type, cusine])

    const handleSubmit = (e) => {
        e.preventDefault();
        const owner_id = sessionUser.id;
        let openingTimes = openTimes.join(',');
        let closingTimes = closeTimes.join(',');

        const newbusiness = {id: businessId, name, imgUrl, owner_id, body, type, cusine, openTimes: openingTimes, closeTimes: closingTimes, location, lat, lng, rating, likes};
        console.log(newbusiness)
        dispatch(editBusiness(newbusiness)).then(() => history.push(`/businesses/${businessId}`));
    }
    return (
        <div className="business-form">
          <div className="business-form-container">
              <form id='submit-business-form' onSubmit={handleSubmit}>
                <div className='inputfields'>
                  <div className='textfields'>
                    <div>
                      <input placeholder='Title' type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                      <input placeholder='Paste Image URL' type="text" name="imgUrl" id="imgUrl" value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
                    </div>
                    <div>
                        <input placeholder='Click on map to set Location' type="text" name="location" id="location" disabled={true} value={location} onChange={e => setLocation(e.target.value)} />
                    </div>
                    <div>
                      <textarea placeholder='Describe your business' name="body" id="body" value={body} onChange={e => setBody(e.target.value)} />
                    </div>
                    <div>
                      <label htmlFor='type'>Establishment Type</label>
                      <select name='type' id='type' value={type} onChange={e => setType(e.target.value)}>
                        <option name='restaurant' value='Restaurant'>Restaurant</option>
                        <option name='truck' value='truck'>Food Truck</option>
                        <option name='bar' value='Bar'>Bar</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor='cusine'>Cusine</label>
                      <select name='cusine' value={cusine} onChange={e => setCusine(e.target.value)}>
                        <option value='American'>American</option>
                        <option value='Japanese'>Japanese</option>
                        <option value='French'>French</option>
                        <option value='Italian'>Italian</option>
                        <option value='Mediterranean'>Mediterranean</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="schedule">Hours</label>
                      <div id='schedule-fields'>
                          <div className='schedule-field'>
                            <label htmlFor="schedule-0">Su</label>
                            <input type="time" name="schedule-0-open" id="schedule-0-open" value={openTimes[0]} onChange={e => setOpenTimes([ e.target.value, ...openTimes.slice(1)])} />
                            <input type="time" name="schedule-0-close" id="schedule-0-close" value={closeTimes[0]} onChange={e => setCloseTimes([ e.target.value, ...closeTimes.slice(1)])} />
                          </div>
                          <div className='schedule-field'>
                            <label htmlFor="schedule-0">M</label>
                            <input type="time" name="schedule-1-open" id="schedule-1-open" value={openTimes[1]} onChange={e => setOpenTimes([ openTimes[0], e.target.value, ...openTimes.slice(2)])} />
                            <input type="time" name="schedule-1-close" id="schedule-1-close" value={closeTimes[1]} onChange={e => setCloseTimes([closeTimes[0], e.target.value, ...closeTimes.slice(2)])}/>
                          </div>
                          <div className='schedule-field'>
                            <label htmlFor="schedule-0">T</label>
                            <input type="time" name="schedule-2-open" id="schedule-2-open" value={openTimes[2]} onChange={e => setOpenTimes([ ...openTimes.slice(0, 2), e.target.value, ...openTimes.slice(3)])}/>
                            <input type="time" name="schedule-2-close" id="schedule-2-close" value={closeTimes[2]} onChange={e => setCloseTimes([ ...closeTimes.slice(0, 2), e.target.value, ...closeTimes.slice(3)])}/>
                          </div>
                          <div className='schedule-field'>
                            <label htmlFor="schedule-0">W</label>
                            <input type="time" name="schedule-3-open" id="schedule-3-open" value={openTimes[3]} onChange={e => setOpenTimes([...openTimes.slice(0, 3), e.target.value, ...openTimes.slice(4)])}/>
                            <input type="time" name="schedule-3-close" id="schedule-3-close" value={closeTimes[3]} onChange={e => setCloseTimes([...closeTimes.slice(0, 3), e.target.value, ...closeTimes.slice(4)])}/>
                          </div>
                          <div className='schedule-field'>
                            <label htmlFor="schedule-0">Th</label>
                            <input type="time" name="schedule-4-open" id="schedule-4-open" value={openTimes[4]} onChange={e => setOpenTimes([ ...openTimes.slice(0, 4), e.target.value, ...openTimes.slice(5)])}/>
                            <input type="time" name="schedule-4-close" id="schedule-4-close" value={closeTimes[4]} onChange={e => setCloseTimes([...closeTimes.slice(0, 4), e.target.value, ...closeTimes.slice(5)])}/>
                          </div>
                          <div className='schedule-field'>
                            <label htmlFor="schedule-0">F</label>
                            <input type="time" name="schedule-5-open" id="schedule-5-open" value={openTimes[5]} onChange={e => setOpenTimes([...openTimes.slice(0, 5) ,e.target.value, openTimes[6]])}/>
                            <input type="time" name="schedule-5-close" id="schedule-5-close" value={closeTimes[5]} onChange={e => setCloseTimes([...closeTimes.slice(0, 5), e.target.value, closeTimes[6]])}/>
                          </div>
                          <div className='schedule-field'>
                            <label htmlFor="schedule-0">Sa</label>
                            <input type="time" name="schedule-6-open" id="schedule-6-open" value={openTimes[6]} onChange={e => setOpenTimes([...openTimes.splice(0, 6), e.target.value])}/>
                            <input type="time" name="schedule-6-close" id="schedule-6-close" value={closeTimes[6]} onChange={e => setCloseTimes([...closeTimes.splice(0, 6), e.target.value])}/>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div className='mapfield'>
                  <div id='mapform-container'>
                    <MapForm lat={lat} setLat={setLat} lng={lng} setLng={setLng} setLocation={setLocation}/>
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

export default EditBusiness;
