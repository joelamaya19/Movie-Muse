// This javascript file is to search for a movie.
const movieNameInput = document.querySelector('#userInput');
const formSubmit = document.querySelector('.searchForm');
// p element to hold results data
const pEl = document.querySelector('p')

console.log(formSubmit);
const optionsTMBD = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGFiNmM3NzE0MDZiMDYwNGJhMTViZWNkOTRiMDAwNiIsInN1YiI6IjY2MTU2NzUxOGVlMGE5MDE2NWE0ODFjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iXAYBrRmgumRMOZbdk7mb79G7Wi5iKgl8Xeuj1b343U'
  }
};


function searchMovie(movie) {
  // added a line to clear results upon search
  pEl.textContent = "";
  fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, optionsTMBD)
    .then(response => {
      return response.json();
    })
    // 	// .then(response => {
    //   //       console.log(response);
    //   //   })

    // changed 2nd .then to console log data.results specifically instead of response 
    .then(data => {
      console.log(data.results);
      // loops through all of the data results and creates elements for each of the requested info values
      data.results.forEach(info => {
        const container = document.createElement('div');
        container.classList.add('contain');

        const titleEl = document.createElement('h2');
        titleEl.textContent = info.title;
        titleEl.classList.add('titleEl')

        const languageEl = document.createElement('p');
        languageEl.textContent = info.original_language;
        languageEl.classList.add('langEl');

        // "Info: " displays above info.overview text
        const infoEl = document.createElement('p');
        infoEl.textContent = "Info: "
        infoEl.classList.add('infoEl');

        const overview = document.createElement('p');
        overview.textContent = info.overview;
        overview.classList.add('desc');

        const popularity = document.createElement('p');
        popularity.textContent = "Rating: " + info.popularity;
        popularity.classList.add('pop');

        const release = document.createElement('p');
        release.textContent = "Release: " + info.release_date;
        release.classList.add('release');

        // created an img element w/ src attribute to hold and display movie images and base URL
        const poster = document.createElement('img')


        // append each element to the pEl separately rather than all together for visibility
        container.appendChild(titleEl);
        container.appendChild(languageEl);
        container.appendChild(infoEl);
        container.appendChild(overview);
        container.appendChild(popularity);
        container.appendChild(release);
        container.appendChild(poster);

        // removes thumbnails so no thumbnail is leftover if there is no image available
        if (info.poster_path) {
          poster.src = "https://image.tmdb.org/t/p/w185" + info.poster_path;

        } else {
          // poster.src = ""; //nothing is displayed if no img avail
          let sorry = document.createElement('p');
          sorry.textContent = "Sorry, there's no image available... :(";
          container.appendChild(sorry);
          pEl.append(container);
        }
        // // pEl.appendChild(titleEl, overview, release, popularity, languageEl);
        // appending all created elements to the main p element of the html
        pEl.append(container);
      })
    })

    .catch(err => {
      console.error(err);
    });

}


function formHandler(event) {
  event.preventDefault();
  console.log('Submitted the form')
  const inputValue = movieNameInput.value;
  searchMovie(inputValue);
}

formSubmit.addEventListener('submit', formHandler);

