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

## 14. 네트워크 에러 처리하기 2

- 에러범위를 조금 더 좁혀서 처리해보자.
- response.ok를 사용해서 에러가 어디서 발생하였는지 구체적으로 정의하여 보여주도록 변경.

## 15. 입력폼 만들기

- review form 을 react에서 처리하기
- ReviewForm.js를 생성하고 App.js에서 리뷰입력을 할 수 있는 html 생성
- 그리고 리뷰 내용을 받아 오는 state 생성하기

## 16. onSubmit 이벤트로 입력받은 값을 처리해보자.

- ReviewForm.js 에 버튼을 추가하고 type을 submit으로 설정
- form 에서 onSubmit 이벤트 발생 시 handleSubmint 이 실행되도록 하고
- handleSubmit 에서 title, rating, content 를 콘솔에 출력하도록 수정

## 17. 하나의 state로 폼구현하기

- values 객체로 파라미터를 한번에 받아서 처리.
- 태그의 name과 value를 활용해서 하나의 객체로 처리할 수 가 있음. 그러면 처리함수도 하나로 처리가 가능
- 처리함수 handleChange에서는 setValues를 활용할때 spred 구문을 활용해서 여러개의 값들을 한번에 처리

## 18. 파일 인풋

- 파일 인풋은 비제어 컴포넌트이다. 그래서 value값을 따로 지정하지 않는다. 지정하게 되면 오류 발생
- 그 이유는 보안문제로 반드시 사용자만 값을 바꿀 수 있다. javascript로는 값을 바꿀 수 없음 ( 파일 경로를 숨겨 줌)=> 반드시 비제어 props으로 만들어야함.

## 19.ref로 DOM노드 가져오기

- ref는 원하는 시점에 실제 dom노드에 접근하고 싶을 때 사용하는 Props임
- 주의 해야 할 점 : 항상 랜더링이 끝나고 나서 참조가 가능함
