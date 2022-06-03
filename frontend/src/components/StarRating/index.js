import { useState } from "react";
import './StarRating.css';

const StarRating = ({value, setValue}) => {
    const [hover, setHover] = useState(0);
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (hover || value) ? "on" : "off"}
              onClick={() => setValue(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(value)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    );
  };

export default StarRating;
