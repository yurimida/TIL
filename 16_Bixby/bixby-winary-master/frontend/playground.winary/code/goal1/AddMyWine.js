var http = require('http')
var console = require('console')
var wineurl = "http://13.125.235.118:8000/api/users/"

module.exports.function = function addMyWine (addwineid, wineinmylist, $vivContext) {
  // console.log(addwineid)
  // console.log(wineinmylist)
  // console.log($vivContext)

  var options = {
      format: 'json',
      cacheTime: 100,
      headers: {
        'accept': 'application/json'
      },
    };

  var query = {
    "bixby": true,
    "userId": $vivContext.bixbyUserId,
    "wine": addwineid
  }
  // query["delete"] = wineinmylist

  var winelist = []
  // if (wineinmylist !== undefined) {
  if (wineinmylist) {
    var response = http.deleteUrl(wineurl, query, options);
  } else {
    var response = http.postUrl(wineurl, query, options);
  }
  // console.log(response)
  for(let i = 0; i < response.user.length; i++){
    tmp = {}
    response.user[i]["tasting_body"] !== undefined ? tmp["winetastebody"] = response.user[i]["tasting_body"]:""
    response.user[i]["tasting_sweetness"] !== undefined ? tmp["winetastesweetness"] = response.user[i]["tasting_sweetness"]:""
    response.user[i]["FOOD"] !== undefined ? tmp["winefood"] = response.user[i]["FOOD"] : ["해산물"]
    response.user[i]["BRAND"] !== undefined ? tmp["winebrand"] = response.user[i]["BRAND"] : ""
    response.user[i]["SIZE"] !== undefined ? tmp["winesize"] = response.user[i]["SIZE"] : ""
    response.user[i]["wine_ko_name"] !== undefined ? tmp["winekrname"] = response.user[i]["wine_ko_name"] : ""
    response.user[i]["VARIETAL"] !== undefined ? tmp["winevarietal"] = response.user[i]["VARIETAL"] : ""
    response.user[i]["wine_en_name"] !== undefined ? tmp["wineenname"] = response.user[i]["wine_en_name"] : ""
    response.user[i]["TEMP"] !== undefined ? tmp["winetemperature"] = response.user[i]["TEMP"] : ""
    response.user[i]["_id"] ? tmp["wineid"] = response.user[i]["_id"] : ""
    response.user[i]["ALCOHOL"] !== undefined  ? tmp["winealcohol"] = response.user[i]["ALCOHOL"] : ""
    response.user[i]["CATEGORIES"] !== undefined ? tmp["winecategory"] = response.user[i]["CATEGORIES"] : ""
    response.user[i]["wine_image"] !== undefined ? tmp["wineimage"] = response.user[i]["wine_image"] : ""
    response.user[i]["REGION"] !== undefined ? tmp["wineregion"] = response.user[i]["REGION"] : ""
    response.user[i]["tasting_note"] !== undefined ? tmp["winedescription"] = response.user[i]["tasting_note"] : ""
    tmp["wineinmylist"] = response.user[i]["favorite"]
    winelist.push(tmp)
  }

  return winelist
}
