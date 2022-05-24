// main part
var imoveurl =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=795237d1f5c251b1695453597353c8fd&language=en-US&page=1&with_genres=18";

fetch(imoveurl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    for (i = 0; i < data.results.length; i++) {
      var movieName = data.results[i].title;
      var posterId = data.results[i].poster_path;
      var voteScore = data.results[i].vote_average;
      var photoUrl =
        "https://www.themoviedb.org/t/p/w440_and_h660_face" + posterId;
      $(".movieCard").append(
        "<div class='column'>" +
          "<div class='callout'>" +
          `<p><img src="${photoUrl}"/></p>` +
          `<a class="modalLink" data-bs-toggle="modal" data-bs-target="#movieModal">${movieName}</a>` +
          `<p>${voteScore}</p>` +
          "</div>" +
          "</div>"
      );
    }
  });
