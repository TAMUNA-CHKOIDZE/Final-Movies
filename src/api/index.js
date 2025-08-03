// API_KEY-ს იმპორტი env-დან vite-ს პროექტში ------------
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

// popular ფილმების წამოღება პირველი გვერდიდან --------------------------
export async function fetchPopularMovies() {
  // თუ საერთოდ არ მივუთითებ page=..., მაშინ ავტომატურად დააბრუნებს პირველ გვერდს
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch popular movies");
    }

    return await response.json();
  } catch (error) {
    // catch-ში, თუ დომენი არასწორია ან ინტერნეტხარვეზია ...
    throw new Error(error.message);
  }
}

// პოპულარული ფილმების დეტალების წამოღება -------------------------
export async function fetchMovieDetails(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

// ყველა ფილმის წამოღება კატეგორიის მიხედვით ------------------------------------------
export async function fetchMoviesByCategory(category, page = 1) {
  const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

// ლოგიკა ყველა გვერდის წამოღებისთვის, რომელიც იყენებს fetchMoviesByCategory-ს, მჭირდება ფეჯინეიშენისთვის
// totalPages-ს მითითება მჭირდება, რადგან ყველა გვერდს თუ წამოვიღებ შეიძლება სერვერი გადაიტვირთოს

export async function fetchAllPagesForCategory(category, totalPages = 5) {
  const responses = [];

  for (let page = 1; page <= totalPages; page++) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${page}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch ${category} page ${page}`);
    }

    const json = await res.json();
    responses.push(
      ...json.results.map((movie) => ({
        ...movie,
        category,
      }))
    );
  }

  return responses;
}



// ძებნის API (search/movie)
export async function fetchMoviesBySearch(query) {
  const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    const data = await response.json();
    return data.results.map((movie) => ({
      ...movie,
      category: "search", // კატეგორია
    }));
  } catch (error) {
    throw new Error(error.message);
  }
}

// Promise.all() არის JavaScript-ის ფუნქცია, რომელიც იღებს პრომისების (Promises) მასივს და აბრუნებს ახალ პრომისს, რადგან მე მჭირდება რამდენიმე კატეგორიიდან ფილმების წამოღება და ჩვენება ერთდროულად (რამდენიმე URL-იდან ერთდროულად მონაცემების მოთხოვნა) ამიტომ ვიყენებ Promise.all()-ს
// ყველა კატეგორიის ფილმების წამოღება ერთად
export async function fetchAllMoviesFromCategories(categories, totalPages = 5) {
  try {
    const responses = await Promise.all(
      categories.map((cat) => fetchAllPagesForCategory(cat, totalPages))
    );

    return responses.flat(); // ყველა შედეგი ერთ მასივში
  } catch (error) {
    throw new Error("Failed to fetch movies by categories");
  }
}


// TV კატეგორიების წამოღება
export async function fetchAllTVPagesForCategory(category, totalPages = 5) {
  const responses = [];

  for (let page = 1; page <= totalPages; page++) {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${category}?api_key=${apiKey}&page=${page}`
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch TV ${category} page ${page}`);
    }

    const json = await res.json();
    responses.push(
      ...json.results.map((tv) => ({
        ...tv,
        category,
      }))
    );
  }

  return responses;
}


// TV-ს კატეგორიების ერთდროული წამოღება
export async function fetchAllTVShowsFromCategories(categories, totalPages = 5) {
  try {
    const responses = await Promise.all(
      categories.map((cat) => fetchAllTVPagesForCategory(cat, totalPages))
    );

    return responses.flat();
  } catch (error) {
    throw new Error("Failed to fetch TV shows by categories");
  }
}

// ძებნა TV-სთვის
export async function fetchTVShowsBySearch(query) {
  const url = `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch TV search results");
    }

    const data = await response.json();
    return data.results.map((tv) => ({
      ...tv,
      category: "search",
    }));
  } catch (error) {
    throw new Error(error.message);
  }
}