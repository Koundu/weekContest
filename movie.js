//This is the JavaScript for the Movie Application
const api_key = "85782a70"
var data,num=0;
const search = document.getElementById("search").value;



async function getMovieDetailsById(imdbID) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${api_key}&i=${imdbID}`);
    const data = await response.json();
    return data.Response === 'True' ? data : null;
}

function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('search-list-item');
    movieDetailsContainer.innerHTML = `
        <div class="search-list-item">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="det">
                <p id="num">${num=num+1}</p>
                <p id="title">${movie.Title}</p>
                <!-- Add other movie details here -->
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get('id');

    if (imdbID) {
        getMovieDetailsById(imdbID)
            .then(movie => {
                if (movie) {
                    displayMovieDetails(movie);
                } else {
                    const movieDetailsContainer = document.getElementById('search-list-item');
                    movieDetailsContainer.innerHTML = '<p>Movie details not found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                const movieDetailsContainer = document.getElementById('search-list-item');
                movieDetailsContainer.innerHTML = '<p>Error fetching movie details.</p>';
            });
    }
});

// Function to search for movies
async function searchMovies(query) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${api_key}&s=${query}`);
    const data = await response.json();
    return data.Search || [];
}

// Function to display search results on the index.html page
function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('search-list');
    searchResultsContainer.innerHTML = '';

    results.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('card', 'col-md-4', 'mb-4');
        movieCard.innerHTML = `
            <div class="search-list-item">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="det">
                <p id="num">${num=num+1}</p>
                <p id="title">${movie.Title}</p>
                <!-- Add other movie details here -->
            </div>
            </div>
        `;
        searchResultsContainer.appendChild(movieCard);
    });

    const favouriteButtons = document.querySelectorAll('.favourite-button');
    favouriteButtons.forEach(button => {
        button.addEventListener('click', addToFavourites);
    });
}