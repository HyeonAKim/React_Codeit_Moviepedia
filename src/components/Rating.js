import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, rating, onSelect }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleClick = onSelect ? () => onSelect(rating) : undefined;

  return (
    <span className={className} onClick={handleClick}>
      ★
    </span>
  );
}

function Rating({ className, value = 0, onSelect }) {
  return (
    <div className={className}>
      {RATINGS.map((rating) => (
        <Star
          key={rating}
          selected={value >= rating}
          rating={rating}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default Rating;
