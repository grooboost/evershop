const { setContextValue } = require("@evershop/evershop/src/modules/graphql/services/contextHelper");

module.exports = (request) => {
  const varsFromAdmin = {
    wmealSku: 'wmeal-250301',
    bestReviews: [24, 26, 29, 31],
    reviewStats: {count: 20, avgRating: 4.7},
    nextWeekRecipeImgs: [
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1145_어묵볶음/1145_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1220_냉이된장찌개/1220_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1116_소고기뭇국/1116_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1015_감자채전/1015_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1029_골뱅이무침/1029_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1224_땡초김밥/1224_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1173_참치김밥/1173_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1078_매콤가지볶음/1078_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1221_냉이된장무침/1221_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1150_오이냉국/1150_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1193_표고버섯볶음/1193_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1135_시래기된장국/1135_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1028_고추참치/1028_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1065_두부참치전/1065_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1219_표고버섯무밥/1219_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1225_미나리삼겹살/1225_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1010_감자계란국/1010_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1160_유니짜장면/1160_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1235_훈제오리부추볶음/1235_small.jpg",
    ], 
    nextWeekIngredientImgs: [
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1145_어묵볶음/1145_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1220_냉이된장찌개/1220_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1116_소고기뭇국/1116_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1015_감자채전/1015_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1029_골뱅이무침/1029_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1224_땡초김밥/1224_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1173_참치김밥/1173_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1078_매콤가지볶음/1078_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1221_냉이된장무침/1221_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1150_오이냉국/1150_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1193_표고버섯볶음/1193_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1135_시래기된장국/1135_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1028_고추참치/1028_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1065_두부참치전/1065_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1219_표고버섯무밥/1219_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1225_미나리삼겹살/1225_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1010_감자계란국/1010_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1160_유니짜장면/1160_small.jpg",
      "https://storage.googleapis.com/grooboost-public/otable/recipes_v3/1235_훈제오리부추볶음/1235_small.jpg",
    ]
  }
  setContextValue(request, 'filtersFromVars', [{ key: 'id', operation: 'in', value: varsFromAdmin.bestReviews.join(',') }]);
  setContextValue(request, 'varsFromAdmin', varsFromAdmin);
};