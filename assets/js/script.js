var APIKey = "51ddbf8bf8c2712d3a6ff77d6583fa7f";


function getCity(inputFromField){
  var url="https://api.openweathermap.org/geo/1.0/direct?" + inputFromField + "&limit=1&appid=" + APIKey;
  // fetch(url){
  //     ...
  // }
  // .then(data){
      data=[{"name":"Philadelphia","local_names":{"tr":"Filadelfiya","pl":"Filadelfia","oc":"Filadèlfia","ar":"فيلادلفيا","ja":"フィラデルフィア","pt":"Filadélfia","ko":"필라델피아","ur":"فلاڈیلفیا","en":"Philadelphia","fa":"فیلادلفیا","he":"פילדלפיה","es":"Filadelfia","fr":"Philadelphie","cs":"Filadelfie","be":"Філадэльфія","zh":"費城","ta":"பிலடெல்பியா","lv":"Filadelfija","uk":"Філадельфія","kn":"ಫಿಲಡೆಲ್ಫಿಯ","it":"Filadelfia","ru":"Филадельфия","ca":"Filadèlfia","hi":"फिलाडेल्फिया","te":"ఫిలడెల్ఫియా"},"lat":39.9527237,"lon":-75.1635262,"country":"US","state":"Pennsylvania"}]
      var lat = data[0].lat;
      var lon = data[0].lon;
  console.log(lat + ", " + lon);
  getWeatherCurrent(lat,lon);
  // }
}
function getWeatherCurrent(lat, lon){
  
console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=496722594d14437755a15609505942d8`)
}
getCity("philadelphia")