// A lot of this code is from the original feedToJson function that was included with this project
// The new code allows for multiple feeds to be used but a bunch of variables and such have literally been copied and pasted into this code and some help from here: http://jsfiddle.net/BDK46/
// The original version can be found here: http://airshp.com/2011/jquery-plugin-feed-to-json/
var gmail = {
    clientId: config.gmail.clientId || null,
    apiKey: config.gmail.apiKey || null,
    scopes: config.gmail.scopes || null,
    gmailLocaltion: '.gmail',
    newsItems: [],
    seenNewsItem: [],
    currentEmail: null,
    _failedAttempts: 0,
    fetchInterval: config.gmail.fetchInterval || 60000,
    updateInterval: config.gmail.interval || 5500,
    fadeInterval: 0,
    intervalId: null,
    counter: 0,
    maxLineLength: 125,
}


gmail.handleClientLoad = function(parent) {
    gapi.client.setApiKey(this.apiKey);

    window.setTimeout(function() {
        parent.checkAuth(parent)
    }, 1);
}

gmail.checkAuth = function(parent) {
    gapi.auth.authorize({
        client_id: this.clientId,
        scope: this.scopes,
        immediate: true
    }, function(authResult) {
        if (authResult && !authResult.error) {
            parent.loadGmailApi();
            $('#authorize-button').remove();
            $('.table-inbox').removeClass("hidden");
        } else {
            $('#authorize-button').removeClass("hidden");
            $('#authorize-button').on('click', function() {
                parent.handleAuthClick(parent);
            });
        }
    });
}

gmail.handleAuthClick = function(parent) {
    gapi.auth.authorize({
        client_id: parent.clientId,
        scope: parent.scopes,
        immediate: false
    }, parent.handleAuthResult);
    return false;
}

gmail.handleAuthResult = function(authResult) {
    if (authResult && !authResult.error) {
        this.loadGmailApi();
        $('#authorize-button').remove();
        $('.table-inbox').removeClass("hidden");
    } else {
        $('#authorize-button').removeClass("hidden");
        $('#authorize-button').on('click', function() {
            this.handleAuthClick();
        });
    }
    console.log("Gmail loaded correctly")
}

gmail.loadGmailApi = function() {
    gapi.client.load('gmail', 'v1', this.displayInbox);
}




gmail.displayInbox = function() {
    var request = gapi.client.gmail.users.messages.list({
        'userId': 'me',
        'labelIds': 'INBOX',
        'maxResults': 10
    });
    request.execute(function(response) {
        $.each(response.messages, function() {
            var messageRequest = gapi.client.gmail.users.messages.get({
                'userId': 'me',
                'id': this.id
            });
            messageRequest.execute(this.appendMessageRow);
        });
    });
}

gmail.appendMessageRow = function(message) {
    var from = this.getHeader(message.payload.headers, 'From');
    var subject = this.getHeader(message.payload.headers, 'Subject');
    var date = this.getHeader(message.payload.headers, 'Date');
    /*
        $('.table-inbox tbody').append(
          '<tr>\
            <td>'+this.getHeader(message.payload.headers, 'From')+'</td>\
            <td>\
              <a href="#message-modal-' + message.id +
                '" data-toggle="modal" id="message-link-' + message.id+'">' +
                this.getHeader(message.payload.headers, 'Subject') +
              '</a>\
            </td>\
            <td>'+this.getHeader(message.payload.headers, 'Date')+'</td>\
          </tr>'
        );
        $('body').append(
          '<div class="modal fade" id="message-modal-' + message.id +
              '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">\
            <div class="modal-dialog modal-lg">\
              <div class="modal-content">\
                <div class="modal-header">\
                  <button type="button"\
                          class="close"\
                          data-dismiss="modal"\
                          aria-label="Close">\
                    <span aria-hidden="true">&times;</span></button>\
                  <h4 class="modal-title" id="myModalLabel">' +
                    this.getHeader(message.payload.headers, 'Subject') +
                  '</h4>\
                </div>\
                <div class="modal-body">\
                  <iframe id="message-iframe-'+message.id+'" srcdoc="<p>Loading...</p>">\
                  </iframe>\
                </div>\
              </div>\
            </div>\
          </div>'
        );
        $('#message-link-'+message.id).on('click', function(){
          var ifrm = $('#message-iframe-'+message.id)[0].contentWindow.document;
          $('body', ifrm).html(this.getBody(message.payload));
        });*/
}

gmail.getHeader = function(headers, index) {
    var header = '';
    $.each(headers, function() {
        if (this.name === index) {
            header = this.value;
        }
    });
    return header;
}

gmail.getBody = function(message) {
    var encodedBody = '';
    if (typeof message.parts === 'undefined') {
        encodedBody = message.body.data;
    } else {
        encodedBody = getHTMLPart(message.parts);
    }
    encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
    return decodeURIComponent(escape(window.atob(encodedBody)));
}

gmail.getHTMLPart = function(arr) {
    for (var x = 0; x <= arr.length; x++) {
        if (typeof arr[x].parts === 'undefined') {
            if (arr[x].mimeType === 'text/html') {
                return arr[x].body.data;
            }
        } else {
            return this.getHTMLPart(arr[x].parts);
        }
    }
    return '';
}

gmail.init = function() {
    var parent = this;
    this.handleClientLoad(parent);
    //jQuery.getScript( "https://apis.google.com/js/client.js", this.handleClientLoad);
    //$('head').append($('<script>').attr('type', 'text/javascript').attr('src', 'https://apis.google.com/js/client.js'));
    //jQuery.getScript( "https://apis.google.com/js/api.js", this.handleClientLoad );	
    //jQuery.getScript( "https://apis.google.com/js/client.js", this.handleClientLoad );	
    //document.write('<script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>');
    //<script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>
    //$(this.gmailLocaltion).updateWithText( '<script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>', 0);
}


