
var http = require('http')
var console = require('console')
var config = require('config')
var dates = require('dates');
var wineurl = "http://13.125.235.118:8000/api/wines/"


module.exports.function = function findWine (querywinesweetnessstructure, querywinebodystructure, queryfoodcategory, queryregion, querytype, $vivContext) {
  // console.log($vivContext)
  var options = {
      format: 'json',
      cacheTime: 100,
      headers: {
        'accept': 'application/json'
      },
    };
  // Query
  var sweet = {
    "Dry":1,
    "Medium Dry":2,
    "Medium":3, 
    "Medium Sweet":4, 
    "Sweet":5
  }
  var body = {
    "Light":1,
    "Medium Light":2, 
    "Medium":3, 
    "Medium Full":4, 
    "Full":5
  }

  var userid = $vivContext.bixbyUserId

  var query = {
    "query": {}
  }
  querytype !== undefined ? query["query"]["CATEGORIES"] = querytype:""
  queryregion !== undefined ?  query["query"]["REGION"] = queryregion:""
  queryfoodcategory !== undefined ? query["query"]["FOOD"] = queryfoodcategory:""
  querywinesweetnessstructure !== undefined ? query["query"]["tasting_sweetness"] = String(sweet[querywinesweetnessstructure["querysweetnessscore"]]):""
  querywinebodystructure !== undefined ? query["query"]["tasting_body"] = String(body[querywinebodystructure["querybodyscore"]]):""
  query["bixby"] = true
  query["userId"] = userid
  query["query"] = JSON.stringify(query["query"])
  // console.log(query)
// request
  var response = http.postUrl(wineurl, query, options);
  
  var winelist = []
  // response
  for(let i = 0; i < response.wine.length; i++){
    tmp = {}
    console.log(response.wine[i]["favorite"])
    response.wine[i]["tasting_body"] !== undefined ? tmp["winetastebody"] = response.wine[i]["tasting_body"]:""
    response.wine[i]["tasting_sweetness"] !== undefined ? tmp["winetastesweetness"] = response.wine[i]["tasting_sweetness"]:""
    response.wine[i]["FOOD"] !== undefined ? tmp["winefood"] = response.wine[i]["FOOD"] : ["해산물"]
    response.wine[i]["BRAND"] !== undefined ? tmp["winebrand"] = response.wine[i]["BRAND"] : ""
    response.wine[i]["SIZE"] !== undefined ? tmp["winesize"] = response.wine[i]["SIZE"] : ""
    response.wine[i]["wine_ko_name"] !== undefined ? tmp["winekrname"] = response.wine[i]["wine_ko_name"] : ""
    response.wine[i]["VARIETAL"] !== undefined ? tmp["winevarietal"] = response.wine[i]["VARIETAL"] : ""
    response.wine[i]["wine_en_name"] !== undefined ? tmp["wineenname"] = response.wine[i]["wine_en_name"] : ""
    response.wine[i]["TEMP"] !== undefined ? tmp["winetemperature"] = response.wine[i]["TEMP"] : ""
    response.wine[i]["_id"] ? tmp["wineid"] = response.wine[i]["_id"] : ""
    response.wine[i]["ALCOHOL"] !== undefined  ? tmp["winealcohol"] = response.wine[i]["ALCOHOL"] : ""
    response.wine[i]["CATEGORIES"] !== undefined ? tmp["winecategory"] = response.wine[i]["CATEGORIES"] : ""
    response.wine[i]["wine_image"] !== undefined ? tmp["wineimage"] = response.wine[i]["wine_image"] : ""
    response.wine[i]["REGION"] !== undefined ? tmp["wineregion"] = response.wine[i]["REGION"] : ""
    response.wine[i]["tasting_note"] !== undefined ? tmp["winedescription"] = response.wine[i]["tasting_note"] : ""
    tmp["wineinmylist"] = response.wine[i]["favorite"]
    winelist.push(tmp)
  }  
  return winelist
}
