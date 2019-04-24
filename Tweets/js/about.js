function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//console.log(runkeeper_tweets);

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	//console.log("Start Printing");
	//console.log(tweet_array);
	//console.log("End Printing");

	$('#numberTweets').text(tweet_array.length);
	//TODO: remove these

	var earliest_tweet = tweet_array[0];
	//console.log("length: " + tweet_array.length);

	for (var i = 0; i < tweet_array.length; i++){
		if (tweet_array[i].time < earliest_tweet.time){
			earliest_tweet = tweet_array[i];
		}
	}

	var latest_tweet = tweet_array[0];
	for (var i = 0; i < tweet_array.length; i++){
		if (tweet_array[i].time > latest_tweet.time){
			latest_tweet = tweet_array[i];
		}
	}

	//console.log("Test Start");
	//console.log(earliest_tweet);
	//console.log("Test End");
	
	$('#firstDate').text(earliest_tweet.time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
	$('#lastDate').text(latest_tweet.time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));	


	completedCounter = 0;
	liveCounter = 0;
	achieveCounter = 0;
	miscellCounter = 0;

	completed_array = [];

	for (var i = 0; i < tweet_array.length; i++){
		if (tweet_array[i].source == "live_event") {
			liveCounter++;
		}
		else if (tweet_array[i].source == "achievement") {
			achieveCounter++;
		}
		else if (tweet_array[i].source == "completed_event") {
			completedCounter++;
			completed_array.push(tweet_array[i]);
		}
		else if (tweet_array[i].source == "miscellaneous") {
			miscellCounter++;
		}
	}

	$('.completedEvents').text(completedCounter);
	$('.liveEvents').text(liveCounter);
	$('.achievements').text(achieveCounter);
	$('.miscellaneous').text(miscellCounter);

	$('.completedEventsPct').text(math.format(completedCounter/tweet_array.length*100, {notation: 'fixed', precision: 2})+'%');
	$('.liveEventsPct').text(math.format(liveCounter/tweet_array.length*100, {notation: 'fixed', precision: 2})+'%');
	$('.achievementsPct').text(math.format(achieveCounter/tweet_array.length*100, {notation: 'fixed', precision: 2})+'%');
	$('.miscellaneousPct').text(math.format(miscellCounter/tweet_array.length*100, {notation: 'fixed', precision: 2})+'%');

	complete_and_written = 0;

	for (var i = 0; i < completed_array.length; i++){
		if (completed_array[i].written == true){
			complete_and_written++;
		}
	}

	$('.written').text(complete_and_written);
	$('.writtenPct').text(math.format(complete_and_written/completed_array.length*100, {notation: 'fixed', precision: 2})+'%');

}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});