(() => {
  const CONFIG = window.CINE_REVIEW_CONFIG || {};
  const TMDB_KEY = CONFIG.tmdbKey;
  if (!TMDB_KEY) {
    throw new Error("TMDB key missing. Add it to assets/config.js");
  }

  const TMDB_BASE = "https://api.themoviedb.org/3";
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
  const HERO_IMAGE = "https://image.tmdb.org/t/p/original";

  const state = {
    sort: "top_rated",
    genre: null,
    query: "",
    trending: [],
    movies: [],
  };

  const GENRES = [
    { id: 28, label: "Action" },
    { id: 12, label: "Adventure" },
    { id: 16, label: "Animation" },
    { id: 35, label: "Comedy" },
    { id: 80, label: "Crime" },
    { id: 18, label: "Drama" },
    { id: 10751, label: "Family" },
    { id: 14, label: "Fantasy" },
    { id: 27, label: "Horror" },
    { id: 878, label: "Sci-Fi" },
  ];

  const elements = {
    searchForm: document.getElementById("searchForm"),
    searchInput: document.getElementById("searchInput"),
    sortSelect: document.getElementById("sortSelect"),
    genreFilters: document.getElementById("genreFilters"),
    gallery: document.getElementById("gallery"),
    status: document.getElementById("statusMessage"),
    trendingTrack: document.getElementById("trendingTrack"),
    heroPills: document.querySelectorAll(".hero-actions .pill"),
    modal: document.getElementById("modal"),
    modalClose: document.querySelector(".modal-close"),
    modalPoster: document.getElementById("modalPoster"),
    modalMeta: document.getElementById("modalMeta"),
    modalTitle: document.getElementById("modalTitle"),
    modalOverview: document.getElementById("modalOverview"),
    modalRelease: document.getElementById("modalRelease"),
    modalDirector: document.getElementById("modalDirector"),
    modalCast: document.getElementById("modalCast"),
    modalScore: document.getElementById("modalScore"),
    modalTrailer: document.getElementById("modalTrailer"),
    modalReviews: document.getElementById("modalReviews"),
  };

  const api = {
    async get(path, params = {}) {
      const searchParams = new URLSearchParams({
        api_key: TMDB_KEY,
        language: "en-US",
        ...params,
      });
      const url = `${TMDB_BASE}${path}?${searchParams.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`TMDB error: ${res.status}`);
      return res.json();
    },
  };

  function setStatus(message, tone = "info") {
    elements.status.textContent = message;
    elements.status.dataset.tone = tone;
  }

  function setYear() {
    document.getElementById("year").textContent = new Date().getFullYear();
  }

  function initGenres() {
    elements.genreFilters.innerHTML = GENRES.map(
      (genre) => `<button data-id="${genre.id}">${genre.label}</button>`
    ).join("");
  }

  function highlightActiveGenre() {
    [...elements.genreFilters.children].forEach((btn) => {
      const id = Number(btn.dataset.id);
      btn.classList.toggle("active", state.genre === id);
    });
  }

  async function loadTrending() {
    try {
      const data = await api.get("/trending/movie/week");
      state.trending = data.results.slice(0, 8);
      renderTrending();
    } catch (err) {
      console.error(err);
    }
  }

  function renderTrending() {
    elements.trendingTrack.innerHTML = state.trending
      .map(
        (movie) => `
        <article class="slide-card">
          <img src="${movie.backdrop_path ? HERO_IMAGE + movie.backdrop_path : ""}" alt="${movie.title}" />
          <div class="slide-caption">${movie.title}</div>
        </article>
      `
      )
      .join("");
  }

  async function loadMovies() {
    setStatus("Loading movies…", "info");
    elements.gallery.classList.add("loading");
    try {
      let data;
      if (state.query) {
        data = await api.get("/search/movie", {
          query: state.query,
          include_adult: false,
        });
      } else {
        data = await api.get(`/movie/${state.sort}`, {
          with_genres: state.genre || undefined,
        });
      }
      state.movies = data.results || [];
      renderMovies();
      setStatus(`Showing ${state.movies.length} titles`, "success");
    } catch (err) {
      console.error(err);
      setStatus("Failed to load movies", "error");
      elements.gallery.innerHTML = `<div class="empty-state">Unable to fetch movies right now.</div>`;
    } finally {
      elements.gallery.classList.remove("loading");
    }
  }

  function renderMovies() {
    if (!state.movies.length) {
      elements.gallery.innerHTML = `<div class="empty-state">No movies found. Try another search.</div>`;
      return;
    }

    elements.gallery.innerHTML = state.movies
      .map((movie) => createMovieCard(movie))
      .join("");
  }

  function createMovieCard(movie) {
    const poster = movie.poster_path ? IMAGE_BASE + movie.poster_path : "";
    const score = movie.vote_average ? movie.vote_average.toFixed(1) : "–";
    const release = movie.release_date ? new Date(movie.release_date).getFullYear() : "—";
    return `
      <article class="movie-card" data-id="${movie.id}">
        <img src="${poster}" alt="${movie.title}" loading="lazy" />
        <div class="card-body">
          <span class="badge">${release}</span>
          <h3>${movie.title}</h3>
          <p>${movie.overview ? movie.overview.slice(0, 90) + "…" : "No synopsis available."}</p>
          <button type="button" data-id="${movie.id}" aria-label="View details for ${movie.title}">
            View details · ${score}
          </button>
        </div>
      </article>
    `;
  }

  async function openModal(movieId) {
    elements.modal.classList.remove("hidden");
    elements.modalPoster.innerHTML = "Loading…";
    elements.modalTitle.textContent = "";
    elements.modalOverview.textContent = "";
    elements.modalReviews.innerHTML = "";
    elements.modalTrailer.innerHTML = "";

    try {
      const [details, credits, videos, reviews] = await Promise.all([
        api.get(`/movie/${movieId}`),
        api.get(`/movie/${movieId}/credits`),
        api.get(`/movie/${movieId}/videos`),
        api.get(`/movie/${movieId}/reviews`),
      ]);

      const poster = details.poster_path ? IMAGE_BASE + details.poster_path : "";
      elements.modalPoster.innerHTML = poster
        ? `<img src="${poster}" alt="${details.title}" />`
        : "";
      elements.modalMeta.textContent = details.genres
        .map((genre) => genre.name)
        .join(" · ");
      elements.modalTitle.textContent = details.title;
      elements.modalOverview.textContent = details.overview || "No synopsis available.";
      elements.modalRelease.textContent = details.release_date || "—";
      const score = details.vote_average ? details.vote_average.toFixed(1) : "—";
      elements.modalScore.textContent = `${score} / 10`;

      const director = credits.crew.find((member) => member.job === "Director");
      elements.modalDirector.textContent = director ? director.name : "—";
      const castNames = credits.cast
        .slice(0, 5)
        .map((person) => person.name)
        .join(", ");
      elements.modalCast.textContent = castNames || "—";

      const trailer = videos.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );
      if (trailer) {
        elements.modalTrailer.innerHTML = `<iframe src="https://www.youtube.com/embed/${trailer.key}" allowfullscreen></iframe>`;
      }

      const reviewItems = reviews.results.slice(0, 3);
      elements.modalReviews.innerHTML = reviewItems.length
        ? reviewItems
            .map(
              (review) => `<li><strong>${review.author}</strong>: ${review.content.slice(0, 220)}…</li>`
            )
            .join("")
        : "<li>No public reviews yet.</li>";
    } catch (err) {
      console.error(err);
      elements.modalOverview.textContent = "Unable to load details right now.";
    }
  }

  function closeModal() {
    elements.modal.classList.add("hidden");
  }

  function wireEvents() {
    elements.searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      state.query = elements.searchInput.value.trim();
      loadMovies();
    });

    elements.sortSelect.addEventListener("change", (event) => {
      state.sort = event.target.value;
      state.query = "";
      loadMovies();
    });

    elements.genreFilters.addEventListener("click", (event) => {
      if (event.target.matches("button")) {
        const id = Number(event.target.dataset.id);
        state.genre = state.genre === id ? null : id;
        highlightActiveGenre();
        state.query = "";
        loadMovies();
      }
    });

    elements.gallery.addEventListener("click", (event) => {
      const id = event.target.closest("[data-id]")?.dataset.id;
      if (id) {
        openModal(id);
      }
    });

    elements.modalClose.addEventListener("click", closeModal);
    elements.modal.addEventListener("click", (event) => {
      if (event.target === elements.modal) closeModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !elements.modal.classList.contains("hidden")) {
        closeModal();
      }
    });

    elements.heroPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const sort = pill.dataset.genre;
        if (sort) {
          state.sort = sort;
          state.genre = null;
          state.query = "";
          elements.sortSelect.value = sort;
          highlightActiveGenre();
          loadMovies();
        }
      });
    });
  }

  function init() {
    setYear();
    initGenres();
    highlightActiveGenre();
    wireEvents();
    loadTrending();
    loadMovies();
    setStatus("Ready", "success");
  }

  init();
})();
