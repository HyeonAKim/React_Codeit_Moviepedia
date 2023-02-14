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

## 7. useEffect로 초기 데이터 가져오기

- 불러오기 버튼을 지우고 자동으로 데이터를 가져오려면 handleLoad() 함수를 실행하는 부분을 추가하면 된다.
  하지만 이렇게 됐을 때 무한루프를 타게되는데 그 이유는 비동기방식으로 데이터를 가져오고 setItems()에 데이터를 할당하게 되면서 페이지를 다시 렌더링하게 되기 때문이다. 즉 , 랜더링->서버에서데이터호출 ->setItems변경->랜더링 이렇게 계속 loop를 돌게된다.
- 이것을 방지하기 위해서 useEffect를 사용하면 된다. useEffect 함수에 실행할 handleLoad() 콜백함수와 빈배열을 넘겨주게 되면 초기에 한번만 랜더링되기 할 수 있다.
