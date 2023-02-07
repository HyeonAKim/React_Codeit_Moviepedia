## React로 영화 리뷰사이트 만들기

## 1. npm init react-app .

## 2. 배열 랜더링해서 json 파일 불러오기

[array].map(([item])=> {return([html]);})

## 3. sort로 정렬바꾸기

const [order, setOrder] = useState("createdAt");
const sortedItems = items.sort((a, b) => b[order] - a[order]);
