var Tweet = /** @class */ (function () {
    function Tweet(tweet_text, tweet_time) {
        this.text = tweet_text;
        this.time = new Date(tweet_time); //, "ddd MMM D HH:mm:ss Z YYYY"
    }
    Object.defineProperty(Tweet.prototype, "source", {
        //returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
        get: function () {
            return "unknown";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tweet.prototype, "written", {
        //returns a boolean, whether the text includes any content written by the person tweeting.
        get: function () {
            return false;
            //TODO: identify whether the tweet is written
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tweet.prototype, "writtenText", {
        get: function () {
            if (!this.written) {
                return "";
            }
            //TODO: parse the written text from the tweet
            return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tweet.prototype, "activityType", {
        get: function () {
            if (this.source != 'completed_event') {
                return "unknown";
            }
            //TODO: parse the activity type from the text of the tweet
            return "";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tweet.prototype, "distance", {
        get: function () {
            if (this.source != 'completed_event') {
                return 0;
            }
            //TODO: prase the distance from the text of the tweet
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Tweet.prototype.getHTMLTableRow = function (rowNumber) {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    };
    return Tweet;
}());
