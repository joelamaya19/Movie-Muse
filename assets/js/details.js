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
            // display move info
            const container = document.createElement('div');
            container.classList.add('container');

            const titleEl = document.createElement('p');
            titleEl.textContent = response.title;
            titleEl.classList.add('titleEl');

            const infoEl = document.createElement('p');
            infoEl.textContent = "Info: ";
            infoEl.classList.add('info');

            const overview = document.createElement('p');
            overview.textContent = response.overview;
            overview.classList.add('overview');

            const runtime = document.createElement('p');
            runtime.textContent = "Runtime: " + response.runtime;
            runtime.classList.add('runtime');

            const popularity = document.createElement('p');
            popularity.textContent = "Rating: " + response.popularity;
            popularity.classList.add('pop');

            const language = document.createElement('p');
            language.textContent = "Language: " + response.original_language;
            language.classList.add('lang');

            const poster = document.createElement('img');
            poster.classList.add('poster');


            container.appendChild(titleEl);
            container.appendChild(poster);
            // if no image available, display apology message
            if (response.poster_path) {
                poster.src = "https://image.tmdb.org/t/p/w342" + response.poster_path;

            }
            else {
                let msg = document.createElement('p');
                msg.textContent = '"Sorry, there\'\s no image available... :("';
                msg.classList.add('sorryMsg');

                container.appendChild(msg);
                results.append(container);
            }
            
            container.appendChild(runtime);
            container.appendChild(popularity);
            container.appendChild(language);
            container.appendChild(infoEl);
            container.appendChild(overview);
            

            results.append(container);

            // display genre info
            const genreName = document.createElement('p');
            genreName.textContent = 'Genre: ';
            genreName.classList.add('genreName');
            container.appendChild(genreName);

            response.genres.forEach(data => {

                const genreEl = document.createElement('p');
               
                genreEl.textContent = data.name + ", ";
                genreEl.classList.add('genres');

                container.appendChild(genreEl);
                results.append(container);
            });

        })

        .catch(err => {
            console.error(err)
        });
}

const optionsStreams = {
    method: 'GET',
    headers: {
        
        // 'X-RapidAPI-Key': '91ecad8d66mshe205e1fb171385ap1f4dc8jsnbf233fe15206',
        // 'X-RapidAPI-Key': '7164f4d749mshdb906e6d2ce7e25p194df8jsnd49f9a0ea076',
        // 'X-RapidAPI-Key': 'be3659d7femsh065826255911efdp1e7449jsn2f084c997423',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
};

function streamingAvailabilityInfo(id) {
    fetch(`https://streaming-availability.p.rapidapi.com/get?output_language=en&tmdb_id=movie%2F${id}`, optionsStreams)
        .then(response => {
            return response.json();
        })
        .then(response => {
            console.log(response);
            const container = document.createElement('div');
            container.classList.add('container');
            // display cast info
            const castData = response.result.cast;
            castData.forEach(actor => {

                const cast = document.createElement('p');
                cast.textContent = actor;

                container.appendChild(cast);

                results.append(container);
            });

            // display directors 
            const directorData = response.result.directors;
            directorData.forEach(member => {
                const directors = document.createElement('p');
                directors.textContent = member;

                container.appendChild(directors);

                results.append(container);
            });

            // display streaming services and links
            console.log(response.result.streamingInfo.us);
            const streamingInfo = response.result.streamingInfo.us;

            streamingInfo.forEach(info => {
                const streamService = document.createElement('p');
                streamService.textContent = info.service;
                // clickable links to streaming services
                const streamLink = document.createElement('a');
                streamLink.href = info.link;
                streamLink.textContent = "Watch here";

                container.appendChild(streamService);
                container.appendChild(streamLink);

                results.append(container);
            });

            const year = document.createElement('p');
            year.textContent = response.result.year;
           
            container.appendChild(year);


            results.append(container);
        })
        .catch(err => {
            console.log(err)
        })
}

movieDetails(movieId);
streamingAvailabilityInfo(movieId);

