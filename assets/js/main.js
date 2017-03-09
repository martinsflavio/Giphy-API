	var topics = [];

	var $$ = {
		/*Buttons*/
		submitBtn: $("#btn-submit"),
		clearBtn: $("#btn-clear"),
		totalDisplay: $("#total-display"),
		
		/*HTML-Elements*/
		btnBox: $("#btn-box"),
		gifBox: $("#gif-box"),
		search: $("#search-input"),
		selectedTopic: $("#selected-topic")
	}

$(document).ready(function(){


	/*=============== Click Events ===============*/

	// Clear Button
	$$.clearBtn.on("click", function(){
		$$.gifBox.empty();
		$$.btnBox.empty();
		$$.selectedTopic.empty();
		topics = [];
	});
	
	// Search Button
	$$.submitBtn.on("click", function(event){
		event.preventDefault();

		var newTopic = $$.search.val().trim();
		$$.search.val("");

		if(validateEntry(topics, newTopic)){
			topics.push(newTopic);	
			displayBtn(topics);	
		}
	});

	// Topic Buttons
	$$.btnBox.on("click", "button", function(){
		var totalDisplay = $( "#total-display option:selected" ).text();
		var topicCall = $(this).text().trim();

		var query = "http://api.giphy.com/v1/gifs/search?q="+topicCall+"&api_key=dc6zaTOxFJmzC&limit="+totalDisplay;
		
		//Clear Gifs Container
		$$.selectedTopic.text("Displaying "+totalDisplay+" "+topicCall+" gifs");
		$$.gifBox.empty();

		$.ajax({
			url: query,
			method: "GET"
		}).done(function(response){
			var imgPerLine = 4;
			var rowNumb = 0;
			var counter = 0;

			// Display Gifs on Screen
			for(var i = 0; i<response.data.length; i++){
				// Counts row many gifs will be placed per row
				if (counter === imgPerLine){
					counter = 0;
				}
				// Create a new row every 4 gits
				if(counter === 0){
					$$.gifBox.append("<div class=row>");
					$$.gifBox.attr("id", i);
					rowNumb = i;
				}
				// Place the next 4 gifs in the row created above
				$("#"+rowNumb).append(displayGif(response.data[i]));
				counter++;
			}
		});
	});

	// Gifs Stop and Go
	$$.gifBox.on("click", "img", function(){
		var gifState = $(this).attr("data-state");

		if(gifState === "still"){
			$(this).attr("src",$(this).data("animate"));
			$(this).attr("data-state", "animate");
		}else{
			$(this).attr("src", $(this).data("still"));
			$(this).attr("data-state", "still");
		}	
	});
});


/*=========== functions ========================*/
function validateEntry (arr, searchInput){
	
	if (searchInput === ""){
		return false;
	}else{
		if (arr.indexOf(searchInput) === -1){
			return true;
		}else{
			return false;
		}
	}
}
function displayBtn (arr){

	var btn = $("<button>");
			btn.addClass("topic-btn btn btn-success btn-primary");
			btn.attr("type","button");
	
	for (var i = 0; i<arr.length; i++){
		var newbtn = btn;
		newbtn.text(arr[i]);
		$$.btnBox.append(newbtn);
	}
}
function displayGif (gifObj){
	var gif = $("<div>");
			gif.addClass("col-sm-3");
			gif.append("<div class='thumbnail-gif thumbnail'>");
			gif.find(".thumbnail-gif").append("<img class='gif'>");
			gif.find(".thumbnail-gif").append("<h5 class='text-center'> Rating: "+gifObj.rating+"</h5>");
			gif.find(".gif").attr("src", gifObj.images.fixed_width_still.url);
			gif.find(".gif").attr("data-still", gifObj.images.fixed_width_still.url);
			gif.find(".gif").attr("data-animate", gifObj.images.fixed_width.url);	
			gif.find(".gif").attr("data-state", "still");
	return gif;
}








