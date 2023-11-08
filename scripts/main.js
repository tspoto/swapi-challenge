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
		$("#clear-search").show();
		$("#search_title").val(search_query);
	}
}

function show_page() {
	$("#directory").addClass("show-directory");
	$("body").addClass("ovrflw-scroll");
}

function hide_loader() {
	$("#loader").fadeOut()
}




// get results
function get_results(page_number) {
	$("#loader").fadeIn();

	var $directory = $("#main-content");

	// add a search query if there is one in the nav
	if (search_query) {
		var search_param = '&search='+ search_query;
	} else {
		var search_param = '';
	}

	$.ajax({
		type: 'GET',
		url: 'https://swapi.dev/api/people/?page='+page_number+search_param,
		success: function(people) {
			page_total = Math.ceil(people.count/10);
			if(page_number >= page_total) {
				page_end = true;
			}
			var star_wars_characters = []; // create array for cards to be displayed on page
			$.each(people.results, function(i, person) {
				star_wars_characters.push(people.results[i]); // add to array
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
				$directory.append( //create html for results, insert into container div
					'<div class="col-md-6 col-12 person-wrapper"><div class="person-card"><div class="row">'
					+ name
					+ birth_year
					+ height
					+ mass
					+ eye_color
					+ films_count
					+'</div></div></div>'
				); //create html for results, insert into container div
			};
		hide_loader();
	}
});
};





//anonymous funcitons
$(document).ready(function() {

});




//infinite scroll
window.onscroll = function(ev) {
	if ((window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight) && page_end != true) {
		page_number++;
		get_results(page_number);
	}
  else if (page_end == true) {
      $('.end-of-results').show();
  }
};
