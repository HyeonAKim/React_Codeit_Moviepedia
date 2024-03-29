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

## 20. 파일인풋 초기화

- 파일 인풋의 속성값은 사용자만 바꿀 수 있고, 자바스크립트로는 빈 문자열로만 변경이 가능함
- 파일 인풋의 값이 있을 경우 클리어버튼을 생성하고 클릭이벤트로 파일 인풋을 빈 문자열로 초기화하는 기능 추가

## 21. 이미지 미리보기 생성

- 네트워크 리퀘스트, 메모리 할당 같이 컴포넌트 함수에서 외부의 상태를 변경할 때 이를 사이드effect라고 한다. 이때 주로 useEffect를 활용한다.
- 이미지 파일을 선택할 때 미리보기를 만들자. objectURL로 생성할것 -> 사용자 컴퓨터에 있는 이미지를 주소로 사용할 수 있음
- 파일 주소를 저장할 state를 생성 하자. preview
- useEffect를 활용해서 파일이 변경 될때마다 미리보기 이미지가 달라지도록 하자.

## 22. 이미지 미리보기 sideEffect 정리하기

- 초기화 버튼을 눌러도 preview에는 url에 남아 있어서 이를 정리해줘야함 .
- 화면에 보이지 않게 하기 위해서는 단순히 value 값이 null 일 때 setPreview값을 빈 값으로 넘기면 됨
- 하지만 브라우져 메모리에 담긴 objectURL은 초기화가 되지 않음. return 값에 콜백함수로 초기화하도록 넘겨줘야함

## 23. 별점 컴포넌트 만들기

- 각 영화 리뷰에서 별점 컴포넌트를 만들자. Rating.js , Rating.css
- RATINGS 배열과 Map함수를 이용해서 Star Component 를 생성할 수 있도록 수정해준다.

## 24. 별점 인풋 만들기 (select 함수 정의 )

- ReviewForm.js 에서 rating input 컴포넌트를 생성할것이다. rating input을 대신할 RatingInput.js 를 생성하자. RatingInput 컴포넌트에 전달할 Props은 name, value, onChange함수이다. onChange 함수는 변경 전에 handleInputChange를 사용하는데 별을 클릭 시 바뀐 값을 가져올 것으로 handleChange로 변경하자.
- RatingInput.js를 생성하고 name, value, onChange(handleChange)를 받는 function(RatingInput)을 생성하자. Return 값으로는 Rating 컴포넌트를 넘긴다. Rating의 props으로 rating 값과 별이 클릭되었을때 별점 값을 받아 Onchange(handleChange) 함수를 실행하는 handleSelect를 전달하자.
- Rating.js를 수정하자. 기존에 value 값만 props으로 받았던 Rating 함수를 onSelect props을 추가해서 받도록 수정한다. 그리고 Star 함수에 rating 값과 onSelect props을 추가하고 onSelect(handleSelect)를 넘겨준다.
- Star 함수에서 이제 별을 클릭했을 때 handleSelect 값에 별의 rating 점수를 전달하면 된다. onSelect prop 값이 존재하면 값에 rating 값을 전달하고 아니면 undefine로 선언하는 handleClick 함수를 생성하고 별을 표시하는 span 에 onClick 이벤트에 handleClick 함수를 지정해주면 된다.
- 별을 클릭시에 onClick -> Star.handleClick(rating) -> Rating.onSelect(rating)-> RatingInput.onChange(name, rating) -> ReviewForm.handleChange(name, rating) 이렇게 함수가 함수를 실행하는 방식으로 최상위 함수가 실행된다.
- 여기까지하면 별을 클릭할 때 ReviewForm State 가 잘 변경되는 것을 확인할 수 있다. 하지만 여기서 Rating 에서 key props이 필요하다는 warning 이 발생하는데 이것은 Rating.js에서 Rating 함수에서 여러개의 star 컴포넌트를 호출할때 key 값을 설정해주면된다.
- 추가로 별 선택할 때 마우스 포인트를 바꿔주는 css를 적용하자. RatingInput.css 를 생성하고 RatingInput.js에 import 한다. 그리고 Rating 컴포넌트에 className을 전달한다. Rating.js에서 Rating 함수의 props에 className을 추가하고 div 태그에 해당 className을 적용한다.

## 25. 별점 인풋 만들기 (마우스오버, 마우스아웃 효과 적용하기)

- RatingInput.js 에서 마우스오버와 마우스아웃 시 Rating 컴포넌트에 전달할 props 함수를 생성할 것이다.
- 먼저 마우스오버시에는 해당 별들의 색상이 바뀔 수 있게 rating state를 생성하고 Rating 컴포넌트에 onHover를 생성해서 setRating state함수를 전달하자. 그리고 마우스를 올렸을 때 색상이 변하도록 value값에 rating state를 전달하자.
- Rating.js에서 Rating 함수에서 onHover(setRating)을 받아서 Star 컴포넌트로 전달한다. Star 함수에서 마우스가 over 이벤트를 생성하고 handleMouseOver 함수가 실행되도록한다. handleMouseOver함수는 onHover(setRating) 함수에 현재 마우스가 올라간 rating 값을 전달한다.
- 이렇게 하면 마우스를 올렸을때 별 생각이 변경 되지만 ReviewForm 에 state 값을 바뀌지 않는 것을 알 수 있다. 그럼 이제 마우스아웃 효과를 적용해보자.
- RatingInput.js 에서 handleMouseOut 함수를 생성하고 setRating 값을 ReviewForm에서 전달받은 value값으로 설정해주자. 그런다음 Rating 컴포넌트에 onMouseOut props을 생성해서 handleMouseOut 함수를 전달하자.
- Rating.js 에서 Rating 함수에서 onMouseOut 프롭을 추가하고 div 태그에 onMouseOut 이벤트에 onMouseOut 함수를 할당해주자.

