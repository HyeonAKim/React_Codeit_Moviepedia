import ReviewList from "./ReviewList";
import mockItems from "../mock.json";
import { useState } from "react";

function App() {
  const [items, setItems] = useState(mockItems);
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleRatingClick = () => setOrder("rating");
  const handleCreatedClick = () => setOrder("createdAt");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };
  return (
    <>
      <div>
        <button onClick={handleRatingClick}>평점순</button>
        <button onClick={handleCreatedClick}>최신순</button>
      </div>
      <div>
        <ReviewList items={sortedItems} onDelete={handleDelete} />
      </div>
    </>
  );
}

export default App;
