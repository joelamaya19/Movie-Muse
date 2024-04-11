// This javascript file to give out the movie details & streaming availability.


const movieId = localStorage.getItem('movie-id');




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

