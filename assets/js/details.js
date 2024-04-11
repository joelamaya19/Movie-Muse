// This javascript file to give out the movie details & streaming availability.
const movieId = localStorage.getItem('movie-id');
const results = document.querySelector('.results-block');


const optionsTMBD = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGFiNmM3NzE0MDZiMDYwNGJhMTViZWNkOTRiMDAwNiIsInN1YiI6IjY2MTU2NzUxOGVlMGE5MDE2NWE0ODFjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iXAYBrRmgumRMOZbdk7mb79G7Wi5iKgl8Xeuj1b343U'
    }
  };

function movieDetails(movie) {
    console.log(movie);
    fetch(`https://api.themoviedb.org/3/movie/${movie}?language=en-US`, optionsTMBD)
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.log(response)
        const container = document.createElement('div');

        const titleEl = document.createElement('p');
        titleEl.textContent = response.title;

        const infoEl = document.createElement('p');
        infoEl.textContent = "Info: ";

        const overview = document.createElement('p');
        overview.textContent = response.overview;

        const runtime = document.createElement('p');
        runtime.textContent = "Runtime: " + response.runtime;

        const releaseDate = document.createElement('p');
        releaseDate.textContent = "Release: " + response.release_date;

        const popularity = document.createElement('p');
        popularity.textContent = "Rating: " + response.popularity;

        const language = document.createElement('p');
        language.textContent = releaseDate.original_language;

        const poster = document.createElement('img');


        container.appendChild(titleEl);
        container.appendChild(poster);

        if (response.poster_path) {
            poster.src = "https://image.tmdb.org/t/p/w185" + response.poster_path;

        }
            else {
            let msg = document.createElement('p');
          msg.textContent = '"Sorry, there\'\s no image available... :("';
          container.appendChild(msg);
          results.append(container);
        }
        
        container.appendChild(infoEl);
        container.appendChild(overview);
        container.appendChild(runtime);
        container.appendChild(releaseDate);
        container.appendChild(popularity);
        container.appendChild(language);

        results.append(container);


        response.genres.forEach(data => {
            const container2 = document.createElement('div');

            const genreEl = document.createElement('p');
            genreEl.textContent = data.name;

            container2.appendChild(genreEl);
            results.append(container2);
        });
       
    })
    
    .catch(err => {
        console.error(err)
    });
}  

const optionsStreams = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'be3659d7femsh065826255911efdp1e7449jsn2f084c997423',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

function streamingAvailabilityInfo(id) {
    fetch(`https://streaming-availability.p.rapidapi.com/get?output_language=en&tmdb_id=movie%2F${id}`, optionsStreams)
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log(err)
    })
}

movieDetails(movieId);
streamingAvailabilityInfo(movieId);

