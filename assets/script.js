const api = "14e1acd020ccd7e75b55a6e59233cf2c";
const url =
  "https://api.themoviedb.org/3/search/movie?api_key=14e1acd020ccd7e75b55a6e59233cf2c&query=harry";

var searchBtn = document.querySelector(".button");
var input = document.querySelector("#input");

// $(".searchBtn").on("click", checkurl);

searchBtn.addEventListener("click", function () {
  const value = input.value;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data: ", data);
    });
  console.log("Value: ", value);
});
