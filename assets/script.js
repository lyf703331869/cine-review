// Selecting the elements from the document aka DOM
var api = "795237d1f5c251b1695453597353c8fd";
var searchBtn = document.querySelector(".button");
var input = document.querySelector("#input");
var searchedMovies = document.querySelector("#searched-movies");

searchBtn.addEventListener("click", function () {
  // empty the movie card
  $(".movieCard").text("");
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

// main part

<<<<<<< HEAD
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
        `<div class='column'>
          <div class='callout' id='myBtn' >
          <p><img src="${photoUrl}"/></p>
          <a class="modalLink" data-bs-toggle="modal" data-bs-target="#movieModal">${movieName}</a>
          <p>${voteScore}</p>
          </div>
          </div>
         `
      );
    }
  });
=======
>>>>>>> 00482c776df1eec37f53df805347c711a046840a
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
  })
  .catch(() => {
    alert("error loading carousel");
  });

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
document.querySelector(".movieCard").addEventListener("click", function () {
  //console.log("this works!");
  modal.style.display = "block";
});

// this code responsible for allwing user to exit the modal
document.querySelector(".close").addEventListener("click", function () {
  modal.style.display = "none";
});
