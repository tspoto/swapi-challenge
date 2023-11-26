//search
var url_string = window.location.href; // gets query parameters from url
var url = new URL(url_string);
var search_query = url.searchParams.get("search_name"); // conditionals for data pull

var page_number = 1;
var page_end;

// spinner code, displays while page loads
var spinner_timeout;

function load_page() {
 get_results(page_number);
 spinner_timeout = setTimeout(show_page, 3000);
 if (search_query) {
  document.getElementById("clear-search").style.display = "block";
  document.getElementById("search_title").value = search_query;
 }
}

function show_page() {
 document.getElementById("directory").classList.add("show-directory");
 document.body.classList.add("ovrflw-scroll");
}

function hide_loader() {
 var loader = document.getElementById("loader");
 loader.style.opacity = "0";
 loader.style.transition = "opacity 1s";
}

// get results
function get_results(page_number) {
 var loader = document.getElementById("loader");
 loader.style.opacity = "1";
 loader.style.transition = "opacity 1s";

 var directory = document.getElementById("main-content");

 // add a search query if there is one in the nav
 var search_param = '';
 if (search_query) {
  search_param = '&search='+ search_query;
 }

 fetch('https://swapi.dev/api/people/?page='+page_number+search_param)
  .then(response => response.json())
  .then(people => {
    page_total = Math.ceil(people.count/10);
    if(page_number >= page_total) {
      page_end = true;
    }
    var star_wars_characters = []; // create array for cards to be displayed on page
    people.results.forEach(function(person) {
      star_wars_characters.push(person); // add to array
    });
    //console.log(people.results[i]);
    for (c = 0; c < star_wars_characters.length; c++) { // setting variables and building divs to be added to homepage
      var name = '';
      var height = '';
      var mass = '';
      var eye_color = '';
      var films_count = 0;
      var birth_year = '';
      if (star_wars_characters[c].name != 'unknown') {
        var name = '<div class="col-12"><h3><i class="fa fa-space-shuttle" aria-hidden="true"></i>' + star_wars_characters[c].name + '</h3></div>';
      }
      if (star_wars_characters[c].height != 'unknown') {
        var height = '<div class="col-6"><span class="label">Height: </span><span class="attr">' + star_wars_characters[c].height +'</span></div>';
      }
      if (star_wars_characters[c].mass != 'unknown') {
        var mass = '<div class="col-6"><span class="label">Mass: </span><span class="attr">' + star_wars_characters[c].mass +'</span></div>';
      }
      if (star_wars_characters[c].eye_color != 'unknown') {
        var eye_color = '<div class="col-6"><span class="label">Eye Color: </span><span class="attr">' + star_wars_characters[c].eye_color +'</span></div>';
      }
      if (star_wars_characters[c].films.length != 0) {
        var films_count = '<div class="col-6"><span class="label">Film Count: </span><span class="attr">' + star_wars_characters[c].films.length +'</span></div>';
      }
      if (star_wars_characters[c].birth_year != 'unknown') {
        var birth_year = '<div class="col-6"><span class="label">Birth Year: </span><span class="attr">' + star_wars_characters[c].birth_year +'</span></div>';
      }
      directory.innerHTML += //create html for results, insert into container div
      '<div class="col-md-6 col-12 person-wrapper"><div class="person-card"><div class="row">'
      + name
      + birth_year
      + height
      + mass
      + eye_color
      + films_count
      +'</div></div></div>'; //create html for results, insert into container div
    };
    hide_loader();
  });
}

//infinite scroll
window.addEventListener('scroll', function(ev) {
 if ((window.innerHeight + window.scrollY + 60) >= (document.body.offsetHeight) && page_end != true) {
  page_number++;
  get_results(page_number);
 } else if (page_end == true) {
  document.querySelector('.end-of-results').style.display = "block";
 }
});
