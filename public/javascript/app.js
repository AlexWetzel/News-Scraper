// $(document).ready(function(){
// 	$('.collapsible').collapsible();
// });

console.log("Powered by Javascript");

$(document).on("click", "#scraper", function(event) {
	event.preventDefault();

	$(".progress").removeClass("hide");

	$.ajax("/scrape", {type: "GET"}).then(function(response){
		if (response) {
			console.log(response);
			location.reload();
		} else {
			console.log("Nothing interesting happens...")
		}
		
	})
});

$(document).on("click", "#save", function(event) {
	event.preventDefault();

	$(".progress").removeClass("hide");

	var id = $(this).data("id");

	console.log(id)

	$.ajax("/save", {
		type: "PUT",
		data: {id: id}
	}).then(function(response) {
		if (response) {
			console.log(response);
			location.reload();
		} else {
			console.log("Nothing interesting happens...")
		}
	});
});

$(document).on("click", "#addNote", function(event) {
	event.preventDefault();

	var id = $(this).data("id");

	$.ajax("/note", {
		type: "POST",
		data: {
			note: "This is a note",
			id: id
		}
	}).then(function(response){
		if (response) {
			console.log(response);
			location.reload();
			
			// var noteItem = $("li").text("This note")
			// $("#notes").append()
		} else {
			console.log("Nothing interesting happens...")
		}
		
	})
});