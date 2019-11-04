# Store를 사용하는 이유
- 기존 프로젝트에서는 component안에 component를 여러개 쓴적이 없어서 딱히 필요성을 느끼지 않았다. 단순히 자바에서 사용하는 "전역변수"정도로 생각했기 때문이다. 하지만 여러 component를 이용해 하나의 page를 구성하는 Vue에서 Store는 선택이 아니라 필수였다.
- 지금 영화 평점 화면은 RatingPage.vue에 평점을 줄 MovieRatingList.vue 와 그 리스트 안에 있는 각각의 카드를 표현할 MovieRatingCard.vue 총 3개의 component로 구성되어있다. 기존에는 RatingPage에서 Store에 있는 searchMovies를 실행해 ratingMovieList를 가져와 MovieRatingList로 리스트를 전달해주는 방식이었다.
- 이 방식으로 구현을 하니 각각의 카드에서 가지고 있는 정보들을 ratingMovieList.vue 입장에서 하나하나 관리를 해줄 수 없다는 치명적인 문제가 발생했고 이를 컴포넌트 통신으로구 하려다가 실패했다. 결국 답을 찾은 것은 모든 컴포넌트에서 한번에 접근 할 수 있는 Store였다.

## 컴포넌트 사이의 통신
- 컴포넌트 사이 (부모 - 자식) 관계에서 서로 정보를 주고 받는 방법은
  - 부모 → 자식 일 땐 :index="index" 형식으로 param을 넣어주고,
  - 자식 → 부모일 때는 $emit을 사용해 통신한다.
- 하지만 이 방법도 페이지에 컴포넌트가 작은 규모 일 때 잠깐 사용하는 것은 괜찮지만 여러개의 컴포넌트가 동일한 변수를 공유한다면 굉장히 복잡해지고 코드 가독성도 떨어진다. 이렇기 때문에 vuex의 Store를 사용하는 것을 **권장** 한다.
- 이 외에 event bus를 이용한 방법이 있지만 내가 잘 모르므로 패스

## Vuex Store
- vuex의 기능인 **mapState** 를 이용해 각 컴포넌트에서 store에 있는 같은 리스트를 공유하게 했다. 이러니 접근이 쉬워지고 관리가 쉬워지고 변화 감지도 쉬워졌다. 개이득...

## 배열의 변화 감지
- Vue에서는 항상 data의 변화를 감지하고 있는데
```
movies[i] = newValue
```
이런 방식으로 배열의 값을 초기화 해주는 것으로는 배열의 변화를 감지하지 않고 변화를 감지하지 않으니 화면에도 바로 변화가 나타나지 않는다.
vue에서 배열의 변화를 감지하는 방식은 pop(), push(), splice(), shift(), unshift(), 등의 메소드를 이용하거나 this.$Set(movies, i, newValue) 를 이용해 배열 안에 있는 값을 바꿔줘야 vue가 배열의 변화를 감지하고 화면에 변화를 뿌려준다.
