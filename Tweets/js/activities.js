function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	activity_dict = {};
	activity_categories = [];
	for (var i = 0; i<tweet_array.length; i++){
		if (tweet_array[i].activityType != "unknown")
		{
			if (tweet_array[i].activityType in activity_dict){
				activity_dict[tweet_array[i].activityType]++;
			}
			else{
				activity_categories.push(tweet_array[i].activityType);
				activity_dict[tweet_array[i].activityType] = 1;
			}
		}
	}

	$('#numberActivities').text(activity_categories.length);
	$('#firstMost').text("Run");
	$('#secondMost').text("Walk");
	$('#thirdMost').text("Bike");
	$('#longestActivityType').text("Bike");
	$('#shortestActivityType').text("Walk");
	$('#weekdayOrWeekendLonger').text("Bike");


	activity_categories.sort();
	//console.log(activity_categories);
	//console.log(activity_dict);

	activity_vis = [];
	for (var i = 0; i<activity_categories.length; i++){
		activity_vis.push({"Activity (Type)": activity_categories[i], "Number (Integer)": activity_dict[activity_categories[i]]});
	}

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v2.6.0.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activity_vis
	  },
	  //TODO: Add mark and encoding
	  "mark": "bar",
	  "encoding": {
	  	"x": {"field": "Activity (Type)", "type": "ordinal"},
	  	"y": {"field": "Number (Integer)", "type": "quantitative"}
	  }
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	
	distance_day = [];
	for (var i=0; i<tweet_array.length; i++){
		if (tweet_array[i].source == "completed_event"){
			if (tweet_array[i].activityType == "Run"||
				tweet_array[i].activityType == "Walk"||
				tweet_array[i].activityType == "Bike"){
				distance_day.push({"Activity Type": tweet_array[i].activityType, "Time": tweet_array[i].activityTime, 
					"Distance (mi)": tweet_array[i].distance});
			}
		}
	}

	$("#aggregate").click(function(){
		if ($('#aggregate').text() == "Show means"){
			$('#aggregate').text("Show all activities");
			$('#distanceVisAggregated').toggle();
			$('#distanceVis').toggle();
		}
		else{
			$('#aggregate').text("Show means");
			$('#distanceVis').toggle();
			$('#distanceVisAggregated').toggle();
		}
	}
	);


	distance_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v2.6.0.json",
	 	"description": "A graph of distances by day of the week for all of the three most tweeted-about activities.",
	 	"data": {
	 		/*"name": "myData"*/
	 		"values": distance_day
		},
		"mark": "point",
		"encoding": {
			"x": {"timeUnit": "day", "field": "Time", "type": "temporal"},
			"y": {"field": "Distance (mi)", "type": "quantitative"},
			"color": {"field": "Activity Type", "type": "nominal",
				"scale": {
					"domain": ["Run", "Walk", "Bike"],
					"range": ["blue", "orange", "#C91A3C"]
				}
			}
		}
	};

	vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});
	/*.then((res) => res.view
    .insert("myData", activity_categories)
    .run()
    )*/;

    //console.log(distance_day);

    distance_mean = {
		"$schema": "https://vega.github.io/schema/vega-lite/v2.6.0.json",
	 	"description": "A graph of aggregated mean distances by day of the week for all of the three most tweeted-about activities.",
	 	"data": {
	 		/*"name": "myData"*/
	 		"values": distance_day
		},
		"mark": "point",
		"encoding": {
			"x": {"timeUnit": "day", "field": "Time", "type": "temporal"},
			"y": {"aggregate":"mean", "field": "Distance (mi)", "type": "quantitative"},
			"color": {"field": "Activity Type", "type": "nominal",
				"scale": {
					"domain": ["Run", "Walk", "Bike"],
					"range": ["blue", "orange", "#C91A3C"]
				}
			}
		}
	};
	vegaEmbed('#distanceVisAggregated', distance_mean, {actions:false});
}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);

	if ($('#aggregate').text() == "Show means"){
		$('#distanceVisAggregated').toggle();
	} else {
		$('#distanceVis').toggle();
	}
});