gmail.includeJS = function(jsFile) {
    //$('head').append($('<script>').attr('type', 'text/javascript').attr('src', 'https://apis.google.com/js/client.js'));

}


gmail.showEmails = function() {
        //$(this.gmailLocaltion).updateWithText( "<hr />" + this.currentEmail , 0);
    }
    /*
    /**
     * Creates the query string that will be used to grab a converted RSS feed into a JSON object via Yahoo
     * @param  {string} feed The original location of the RSS feed
     * @return {string}      The new location of the RSS feed provided by Yahoo
     */
    /*
pepper.buildQueryString = function (feed) {

	return this._yqURL + this._yqlQS + '\'' + encodeURIComponent(feed) + '\'';

}

*/
    /**
     * Fetches the news for each feed provided in the config file
     */
    /*
pepper.fetchNews = function () {

	// Reset the news feed
	this.newsItems = [];

	this.feed.forEach(function (_curr) {

		var _yqUrlString = this.buildQueryString(_curr);
		this.fetchFeed(_yqUrlString);

	}.bind(this));
}

pepper.fetchAndShowSingleFeed = function (feed){
	this.currentFeed = feed;
	// Reset the news feed
	this.newsItems = [];

	var _yqUrlString = this.buildQueryString(feed);
	this.fetchFeed(_yqUrlString);
}
*/


/**
 * Runs a GET request to Yahoo's service
 * @param  {string} yqUrl The URL being used to grab the RSS feed (in JSON format)
 */
/*
pepper.fetchFeed = function (yqUrl) {

	$.ajax({
		type: 'GET',
		datatype:'jsonp',
		url: yqUrl,
		success: function (data) {

			if (data.query.count > 0) {
				this.parseFeed(data.query.results.item);
			} else {
				console.error('No feed results for: ' + yqUrl);
			}

		}.bind(this),
		error: function () {
			// non-specific error message that should be updated
			console.error('No feed results for: ' + yqUrl);
		}
	});

}
*/
/**
 * Parses each item in a single news feed
 * @param  {Object} data The news feed that was returned by Yahoo
 * @return {boolean}      Confirms that the feed was parsed correctly
 */
/*
pepper.parseFeed = function (data) {

	var _rssItems = [];

	for (var i = 0, count = data.length; i < count; i++) {

		if(data[i].title.length > this.maxLineLength){
			var sub = data[i].title.substring(0,this.maxLineLength);
            var lastSpaceIndex = sub.lastIndexOf(" ");
            if(lastSpaceIndex !== -1){
            	sub = sub.substring(0, lastSpaceIndex) + "...";
            }
			_rssItems.push(sub);
		}else{	
			_rssItems.push(data[i].title);
		}	

	}

	this.newsItems = this.newsItems.concat(_rssItems);
    this.showNews();
	return true;

}
*/
/**
 * Loops through each available and unseen news feed after it has been retrieved from Yahoo and shows it on the screen
 * When all news titles have been exhausted, the list resets and randomly chooses from the original set of items
 * @return {boolean} Confirms that there is a list of news items to loop through and that one has been shown on the screen
 */
/*
pepper.showNews = function () {

	// If all items have been seen, swap seen to unseen
	if (this.newsItems.length === 0 && this.seenNewsItem.length !== 0) {

		if (this._failedAttempts === 20) {
			console.error('Failed to show a news story from pepper 20 times, stopping any attempts');
			return false;
		}

		this._failedAttempts++;

		setTimeout(function () {
			this.showNews();
		}.bind(this), 3000);

	} else if (this.newsItems.length === 0 && this.seenNewsItem.length !== 0) {
		this.newsItems = this.seenNewsItem.splice(0);
	}

	text = this.newsItems.join("<br />");
	$(this.newsLocation).updateWithText(text, this.fadeInterval);
/*
	var currTime = new Date();
	hour = currTime.getHours();
	if(hour < 10){
		hour = "0" + hour;
	}
	min = currTime.getMinutes();
	if(min < 10){
		min = "0" + min;
	}
	sec = currTime.getSeconds();
	if(sec < 10){
		sec = "0" + sec;
	}

	var syncDate = hour + ":" + min + ":" + sec;
*/
/*
	$(this.syncLocation).updateWithText( "<hr />" + this.currentFeed , 0);
	this.counter = this.counter + 1;

	return true;

}
*/
/*
pepper.init = function () {



	//this.do_standalone();
	if (this.feed === null || (this.feed instanceof Array === false && typeof this.feed !== 'string')) {
		return false;
	} else if (typeof this.feed === 'string') {
		this.feed = [this.feed];
	}

	//this.fetchNews();
	//this.showNews();
	
/*
	this.fetchNewsIntervalId = setInterval(function () {
		this.fetchNews()
	}.bind(this), this.fetchInterval)

	this.intervalId = setInterval(function () {
		this.showNews();
	}.bind(this), this.updateInterval);
*/
//var fetchIndex = 1;


//this.fetchSingleNews(this.feeds[fetchIndex]);
//this.showNews();
/*
	var fetchIndex = 0;
	setInterval(function(){		
		this.fetchAndShowSingleFeed(this.feeds[fetchIndex]);
		if(fetchIndex === this.feeds.length-1){
			fetchIndex = 0;			
		}else{
			fetchIndex = fetchIndex + 1;
		}
	}.bind(this), this.fetchInterval);
/*
	this.intervalId = setInterval(function () {
		this.showNews();
	}.bind(this), this.updateInterval);
	*/
//}