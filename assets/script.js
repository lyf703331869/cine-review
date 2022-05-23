var searchName = "godfather";

var url = `http://www.omdbapi.com/?&apikey=62703fe2&s=${searchName}`;
fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var movieName = data.Search[0].Title;
    var movieId = data.Search[0].imdbID;
    var urlById = `http://www.omdbapi.com/?i=${movieId}&apikey=62703fe2`;
    fetch(urlById)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
    var apikey = "0AoaoIKyUv6Ag9uyItK4i2GpKC4gvRi2";
    var reviewUrl = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${movieName}&api-key=${apikey}`;
    fetch(reviewUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  });
