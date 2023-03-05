import { useState } from "react";
import Rating from "./Rating";
import "./RatingInput.css";

function RatingInput({ name, value, onChange }) {
  const [rating, setRating] = useState(value);

  const handleSelect = (nextValue) => onChange(name, nextValue);
  const handleMouesOut = () => setRating(value);

  return (
    <Rating
      className="RatingInput"
      value={rating}
      onSelect={handleSelect}
      onHover={setRating}
      onMouseOut={handleMouesOut}
    />
  );
}

export default RatingInput;
