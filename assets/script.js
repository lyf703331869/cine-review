var api = "14e1acd020ccd7e75b55a6e59233cf2c";
var url =
  "https://api.themoviedb.org/3/search/movie?api_key=14e1acd020ccd7e75b55a6e59233cf2c";
var searchBtn = document.querySelector(".button");
var input = document.querySelector("#input");
var searchedMovies = document.querySelector("#searched-movies");

searchBtn.addEventListener("click", function () {
  // get the input value
  console.log(input.value);
  var searchInput = input.value;
  var searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=795237d1f5c251b1695453597353c8fd&query=${searchInput}`;
  console.log(searchUrl);

  fetch(searchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (i = 0; i < data.results.length; i++) {
        var movieName = data.results[i].title;
        var posterId = data.results[i].poster_path;
        var voteScore = data.results[i].vote_average;
        var photoUrl =
          "https://www.themoviedb.org/t/p/w440_and_h660_face" + posterId;
        $(".movieCard").append(
          `<div class='column'>
          <div class='callout'>
          <p><img src="${photoUrl}"/></p>
          <a class="modalLink" data-bs-toggle="modal" data-bs-target="#movieModal">${movieName}</a>
          <p>${voteScore}</p>
          </div>
          </div>
          `
        );
      }
    });
});
