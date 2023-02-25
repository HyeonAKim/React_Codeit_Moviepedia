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

## 8. 정렬된 데이터 불러오기

- 기존 방식대로 정렬을 하게되면 api 에서 받아온 10개의 데이터에 대해서만 정렬이 이뤄진다. 전체 데이터에서 정렬을 하려면 서버에서 정렬된 값을 가져와야한다. 서버에서 정렬된 값을 가져오려면 어떻게해야할까?
- useEffect 함수와 url query를 사용해서 가져오자.
- useEffect 는 콜백함수와 배열을 넘겨줬었다. 여기서 콜백함수는 비동기 실행 함수고 , 배열은 디펜더시리스트라고 부르는 값이다. useEffect는 곧바로 콜백함수를 실행하는게 아니라 랜더링이 끝나면 콜백함수를 실행해준다. 이때 디펜던시 리스트도 같이 기억해둔다. 코드의 useState가 변경되면 다시 랜더링이 되는데 다시 랜더링하면서 useEffect가 실행되는데 이때 디펜던시리스트를 앞에서 기억해둔것과 비교한다. 만약 같으면 콜백함수를 실행하지 않고 다를경우에만 콜백함수를 실행하게 된다.
- 이런 useEffect의 성질을 이용해서 서버에서 데이터를 바꿔가면서 받아오자.
- 버튼을 누를때마다 바뀌는 order state를 getReviews함수에 아큐먼트로 넘겨서 해당 url 값을 가져오도록 수정한다.

## 9. 페이지네이션 더보기 만들기 (오프셋페이지네이션)

- 처음 랜더링할때 useEffect에서 handleLoad order, offset, limit 값을 보냄
- offset값이 0 + 6 offset값이 바뀜 -> 재 랜더링이 됨
- 더보기를 누르게 되면 offset값이 0이 아니니까 배열에 데이터들이 추가되고 재랜더링이 됨
- 더이상 불러올 데이터가 없다면? paging 에서 hasNext 값을 가져와서 버튼을 비활성화하게끔 설정해준다.

## 10. 더 볼 내용이 없다면 더보기 버튼을 없애기 ( 조건부 랜더링 )

- && 조건식으로 hasNext가 false가 되면 button 이 실행되지 않게 활용
- 조건부 랜더링 꿀팁!
- && 연산자 : 변수 값이 true이면 랜더링하고, false이면 실행되지 않음
- OR(||)연산자 : 변수값이 true이면 랜더링하지 않고, false이면 실행한다.
- 삼항연산자 : 참과 거짓일 경우 다르게 랜더링을 해준다.
  {toggle ? <p>yes</p> : <p>no</p>}
  toggle이 참일경우 yes 를 거짓일 경우 no를 랜더링한다.
- 랜더링 되지 않는 값들 : nullValue, undefinedValue, trueValue, falseValue, emptyString, emptyArray 하지만 zero, one는 랜더링한다.
- 조건부 랜더링 주의사항 : 숫자 0 은 false 값이 아니다! true, false 값은 랜더링을 하지 않으니 명확한 논리식을 작성하는 것이 중요하다.
  {(num > 0) && <p>num이 0보다 크다</p>}

## 11. 비동기로 state를 사용할 때 주의할 점

- 속도가 느리게 하고 더보기 버튼을 누르고 삭제하면 다시 나타나는 현상이 있음
- 비동기로 사용할때는 기존 item 리스트를 가지고 있어서 웨이팅되는 동안 item이 변경되어도 변경전 Item리스트가 작동하게 되는것.
- 이 문제를 해결하기 위해서는 setter함수에서 콜백함수를 사용하면 됨. 콜백함수는 현재 state값을 전달하기 때문

## 12. 네트워크 로딩 처리하기

- 네트워크 속도를 느리게 설정한 다음 더보기 버튼을 연속으로 누르게 되면 데이터들이 중복으로 로딩된다.
- 이를 방지하기 위해 데이터가 로딩 중에는 더보기 버튼을 비활성화 하겠다.
- isLoading state를 생성하고 , 리뷰를 가져오는 부분에 try catch문을 걸어주고 isLoading 을 true로 설정. 그리고 리뷰를 다 가져오면 그때 isLoading 부분을 다시 false로 변경되게 설정

## 13. 네트워크 에러 처리하기

- 네트워크 에러를 state로 처리할 수 있다. api.js 파일에서 에러를 일부러 발생시키고 이 에러를 표시해주자.
- optional chaining 을 활용해서 error.message가 있을 때만 표시해주도록 하자.
