export async function getReviews({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) {
  throw new Error("버그가 아니라 기능입니다.");
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/3564/film-reviews?${query}`
  );
  const body = await response.json();
  return body;
}
