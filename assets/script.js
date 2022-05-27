// Selecting the elements from the document aka DOM
var api = "795237d1f5c251b1695453597353c8fd";
var searchBtn = document.querySelector(".button");
var input = document.querySelector("#input");
var searchedMovies = document.querySelector("#searched-movies");

searchBtn.addEventListener("click", function () {
  // empty the movie card
  $(".movieCard").text("");
  // get the input value
  var searchInput = input.value;
  var searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=795237d1f5c251b1695453597353c8fd&query=${searchInput}`;

  fetch(searchUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (i = 0; i < data.results.length; i++) {
        if (data.results[i].poster_path !== null) {
          var movieName = data.results[i].title;
          var posterId = data.results[i].poster_path;
          var voteScore = data.results[i].vote_average;
          var photoUrl =
            "https://www.themoviedb.org/t/p/w440_and_h660_face" + posterId;
          $(".movieCard").append(
            `<div class='column'>
          <div class='callout'>
          <img src="${photoUrl}"/>
          <a class="modalLink" data-bs-toggle="modal" data-bs-target="#movieModal">${movieName}</a>
          <p>${voteScore}</p>
          </div>
          </div>
          `
          );
        }
      }
    });
});

// To get results on "Enter"
// Get the input field
var input = document.querySelector("#input");
// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (searchedMovies) {
  // If the user presses the "Enter" key on the keyboard
  var searchBtn = document.querySelector(".button");

  if (searchedMovies.key === "Enter") {
    // Cancel the default action, if needed
    searchedMovies.preventDefault();
    // Trigger the button element with a click
    document.querySelector(".button").click();
  }
});

// main part

//carousel
fetch(
  "https://api.themoviedb.org/3/trending/movie/week?api_key=795237d1f5c251b1695453597353c8fd"
)
  .then((res) => res.json())
  .then((data) => {
    // populate the posters
    let movies = data.results;
    let posterIndexes = generateRandomPhotos();

    let count = 0;

    // loop through the movies
    for (let i = 0; i < movies.length; i++) {
      // movie backdrops for the four selected movies
      if (posterIndexes.includes(i)) {
        // append the image to the carousel
        document.getElementById("slides-container").innerHTML += `
    <li class="${count == 0 ? "is-active " : ""}orbit-slide">
      <figure class="orbit-figure">
        <img class="orbit-image" src="${
          "https://image.tmdb.org/t/p/original/" + movies[i].backdrop_path
        }" alt="${movies[i].original_title}">
        <figcaption class="orbit-caption">${
          movies[i].original_title
        }</figcaption>
      </figure>
    </li>  
    `;

        count++;
      }
    }

    $(document).foundation();
  });
// end of carousel

document.getElementById("genres").addEventListener("click", function (e) {
  if (e.target && e.target.nodeName !== "LI") {
    $(".movieCard").text("");
    var selectedOption = document.getElementById("sort-options");
    console.log(selectedOption.value);
    var genreId = e.target.id;
    var genreUrl = `https://api.themoviedb.org/3/movie/${selectedOption.value}?api_key=795237d1f5c251b1695453597353c8fd&with_genres=${genreId}`;
    fetch(genreUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (i = 0; i < data.results.length; i++) {
          if (data.results[i].poster_path !== null) {
            var movieName = data.results[i].title;
            var posterId = data.results[i].poster_path;
            var voteScore = data.results[i].vote_average;
            var Plot = data.results[i].overview;
            var movieId = data.results[i].id;
            var photoUrl =
              "https://www.themoviedb.org/t/p/w440_and_h660_face" + posterId;
            $(".movieCard").append(
              `<div class='column'>
          <div class='callout'>
          <img src="${photoUrl}"/>
          <a class="modalLink" data-bs-toggle="modal" data-bs-target="#movieModal">${movieName}</a>
          <p>${voteScore}</p>
          <p style="display:none" id="movieId">${movieId}</p>
          <p style="display:none" id="moviePlot">${Plot}</p>
          </div>
          </div>
          `
            );
          }
        }
      });
  }
});

// .catch(() => {
//   alert("error loading carousel");
// });

// function to generate random numbers for four posters between 0 and 19
function generateRandomPhotos() {
  let photoIndexes = [];

  let count = 0;

  while (count < 4) {
    let randomNumber = getRandomInt(0, 19);

    // loop through the photoIndexes array to find if it has already been chosen
    let found = false;

    for (let i = 0; i < photoIndexes.length; i++) {
      if (photoIndexes[i] == randomNumber) {
        found = true;
      }
    }

    // if not found, add it to the indexes array and increment count
    if (!found) {
      photoIndexes.push(randomNumber);
      count++;
    }
  }

  return photoIndexes;
}

// function to generate number between min and max (inclusive)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// For Modal

// Get the modal
var modal = document.getElementById("myModal");

// clicking on any movie image generates a modal
document.querySelector(".movieCard").addEventListener("click", function (e) {
  //console.log("this works!");
  if (e.target.nodeName === "DIV") {
    modal.style.display = "block";
    var selectedElement = e.target;
    modalFunction(selectedElement);
  } else {
    modal.style.display = "block";
    var selectedElement = e.target.parentElement;
    modalFunction(selectedElement);
  }
});

function modalFunction(selectedElement) {
  var id = selectedElement.children[3].textContent;
  var detailUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=795237d1f5c251b1695453597353c8fd&language=en-US`;
  var trailerUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=795237d1f5c251b1695453597353c8fd&language=en-US`;
  $("#movie-title").text(selectedElement.children[1].text);
  $("#movie-plot").text(selectedElement.children[4].textContent);
  $("#reviews").empty();
  $("#movie-cast").empty();
  fetch(detailUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var imdbId = data.imdb_id;
      console.log(imdbId);
      var reviewUrl = `https://imdb-api.com/en/API/Reviews/k_m5443zev/${imdbId}`;
      fetch(reviewUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          for (i = 0; i < 3; i++) {
            var reviewContent = data.items[i].content;
            var reviewUser = data.items[i].username;
            var reviewList = `${reviewUser}: "${reviewContent}"`;
            var li = document.createElement("LI");
            li.textContent = reviewList;
            document.getElementById("reviews").appendChild(li);
          }
        });
      var CastUrl = `https://imdb-api.com/en/API/FullCast/k_m5443zev/${imdbId}`;
      fetch(CastUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          document.getElementById("movie-director").textContent =
            data.directors.items[0].name;
          for (i = 0; i < 5; i++) {
            document.getElementById("movie-cast").textContent +=
              data.actors[i].name + " / ";
          }
        });
    });

  fetch(trailerUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var youtubeUrl = "https://www.youtube.com/watch?v=" + data.results[0].key;
      console.log(youtubeUrl);
    });
}
// this code responsible for allwing user to exit the modal
document.querySelector(".close").addEventListener("click", function () {
  modal.style.display = "none";
});
