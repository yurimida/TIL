// Food Vocabulary
const vegetables = ['채소', '야채', '샐러드'];
const fruits = ['과일', '사과', '배', '토마토', '포도'];
const meat = ['육류', '고기', '돼지', '소', '양', '닭', '치킨', '스테이크'];
const fish = ['생선', '물고기', '연어', '고등어'];
const seafood = ['해산물', '오징어', '문어', '조개', '낙지', '새우', '쉬림프', '랍스타'];
const flour = ['밀가루', '피자', '파스타', '빵', '스파게티', '양식'];
const cheese = ['치즈', '리코타', '파마산', '모짜렐라', '고르곤졸라', '체다', '까망베르', '브리'];
const smokedOrSalt = ['훈제/염장', '훈제', '염장'];

// Food Categories
const foodCategories = [vegetables, fruits, meat, fish, seafood, flour, cheese, smokedOrSalt];


const concatenateCategories = (categories) => {
  let concatedKeyword = ''
  for(let i = 0; i < categories.length; i++ ) {
    concatedKeyword += categories[i];
    if (i < categories.length -1) {
      concatedKeyword += '|';
    }
  }
  return concatedKeyword;
}


export const modifyKeyword = (keyword) => {
  const categories = []
  foodCategories.forEach(food => {
    if (food.some(elem => keyword.includes(elem))) {
      categories.push(food[0])
    }
  })
  return categories.length ? concatenateCategories(categories) : keyword;
}