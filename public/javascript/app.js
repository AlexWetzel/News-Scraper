var id;


$(document).ready(function(){
	// the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
	$('.modal').modal();
});


//Event listeners
//========================

$(document).on("click", "#scraper", function(event) {
	event.preventDefault();
	//Show the loading bar until the page refreshes
	$(".progress").removeClass("hide");
	//Send a request to the server to scrape articles
	$.ajax("/scrape", {type: "GET"}).then(function(response){
		console.log(response);
		location.reload();			
	});
});

$(document).on("click", "#save", function(event) {
	event.preventDefault();
	//Store the data-id of the element
	var id = $(this).data("id");
	//Request to update the data entry
	$.ajax("/saveArticle", {
		type: "PUT",
		data: {id: id}
	}).then(function(response) {
		if (response) {
			console.log(response);
			//Reload if the article is saved
			location.reload();
		} else {
			console.log("Nothing interesting happens...")
		}
	});
});

$(document).on("click", "#remove", function(event) {
	event.preventDefault();
	//Store the data-id of the element
	var id = $(this).data("id");
	//Request to update the data entry
	$.ajax("/removeArticle", {
		type: "PUT",
		data: {id: id}
	}).then(function(response) {
		if (response) {
			console.log(response);
			//Reload if the article is unsaved
			location.reload();
		} else {
			console.log("Nothing interesting happens...")
		}
	});
});

$(document).on("click", ".modal-trigger", function(event) {
	event.preventDefault();

	id = $(this).data("id");

	console.log("Article id:", id);
});

$(document).on("click", "#submit", function(event) {
	event.preventDefault();
	//Post request to add a note

	var note = $("#note-field").val();

	console.log("Article id:", id);
	console.log("Note:", note);
	
	$.ajax("/note", {
		type: "POST",
		data: {
			note: note,
			id: id
		}
	}).then(function(response){
		if (response) {
			//Reload the page to see the note
			location.reload();
		} else {
			console.log("Nothing interesting happens...")
		}
		
	})
});

$(document).on("click", ".modal-close", function(evet) {
	$("#note-form").trigger('reset');
	$("#note-form").trigger('autoresize');
});