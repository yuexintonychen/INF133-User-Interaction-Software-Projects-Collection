function generateTweet() {
var RUNKEEPER_TWEETS = [];


var x = 0;
var interval = window.setInterval(function(){
var fetchResult = fetch('http://localhost:7890/1.1/search/tweets.json?q=%23Runkeeper&count=100&result_type=recent')
  .then(function(response) {
  	//console.log(response);
    return response.json();
  })
  .then(function(myJson) {
  	//console.log(myJson.statuses);
    //console.log(JSON.stringify(myJson));
    return myJson.statuses;
  });

fetchResult.then(function(result){
	RUNKEEPER_TWEETS = result;
});


//console.log("Inside Start");
//console.log(RUNKEEPER_TWEETS);
//console.log("Inside End");

x++;
	if (x === 2){
		window.clearInterval(interval);
	}
},1000);

//console.log("Right before return");
//console.log(RUNKEEPER_TWEETS);
//console.log("Right before return");
return RUNKEEPER_TWEETS;

}

function loadLiveRunkeeperTweets() {
	return new Promise(function(resolve, reject) {

		var RUNKEEPER_TWEETS = generateTweet();
		//console.log("Hey -" + RUNKEEPER_TWEETS + "- end");
		if(RUNKEEPER_TWEETS != ""){
			resolve(RUNKEEPER_TWEETS);
		}
	});
}