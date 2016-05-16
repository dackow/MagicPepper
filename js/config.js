var config = {
    lang: 'pl',
    time: {
        timeFormat: 24,
        displaySeconds: true,
        digitFade: false,
    },
    weather: {
        //change weather params here:
        //units: metric or imperial
        params: {
            q: 'Rzeszów',
            units: 'metric',
            // if you want a different lang for the weather that what is set above, change it here
            lang: 'pl',
            APPID: '84d1f425d090daa9cd0da19e96a23e2b'
        }
    },
    compliments: {
        interval: 30000,
        fadeInterval: 4000,
        morning: [
            'Good morning, handsome!',
            'Enjoy your day!',
            'How was your sleep?'
        ],
        afternoon: [
            'Hello, motherfucker!',
            'You look good!',
            'Looking good today!'
        ],
        evening: [
            'Wow, you look hot!',
            'You look nice!',
            'Hi!'
        ]
    },
    calendar: {
        maximumEntries: 20, // Total Maximum Entries
		displaySymbol: true,
		defaultSymbol: 'calendar', // Fontawsome Symbol see http://fontawesome.io/cheatsheet/
        urls: [
		//{
	//		symbol: 'waldemar-dacko', 
	//		url: 'https://calendar.google.com/calendar/ical/waldemar.dacko%40gmail.com/public/basic.ics'
	//	}//,
		{
			symbol: 'soccer-ball-o1',
			url: 'https://calendar.google.com/calendar/ical/waldemar.dacko%40gmail.com/private-0f049086873b5cce261a62ca04387b44/basic.ics'
		}
		// {
			// symbol: 'mars',
			// url: "https://server/url/to/his.ics",
		// },
		// {
			// symbol: 'venus',
			// url: "https://server/url/to/hers.ics",
		// },
		// {
			// symbol: 'venus-mars',
			// url: "https://server/url/to/theirs.ics",
		// },
		]
    },
    news: {
        feed: 'http://wiadomosci.wp.pl/ver,rss,rss.xml'
        
    },
    pepper: {
        feed: 'https://www.pepper.pl/rss/wszystkie',
        updateInterval: 1000,//1000*60,
        fetchInterval: 15000,
        feeds : ['http://wiadomosci.wp.pl/ver,rss,rss.xml', 
                 'http://www.tvn24.pl/najnowsze.xml',
                 'https://www.pepper.pl/rss/wszystkie']

    },



}
