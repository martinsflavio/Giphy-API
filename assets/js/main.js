
var topics = [];

var $$ = {
	submitBtn: $("#btn-submit"),
	clearBtn: $("#btn-clear"),
	topicBtn: $(".topic-btn"),
	/*Elements*/
	btnBox: $("#btn-box"),
	gifBox: $("#gif-box"),
	search: $("#search-input"),
	selectedTopic: $("#selected-topic")
}

$(document).ready(function(){
	// Clear Button
	$$.clearBtn.on("click", function(){
		$$.gifBox.empty();
		$$.btnBox.empty();
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
		}else{
			console.log("button exist");
		}
	});

	// Topic Buttons
	$$.btnBox.on("click", $$.topicBtn, function(){
		var topicCall = $(this).text().trim();
		var query = "http://api.giphy.com/v1/gifs/search?q="+topicCall+"&api_key=dc6zaTOxFJmzC&limit=5";
		
		$$.selectedTopic.text(topicCall);

		$.ajax({
			url: query,
			method: "GET"
		}).done(function(response){
			var gifs = response.data;

			console.log(gifs);
		});
	});






});

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
			btn.addClass("topic-btn btn btn-default");
			btn.attr("type","button");
	
	for (var i = 0; i<arr.length; i++){
		var newbtn = btn;
		newbtn.text(arr[i]);
		$$.btnBox.append(newbtn);
	}
}
function displayGif (arr){

}








