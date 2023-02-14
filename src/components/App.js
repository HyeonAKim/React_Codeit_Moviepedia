import ReviewList from "./ReviewList";
import { useState } from "react";
import { getReviews } from "../api";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleRatingClick = () => setOrder("rating");
  const handleCreatedClick = () => setOrder("createdAt");

  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  };

  const handleLoadClick = async () => {
    const { reviews } = await getReviews();
    setItems(reviews);
  };
  return (
    <>
      <div>
        <button onClick={handleRatingClick}>평점순</button>
        <button onClick={handleCreatedClick}>최신순</button>
      </div>
      <div>
        <ReviewList items={sortedItems} onDelete={handleDelete} />
        <button onClick={handleLoadClick}>불러오기</button>
      </div>
    </>
  );
}

export default App;
