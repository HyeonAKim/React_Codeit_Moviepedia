import ReviewList from "./ReviewList";
import items from "../mock.json";
import { useState } from "react";

function App() {
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleRatingClick = () => setOrder("rating");
  const handleCreatedClick = () => setOrder("createdAt");

  return (
    <>
      <div>
        <button onClick={handleRatingClick}>평점순</button>
        <button onClick={handleCreatedClick}>최신순</button>
      </div>
      <div>
        <ReviewList items={sortedItems} />
      </div>
    </>
  );
}

export default App;
