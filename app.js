let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `https://www.omdbapi.com/?t=${movieName}&apikey=94d41250`;

  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter a Movie Name </h3>`;
  } else {
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        if (data.Response == "True") {
          result.innerHTML = ` 
          <div class="info">
           <img src=${data.Poster} class="poster">
           <div class="info-container">
               <h2>${data.Title} ( ${data.Year} )</h2>
               <div class="rating">
                 <img src="star.svg">
                 <h4>${data.imdbRating}</h4>
               </div>
               <div class="genre">
                   <div class="genre">${data.Genre.split(",").join(
                     "</div><div>"
                   )}</div>
               </div>
               <div class="summary">               
               <h3>Plot:</h3>
               <p>${data.Plot}</p>
               <h3>Cast:</h3>
               <p>${data.Actors}</p>
               </div>
           </div>
       </div>`;
        } else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
      });
  }
};

searchBtn.addEventListener("click", e => {
  e.preventDefault();
  getMovie();
});

window.addEventListener("load", getMovie);