# 26. 글작성하기

- 데이터 보내기 : formData 를 생성하고 fetch('link', {method:'POST', body: formData,}); 식으로 데이터를 보내줄 수 있다.
- 그럼 영화리뷰를 작성해서 글을 보내보자.
- 1. api.js 파일에서 fetch를 보내는 createReview 함수를 만들자.
- 2. ReviewForm.js 파일에서 handleSumit이 실행될때 createReview함수가 실행되도록 변경하자. 그리고 보낸뒤에는 inital_value로 입력 값들을 초기화 하자.
- 3. 전송을 할때 여러번 전송되는 것을 방지하고자 에러처리를 마지막으로 해주면 된다. App.js 에서 isLoading 처리했던 부분과 동일하다.

# 27. 리스폰스 데이터 반영학

- 새로고침 없이 곧바로 반영하는 방법을 알아보자. 네트워크에서 받은 response를 App.js 의 item목록에 추가하면 된다.
- 1. App.js 에서 review 값을 기존 item에 반영하는 함수(handleSubmitSuccess)를 생성하자.
- 2. ReviewForm 에 probs onSubmitSuccess라는 이름으로 handleSubmitSuccess 함수를 전달하자.
- 3. response 값을 받아서 onSubmitSuccess함수로 전달하면 끗!

## 28. 글 수정하기 1

- 수정버튼을 눌렀을 때 입력폼을 보여주기 : 리뷰리스트에서 해당 리스트를 기억하고, 해당 리뷰만 랜더링하는 것이 키포인트이다.
- ReviewList에서 editingId 라는 state를 만들고 item.id 가 editingId와 동일할 때 리뷰폼을 보여준다.
- 수정버튼을 눌렀을때 editingId에 item.id를 할당한다. 이렇게 하면 수정 버튼을 누르면 입력폼이 나온다.
- 이제 수정버튼을 눌렀을 때 입력폼에 기존 리뷰가 작성되어 있게끔 변경해주자.
- reviewForm.js에서 initalvalue, onCancle Props을 생성해서 기본값으로 할당하고 onCancle 함수가 있을때만 취소버튼이 보이도록 하자.
- 이제 ReviewList.js에서 initalValue값과 onCancle 프롭을 내려주자. 수정버튼을 눌렀을때 기본값으로 item의 내용을 전달하고 취소버튼을 눌렀을때 editingId를 Null로 변경하자.
- 다음으로는 이미지 url를 전달하자. ReviewList.js initialPreview 프롭으로 ReviewForm.js에 imgURL를 전달하고 이프롭을 그대로 FileInput으로 보내주자.
- fileInput.js에서 initailPreview를 setPreview의 초기값으로 설정해주자. 이미지를 취소하였을 때도 원래의 이미지를 보여줄 수 있게끔 useEffect return에서 초기화하는 부분에도 initialPreview로 설정해놓고, useEffect가 실행되는 dependancy 파라에도 initialPreview를 추가해주자.

5일을 쉬었더니 코딩하는것도 어색해졌다. 음악하는 분들이 매일 악기를 다루고, 운동하는 사람들이 매일 운동을 하듯이 나는 코딩하는 사람이니 매일 조금이라고 코딩을 해야겠다. 다시 시작하자!

## 29. 글 수정하기 2

- 리뷰를 수정하고 서버에 전송하자.
- reviewForm.js 에서는 리뷰폼의 종류가 입력폼인지, 수정폼인지 알 수 없다. 그래서 상황에 따라 다른 api를 넘겨줄 수 있도록 수정하자.
- ReviewForm.js 에 onSubmit 프롭으로 createReview 함수를 대신해주자.
- app.js 에서 ReviewForm onsubmit={createReview}를 넘겨주고 submitSuccess 를 handleCreateSubmit으로 이름만 바꿔주자 . -> 기존 기능이 잘되는지 확인
- 수정 데이터 전송 테스트 :
  const formData = new FormData();
  formData.append('title', '수정됨');
  fetch('https://learn.codeit.kr/api/film-reviews/44', { method: 'PUT', body: formdata});

- 이제 업데이트하는 api 메소드를 생성하자. api.js파일에서 updateReview함수를 수정해준다.
- 글을 불러오고 입력하는 app.js 컴포넌트에 수정하는 것도 추가해주자. handleUpdateSucess 함수를 생성하고 이함수에서 api를 전송하고 받아온 리스폰스를 현재 리스트에 반영해주는 역할을 하도록 작성하자.
- app.js reviewList 함수에 업데이트 api와 리스폰스를 받아 리스트에 반영해주는 handleUpdateSucess 넘겨주자.
- ReviewList.js에서 해당 onUpdate, onUpdateSuccess 프롬을 reviewForm에 넘겨줄 수 있도록 onSubmit={handleSubmit} , onSubmitSuccess={handleSubmitSuccess} 이렇게 해당 함수를 만들어주자.
- handleSubmit 은 추가로 id 값을 받아서 넘겨주고 , handleSubmitSuccess이 실행될때는 onUpdateSuccess 에 리뷰리스트를 전달하고, setEditingid를 null로 만들어서 에딧창을 닫아주자.
