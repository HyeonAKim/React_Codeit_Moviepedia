## React로 영화 리뷰사이트 만들기

## 1. npm init react-app .

## 2. 배열 랜더링해서 json 파일 불러오기

- [array].map(([item])=> {return([html]);})

## 3. sort로 정렬바꾸기

- const [order, setOrder] = useState("createdAt");
- const sortedItems = items.sort((a, b) => b[order] - a[order]);

## 4. Filter 로 아이템 삭제하기

- const [items, setItems] = useState(mockItems);
- const handleDelte = (id) => {
  const nextItems = items.filter((item) => item.id !== id) ;
  setItems(nextItems); };

## 5. 배열 랜더링을 할때 key 를 기억하자

- 배열 인덱스로는 key로 활용할 수 없다
- key 가 없을때는 요소들의 순서가 바뀔때 엉뚱한 곳에 갈 수 있다.
  그래서 반드시 데이터의 고유값으로 key 를 지정해줘야한다.

- 왜 이런 현상이 나타날까? 배열 결과만 봐서는 어떻게 변경된것인지 알 수 없다.
  배열의 변화를 정확하게 전달하기 위해서는 key를 전달해줘야한다.

## 6. Mock 데이터 대신에 서버에서 데이터를 가져와보자

- fetch 함수, async , await 로 서버에 있는 데이터를 가져오자.
