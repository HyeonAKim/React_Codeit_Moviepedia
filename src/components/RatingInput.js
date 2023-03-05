import Rating from "./Rating";
import "./RatingInput.css";

function RatingInput({ name, value, onChange }) {
  const handleSelect = (nextValue) => onChange(name, nextValue);
  return (
    <Rating className="RatingInput" value={value} onSelect={handleSelect} />
  );
}

export default RatingInput;
