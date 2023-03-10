function ImgCarousel({business, reviews}){

    const images = [business?.imgUrl]
    reviews?.forEach(review => {if (review?.img) images.push(review?.img)})

    const today = new Date()
    const hours = () => {
        const openTimes = business?.openTimes.split(',')
        const closeTimes = business?.closeTimes.split(',')
        // console.log(business, openTimes, closeTimes)
        return [
            [openTimes[0], closeTimes[0], 'Sunday'],
            [openTimes[1], closeTimes[1], 'Monday'],
            [openTimes[2], closeTimes[2], 'Tuesday'],
            [openTimes[3], closeTimes[3], 'Wednesday'],
            [openTimes[4], closeTimes[4], 'Thursday'],
            [openTimes[5], closeTimes[5], 'Friday'],
            [openTimes[6], closeTimes[6], 'Saturday'],
        ]
    }

    const todayHours = hours()[today.getDay()]

    const isOpen = () => {
        if (today.getHours() < todayHours[0].split(':')[0] || today.getHours() > todayHours[1].split(':')[0]){
            if (today.getMinutes() < todayHours[0].split(':')[1] || today.getMinutes() > todayHours[1].split(':')[1]){
                return false
            } else return true
        } else return true
    }

    return (
        <div className="Business-header">
            <div className="Business-info">
                <h2>{business?.name}</h2>
                <div
                    className="Stars"
                    style={{'--rating':business?.rating > 0 ? business?.rating.toFixed(1) : 0}}
                    aria-label={`Rating of this business is ${business?.rating / 5 * 100}%`}
                >
                    <p>&ensp;{reviews?.length} reviews</p>
                </div>
                <p>{business?.cusine} • {business?.type}</p>
                <p><strong style={{color: isOpen() ? 'mediumseagreen' : 'red'}}>{isOpen() ? 'Open' : 'Closed'}</strong> {new Date('1970-01-01T'+todayHours[0]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})} - {new Date('1970-01-01T'+todayHours[1]+'Z').toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric', timeZone: 'UTC'})}</p>
            </div>
            <div className='biz-image-carousel'>
            {images.map((image, i) => {
                return (<img key={i} width='100%' src={image}/>)
            })}
            </div>
        </div>
    )
}

export default ImgCarousel;
