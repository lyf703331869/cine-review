<<<<<<< HEAD
var baseUrl = "https://api.themoviedb.org/3";
=======
var url = "https://developers.themoviedb.org/3/movies/get-movie-details";
>>>>>>> f4eda2f99b70bb20538b29664f2bf4fa75914d22
var api = "795237d1f5c251b1695453597353c8fd";
var searchPath =
  baseUrl +
  "/search/movie?api_key=" +
  api +
  "&language=en-US&page=1&include_adult=false";

// Selecting the elements from the document aka DOM
var searchBtn = document.querySelector(".button");
var input = document.querySelector("#input");

// $(".searchBtn").on("click", checkurl);

searchBtn.addEventListener("click", function () {
});

// Break down for team on header:


//slide
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


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
          "<div class='callout' id='myBtn' >" +
          `<p><img src="${photoUrl}"/></p>` +
          `<a class="modalLink" data-bs-toggle="modal" data-bs-target="#movieModal">${movieName}</a>` +
          `<p>${voteScore}</p>` +
          "</div>" +
          "</div>"
      );
    }
<<<<<<< HEAD

=======
  });
  //carousel
fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=795237d1f5c251b1695453597353c8fd")
.then(res => res.json())
.then(data => {
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
        <img class="orbit-image" src="${"https://image.tmdb.org/t/p/original/" + movies[i].backdrop_path}" alt="${movies[i].original_title}">
        <figcaption class="orbit-caption">${movies[i].original_title}</figcaption>
      </figure>
    </li>  
    `;

      count++;
    }
  }

  $(document).foundation();
})
.catch(() => {
  alert('error loading carousel')
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
>>>>>>> f4eda2f99b70bb20538b29664f2bf4fa75914d22

// function to generate number between min and max (inclusive)
function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min + 1)) + min;
}
