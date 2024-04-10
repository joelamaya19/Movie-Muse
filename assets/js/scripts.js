// This javascript file is to search for a movie.
const movieNameInput = document.querySelector('#userInput'); 
const formSubmit = document.querySelector('.searchForm');

console.log(formSubmit);
const optionsTMBD = {
  method: 'GET',
	headers: {
    accept: 'application/json',
	  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZGFiNmM3NzE0MDZiMDYwNGJhMTViZWNkOTRiMDAwNiIsInN1YiI6IjY2MTU2NzUxOGVlMGE5MDE2NWE0ODFjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iXAYBrRmgumRMOZbdk7mb79G7Wi5iKgl8Xeuj1b343U'
	}
};


function searchMovie(movie) {
  fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`, optionsTMBD)
	.then(response => {
    return response.json();
    })
	.then(response => {
        console.log(response);
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
  

