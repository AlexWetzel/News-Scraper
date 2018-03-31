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
	$.ajax("/save", {
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

$(document).on("click", "#addNote", function(event) {
	event.preventDefault();
	//TODO: Get text from a form in the saved article
	//Store the data-id of the element
	var id = $(this).data("id");
	//Post request to add a note
	$.ajax("/note", {
		type: "POST",
		data: {
			//Placeholder note
			note: "This is a note",
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