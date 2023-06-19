import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import MapForm from '../MapForm';
import './BusinessForm.css';

function BusinessForm() {
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const regex = /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg)(\?[^\s[",><]*)?/

    const [key, setKey] = useState()

    const [name, setName] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    const [body, setBody] = useState('');
    const [type, setType] = useState('restaurant')
    const [cusine, setCusine] = useState('American')
    const [openTimes, setOpenTimes] = useState(Array(7).fill('11:00'));
    const [closeTimes, setCloseTimes] = useState(Array(7).fill('22:00'));
    const [location, setLocation] = useState('')
    const [lat, setLat] = useState(0.0)
    const [lng, setLng]= useState(0.0);
    const [rating, setRating] = useState(0);
    const [likes, setLikes] = useState(0);
    const [searchRes, setSearchRes] = useState('')
    const [errors, setErrors] = useState([]);
    const [locationMethod, setLocationMethod] = useState('map')

    const {createBusiness} = require("../../store/businesses.js");

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

    useEffect(() => {
      if(location === '') {
        setLat(0)
        setLng(0)
      }
    }, [location])

    const handleSubmit = (e) => {
        e.preventDefault();
        const owner_id = sessionUser.id;
        let openingTimes = openTimes.join(',');
        let closingTimes = closeTimes.join(',');
        // console.log('SCHEDULE ::', openingTimes, closingTimes);

        const business = {name, imgUrl, owner_id, body, type, cusine, openTimes: openingTimes, closeTimes: closingTimes, location, lat, lng, rating, likes};

        dispatch(createBusiness(business)).then(() => history.push('/'));
    }

    const clearPlaceholder = (searchRes) => {
      setLocation(searchRes)
      setSearchRes('')
    }

    return (
      <div className="business-form">
        <div className="business-form-container">
            <form id='submit-business-form' onSubmit={handleSubmit} autoComplete='off'>
              <div className='inputfields'>
                <div className='textfields'>
                  <div>
                    <input placeholder='Title' type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div>
                    <input placeholder='Paste Image URL' type="text" name="imgUrl" id="imgUrl" value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
                  </div>
                  <div>
                    <input placeholder='click on map or start typing' type="text" name="location" id="location" value={location} onClick={e => setLocationMethod('address')} onDoubleClick={e => setLocation('')} onChange={e => setLocation(e.target.value)} />
                    {searchRes && (
                      <div className='location-search' onClick={e => clearPlaceholder(searchRes)}>{searchRes}</div>
                    )}
                  </div>
                  <div>
                    <textarea placeholder='Describe your business' name="body" id="body" value={body} onChange={e => setBody(e.target.value)} />
                  </div>
                  <div className='dropdowns'>
                    <div>
                      <select name='cusine' value={cusine} onChange={e => setCusine(e.target.value)}>
                        <option value='American'>American</option>
                        <option value='Japanese'>Japanese</option>
                        <option value='French'>French</option>
                        <option value='Italian'>Italian</option>
                        <option value='Mediterranean'>Mediterranean</option>
                        <option value='Chinese'>Chinese</option>
                        <option value='Indian'>Indian</option>
                      </select>
                    </div>
                    <div>
                      <select name='type' id='type' value={type} onChange={e => setType(e.target.value)}>
                        <option name='restaurant' value='Restaurant'>Restaurant</option>
                        <option name='truck' value='truck'>Food Truck</option>
                        <option name='bar' value='Bar'>Bar</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="schedule">Hours of Business</label>
                    <table id='schedule-fields'>
                        <tr className='schedule-field'>
                          <td htmlFor="schedule-0">S</td>
                          <td><input type="time" name="schedule-0-open" id="schedule-0-open" value={openTimes[0]} onChange={e => setOpenTimes([ e.target.value, ...openTimes.slice(1)])} /></td>
                          <td><input type="time" name="schedule-0-close" id="schedule-0-close" value={closeTimes[0]} onChange={e => setCloseTimes([ e.target.value, ...closeTimes.slice(1)])} /></td>
                        </tr>
                        <tr className='schedule-field'>
                          <td htmlFor="schedule-0">M</td>
                          <td><input type="time" name="schedule-1-open" id="schedule-1-open" value={openTimes[1]} onChange={e => setOpenTimes([ openTimes[0], e.target.value, ...openTimes.slice(2)])} /></td>
                          <td><input type="time" name="schedule-1-close" id="schedule-1-close" value={closeTimes[1]} onChange={e => setCloseTimes([closeTimes[0], e.target.value, ...closeTimes.slice(2)])}/></td>
                        </tr>
                        <tr className='schedule-field'>
                          <td htmlFor="schedule-0">T</td>
                          <td><input type="time" name="schedule-2-open" id="schedule-2-open" value={openTimes[2]} onChange={e => setOpenTimes([ ...openTimes.slice(0, 2), e.target.value, ...openTimes.slice(3)])}/></td>
                          <td><input type="time" name="schedule-2-close" id="schedule-2-close" value={closeTimes[2]} onChange={e => setCloseTimes([ ...closeTimes.slice(0, 2), e.target.value, ...closeTimes.slice(3)])}/></td>
                        </tr>
                        <tr className='schedule-field'>
                          <td htmlFor="schedule-0">W</td>
                          <td><input type="time" name="schedule-3-open" id="schedule-3-open" value={openTimes[3]} onChange={e => setOpenTimes([...openTimes.slice(0, 3), e.target.value, ...openTimes.slice(4)])}/></td>
                          <td><input type="time" name="schedule-3-close" id="schedule-3-close" value={closeTimes[3]} onChange={e => setCloseTimes([...closeTimes.slice(0, 3), e.target.value, ...closeTimes.slice(4)])}/></td>
                        </tr>
                        <tr className='schedule-field'>
                          <td htmlFor="schedule-0">T</td>
                          <td><input type="time" name="schedule-4-open" id="schedule-4-open" value={openTimes[4]} onChange={e => setOpenTimes([ ...openTimes.slice(0, 4), e.target.value, ...openTimes.slice(5)])}/></td>
                          <td><input type="time" name="schedule-4-close" id="schedule-4-close" value={closeTimes[4]} onChange={e => setCloseTimes([...closeTimes.slice(0, 4), e.target.value, ...closeTimes.slice(5)])}/></td>
                        </tr>
                        <tr className='schedule-field'>
                          <td htmlFor="schedule-0">F</td>
                          <td><input type="time" name="schedule-5-open" id="schedule-5-open" value={openTimes[5]} onChange={e => setOpenTimes([...openTimes.slice(0, 5) ,e.target.value, openTimes[6]])}/></td>
                          <td><input type="time" name="schedule-5-close" id="schedule-5-close" value={closeTimes[5]} onChange={e => setCloseTimes([...closeTimes.slice(0, 5), e.target.value, closeTimes[6]])}/></td>
                        </tr>
                        <tr className='schedule-field'>
                          <td htmlFor="schedule-0">S</td>
                          <td><input type="time" name="schedule-6-open" id="schedule-6-open" value={openTimes[6]} onChange={e => setOpenTimes([...openTimes.splice(0, 6), e.target.value])}/></td>
                          <td><input type="time" name="schedule-6-close" id="schedule-6-close" value={closeTimes[6]} onChange={e => setCloseTimes([...closeTimes.splice(0, 6), e.target.value])}/></td>
                        </tr>
                    </table>
                  </div>
                </div>
                <div className='mapfield'>
                  <div id='mapform-container'>
                    <MapForm lat={lat} setLat={setLat} lng={lng} setLng={setLng} location={location} setLocation={setLocation} searchRes={searchRes} setSearchRes={setSearchRes} locationMethod={locationMethod} setLocationMethod={setLocationMethod}/>
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
