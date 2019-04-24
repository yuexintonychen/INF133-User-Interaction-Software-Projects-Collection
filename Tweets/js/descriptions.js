function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	var writtenTweet = [];

	for (var i = 0; i<tweet_array.length; i++){
		if (tweet_array[i].writtenText != ""){
			writtenTweet.push(tweet_array[i]);
		}
	}
	return writtenTweet;
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	var input = document.getElementById("textFilter").value;
	return input;
}


//Wait for the DOM to load
$(document).ready(function() {
	var writtenTweet = [];
	var keywordDict = {};
	window.setInterval(function(){
		$("#tweetTable").empty();
		keywordDict = {};
		var userinput = addEventHandlerForSearch();
		$("#searchText").text(userinput);
		var writtenPending = loadSavedRunkeeperTweets().then(parseTweets);
		writtenPending.then(function(result) {
			writtenTweet = result;
			//console.log(result);
		});
		//console.log("Test start");
		//console.log(writtenTweet);
		//console.log("Test end");
		//console.log(addEventHandlerForSearch());

		if (!userinput){
		}
		else{
		for (var i = 0; i<writtenTweet.length; i++){
			//console.log("Test start");
			//console.log(writtenTweet[i]);
			//console.log("Test end");

			var lowercase = writtenTweet[i].writtenText.toLowerCase();
			var lowercaseInput = userinput.toLowerCase();

			if (lowercase.indexOf(lowercaseInput) != -1){
				/*if(!(JSON.stringify(writtenTweet[i]) in keywordArray)){
					keywordArray.push(JSON.stringify(writtenTweet[i]));
				}*/
				//console.log(writtenTweet[i].writtenText.indexOf(userinput));
				keywordDict[writtenTweet[i].writtenText] = writtenTweet[i];
			}
		}
		}

		//console.log(keywordDict);

		var rowCount = 1;
		for (var key in keywordDict){
			$("#tweetTable").append(keywordDict[key].getHTMLTableRow(rowCount));
			rowCount++;
		}

		$("#searchCount").text(rowCount-1);
		
	}, 500);

});