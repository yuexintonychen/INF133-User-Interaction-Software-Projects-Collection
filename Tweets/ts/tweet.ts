class Tweet {
	private text:string;
    time:Date;
    lower:string;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
        this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
        this.lower = tweet_text.toLowerCase();
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        if (this.lower.search(/now/) != -1){
            return "live_event";
        }
        else if (this.lower.search(/achieved/) != -1){
            return "achievement";
        }
        else if (this.lower.search(/completed/) != -1||this.lower.search(/posted/) != -1){
            return "completed_event";
        }
        else{
            return "miscellaneous";
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        if (this.text.search(/ TomTom /) != -1 ||
            this.text.search(/ Fat Burner /) != -1||
            this.text.search(/ @Runkeeper /) != -1){
                return false;
            }
        else if (this.text.search(/-/) != -1){
            return true;
        }
        else{
            return false;
        }
        //TODO: identify whether the tweet is written
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        else if (this.text.search(/-/) != -1){
            var startPos = this.text.indexOf("-");
            return this.text.substr(startPos+2, this.text.length);
        }
        return "";
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        else if (this.lower.search(/ walk /) != -1){
            return "Walk";
        }
        else if (this.lower.search(/ elliptical workout /) != -1){
            return "Elliptical Workout";
        }
        else if (this.lower.search(/ spinning workout /) != -1){
            return "Spinning Workout";
        }
        else if (this.lower.search(/ meditation /) != -1){
            return "Meditation";
        }
        else if (this.lower.search(/ yoga practice /) != -1){
            return "Yoga Practice";
        }
        else if (this.lower.search(/ swim /) != -1){
            return "Swim";
        }
        else if (this.lower.search(/ bike /) != -1){
            return "Bike";
        }
        else if (this.lower.search(/ row /) != -1){
            return "Row";
        }
        else if (this.lower.search(/ mysports freestyle /) != -1){
            return "MySports Freestyle";
        }
        else if (this.lower.search(/ mtn bike /) != -1){
            return "Mountain Bike";
        }
        else if (this.lower.search(/ nordic walk /) != -1){
            return "Nordic Walk";
        }
        else if (this.lower.search(/ skate /) != -1){
            return "Skate";
        }
        else if (this.lower.search(/ strength workout /) != -1){
            return "Strength Workout";
        }
        else if (this.lower.search(/ crossfit/) != -1){
            return "CrossFit";
        }
        else if (this.lower.search(/ run /) != -1){
            return "Run";
        }
        else{
            return "Unknown Categories";
        }
    }

    get activityTime(): Date{
        return this.time;
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        else if (/*this.text.search(/\d+(\.\d+)?/) != -1*/this.text.match(/\d+(\.\d+)?/) != null){
            var str = this.text.match(/\d+(\.\d+)?/)![0];
            var float = parseFloat(str);
            if (this.text.search(/ km /) != -1){
                float = float/1.609;
            }
            return float;
        }
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        var linkStart = this.writtenText.indexOf("https");
        var linkEnd = this.writtenText.indexOf("#Runkeeper");
        var link = this.writtenText.substr(linkStart, linkEnd-1-linkStart);
        return "<tr><td>"+rowNumber+"</td><td>"+this.activityType+"</td><td>"+this.writtenText.substr(0, linkStart-1)
        +'&nbsp;<a href="'+link+'">'+link+"</a>&nbsp;#Runkeeper.</td></tr>";
    }
}