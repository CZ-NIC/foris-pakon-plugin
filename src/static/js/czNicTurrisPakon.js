'use strict';

/** @typedef {function(): true} Chart - global Chart export from library Chart.js */
var Chart;

const czNicTurrisPakon = class // eslint-disable-line no-unused-vars
{

	/**
	 * @constructor
	 * @param {Window} w - root website object
	 */
	constructor ( w = window )
	{
		/**
		 * @public
		 */
		this.window = w;

		this.idb = this.window.indexedDB
			|| this.window[ 'mozIndexedDB' ]
			|| this.window[ 'webkitIndexedDB' ]
			|| this.window[ 'msIndexedDB' ]
			|| this.window[ 'shimIndexedDB' ]; // This works on all devices/browsers, and uses IndexedDBShim as a final fallback

		/**
		 * @public
		 */
		this.brandColors = Object.freeze( [
			'500px',
			'about-me',
			'adobe',
			'aer-lingus',
			'aetna',
			'aiesec',
			'aim',
			'airbnb',
			'akamai',
			'alcon',
			'algolia',
			'alibaba',
			'alienware',
			'alphabet',
			'amazon',
			'american-express',
			'american-red-cross',
			'android',
			'angies-list',
			'angularjs',
			'answers',
			'aol',
			'arch-linux',
			'arizona-state-university-asu',
			'arriva-danmark',
			'asana',
			'askfm',
			'associated-press',
			'att',
			'atlanta-falcons',
			'atlantic-coast-conference-acc',
			'atlassian',
			'auth0',
			'avira',
			'baidu',
			'bandcamp',
			'barclays',
			'barnes-noble',
			'basecamp',
			'beats-by-dre',
			'bebo',
			'behance',
			'best-buy',
			'big-cartel',
			'bing',
			'bitbucket',
			'bitly',
			'blackberry',
			'blockchain',
			'blogger',
			'boeing',
			'boise-state-university',
			'bombardier',
			'booking-com',
			'bower',
			'box',
			'boy-scouts-of-america',
			'british-airways',
			'bt',
			'buffer',
			'burger-king',
			'buzzfeed',
			'bynder',
			'cadbury',
			'canon',
			'capital-one',
			'carbonmade',
			'carrefour',
			'carrot',
			'cartoon-network',
			'case-mate',
			'change-org',
			'channel-4',
			'charity-water',
			'cheddar',
			'clemson-university',
			'coca-cola',
			'code-school',
			'codecademy',
			'codepen',
			'connexxion',
			'continental-ag',
			'courtyard',
			'craft-cms',
			'creative-commons',
			'creative-market',
			'crowdin',
			'crowne-plaza',
			'crunchbase',
			'culvers',
			'cunard',
			'cvs',
			'dailymotion',
			'daimler',
			'dealhack',
			'debian',
			'deezer',
			'delectable',
			'delicious',
			'dell',
			'delta-airlines',
			'dental-plans',
			'designer-news',
			'designmoo',
			'deutsche-bahn',
			'deviantart',
			'devour',
			'dewalt',
			'dhl',
			'diebold',
			'digg',
			'digital-ocean',
			'dindr',
			'direct-energy',
			'directv',
			'discogs',
			'discord',
			'dish-network',
			'disney-xd',
			'disqus',
			'django',
			'docker',
			'dominos',
			'dow',
			'dribbble',
			'dropbox',
			'droplr',
			'drupal',
			'dunked',
			'duolingo',
			'dwolla',
			'etrade',
			'e4',
			'easy-jet',
			'ebay',
			'el-al',
			'elance',
			'ello',
			'ember',
			'emma',
			'endomundo',
			'engadget',
			'envato',
			'epam',
			'epictions',
			'ericsson',
			'esl',
			'espn',
			'estimote',
			'etsy',
			'evaneos',
			'eventbrite',
			'evernote',
			'execucar',
			'fab-com',
			'facebook',
			'fairfield-inn-suites',
			'fairmont',
			'famo-us',
			'fancy',
			'fedex',
			'feedly',
			'fendi',
			'ferrari',
			'fiat',
			'film4',
			'firefox',
			'fiskars',
			'fitbit',
			'five-guys',
			'fiverr',
			'flattr',
			'flavors-me',
			'flickr',
			'flipboard',
			'flixster',
			'follr',
			'ford',
			'4ormat',
			'forrst',
			'foursquare',
			'freecodecamp',
			'friend2friend',
			'gallaudet-university',
			'gannett',
			'garmin',
			'garuda',
			'generatepress',
			'geocaching',
			'georgia-southern-university',
			'ghost',
			'gibson',
			'gimmebar',
			'github',
			'gitlab',
			'gitter',
			'gittip',
			'godaddy',
			'gogo',
			'goodreads',
			'google',
			'google-allo',
			'google-duo',
			'google-plus',
			'gospel-for-asia',
			'gravatar',
			'gravit',
			'greenhouse',
			'groupon',
			'grunt',
			'gumtree',
			'gvb',
			'hacker-news',
			'hangouts',
			'happn',
			'heineken',
			'hellowallet',
			'help-scout',
			'heroku',
			'hewlett-packard-enterprise',
			'hi5',
			'highfive',
			'home-depot',
			'homeaway',
			'hootsuite',
			'houzz',
			'hp',
			'hsbc',
			'html5',
			'hulu',
			'hyatt',
			'ibm',
			'icons8',
			'ideal',
			'identi-ca',
			'ifttt',
			'iheartradio',
			'ikea',
			'imdb',
			'imgur',
			'indeed',
			'indiegogo',
			'instacart',
			'instagram',
			'instapage',
			'instapaper',
			'intel',
			'intuit',
			'ios',
			'issuu',
			'istock',
			'javascript',
			'jawbone',
			'jbl',
			'jetpack',
			'joomla',
			'joyent',
			'jquery',
			'kaspersky-lab',
			'keeeb',
			'khan-academy',
			'kia',
			'kickstarter',
			'kik',
			'kippt',
			'kitkat',
			'kiva',
			'kiwipay',
			'klm',
			'lamborghini',
			'laravel',
			'lastfm',
			'lastpass',
			'lego',
			'line',
			'linkedin',
			'livestream',
			'lloyds',
			'lomo',
			'london-underground',
			'lowes',
			'lumo',
			'lyft',
			'magento',
			'mail-ru',
			'mailchimp',
			'manjaro-linux',
			'mapbox',
			'massy-group',
			'mastercard',
			'mcdonalds',
			'medium',
			'meetup',
			'meijer',
			'mercadolibre-com',
			'messenger',
			'microsoft',
			'microsoft-band',
			'microsoft-office',
			'microsoft-surface',
			'milligram',
			'mixcloud',
			'mixpanel',
			'mobilink',
			'mollie',
			'mongodb',
			'montclair-state-university',
			'more4',
			'motorola',
			'mozilla',
			'musixmatch',
			'muut',
			'myspace',
			'mysql',
			'nanowrimo',
			'nasa',
			'national-geographic',
			'nationwide',
			'nbc',
			'nc-state-university',
			'nest',
			'netflix',
			'netvibes',
			'new-balance',
			'new-york-post',
			'nexar',
			'nexmo',
			'nextdoor',
			'nfl',
			'nike-football',
			'nikefuel',
			'ning',
			'ninjas-in-pyjamas',
			'node-js',
			'nokia',
			'norsan-media',
			'northern-arizona-university',
			'northwestern-university',
			'novartis',
			'npm',
			'ns',
			'nvidia',
			'nzxt',
			'obb',
			'odnoklassniki',
			'office-sway',
			'oktopost',
			'olark',
			'olympus',
			'oneplus',
			'onshape',
			'oovoo',
			'opera',
			'oracle',
			'oregon-state-university',
			'overstock',
			'oxford-university-press',
			'pac-12',
			'panasonic',
			'pandora',
			'path',
			'patreon',
			'paymill',
			'paypal',
			'pearson',
			'penguin-books',
			'pepsi',
			'periscope',
			'pfizer',
			'philips',
			'photobucket',
			'php',
			'pinboard',
			'pinterest',
			'pizza-hut',
			'plasso',
			'plaxo',
			'playstation',
			'pocket',
			'polariod',
			'portfolium',
			'postman',
			'postmates',
			'prestashop',
			'prezi',
			'priceline',
			'princeton-university',
			'product-hunt',
			'protonmail',
			'puma',
			'purdue-university',
			'python',
			'qantas-airlines',
			'qualtrics',
			'quizup',
			'quora',
			'quote-fm',
			'raspberry-pi',
			'razer',
			'rdio',
			'remax',
			'react',
			'readability',
			'realex-payments',
			'red-hat',
			'reddit',
			'redfin',
			'redox',
			'renaissance-hotels',
			'rentler',
			'residence-inn',
			'reverbnation',
			'rochester-institute-of-technology',
			'rockpack',
			'roku',
			'rolls-royce',
			'roo-kids',
			'roon',
			'rosetta-stone',
			'rounds',
			'rowan-university',
			'royal-mail',
			'rss-2',
			'ruby',
			'ruby-on-rails',
			'rutgers-university',
			'ryanair',
			'sabre',
			'sage',
			'sainsburys',
			'salesforce',
			'samsung',
			'san-francisco-49ers',
			'san-francisco-giants',
			'sap',
			'scouts-uk',
			'scribd',
			'septa',
			'seton-hall-university',
			'shazam',
			'sherwin-williams',
			'shopify',
			'shopmium',
			'siemens',
			'skillshare',
			'skoda',
			'skype',
			'skywest',
			'slack',
			'slideshare',
			'slipcase',
			'smashing-magazine',
			'snagajob',
			'snapchat',
			'socialbro',
			'softonic',
			'songkick',
			'sonicbids',
			'sony',
			'soulcycle',
			'soundcloud',
			'spoken',
			'spotify',
			'sprint',
			'sprout-social',
			'square-cash',
			'squarespace',
			'stack-exchange',
			'stackoverflow',
			'staples',
			'starbucks',
			'state-farm',
			'status-chart',
			'steam',
			'sterling-hotels',
			'stockton-university',
			'storyful',
			'strava',
			'streamable',
			'stripe',
			'stubhub',
			'studyblue',
			'stumbleupon',
			'subway',
			'sugarcrm',
			'suntrust',
			'supershuttle',
			'swarm',
			't-mobile',
			'tagstr',
			'taiga',
			'target',
			'technorati',
			'ted',
			'telegram',
			'tvtag',
			'temple',
			'tesco',
			'tesla',
			'texas-am-university',
			'texas-tech-university',
			'the-audience-awards',
			'the-college-of-new-jersey',
			'the-next-web',
			'the-ritz-carlton',
			'the-sun',
			'the-sun-goals',
			'the-sun-perks',
			'the-times',
			'thomson-reuters',
			'tivo',
			'totaljobs',
			'treehouse',
			'trello',
			'tripadvisor',
			'trulia',
			'tumblr',
			'tunngle',
			'turbotax',
			'twentythree',
			'twitch-tv',
			'twitter',
			'typekit',
			'typepad',
			'typo3',
			'uber',
			'ubuntu',
			'uc-berkeley',
			'ucsf',
			'united-way',
			'unity',
			'universitat-hamburg',
			'university-of-alberta',
			'university-of-arizona',
			'university-of-cambridge',
			'university-of-florida',
			'university-of-illinois-urbana-champaign',
			'university-of-kentucky',
			'university-of-michigan',
			'university-of-oregon',
			'university-of-texas',
			'university-of-victoria',
			'university-of-washington',
			'university-of-waterloo',
			'university-of-wisconsin-milwaukee',
			'univision',
			'ups',
			'usps',
			'ustream',
			'verizon',
			'viadeo',
			'viber',
			'vidme',
			'viki',
			'vimeo',
			'vine',
			'virb',
			'virgin-media',
			'virgin-money',
			'visa',
			'visualcv',
			'visually',
			'vkontakte',
			'vodafone',
			'volvo',
			'vue-js',
			'walgreens',
			'walmart',
			'warby-parker',
			'wave-apps',
			'webzunder',
			'wechat',
			'wendys',
			'western-digital',
			'whatsapp',
			'whoosnap-designer',
			'wikipedia',
			'windows',
			'windows-phone',
			'woocommerce',
			'wooga',
			'wordpress',
			'wordpress-com',
			'world-organisation-of-the-scout-movement-wosm',
			'worldline',
			'wufoo',
			'wunderlist',
			'wwe',
			'xbox',
			'xing',
			'xy-gaming',
			'yahoo',
			'yandex',
			'yellow-pages',
			'yelp',
			'yii-framework',
			'yo',
			'youtube',
			'zapier',
			'zendesk',
			'zerply',
			'zillow',
			'zomato',
			'zopim',
		] );


		/**
		 * @private
		 */
		this._SORT_BY_OPTIONS = Object.freeze( {
			N_HITS: 1,
			DATETIME: 2,
			DATA_SUM_SENT: 3, // feature suggestion
			DATA_SUM_RECVD: 4, // feature suggestion
		} );

		/**
		 * @private
		 */
		this._GROUP_BY_OPTIONS = Object.freeze( {
			DISABLED: 0,
			HOSTNAME_COUNT: 1,
			DUR_SUM: 2, // feature suggestion
			DATA_SUM: 3, // feature suggestion
		} );

		/**
		 * @private
		 */
		this._FILTER_BY_OPTIONS = Object.freeze( {
			SRC_MAC: 1,
			DATETIME: 2,
			HOSTNAME: 3,
			SENT: 4,
			RECVD: 5, // @todo : add more possible sorting options
		} );

		/**
		 * @private
		 */
		this._CHART_COLORS = Object.freeze( { // from pallete https://www.materialui.co/colors
			lightness300: {
				red: '#e57373',
				pink: '#f06292',
				purple: '#ba68c8',
				deepPurple: '#9575cd',
				indigo: '#7986cb',
				blue: '#64b5f6',
				lightBlue: '#4fc3f7',
				cyan: '#4dd0e1',
				teal: '#4db6ac',
				green: '#81c784',
				lightGreen: '#aed581',
				lime: '#dce775',
				yellow: '#fff176',
				amber: '#ffd54f',
				orange: '#ffb74d',
				deepOrange: '#ff8a65',
				brown: '#a1887f',
				grey: '#e0e0e0',
				blueGrey: '#90a4ae',
			},
			lightness400: {
				red: '#ef5350',
				pink: '#ec407a',
				purple: '#ab47bc',
				deepPurple: '#7e57c2',
				indigo: '#5c6bC0',
				blue: '#42a5f5',
				lightBlue: '#29b6f6',
				cyan: '#26c6da',
				teal: '#26a69a',
				green: '#66bb6a',
				lightGreen: '#9ccc65',
				lime: '#d4e157',
				yellow: '#ffee58',
				amber: '#ffca28',
				orange: '#ffa726',
				deepOrange: '#ff7043',
				brown: '#8d6e63',
				grey: '#bdbdbd',
				blueGrey: '#78909c',
			},
		} );


		/**
		 * @private
		 */
		this._time_units_in_languages = { // for live time view
			'en': {
				'preffix': '',
				'suffix': ' ago',
				'justNow': 'just now',
				'today': 'today',
				'yesterday': 'yesterday',
				'theDayBeforeYesterday': null,
				'plural': ( n = 0 ) => { return n === 1 ? 0 : 1; },
				'long': {
					s: [ 'second', 'seconds' ],
					m: [ 'minute', 'minutes' ],
					h: [ 'hour', 'hours' ],
					d: [ 'day', 'days' ],
					w: [ 'week', 'weeks' ],
				},
				'short': {
					s: 's',
					m: 'm',
					h: 'h',
					d: 'd',
					w: 'w',
				},
			},
			'cs': {
				'preffix': '',
				'suffix': '',
				'justNow': 'nyní',
				'today': 'dnes',
				'yesterday': 'včera',
				'theDayBeforeYesterday': null,
				'plural': ( n = 0 ) => { return n === 1 ? 0 : ( ( n >= 2 && n <= 4 ) ? 1 : 2 ); },
				'long': {
					s: [ 'sekunda', 'sekundy', 'sekund' ],
					m: [ 'minuta', 'minuty', 'minut' ],
					h: [ 'hodina', 'hodiny', 'hodin' ],
					d: [ 'den', 'dny', 'dní' ],
					w: [ 'týden', 'týdny', 'týdnů' ],
				},
				'short': {
					s: 's',
					m: 'min.',
					h: 'dny',
					d: 'h.',
					w: 'týd.',
				},
			},
		};


		/**
		 * @private
		 */
		this._settings = {
			db_credentials: {
				db_name: 'PakonLive',
				table_name: 'hits',
				version: 2,
			},
			'eventSource': {
				'baseUrl': null,
				'completeUrl': null,
				'dumpIntoStatistics': false,
				'query': { // all possible options
					'start': 0,
					'end': 0,
					'mac': [],
					'hostname': [],
					'aggregate': false,
				},
				/*
				'currentlyDrawed': { // @todo : future request … not in use actually
					'table': null,
					'statistics': null,
				},
				*/
			},
			'lang': 'en',
			'strLen': 50, // max string length for table cells
			'groupBy': this.GROUP_BY_OPTIONS[ 'DISABLED' ], // HOSTNAME_COUNT
			'sortBy': this.SORT_BY_OPTIONS[ 'DATETIME' ],
			'filterBy': null, // @refactor later
			'itemsTextContent': ' Items',
			'textareaSeparator': ', ',
			'maxInterval': 0,
			'maxDur': 0,
			'maxSent': 0,
			'maxRecvd': 0,
			'postRenderImprove': {
				'hostname': {
					link: {
						'openLink': true,
						'newWindow': true,
						'schemesPriority': [ // just name, without '://' string
							'https',
							'http',
							'ftp',
						],
						'textContent': null,
						'faClassName': 'fa-external-link-alt',
						'title': 'Open this hostname as URL in new window',
					},
					filter: {
						'enable': true,
						'className': 'clickable', // no spaces
						'add': {
							'faClassName': 'fa-filter', // no spaces
							'title': 'Filter by this hostname',
						},
						'remove': {
							'faClassName': 'fa-filter', // no spaces
							'title': 'Remove filter by this hostname',
						},
					},
				},
				'srcMAC': {
					filter: {
						'enable': true,
						'className': 'clickable', // no spaces
						'add': {
							'faClassName': 'fa-filter', // no spaces
							'title': 'Filter by this client',
						},
						'remove': {
							'faClassName': 'fa-filter', // no spaces
							'title': 'Remove filter by this client',
						},
					},
				},
				'datetime': {
					'renewPeriod': 15, // (float) in seconds
					'liveTime': true,
					'divider': ' ',
					'time_diff': 300, // (float) in secs
				},
			},
			'nItemsPrefix': 'Results ', // with space in the end
			'nItemsElement': document.getElementById( 'pakon-results-table' ).parentNode[ 'previousElementSibling' ],
			'resultsTable': document.getElementById( 'pakon-results-table' ),
			'statisticsElement': document.getElementById( 'pakon-results-statistics' ),
			'controlForm': {
				'timeLimitationInputs': {
					'dateFrom': document.getElementById( 'date-from' ),
					'dateTo': document.getElementById( 'date-to' ),
					'timeFrom': document.getElementById( 'time-from' ),
					'timeTo': document.getElementById( 'time-to' ),
				},
				'aggregate': document.getElementById( 'aggregate' ),
				'hostnameFilter': document.getElementById( 'hostname-filter' ),
				'srcMACFilter': document.getElementById( 'srcMAC-filter' ),
				'controlFormSubmit': document.getElementById( 'apply-changes' ), // if null changes are applied immediately
			},
			'timeLimitation': {
				'from': null,
				'to': null,
				'suggestedInterval': 1, // in days
			},
			'refactoringTableHeader': { // @todo : refactoring in use
				'id': {
					'order': 10, // int, smaller first, bigger last
					'caption': 'n ID',
					'title': 'Number of ID',
					'dataType': null,
					'hidden': true,
				},
				'datetime': {
					'order': 20, // int, smaller first, bigger last
					'caption': 'Date',
					'title': 'Date and time the hostname was accessed',
					'dataType': null,
					'hidden': false,
				},
				'dur': {
					'order': 30, // int, smaller first, bigger last
					'caption': 'Duration',
					'title': 'Duration for which the given hostname was accessed',
					'dataType': 'time',
					'hidden': false,
				},
				'srcMAC': {
					'order': 40, // int, smaller first, bigger last
					'caption': 'Client',
					'title': 'Source MAC address or the MAC address of the device, which was used to access the hostname',
					'dataType': null,
					'hidden': false,
				},
				'hostname': {
					'order': 50, // int, smaller first, bigger last
					'caption': 'Hostname',
					'title': null,
					'dataType': null,
					'hidden': false,
				},
				'dstPort': {
					'order': 60, // int, smaller first, bigger last
					'caption': 'Port',
					'title': 'Destination port (for well-known services this is shown as service name)',
					'dataType': null,
					'hidden': false,
				},
				'proto': {
					'order': 70, // int, smaller first, bigger last
					'caption': 'Port',
					'title': 'Application level protocol as detected by Suricata',
					'dataType': null,
					'hidden': true,
				},
				'sent': {
					'order': 80, // int, smaller first, bigger last
					'caption': 'Sent',
					'title': 'Size of data sent',
					'dataType': 'number',
					'hidden': false,
				},
				'recvd': {
					'order': 90, // int, smaller first, bigger last
					'caption': 'Received',
					'title': 'Size of data received',
					'dataType': 'number',
					'hidden': false,
				},
			},
			'statisticsData': {
				'nHits': 0,
				'nAggregatedHits': 0,
				'protoElement': document.getElementById( 'proto' ),
				'graphs': {
					'type': 'pie',
					'maxItems': 6,
					'mostFrequentTextContent': ' most frequent',
					'createFor': {
						'srcMAC': {
							'type': 'pie',
							'aggregationType': 'frequency',
						},
						'hostname': {
							'aggregationType': 'frequency',
						},
						'dstPort': {
							'aggregationType': 'frequency',
						},
						/* @todo
						'recvd': {
							'aggregationType': 'frequency',
						},
						*/
						'sendVsRecieved': {
							'aggregationType': 'sum',
						},
					},
					'knownColors': {
						'tls': 'lightGreen',
						'http': 'red',
						'https': 'green',
					},
				},
			},
			'userMessages': {
				'errors': {
					'failedLoadingData': [
						'Failed to load data',
						'Make sure you have the filtering parameters set up correctly',
					],
				}
			},
			'loader': {
				'id': 'loader-spinner',
				'className': 'loading',
				'textContent': null,
			},
		};

		/**
		 * @private
		 */
		this._dataStructure = {};

		/**
		 * @private
		 */
		this._virtualTable = null;

		/**
		 * @private
		 */
		this._virtualStatistics = null;

		this.toDateInput = Symbol( 'czNic::Date' );
		Date.prototype[ this.toDateInput ] = function ()
		{
			return new Date( this.getTime() - ( this.getTimezoneOffset() * 60000 ) ).toISOString().split( 'T' )[ 0 ];
		};

		this.toTimeInput = Symbol( 'czNic::Date' );
		Date.prototype[ this.toTimeInput ] = function ()
		{
			return new Date( this.getTime() - ( this.getTimezoneOffset() * 60000 ) ).toISOString().split( 'T' )[ 1 ].substr( 0, 5 );
		};

		this.toW3CString = Symbol( 'czNic::Date' );
		Date.prototype[ this.toW3CString ] = function ()
		{
			const y = this.getFullYear();
			let M = this.getMonth() + 1;
			let d = this.getDate();
			let h = this.getHours();
			let m = this.getMinutes();
			let s = this.getSeconds();
			let offset = -this.getTimezoneOffset();
			let offsetH = Math.abs( Math.floor( offset / 60 ) );
			let offsetM = Math.abs( offset ) - offsetH * 60;
			const offsetS = ( offset < 0 ) ? '-' : '+';

			if ( M < 10 ) {
				M = Number( '0' ) + M;
			}
			if ( d < 10 ) {
				d = Number( '0' ) + d;
			}
			if ( h < 10 ) {
				h = Number( '0' ) + h;
			}
			if ( m < 10 ) {
				m = Number( '0' ) + m;
			}
			if ( s < 10 ) {
				s = Number( '0' ) + s;
			}
			if ( offsetH < 10 ) {
				offsetH = Number( '0' ) + offsetH;
			}
			if ( offsetM < 10 ) {
				offsetM = Number( '0' ) + offsetM;
			}
			return y + '-' + M + '-' + d + 'T' + h + ':' + m + ':' + s + offsetS + offsetH + ':' + offsetM;
		};

		this.hashCode = Symbol( 'czNic::String' );
		String.prototype[ this.hashCode ] = function () // collision probability is 31^11
		{
			let hash = 0;
			for ( let i = 0; i < this.length; i++ ) {
				const character = this.charCodeAt( i );
				hash = ( ( hash << 5 ) - hash ) + character;
				hash = hash & hash; // Convert to 32bit integer
			}
			return hash;
		};

		this.capitalize = Symbol( 'czNic::String' );
		String.prototype[ this.capitalize ] = function ()
		{
			return this[ 0 ].toUpperCase() + this.slice( 1 );
		};

		this.truncate = Symbol( 'czNic::String' );
		String.prototype[ this.truncate ] = function ( maxLen = 1, append = '\u2026', clever = false, leftTruncate = false ) // \u2026 is HORIZONTAL ELLIPSIS ( … )
		{
			if ( this.length > maxLen ) {
				const regular = new RegExp( '^.{1,' + maxLen + '}(?=[\\s !-\\/:-@\\[-`\\{-\u00bf])', 'u' ); // eats a lot of resources :(
				let parts = [];
				maxLen = maxLen - append.length;
				if ( maxLen < 1 ) {
					return append;
				} else if ( clever && ( parts = this.match( regular ) ) ) { // @todo : clever leftTruncate
					if ( parts ) {
						return parts[ 0 ] + append;
					}
				} else {
					if ( leftTruncate ) {
						const length = this.length - maxLen;
						return append + this.substr( length );
					}
					return this.substr( 0, maxLen ) + append;
				}
			}
			return this;
		};

		this.hms2Secs = Symbol( 'czNic::String' );
		String.prototype[ this.hms2Secs ] = function ( /** @type {String=} */ lang = 'en' )  // eslint-disable-line no-unused-vars
		{
			const parts = this.replace( '.', ':' ).split( ':' );
			const hNumber = parseInt( parts[ 0 ] ) * 60 * 60;
			const mNumber = parseInt( parts[ 1 ] ) * 60;
			const sNumber = parseInt( parts[ 2 ] );
			return hNumber + mNumber + sNumber;
		};

		this.fromLocaleString = Symbol( 'czNic::String' );
		String.prototype[ this.fromLocaleString ] = function ()
		{
			// String.split() and String.join() is faster then single regexp
			return parseInt( this.split( '\u00A0' ).join( '' ) ); // NO-BREAK SPACE
		};

		this.seconds2Hms = Symbol( 'czNic::Number' );
		Number.prototype[ this.seconds2Hms ] = function ( /** @type {String=} */ lang = 'en' )
		{
			const HOURS_SEPARATOR = ( lang === 'cs' ? '.' : ':' );
			const MINUTES_SEPARATOR = ':';

			const h = Math.floor( Number( this ) / 3600 );
			const m = Math.floor( Number( this ) % 3600 / 60 );
			const s = Math.floor( Number( this ) % 3600 % 60 );
			const hString = ( h > 0 ) ? ( h <= 9 ? '0' + h : h ) : '00';
			const mString = ( m > 0 ) ? ( m <= 9 ? '0' + m : m ) : '00';
			const sString = ( s > 0 ) ? ( s <= 9 ? '0' + s : s ) : '00';
			return hString + HOURS_SEPARATOR + mString + MINUTES_SEPARATOR + sString;
		};

		this.bytesToSize = Symbol( 'czNic::Number' );
		Number.prototype[ this.bytesToSize ] = function ( decimals = 2, lang = 'en' )
		{
			const BASE = 1024;
			const RIDGE = '\u00A0'; // NO-BREAK SPACE
			const BYTES = {
				en: 'Bytes',
				cs: 'Bitů',
			};
			const SIZES = [ BYTES[ lang ], 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB' ]; // @todo : add abbr title for units
			const getMeasurementUnit = Math.floor( Math.log( Number( this ) ) / Math.log( BASE ) );
			if ( this === 0 ) {
				return '0' + RIDGE + BYTES[ lang ];
			}
			return parseFloat( ( Number( this ) / Math.pow( BASE, getMeasurementUnit ) ).toFixed( decimals ) ) + RIDGE + SIZES[ getMeasurementUnit ];
		};

		this.frequencyUnique = Symbol( 'czNic::Array' );
		Array.prototype[ this.frequencyUnique ] = function ()
		{
			const a = [];
			const o = {};

			const arrLen = this.length;
			let item;
			for ( let i = 0; i < arrLen; i++ ) {
				item = this[ i ];
				if ( !item ) {
					continue;
				}
				if ( o[ item ] === 'undefined' ) {
					o[ item ] = 1;
				} else {
					++o[ item ];
				}
			}
			for ( const i in o ) {
				a[ a.length ] = i;
			}
			return a.sort( function ( a, b )
			{
				return o[ b ] - o[ a ];
			} );
		};

		const dialog = document.createElement( 'dialog' );
		if (
			dialog instanceof HTMLUnknownElement &&
			!( 'open' in dialog && 'show' in dialog && 'close' in dialog )
		) {
			HTMLUnknownElement.prototype[ 'open' ] = false;
			HTMLUnknownElement.prototype[ 'show' ] = function ()
			{
				this.hidden = false;
				this.style.visibility = 'visible';
				this[ 'open' ] = true;
				this.setAttribute( 'open', '' );
			};
			HTMLUnknownElement.prototype[ 'close' ] = function ()
			{
				this.hidden = true;
				this.style.visibility = 'hidden';
				this[ 'open' ] = false;
				this.removeAttribute( 'open' );
			};
		}

	}


	/**
	 * Set settings for whole class
	 */
	set settings ( variables )
	{
		level1: // eslint-disable-line no-unused-labels
		for ( const i in variables ) {
			if ( typeof variables[ i ] === 'object'
				&& variables[ i ].constructor.name === 'Object'
				&& typeof this._settings[ i ] !== 'undefined'
			) {
				level2: // eslint-disable-line no-unused-labels
				for ( const ii in variables[ i ] ) {
					if ( typeof variables[ i ][ ii ] === 'object' && variables[ i ][ ii ].constructor.name === 'Object' ) {
						level3: // eslint-disable-line no-unused-labels
						for ( const iii in variables[ i ][ ii ] ) {
							if ( typeof variables[ i ][ ii ][ iii ] === 'object' && variables[ i ][ ii ][ iii ].constructor.name === 'Object' ) {
								delete variables[ i ][ ii ][ iii ];
							}
						}
						Object.assign( this._settings[ i ][ ii ], variables[ i ][ ii ] );
						delete variables[ i ][ ii ];
					}
				}
				Object.assign( this._settings[ i ], variables[ i ] );
				delete variables[ i ];
			}
		}
		Object.assign( this._settings, variables );
	}


	/**
	 * Get settings for whole class
	 */
	get settings ()
	{
		return this._settings;
	}


	/**
	 * Get GROUP_BY_OPTIONS
	 */
	get GROUP_BY_OPTIONS ()
	{
		return this._GROUP_BY_OPTIONS;
	}


	/**
	 * Get SORT_BY_OPTIONS
	 */
	get SORT_BY_OPTIONS ()
	{
		return this._SORT_BY_OPTIONS;
	}


	/**
	 * Get FILTER_BY_OPTIONS
	 */
	get FILTER_BY_OPTIONS ()
	{
		return this._FILTER_BY_OPTIONS;
	}


	get CHART_COLORS ()
	{
		return this._CHART_COLORS;
	}


	set time_units_in_languages ( inObj )
	{
		this._time_units_in_languages = inObj;
	}


	get time_units_in_languages ()
	{
		return this._time_units_in_languages;
	}


	set dataStructure ( inObj )
	{
		this._dataStructure = inObj;
	}


	/**
	 * Get statistics data
	 */
	get dataStructure ()
	{
		return this._dataStructure;
	}


	set timeLimitation ( /** @type { { from: Date, to: Date } } */ input )
	{
		this.settings.timeLimitation.from = input.from;
		this.settings.timeLimitation.to = input.to;
	}


	set virtualTable ( /** @type {HTMLTableElement} */ table )
	{
		this._virtualTable = table;
	}


	get virtualTable ()
	{
		return this._virtualTable;
	}


	set virtualStatistics ( /** @type {HTMLElement} */ element )
	{
		this._virtualStatistics = element;
	}


	get virtualStatistics ()
	{
		return this._virtualStatistics;
	}


	createSourceUrl ()
	{
		const query = this.settings.eventSource.query;
		query.start = this.settings.timeLimitation.from / 1000; // to unix timestamp
		query.end = this.settings.timeLimitation.to / 1000; // to unix timestamp

		if ( new Date() < this.settings.timeLimitation.to ) {
			delete query.end;
		}

		if ( !Array.isArray( query.mac ) || !query.mac.length ) {
			delete query.mac;
		}

		if ( !Array.isArray( query.hostname ) || !query.hostname.length ) {
			delete query.hostname;
		}

		if ( !query.aggregate ) {
			delete query.aggregate;
		}

		const url = this.settings.eventSource.baseUrl;
		url.searchParams.set( 'action', 'eventsource' );
		url.searchParams.set( 'query', JSON.stringify( query ) );

		this.settings.eventSource.completeUrl = url;

		if ( this.settings.eventSource.dumpIntoStatistics ) {
			const container = document.createElement( 'div' );

			const urlDumpRoot = document.createElement( 'div' );
			urlDumpRoot.id = 'url-dump';
			urlDumpRoot.appendChild( document.createTextNode( 'query before encoding : ' + JSON.stringify( query ) ) );
			urlDumpRoot.appendChild( document.createElement( 'br' ) );
			urlDumpRoot.appendChild( document.createTextNode( 'url : ' + url ) );
			container.appendChild( urlDumpRoot );

			this.virtualStatistics = container;
			this.flush();
		}

		return true;
	}


	eventMessage ( event = {} )
	{
		const messageArray = JSON.parse( event.data );
		this.dataStructure[ messageArray.join()[ this.hashCode ]().toString( 36 ) ] = messageArray; // … = messageArray.concat([false]) ?
		/*
		const evtSource = new EventSource(ESUrl + '&timeout=' + Math.round(+new Date()/1000));
		evtSource.onmessage = this.eventMessage; // regenerate
		*/
		event.target.close();
	}


	/**
	 * @todo : description
	 * @returns {Boolean}
	 */
	storeHitsToIndexedDB ()
	{

		const openReq = this.idb.open( this.settings.db_credentials.db_name, this.settings.db_credentials.version );

		openReq.onupgradeneeded = this.db_init.bind( this, openReq );

		openReq.onsuccess = function ()
		{
			const db = openReq.result;
			const tx = db.transaction( this.settings.db_credentials.table_name, 'readwrite' ); // IDBTransaction.READ_WRITE is depricated !
			const store = tx.objectStore( this.settings.db_credentials.table_name );
			store.index( 'hostname' );
			store.index( 'srcMAC' );
			store.index( 'dstPort' );
			store.index( 'recvd' );

			for ( const i in this.dataStructure ) {
				if ( i === 'length' || i === 'lengthOfVisible' ) {
					continue;
				}
				store.put( {
					id: i, // id
					datetime: this.dataStructure[ i ][ 1 ], // date and time the hostname was accessed
					dur: this.dataStructure[ i ][ 2 ], // duration for which the given hostname was accessed
					srcMAC: this.dataStructure[ i ][ 3 ], // source MAC address or the MAC address of the device, which was used to access the hostname
					hostname: this.dataStructure[ i ][ 4 ], // hostname
					dstPort: this.dataStructure[ i ][ 5 ], // destination port (for well-known services this is shown as service name)
					proto: this.dataStructure[ i ][ 6 ], // application level protocol as detected by Suricata
					sent: this.dataStructure[ i ][ 7 ], // size of data sent
					recvd: this.dataStructure[ i ][ 8 ], // size of data received
					hidden: this.dataStructure[ i ][ 9 ], // hidden true/false
				} );
			}

			tx.oncomplete = () =>
			{
				db.close();
			};
		}.bind( this );

		return true;

	}


	combinatedSorting ( inArray = [], by = this.settings.sortBy )
	{
		let sortedUniqueHostnameKeys = [];
		if ( by === this.SORT_BY_OPTIONS[ 'N_HITS' ] ) { // sort by number of values
			sortedUniqueHostnameKeys = Object.keys( inArray )
				.map( function ( k ) { return { key: k, value: inArray[ k ] }; } )
				.sort( function ( a, b ) { return b.value.length - a.value.length; } );
		} else if ( by === this.SORT_BY_OPTIONS[ 'DATETIME' ] ) {
			// @todo …
			sortedUniqueHostnameKeys = inArray;
			/*
			} else if ( false ) { // @todo : another sorting method (like service name, date, …) not implemented yet
				sortedUniqueHostnameKeys = [ '…' ]; // @todo
			*/
		} // some sorting methods cannot be done here and must be done after aggregation
		return sortedUniqueHostnameKeys;
	}


	groupSortData ( inArray = [], group = this.settings.grupBy, sort = this.settings.sortBy ) // eslint-disable-line no-unused-vars
	{
		const sortedUniqueHostnameKeys = this.combinatedSorting( inArray, sort );
		const summedUniqueHostnameKeys = [];
		let order = 0;
		hostnamesLoop: // eslint-disable-line no-unused-labels
		for ( const i in sortedUniqueHostnameKeys ) {
			const rowData = sortedUniqueHostnameKeys[ i ];
			const sum = { // inicialize with empty values
				'id': [],
				'datetime': {
					'from': null, // Date or null
					'to': null, // Date or null
					'interval': 0, // in seconds
				},
				'dur': 0,
				'srcMAC': [],
				'dstPort': [],
				'proto': [],
				'sent': 0,
				'recvd': 0,
			};
			sumDataLoop: // eslint-disable-line no-unused-labels
			for ( const ii in rowData.value ) {
				const currentLoopDate = new Date( rowData.value[ ii ].datetime );

				sum[ 'id' ].push( rowData.value[ ii ].id );
				if ( !sum[ 'datetime' ].from || sum[ 'datetime' ].from > currentLoopDate ) {
					sum[ 'datetime' ].from = currentLoopDate;
				}
				if ( !sum[ 'datetime' ].to || sum[ 'datetime' ].to < currentLoopDate ) {
					sum[ 'datetime' ].to = currentLoopDate;
				}
				sum[ 'dur' ] += parseInt( rowData.value[ ii ].dur );
				sum[ 'srcMAC' ].push( rowData.value[ ii ].srcMAC );
				//delete rowData.value[ii].hostname;
				sum[ 'dstPort' ].push( rowData.value[ ii ].dstPort );
				sum[ 'proto' ].push( rowData.value[ ii ].proto );
				sum[ 'sent' ] += parseInt( rowData.value[ ii ].sent );
				sum[ 'recvd' ] += parseInt( rowData.value[ ii ].recvd );
			}
			sum[ 'datetime' ].interval = ( ( sum[ 'datetime' ].to.getTime() - sum[ 'datetime' ].from.getTime() ) / 1000 );
			if ( this.settings.maxInterval < sum[ 'datetime' ].interval ) {
				this.settings.maxInterval = sum[ 'datetime' ].interval;
			}
			summedUniqueHostnameKeys[ sortedUniqueHostnameKeys[ i ].key ] = {
				'order': order++, // prevent loosing original information
				'hidden': false, // for later use by filtering
				'ids': sum[ 'id' ], // @todo : can I make plural from id?
				'length': sortedUniqueHostnameKeys[ i ].value.length, // counting now for performance reasons
				'datetime': sum[ 'datetime' ],
				'dur': sum[ 'dur' ][ this.seconds2Hms ](),
				'srcMAC': sum[ 'srcMAC' ][ this.frequencyUnique ]().join( ', ' )[ this.truncate ]( this.settings.strLen ),
				'dstPort': sum[ 'dstPort' ][ this.frequencyUnique ]().join( ', ' )[ this.truncate ]( this.settings.strLen ),
				'proto': sum[ 'proto' ][ this.frequencyUnique ]().join( ', ' )[ this.truncate ]( this.settings.strLen ),
				'sent': sum[ 'sent' ].toLocaleString(),
				'recvd': sum[ 'recvd' ].toLocaleString(),
			};
		}
		return summedUniqueHostnameKeys;
	}


	repairUserInputs ()
	{
		const formControls = this.settings.controlForm;
		for ( const i in formControls ) {
			if ( formControls[ i ] && formControls[ i ].nodeType === Node.ELEMENT_NODE ) {
				let macs = this.settings.eventSource.query.mac;
				let hostnames = this.settings.eventSource.query.hostname;
				if ( i === 'srcMACFilter' && macs ) {
					for ( const i in macs ) {
						const regex = new RegExp( '^("?[A-Za-z ]+"? ?:? ?)|(([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2}))$', 'u' ); // some redundant (but possible) text OR MAC address as is defined in IEEE 802
						if ( !regex.test( macs[ i ] ) ) {
							delete macs[ i ];
						}
					}
					macs = this.settings.eventSource.query.mac = macs.filter( String ); // remove empty items after deleting
					/** @type {HTMLTextAreaElement} */
					const textarea = ( this.settings.controlForm.srcMACFilter );
					textarea.value = macs.join( this.settings.textareaSeparator ); // this will NOT trigger a change event!!!
				} else if ( i === 'hostnameFilter' && hostnames ) {
					// @todo : …
				}
			} else {
				/*
				for ( const ii in formControls[ i ] ) {
					if ( formControls[ i ][ ii ] ) {
						// @todo : …
					}
				}
				*/
			}
		}

		return true;
	}


	cellFromGroupedDataStructure ( headerItem, currentDataStructureItem ) // eslint-disable-line no-unused-vars
	{
		// @todo : …
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async loadFreshHits ()
	{
		return new Promise( ( resolve ) => // eslint-disable-line no-unused-vars
		{
			this.createSourceUrl(); // set into settings

			if ( !this.dataStructure ) {
				this.dataStructure = [];
			}

			if ( false ) { // eslint-disable-line no-constant-condition
				// @todo : eventsource - asynchronous
				const evtSource = new EventSource( this.settings.eventSource.completeUrl, { withCredentials: true } ); // @todo : remove withCredentials after testing & also remove 'Access-Control-Allow-Origin' header from backend!
				evtSource.onmessage = this.eventMessage.bind( this );
				resolve( true );
			} else { // fetch - synchronous
				this.fetchEventSource().then( ( result ) =>
				{
					const resultArray = result.split( '\n\n' );
					var withoutEmpty = resultArray.filter( String );
					const sortedNonEmpty = withoutEmpty.sort( function ( a, b )
					{
						if ( a < b ) { return 1; }
						if ( a > b ) { return -1; }
						return 0;
					} );
					for ( var i in sortedNonEmpty ) {
						const currentRow = JSON.parse( sortedNonEmpty[ i ].substr( 6 ) ); // remove 'data: ' string and make it array
						this.dataStructure[ currentRow.join()[ this.hashCode ]().toString( 36 ) ] = currentRow.concat( [ false ] ); // add bool 'hidden' column and set default to false
					}
					this.dataStructure[ 'length' ] = Object.keys( this.dataStructure ).length;
					this.dataStructure[ 'lengthOfVisible' ] = i;
					resolve( true );
				} );
			}
		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async fetchEventSourceError ()
	{
		return new Promise( ( resolve ) =>
		{
			const repeatedCalls = arguments[ 0 ]; // bool value
			if ( repeatedCalls ) {
				const controlForm = this.settings.controlForm;
				let errorMessage = this.settings.userMessages.errors.failedLoadingData[ 0 ];
				/** @type {HTMLTextAreaElement} */
				const hostnameTextarea = ( controlForm.hostnameFilter );
				/** @type {HTMLTextAreaElement} */
				const srcMACTextarea = ( controlForm.srcMACFilter );
				if ( hostnameTextarea.value || srcMACTextarea.value ) {
					errorMessage += ' \n' + this.settings.userMessages.errors.failedLoadingData[ 1 ];
				}
				alert( errorMessage ); // @todo : use this.showEmptyResponseInfo in here
				this.setSyncWorkTo( false );
			} else {
				this.repairUserInputs();
				this.createSourceUrl();
				this.fetchEventSource( true ).then( ( result ) =>
				{
					resolve( result );
				} );
			}
		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<String>}
	 */
	async fetchEventSource ( repeatedCalls = false )
	{
		return new Promise( ( resolve ) =>
		{
			fetch( this.settings.eventSource.completeUrl, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
				},
				credentials: 'include', // @todo : remove after testing & also remove 'Access-Control-Allow-Origin' header from backend!
			} ).then( ( response ) =>
			{
				if ( response.ok && ( response.status === 200 ) ) {
					resolve( response.text() );
				} else {
					this.fetchEventSourceError.bind( this, repeatedCalls )().then( ( result ) =>
					{
						resolve( result );
					} );
				}
			} ).catch( () =>
			{
				this.fetchEventSourceError.bind( this, repeatedCalls )().then( ( result ) =>
				{
					resolve( result );
				} );
			} );
		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async countHits ()
	{
		return new Promise( ( resolve ) =>
		{
			resolve( this.dataStructure[ 'lengthOfVisible' ] );
			/*
			const openReq = this.idb.open(this.settings.db_credentials.db_name, this.settings.db_credentials.version);
			openReq.onsuccess = function() {
				const db = openReq.result;
				const transaction = db.transaction(this.settings.db_credentials.table_name, 'readonly');
				const objectStore = transaction.objectStore(this.settings.db_credentials.table_name);
				const countRequest = objectStore.count();
				countRequest.onsuccess = function() {
					resolve(countRequest.result);
				};
				transaction.oncomplete = function (event) {
					db.close();
				};
			}
			*/
		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async mostUsedHostnames ()
	{
		return new Promise( ( resolve ) =>
		{
			const openReq = this.idb.open( this.settings.db_credentials.db_name, this.settings.db_credentials.version );

			openReq.onsuccess = function ()
			{
				const db = openReq.result;
				const tx = db.transaction( this.settings.db_credentials.table_name, 'readonly' );
				const store = tx.objectStore( this.settings.db_credentials.table_name );
				const uniqueHostnameKeys = [];
				store.openCursor().onsuccess = function ( event )
				{ // alternative and easier .getAll() is badly supported in browsers yet
					const cursor = event.target.result;
					if ( cursor ) {
						const clearedValues = cursor.value;
						uniqueHostnameKeys[ cursor.value.hostname ] = uniqueHostnameKeys[ cursor.value.hostname ] || []; // initialize or add
						uniqueHostnameKeys[ cursor.value.hostname ].push( clearedValues ); // initialize or add
						cursor.continue();
					} else {
						resolve( this.groupSortData( uniqueHostnameKeys ) );
					}
				};
				tx.oncomplete = function ()
				{
					db.close();
				}.bind( this );
			}.bind( this );
		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async groupData ()
	{
		return new Promise( ( resolve ) =>
		{
			if ( this.settings.groupBy === this.GROUP_BY_OPTIONS[ 'DISABLED' ] ) {
				let lengthOfVisible = 0;
				for ( const i in this.dataStructure ) {
					if ( Array.isArray( this.dataStructure[ i ] ) ) {
						if ( !this.dataStructure[ i ][ 8 ] ) {
							lengthOfVisible++;
						}
						if ( this.dataStructure[ i ].length < 10 ) {
							this.dataStructure[ i ].unshift( i );
						}
					}
				}
				this.dataStructure[ 'length' ] = Object.keys( this.dataStructure ).length;
				this.dataStructure[ 'lengthOfVisible' ] = lengthOfVisible;
				resolve( this.dataStructure );
			} else if ( this.settings.groupBy === this.GROUP_BY_OPTIONS[ 'HOSTNAME_COUNT' ] ) {
				this.mostUsedHostnames().then( ( result ) =>
				{
					this.dataStructure = result;
					this.dataStructure[ 'length' ] = Object.keys( result ).length;
					this.dataStructure[ 'lengthOfVisible' ] = '@todo : count this!';
					resolve( result );
				} );
				/*
				} else if ( false ) { // @todo : add more grouping methods
					// …
				*/
			}
		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async getDataFrom ( column = '' )
	{
		return new Promise( ( resolve ) =>
		{
			const openReq = this.idb.open( this.settings.db_credentials.db_name, this.settings.db_credentials.version );
			openReq.onsuccess = function ()
			{
				const db = openReq.result;
				const tx = db.transaction( this.settings.db_credentials.table_name, 'readonly' );
				const store = tx.objectStore( this.settings.db_credentials.table_name );
				const protos = [];
				const index = store.index( column );
				const openCursorRequest = index.openCursor( null, 'next' );

				openCursorRequest.onsuccess = function ( event )
				{
					const cursor = event.target.result;
					if ( cursor ) {
						if ( !cursor.value.hidden ) {
							protos[ cursor.value[ column ] ] = protos[ cursor.value[ column ] ] || []; // initialize or add
							protos[ cursor.value[ column ] ].push( cursor.primaryKey ); // initialize or add
						}
						cursor.continue();
					} else {
						const sortedProtos = this.combinatedSorting( protos, 1 );
						const niceObject = {};
						for ( var i in sortedProtos ) {
							if ( i >= this.settings.statisticsData.graphs.maxItems ) {
								break;
							}
							niceObject[ sortedProtos[ i ].key ] = sortedProtos[ i ].value;
						}
						niceObject.length = Number( i ) + 1;
						resolve( niceObject );
					}
				}.bind( this );
				tx.oncomplete = function ()
				{
					db.close();
				};
			}.bind( this );
		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async createFullTable ()
	{
		return new Promise( ( resolve ) =>
		{
			/** @type {HTMLTableElement} */
			const resultsTable = ( this.settings.resultsTable );
			const virtualTable = document.createElement( 'table' );
			let tHead = null;
			if ( resultsTable ) {
				tHead = resultsTable.tHead;
				/*
				while (resultsTable.firstChild) {
					resultsTable.removeChild(resultsTable.firstChild);
				}
				*/
			}
			if ( tHead ) {
				virtualTable.appendChild( tHead );
			} else {
				virtualTable.appendChild( this.createTHead() );
			}
			const tbody = document.createElement( 'tbody' );
			const tableHeader = this.settings.refactoringTableHeader;
			const tableHeaderArray = [];
			for ( const i in tableHeader ) {
				const th = tableHeader[ i ];
				th.id = i;
				tableHeaderArray[ th.order ] = th;
			}
			rowsLoop: // eslint-disable-line no-unused-labels
			for ( const i in this.dataStructure ) {
				if ( i === 'length' || i === 'lengthOfVisible' ) {
					continue;
				}
				if ( !( this.dataStructure[ i ].hidden || this.dataStructure[ i ][ 9 ] ) && this.dataStructure[ i ] ) {
					//const tableHeaderLength = Object.keys( this.settings.tableHeader ).length;
					const row = document.createElement( 'tr' );
					cellsLoop: // eslint-disable-line no-unused-labels
					tableHeaderArray.forEach( ( /** @type { {id, hidden, caption, title, dataType} } */ item ) =>
					{
						if ( this.settings.groupBy === this.GROUP_BY_OPTIONS[ 'DISABLED' ] ) {
							if ( !item.hidden ) {
								const cell = document.createElement( 'td' );
								const columnPosition = this.getColumnPositionBy( item.id );
								let node;
								if ( item.id === 'datetime' ) {
									const currentDate = new Date( this.dataStructure[ i ][ columnPosition ] );
									cell.setAttribute( 'data-raw-content', String( Number( currentDate ) / 1000 ) );
									node = document.createElement( 'time' );
									node.dateTime = currentDate[ this.toW3CString ]();
									node.appendChild( document.createTextNode(
										currentDate.toLocaleDateString( this.settings.lang ).replace( ' ', '\u00A0' ).replace( ' ', '\u00A0' ) // NO-BREAK SPACE // .replace().replace() has better performance than regexp
										+ ' '
										+ currentDate.toLocaleTimeString( this.settings.lang ).replace( ' ', '\u00A0' ).replace( ' ', '\u00A0' ) // NO-BREAK SPACE // .replace().replace() has better performance than regexp
									) );
								} else if ( item.id === 'dur' ) {
									node = document.createTextNode( Number( this.dataStructure[ i ][ columnPosition ] )[ this.seconds2Hms ]( this.settings.lang ) );
								} else {
									node = document.createTextNode( this.dataStructure[ i ][ columnPosition ] );
								}
								cell.appendChild( node );
								row.appendChild( cell );
							}
						} else { // @todo : move it into this.cellFromGroupedDataStructure();
							const cell = document.createElement( 'td' );
							if ( item.id === 'id' ) { // it's already time for switch() ?
								if ( this.dataStructure[ i ][ 'ids' ].length < 9 ) {
									cell.title = '[' + this.dataStructure[ i ][ 'ids' ].join( ', ' )[ this.truncate ]( this.settings.strLen ) + ']';
								}
								const idText = this.dataStructure[ i ][ 'ids' ].length + '\u00A0\u00D7'; // NO-BREAK SPACE and MULTIPLICATION SIGN
								cell.appendChild( document.createTextNode( idText ) );
							} else if ( item.id === 'datetime' ) {
								const interval = this.dataStructure[ i ][ item.id ];
								const lang = this.settings.lang;
								let intString = '';
								if ( interval.from.toLocaleDateString( lang ) === interval.to.toLocaleDateString( lang ) ) {
									intString += interval.to.toLocaleDateString( lang )
										+ ' (' + interval.from.toLocaleTimeString( lang )
										+ ' - ';
								} else {
									intString += interval.from.toLocaleDateString( lang )
										+ ' ' + interval.from.toLocaleTimeString( lang )
										+ ' - ' + interval.to.toLocaleDateString( lang )
										+ ' ';
								}
								intString += interval.to.toLocaleTimeString( lang );
								if ( interval.from.toLocaleDateString( lang ) === interval.to.toLocaleDateString( lang ) ) {
									intString += ')';
								}
								cell.setAttribute( 'data-percentage', String( Math.round( ( 100 / this.settings.maxInterval ) * interval.interval ) ) );
								cell.appendChild( document.createTextNode( intString ) );
							} else if ( item.id === 'hostname' ) {
								cell.appendChild( document.createTextNode( i ) );
							} else {
								cell.appendChild( document.createTextNode( this.dataStructure[ i ][ item.id ] ) );
							}
							row.appendChild( cell );
						} // @todo : … end
					} );
					tbody.appendChild( row );
				}
			}
			virtualTable.appendChild( tbody );
			this.virtualTable = virtualTable;

			resolve( true );

		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async createFullStatistic ()
	{
		return new Promise( ( resolve ) =>
		{

			this.countHits().then( ( result ) =>
			{
				this.settings.statisticsData.nHits = Number( result );
			} );

			//this.settings.statisticsData.nAggregatedHits = this.dataStructure.length;

			const list = this.settings.statisticsData.graphs.createFor;
			if ( list.length ) {
				list.length = Object.keys( list ).length - 1;
			} else {
				list.length = Object.keys( list ).length;
			}

			const existingColumns = [];
			const theader = this.settings.refactoringTableHeader;
			for ( const i in theader ) {
				existingColumns.push( i );
			}

			const afterAsyncGraphs = [];
			let completedPartsSum = 0;
			for ( const i in list ) {
				if ( i === 'length' ) {
					continue;
				} else if ( existingColumns.includes( i ) ) {
					this.getDataFrom( i ).then( ( result ) =>
					{
						list[ i ].dataStore = result; // set into settings
						completedPartsSum++;
						if ( completedPartsSum === list.length ) {
							afterAsyncGraphs.forEach( () =>
							{
								// @todo : get data & place them into dataStore
							} );
							resolve( true );
						}
					} );
				} else {
					afterAsyncGraphs.push( i );
					completedPartsSum++;
				}

			}

		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async fillTimeLimitationForm () // from this.settings.timeLimitation
	{
		return new Promise( ( resolve ) =>
		{
			/** @type {HTMLInputElement} */
			const dateFrom = ( this.settings.controlForm.timeLimitationInputs.dateFrom );
			/** @type {HTMLInputElement} */
			const timeFrom = ( this.settings.controlForm.timeLimitationInputs.timeFrom );
			/** @type {HTMLInputElement} */
			const dateTo = ( this.settings.controlForm.timeLimitationInputs.dateTo );
			/** @type {HTMLInputElement} */
			const timeTo = ( this.settings.controlForm.timeLimitationInputs.timeTo );
			if ( dateFrom && timeFrom && this.settings.timeLimitation.from ) {
				if ( !dateFrom.value ) {
					dateFrom.value = this.settings.timeLimitation.from[ this.toDateInput ]();
				}
				if ( !timeFrom.value ) {
					timeFrom.value = this.settings.timeLimitation.from[ this.toTimeInput ]();
				}
			}
			if ( dateTo && timeTo && this.settings.timeLimitation.to ) {
				if ( !dateTo.value ) {
					dateTo.value = this.settings.timeLimitation.to[ this.toDateInput ]();
				}
				if ( !timeTo.value ) {
					timeTo.value = this.settings.timeLimitation.to[ this.toTimeInput ]();
				}
			}
			resolve( true );
		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async setSyncWorkTo ( status = false, triggeredByEvent = false )
	{
		return new Promise( ( resolve ) =>
		{
			const submitButton = this.settings.controlForm.controlFormSubmit;
			const safeStatus = status ? ( submitButton ? false : true ) : false;

			const formControls = this.settings.controlForm;

			for ( const i in formControls ) {
				if ( formControls[ i ] && formControls[ i ].nodeType === Node.ELEMENT_NODE ) {
					if ( formControls[ i ].type !== 'submit' || triggeredByEvent ) {
						formControls[ i ].disabled = safeStatus;
					}
				} else {
					for ( const ii in formControls[ i ] ) {
						if ( formControls[ i ][ ii ] ) {
							formControls[ i ][ ii ].disabled = safeStatus;
						}
					}
				}
			}

			/** @type {HTMLDialogElement} */
			let loader = ( document.getElementById( this.settings.loader.id ) );
			if ( !loader ) {
				/** @type {HTMLDialogElement} */
				loader = ( document.createElement( 'dialog' ) );
				loader.id = this.settings.loader.id;
				loader.classList.add( this.settings.loader.className );
				document.body.appendChild( loader );
			}

			if ( status ) {
				loader.show();
			} else {
				loader.close();
			}

			if ( safeStatus ) {
				setTimeout( () =>
				{
					resolve( true );
				}, 1 ); // 1ms winting force browser to redraw website
			} else {
				resolve( true );
			}

		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async makeObsoleteItemsInIndexedDB ()
	{
		return new Promise( ( resolve ) =>
		{

			const openReq = this.idb.open( this.settings.db_credentials.db_name, this.settings.db_credentials.version );

			openReq.onsuccess = function ()
			{
				const db = openReq.result;
				const tx = db.transaction( this.settings.db_credentials.table_name, 'readwrite' );
				const store = tx.objectStore( this.settings.db_credentials.table_name );
				store.openCursor().onsuccess = function ( event )
				{ // alternative and easier .getAll() is badly supported in browsers yet
					const cursor = event.target.result;
					if ( cursor ) {
						const updateData = cursor.value;
						updateData.hidden = true;
						cursor.update( updateData );
						cursor.continue();
					} else {
						resolve( true );
					}
				};
				tx.oncomplete = function ()
				{
					db.close();
				};
			}.bind( this );

			openReq.onupgradeneeded = this.db_init.bind( this, openReq );

		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async filterClickHandlerFor ( key = '', /** @type { Event | MouseEvent } */ event )
	{
		return new Promise( ( resolve ) =>
		{
			if ( key ) {
				const CHANGE_EVENT_NAME = 'change';
				const FILTER_ELEMENT_SUFFIX = 'Filter';
				const INPUT_EVENT_NAME = 'input';
				let filterValues = this.settings.eventSource.query[ key ] = this.readFromTextarea( this.settings.controlForm[ key + FILTER_ELEMENT_SUFFIX ] );
				/** @type {HTMLElement} */
				const eventTarget = ( event.target );
				/** @type {HTMLTableCellElement} */
				const currnetCell = ( eventTarget.parentNode );
				currnetCell.setAttribute( 'aria-hidden', 'true' );
				const currentValue = currnetCell.firstElementChild.textContent;
				if ( Array.isArray( filterValues ) ) {
					const currentControlFormElement = this.settings.controlForm[ key + FILTER_ELEMENT_SUFFIX ];
					if ( filterValues.includes( currentValue ) ) { // remove
						eventTarget.title = this.settings.postRenderImprove[ key ].filter.remove.title;
						eventTarget.classList.remove( 'add', this.settings.postRenderImprove[ key ].filter.add.faClassName ); // it does perfectly sense XD
						eventTarget.classList.add( 'remove', this.settings.postRenderImprove[ key ].filter.remove.faClassName );
						if ( event.isTrusted ) {
							filterValues = this.settings.eventSource.query[ key ] = filterValues.filter( item => item !== currentValue ); // removes current from array
							currentControlFormElement.value = filterValues.join( this.settings.textareaSeparator );
							/*
							if (
								currentControlFormElement.parentNode.nextElementSibling
								&& currentControlFormElement.parentNode.nextElementSibling.nodeType === Node.ELEMENT_NODE
								&& currentControlFormElement.parentNode.nextElementSibling.nodeName === 'DIV'
								&& currentControlFormElement.parentNode.nextElementSibling.contentEditable
							) {
								currentControlFormElement.parentNode.nextElementSibling.dispatchEvent(new Event(INPUT_EVENT_NAME));
							}
							*/
							currentControlFormElement.parentNode.nextElementSibling.dispatchEvent( new Event( 'focus' ) );
							currentControlFormElement.dispatchEvent( new Event( CHANGE_EVENT_NAME ) );
						}
					} else { // add
						//eventTarget.textContent = this.settings.postRenderImprove[ key ].filter.add.textContent;
						eventTarget.title = this.settings.postRenderImprove[ key ].filter.add.title;
						eventTarget.classList.remove( 'remove', this.settings.postRenderImprove[ key ].filter.remove.faClassName );
						eventTarget.classList.add( 'add', this.settings.postRenderImprove[ key ].filter.add.faClassName );
						if ( event.isTrusted ) {
							currentControlFormElement.parentNode.nextElementSibling.dispatchEvent( new Event( 'focus' ) );
							filterValues.push( currentValue );
							currentControlFormElement.value = filterValues.join( this.settings.textareaSeparator );
							if (
								currentControlFormElement.parentNode.nextElementSibling
								&& currentControlFormElement.parentNode.nextElementSibling.nodeType === Node.ELEMENT_NODE
								&& currentControlFormElement.parentNode.nextElementSibling.nodeName === 'DIV'
								&& currentControlFormElement.parentNode.nextElementSibling.contentEditable
							) {
								currentControlFormElement.parentNode.nextElementSibling.dispatchEvent( new Event( INPUT_EVENT_NAME ) );
							}
							currentControlFormElement.dispatchEvent( new Event( CHANGE_EVENT_NAME ) );
						}
					}
				}
			}
			resolve( true );
		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async improveControlFormTextareas ()
	{
		return new Promise( ( resolve ) =>
		{
			const INPUT_EVENT_NAME = 'input';
			const FAKE_TRUSTED_DETAIL_STRING = 'fakeTrusted';
			const PLACEHOLDER_CLASS_NAME = 'placeholder';
			const TEXTAREA_ID_MAP = Object.freeze( {
				'eventSource': {
					'hostname-filter': 'hostname',
					'srcMAC-filter': 'mac',
				},
				'controlForm': {
					'hostname-filter': 'hostnameFilter',
					'srcMAC-filter': 'srcMACFilter',
				},
			} );
			const controlForm = this.settings.controlForm;
			for ( const i in controlForm ) {
				if ( controlForm[ i ] && controlForm[ i ].nodeType === Node.ELEMENT_NODE && controlForm[ i ].type === 'textarea' ) {
					controlForm[ i ].parentNode.hidden = true;
					const eventSourceKey = TEXTAREA_ID_MAP.eventSource[ controlForm[ i ].id ];
					const controlFormKey = TEXTAREA_ID_MAP.controlForm[ controlForm[ i ].id ];
					const tagsRoot = document.createElement( 'div' );
					if ( controlForm[ i ].placeholder ) {
						tagsRoot.appendChild( this.createFakePlaceholder( controlForm[ i ].placeholder, PLACEHOLDER_CLASS_NAME ) );
					}
					tagsRoot.contentEditable = 'true';
					tagsRoot.className = 'tags';
					tagsRoot.addEventListener( 'focus', this.placeholderLikeEffect.bind( this, PLACEHOLDER_CLASS_NAME ), false );
					tagsRoot.addEventListener( 'focusout', ( /** @type {FocusEvent} */ event ) =>
					{
						/** @type {HTMLElement} - some HTMLElement (HTMLDivElement for example) with contentEditable attribute */
						const eventTarget = ( event.target );
						if ( !eventTarget.textContent ) {
							eventTarget.appendChild( this.createFakePlaceholder( controlForm[ i ].placeholder, PLACEHOLDER_CLASS_NAME ) );
						}
					}, false );
					tagsRoot.addEventListener( 'keydown', this.keyboardHandler.bind( this, controlFormKey ), false );
					tagsRoot.addEventListener( INPUT_EVENT_NAME, ( /** @type {Event} */ event ) => // it can be also inputEvent (waiting for browsers to implement)
					{
						/** @type {HTMLElement} - some HTMLElement (HTMLDivElement for example) with contentEditable attribute */
						const eventTarget = ( event.target );
						if ( event.isTrusted || event[ 'detail' ] === FAKE_TRUSTED_DETAIL_STRING ) {
							const children = [ ...eventTarget.childNodes ];
							children.forEach( ( item ) =>
							{
								if ( item.nodeType === Node.TEXT_NODE ) {
									const regexp = new RegExp( '(?:,|;|\\s| |\\r?\\n)+', 'u' ); // lot of possible dividers
									const clearedItem = item.textContent.replace( regexp, '' );
									if ( clearedItem ) {
										const tag = this.createSingleTag( clearedItem, INPUT_EVENT_NAME, FAKE_TRUSTED_DETAIL_STRING );
										eventTarget.insertBefore( document.createTextNode( this.settings.textareaSeparator ), item );
										eventTarget.replaceChild( tag, item );
										this.setCursorAtTheEndOf( eventTarget );
										eventTarget.appendChild( document.createTextNode( this.settings.textareaSeparator ) );
									}
								}
							} );
							const values = this.settings.eventSource.query[ eventSourceKey ] = this.readFromEditableElement( eventTarget );
							this.settings.controlForm[ controlFormKey ].value = values.join( this.settings.textareaSeparator );
							if ( ( eventTarget.firstChild ) && ( eventTarget.firstChild.textContent === this.settings.textareaSeparator ) ) {
								eventTarget.removeChild( eventTarget.firstChild );
							}
							if ( eventTarget.lastChild ) {
								while (
									eventTarget.lastChild.nodeType === Node.TEXT_NODE
									&& eventTarget.lastChild.previousSibling
									&& eventTarget.lastChild.previousSibling.nodeType === Node.TEXT_NODE
								) {
									eventTarget.lastChild.previousSibling[ 'textNode' ] += eventTarget.lastChild[ 'textNode' ];
									eventTarget.removeChild( eventTarget.lastChild );
								}
								if ( eventTarget.lastChild.textContent !== this.settings.textareaSeparator ) {
									eventTarget.appendChild( document.createTextNode( this.settings.textareaSeparator ) );
								}
							}
							/** @type {HTMLInputElement} */
							const submitButton = ( this.settings.controlForm.controlFormSubmit );
							if ( submitButton ) {
								submitButton.disabled = false;
							}
						} else {
							const currentEventKey = this.settings.eventSource.query[ eventSourceKey ] = this.readFromTextarea( this.settings.controlForm[ controlFormKey ] );
							for ( const i in currentEventKey ) {
								const tag = this.createSingleTag( currentEventKey[ i ], INPUT_EVENT_NAME, FAKE_TRUSTED_DETAIL_STRING );
								tagsRoot.appendChild( tag );
								//if (currentEventKey[Number(i) + 1]) {
								tagsRoot.appendChild( document.createTextNode( this.settings.textareaSeparator ) );
								//}
							}
						}
					}, false );
					controlForm[ i ].parentNode.parentNode.insertBefore( tagsRoot, controlForm[ i ].parentNode.nextSibling );
					if ( controlForm[ i ].parentNode.firstChild ) {
						const title = document.createElement( 'div' );
						title.appendChild( document.createTextNode( controlForm[ i ].parentNode.firstChild.textContent ) );
						tagsRoot.parentNode.insertBefore( title, tagsRoot.previousSibling );
					}
					if (
						controlForm[ i ].parentNode.lastElementChild
						&& controlForm[ i ].parentNode.lastElementChild !== tagsRoot
						&& controlForm[ i ].parentNode.lastElementChild.nodeName !== 'TEXTAREA'
					) {
						tagsRoot.parentNode.insertBefore( controlForm[ i ].parentNode.lastElementChild, tagsRoot.nextSibling );
					}

				}
			}

			resolve( true );
		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async makeTableSortable ()
	{
		const ORDER = Object.freeze( {
			'ASC': 'asc',
			'DESC': 'desc',
		} );

		/** @method */
		const getCellValue = (/** @type {HTMLTableRowElement} */ tr, columnPosition = 0 ) =>
		{
			/** @type {HTMLTableCellElement} */
			const currentCell = ( tr.children[ columnPosition ] );

			/** @type {HTMLElement} */
			const innerElement = ( currentCell.firstElementChild );

			if ( innerElement && innerElement.title ) {
				return innerElement.title;
			}

			for ( let i = 0; i < currentCell.attributes.length; i++ ) {
				if ( currentCell.attributes[ i ].nodeName.substr( 0, 16 ) === 'data-raw-content' ) {
					return currentCell.attributes[ i ].nodeValue;
				}
			}

			return ( currentCell.innerText || currentCell.textContent );
		};

		/** @method */
		const comparer = function ( columnPosition = 0, asc = false )
		{
			return function ( a, b )
			{
				const v1 = getCellValue( asc ? a : b, columnPosition );
				const v2 = getCellValue( asc ? b : a, columnPosition );
				return ( v1 !== '' && v2 !== '' && !isNaN( Number( v1 ) ) && !isNaN( Number( v2 ) ) )
					? ( Number( v1 ) - Number( v2 ) )
					: v1.toString().localeCompare( v2 );
			};
		};

		/** @method */
		const sortTable = function ( /** @type {HTMLTableCellElement} */ th )
		{
			const ORDER_ATTRIBUTE = 'data-order';
			const CURRENT_CLASS_NAME = 'current';
			/** @type {HTMLTableSectionElement} */
			let table = ( th.parentNode.parentNode );
			let skipN = 1;
			while ( table && table.nodeType === Node.ELEMENT_NODE && table.nodeName === 'THEAD' ) {
				/** @type {HTMLTableSectionElement} */
				table = ( table.nextElementSibling );
				skipN = 0;
			}

			/** @type {HTMLTableRowElement} */
			const tr = ( th.parentNode );
			[ ...tr.children ].forEach( ( /** @type {HTMLTableCellElement} */ th ) =>
			{
				th.classList.remove( CURRENT_CLASS_NAME );
			} );
			th.classList.add( CURRENT_CLASS_NAME );

			th.setAttribute( ORDER_ATTRIBUTE, ( th.getAttribute( ORDER_ATTRIBUTE ) === ORDER.ASC ) ? ORDER.DESC : ORDER.ASC );
			[ ...table.querySelectorAll( 'tr:nth-child(n+' + ( skipN + 1 ) + ')' ) ].sort(
				comparer( [ ...tr.children ].indexOf( th ), th.getAttribute( ORDER_ATTRIBUTE ) === ORDER.ASC ? true : false )
			).forEach( ( /** @type {HTMLTableRowElement} */ tr ) =>
			{
				table.appendChild( tr ); // place existing rows, but in different order
			} );

			return true;
		};

		return new Promise( ( resolve ) =>
		{
			document.querySelectorAll( '.sortable th' ).forEach( ( /** @type {HTMLTableCellElement} */ th ) =>
			{
				const ENTER_NAME = 'Enter';
				const SPACE_NAME = ' ';
				th.tabIndex = 0; // focusable with TAB, but low priority
				th.classList.add( 'clickable' );
				if (
					th.textContent === this.getColumnNameBy( 'sent' )
					|| th.textContent === this.getColumnNameBy( 'recvd' )
					|| th.textContent === this.getColumnNameBy( 'dur' )
				) {
					th.setAttribute( 'data-order', 'asc' );
				}
				th.addEventListener( 'keydown', ( /** @type {KeyboardEvent} */ event ) =>
				{
					if (
						event.key === ENTER_NAME || event.code === ENTER_NAME
						|| event.key === SPACE_NAME || event.code === SPACE_NAME
					) {
						event.stopPropagation();
						event.preventDefault();
						/** @type {HTMLTableCellElement} */
						const eventTarget = ( event.target );
						return sortTable( eventTarget );
					}
				} );
				th.addEventListener( 'click', ( /** @type {MouseEvent} */ event ) =>
				{
					/** @type {HTMLTableCellElement} */
					const eventTarget = ( event.target );
					return sortTable( eventTarget );
				}, false );
			} );

			resolve( true );
		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async renewDateTextContent ()
	{ // can be runed periodicly
		return new Promise( ( resolve ) =>
		{
			const datetimePosition = arguments[ 0 ];
			/** @type {HTMLTableElement} */
			const table = ( this.settings.resultsTable );
			[ ...table.tBodies[ 0 ].rows ].forEach( ( /** @type {HTMLTableRowElement} */ currentRow ) =>
			{
				/** @type {HTMLElement} */
				const currentCell = ( (
					currentRow.children[ datetimePosition ].firstChild
					&& currentRow.children[ datetimePosition ].firstChild.nodeType === Node.ELEMENT_NODE
					&& currentRow.children[ datetimePosition ].firstChild.nodeName === 'TIME'
				)
					? currentRow.children[ datetimePosition ].firstChild
					: currentRow.children[ datetimePosition ] );
				if ( !currentCell.title ) {
					currentCell.title = currentCell.textContent;
				}
				/** @type {HTMLTableCellElement} */
				const td = ( currentCell.parentNode );
				const timeDiff = this.getTimeDiff( new Date( Number( td.getAttribute( 'data-raw-content' ) ) * 1000 ), new Date(), false, this.settings.lang, 'long' );
				if ( timeDiff && timeDiff.length > 1 ) {
					currentCell.textContent = timeDiff;
				}
			} );

			resolve( true );
		} );
	}


	/**
	 * @todo : description
	 * @returns {boolean}
	 */
	placeholderLikeEffect ( placeholderClassName = '' )
	{
		/** @type {HTMLElement} - some HTMLElement (HTMLDivElement for example) with contentEditable attribute */
		const eventTarget = ( arguments[ 1 ].target );
		let rootElement = eventTarget;
		while ( rootElement.contentEditable !== 'true' ) { // contentEditable can be strings true, false, inherit, and more
			rootElement = rootElement.parentElement;
		}
		[ ...rootElement.children ].forEach( ( /** @type {HTMLElement} */ item ) =>
		{
			if ( item.classList.contains( placeholderClassName ) ) {
				this.setCursorAtTheEndOf( rootElement );
				rootElement.setAttribute( 'data-placeholder', item.textContent );
				item.remove();
			}
		} );

		return true;
	}


	/**
	 * @todo : description
	 * @returns {HTMLElement}
	 */
	createFakePlaceholder ( placeholderText = '', placeHolderClassName = '' )
	{
		const fakePlaceholder = document.createElement( 'small' );
		fakePlaceholder.classList.add( placeHolderClassName );
		fakePlaceholder.appendChild( document.createTextNode( placeholderText ) );

		return fakePlaceholder;
	}


	/**
	 * @todo : description
	 */
	getTimeDiff ( /** @type {Date} */ timeA, /** @type {Date} */ timeB, relative = false, lang = this.settings.lang, type = 'long' )
	{
		const s = 1 * 1000;
		const m = 60 * s;
		const h = 60 * m;
		const d = 24 * h;
		const w = 7 * d;

		const justNow = 5 * s;
		const stop = 4 * w;

		if ( relative && ( timeA > timeB ) ) {
			return false;
		}

		const inflect = ( /** @type { String | Array } */ term, /** @type {Number} */ n = 0, /** @type {Function} */ pluralFunction ) =>
		{
			if ( pluralFunction && Array.isArray( term ) ) {
				return term[ pluralFunction( n ) ];
			}

			return term;
		};

		const diff = Math.abs( Number( timeA ) - Number( timeB ) );

		const rc = ( int = 0 ) =>
		{
			return Math.floor( int * ( ( 1 / this.settings.postRenderImprove.datetime.time_diff ) / 1000 ) );
		};

		const currentDate = new Date();

		const closerDate = [ timeA, timeB ].reduce( ( prev, curr ) =>
		{
			return ( Math.abs( Number( curr ) - Number( currentDate ) ) < Math.abs( Number( prev ) - Number( currentDate ) ) ? curr : prev );
		} );

		const UNITS = this.time_units_in_languages; // @todo : refactor this
		const DIVIDER = this.settings.postRenderImprove.datetime.divider; // @todo : refactor this

		if ( rc( Number( closerDate ) ) === rc( Number( currentDate ) ) ) {
			const comparedDate = ( closerDate === timeA ) ? timeB : timeA;
			const yesterdayDate = new Date();
			yesterdayDate.setDate( yesterdayDate.getDate() - 1 );
			const theDayBeforeYesterdayDayDate = new Date();
			theDayBeforeYesterdayDayDate.setDate( theDayBeforeYesterdayDayDate.getDate() - 2 );

			const comparedShred = String( comparedDate.getDate() ) + comparedDate.getMonth() + comparedDate.getFullYear();
			const todayShred = String( currentDate.getDate() ) + currentDate.getMonth() + currentDate.getFullYear();
			const yesterdayShred = String( yesterdayDate.getDate() ) + yesterdayDate.getMonth() + yesterdayDate.getFullYear();
			const theDayBeforeYesterdayShred = String( theDayBeforeYesterdayDayDate.getDate() ) + theDayBeforeYesterdayDayDate.getMonth() + theDayBeforeYesterdayDayDate.getFullYear();
			const UNITS = this.time_units_in_languages; // @todo : refactor this
			if ( UNITS[ lang ].today && comparedShred === todayShred ) {
				return UNITS[ lang ].today + DIVIDER + comparedDate.toLocaleTimeString();
			} else if ( UNITS[ lang ].yesterday && comparedShred === yesterdayShred ) {
				return UNITS[ lang ].yesterday + DIVIDER + comparedDate.toLocaleTimeString();
			} else if ( UNITS[ lang ].theDayBeforeYesterday && comparedShred === theDayBeforeYesterdayShred ) {
				return UNITS[ lang ].theDayBeforeYesterday + DIVIDER + comparedDate.toLocaleTimeString();
			}
		}
		// @todo : refactor from now
		if ( diff < justNow ) { // no SWITCH… switch() have very bad performance!
			return UNITS[ lang ].justNow;
		} else if ( diff < m ) {
			const n = Math.round( diff / s );
			return UNITS[ lang ].preffix + n + DIVIDER + inflect( UNITS[ lang ][ type ].s, n, UNITS[ lang ].plural ) + UNITS[ lang ].suffix;
		} else if ( diff <= h ) {
			const n = Math.round( diff / m );
			return UNITS[ lang ].preffix + n + DIVIDER + inflect( UNITS[ lang ][ type ].m, n, UNITS[ lang ].plural ) + UNITS[ lang ].suffix;
		} else if ( diff < d ) {
			const n = Math.round( diff / h );
			return UNITS[ lang ].preffix + n + DIVIDER + inflect( UNITS[ lang ][ type ].h, n, UNITS[ lang ].plural ) + UNITS[ lang ].suffix;
		} else if ( diff < w ) {
			const n = Math.round( diff / d );
			return UNITS[ lang ].preffix + n + DIVIDER + inflect( UNITS[ lang ][ type ].d, n, UNITS[ lang ].plural ) + UNITS[ lang ].suffix;
		} else if ( diff < stop ) {
			const n = Math.round( diff / w );
			return UNITS[ lang ].preffix + n + DIVIDER + inflect( UNITS[ lang ][ type ].w, n, UNITS[ lang ].plural ) + UNITS[ lang ].suffix;
		}
		// @todo : refactor till now
		return true;
	}


	createSingleTag ( textContent = '', inputEventName = '', fakeTrustedDetailString = '' )
	{
		const USE_SUGGESTIONS = false; // @todo : create suggestions by using input[list="<id>"] and shared datalist[id="<id>"]
		const CLOSER_SAFETY_DISTANCE = 1; // (int) in px
		const tag = document.createElement( USE_SUGGESTIONS ? 'input' : 'span' );
		if ( 'value' in tag ) {
			tag.value = textContent;
		} else {
			tag.appendChild( document.createTextNode( textContent ) );
		}
		tag.onclick = function ( event )
		{ // tag self-destruction
			if ( ( event.target.offsetLeft + event.target.offsetWidth ) < ( event.pageX + CLOSER_SAFETY_DISTANCE ) ) { // if clicked on ::after pseudo element content
				const tagsRoot = event.target.parentNode;
				const nextText = event.target.nextSibling;
				if ( nextText && nextText.nodeType === Node.TEXT_NODE && nextText.textContent === this.settings.textareaSeparator ) {
					tagsRoot.removeChild( nextText );
				}
				tagsRoot.removeChild( event.target );
				tagsRoot.dispatchEvent( new CustomEvent( inputEventName, { 'detail': fakeTrustedDetailString } ) );
				this.setCursorAtTheEndOf( tagsRoot );
			}
		}.bind( this );

		return tag;
	}


	setCursorAtTheEndOf ( /** @type {HTMLElement} and it's descendants */ element )
	{
		const range = document.createRange();
		const sel = this.window.getSelection();

		if ( element.textContent.slice( -this.settings.textareaSeparator.length ) === this.settings.textareaSeparator ) {
			range.setStart( element.lastChild, this.settings.textareaSeparator.length );
		} else if ( element.lastElementChild ) {
			range.setStart( element.lastElementChild, 1 );
		}
		range.collapse( true );
		sel.removeAllRanges();
		sel.addRange( range );

		return true;
	}


	keyboardHandler ( controlFormKey = '', /** @type {KeyboardEvent} */ event )
	{
		const ENTER_NAME = 'Enter';
		const SPACE_NAME = ' ';
		const CHANGE_EVENT_NAME = 'change';
		if (
			event.key === ENTER_NAME || event.code === ENTER_NAME
			|| event.key === SPACE_NAME || event.code === SPACE_NAME
		) {
			event.stopPropagation();
			event.preventDefault();
			if ( event.shiftKey && controlFormKey ) {
				this.settings.controlForm[ controlFormKey ].dispatchEvent( new Event( CHANGE_EVENT_NAME ) );
			} else {
				/** @type {HTMLDivElement} */
				const eventTarget = ( event.target );
				this.setCursorAtTheEndOf( eventTarget );
			}
		}

		return true;
	}


	db_init ( /** @type {IDBOpenDBRequest} */ openReq )
	{
		const event = arguments[ 1 ];
		const db = openReq.result;
		if ( event.oldVersion > 0 && event.oldVersion < event.newVersion ) {
			db.deleteObjectStore( this.settings.db_credentials.table_name );
		}
		const store = db.createObjectStore( this.settings.db_credentials.table_name, { keyPath: 'id', unique: true, autoIncrement: false } );
		store.createIndex( 'hostname', 'hostname', { unique: false } );
		store.createIndex( 'srcMAC', 'srcMAC', { unique: false } );
		store.createIndex( 'dstPort', 'dstPort', { unique: false } );
		store.createIndex( 'proto', 'proto', { unique: false } );
		store.createIndex( 'recvd', 'recvd', { unique: false } );
	}


	makeObsoleteDataStructure ()
	{
		for ( const i in this.dataStructure ) {
			if ( i === 'lenght' || i === 'lengthOfVisible' ) {
				continue;
			}
			if ( typeof this.dataStructure[ i ][ 9 ] === 'boolean' ) {
				this.dataStructure[ i ][ 9 ] = true;
			}
		}

		return true;
	}


	makeObsoleteStatisticsData ()
	{
		const graphs = this.settings.statisticsData.graphs.createFor;
		for ( const i in graphs ) {
			delete graphs[ i ].dataStore;
		}

		return true;
	}


	percentageFromRaw ( /** @type {HTMLTableCellElement } */ currentCell, suffixes = [] )
	{
		for ( const i in suffixes ) {
			if ( currentCell.getAttribute( 'data-raw-content-' + suffixes[ i ] ) ) {
				currentCell.setAttribute( 'data-percentage',
					String(
						Math.round( ( 100 / this.settings[ 'max' + suffixes[ i ][ this.capitalize ]() ] ) * Number( currentCell.getAttribute( 'data-raw-content-' + suffixes[ i ] ) ) )
					)
				);
				//currentCell.removeAttribute( 'data-raw-content-' + suffixes[ i ] ); // now it's used for sorting
				break; // one cell can have just one data-raw-…
			}
		}
		return true;
	}


	improveTableUX () // post render improvement
	{
		this.getMaxDataFrom( 'sent' ); // sets it into settings and as data-XZY attribute into cell
		this.getMaxDataFrom( 'recvd' ); // sets it into settings and as data-XZY attribute into cell
		this.getMaxDataFrom( 'dur' ); // sets it into settings and as data-XZY attribute into cell

		const datetimePosition = this.getColumnPositionBy( 'datetime' );
		const hostnamePosition = this.getColumnPositionBy( 'hostname' );
		const durPosition = this.getColumnPositionBy( 'dur' );
		const dstPortPosition = this.getColumnPositionBy( 'dstPort' );
		const srcMACPosition = this.getColumnPositionBy( 'srcMAC' );
		const sentPosition = this.getColumnPositionBy( 'sent' );
		const recvdPosition = this.getColumnPositionBy( 'recvd' );

		if ( this.settings.postRenderImprove.datetime.liveTime && Number.isInteger( datetimePosition ) ) {
			this.renewDateTextContent.bind( this, datetimePosition )(); // first run immediately, and then in period set in settings
			setInterval(
				this.renewDateTextContent.bind( this, datetimePosition ),
				this.settings.postRenderImprove.datetime.renewPeriod * 1000
			);
		}
		/** @type {HTMLTableElement} */
		const table = ( this.settings.resultsTable );
		const rows = table.tBodies[ 0 ].rows;
		rowsLoop: // eslint-disable-line no-unused-labels
		for ( let i = 0; i < rows.length; i++ ) {
			if ( Number.isInteger( hostnamePosition ) ) {
				const currentCell = rows[ i ].children[ hostnamePosition ];
				const code = document.createElement( 'code' );
				const fullUrl = currentCell.textContent;
				code.appendChild( document.createTextNode( fullUrl[ this.truncate ]( this.settings.strLen, '\u2026', false, true ) ) );
				if ( fullUrl.length > this.settings.strLen ) {
					code.title = fullUrl;
				}
				currentCell.textContent = '';

				if ( this.settings.postRenderImprove.hostname.link.openLink ) {
					const link = document.createElement( 'a' );
					let currentScheme = null;
					const possibleSchemes = rows[ i ].children[ dstPortPosition ].textContent.split( ', ' );
					const schemesPriority = this.settings.postRenderImprove.hostname.link.schemesPriority;
					for ( const i in schemesPriority ) {
						if ( possibleSchemes.includes( schemesPriority[ i ] ) ) {
							currentScheme = schemesPriority[ i ];
							break;
						}
					}
					if ( currentScheme ) {
						currentScheme += '://';
					} else {
						currentScheme = '//'; // protocol relative
					}
					link.href = currentScheme + fullUrl;
					link.title = this.settings.postRenderImprove.hostname.link.title;
					if ( this.settings.postRenderImprove.hostname.link.newWindow ) {
						link.onclick = function () // do NOT bind(this) in here!
						{
							/** @type {HTMLAnchorElement} */
							const self = ( this );
							return !window.open( self.href );
						};
					}
					link.classList.add( 'fas', this.settings.postRenderImprove.hostname.link.faClassName );
					if ( this.settings.postRenderImprove.hostname.link.textContent ) {
						link.appendChild( document.createTextNode( this.settings.postRenderImprove.hostname.link.textContent ) );
					}

					currentCell.appendChild( code );
					currentCell.appendChild( document.createTextNode( '\u00A0' ) ); // NO-BREAK SPACE
					currentCell.appendChild( link );
				}

				const filter = document.createElement( 'i' );
				filter.classList.add( 'fas', 'filter', this.settings.postRenderImprove.hostname.filter.className );
				filter.onclick = this.filterClickHandlerFor.bind( this, 'hostname' );

				const part = code.textContent.split( '.' );
				const index = Math.max(
					this.brandColors.indexOf( part[ 0 ] ),
					this.brandColors.indexOf( 'www.' + part[ 0 ] ),
					this.brandColors.indexOf( part[ 1 ] ), // example: from 'api.soundclound.com' take 'soundcloud' part
					( part[ 2 ] ) ? this.brandColors.indexOf( part[ 2 ] ) : -1,
					( part[ 3 ] ) ? this.brandColors.indexOf( part[ 3 ] ) : -1,
				);
				if ( index !== -1 ) {
					const square = document.createElement( 'span' );
					square.classList.add( 'bc-background-' + this.brandColors[ index ] );
					currentCell.appendChild( square );
				}

				currentCell.appendChild( document.createTextNode( '\u00A0' ) ); // NO-BREAK SPACE
				currentCell.appendChild( filter );
				filter.dispatchEvent( new Event( 'click' ) );
			}
			if ( Number.isInteger( durPosition ) ) {
				const ZEROS = '00';
				const zerosLength = ( ZEROS.length + 1 );
				const currentCell = rows[ i ].children[ durPosition ];
				if (
					currentCell.textContent.substr( 0, zerosLength ) === ZEROS + '.'
					|| currentCell.textContent.substr( 0, zerosLength ) === ZEROS + ':'
				) {
					const divider = currentCell.textContent.substr( 2, 1 );
					currentCell.textContent = currentCell.textContent.substr( zerosLength );
					const span = document.createElement( 'span' );
					span.classList.add( 'redundant' );
					span.appendChild( document.createTextNode( ZEROS + divider ) );
					currentCell.insertBefore( span, currentCell.firstChild );
				}
			}
			if ( this.settings.postRenderImprove.srcMAC.filter.enable && Number.isInteger( srcMACPosition ) ) {
				const currentCell = rows[ i ].children[ srcMACPosition ];
				const code = document.createElement( 'code' );
				code.appendChild( document.createTextNode( currentCell.textContent ) );
				currentCell.textContent = '';

				const filter = document.createElement( 'i' );
				filter.classList.add( 'fas', 'filter', this.settings.postRenderImprove.srcMAC.filter.className );
				filter.onclick = this.filterClickHandlerFor.bind( this, 'srcMAC' );

				currentCell.appendChild( code );
				currentCell.appendChild( document.createTextNode( '\u00A0' ) ); // NO-BREAK SPACE
				currentCell.appendChild( filter );
				filter.dispatchEvent( new Event( 'click' ) );
			}
			if ( Number.isInteger( sentPosition ) ) {
				const currentCell = rows[ i ].children[ sentPosition ];
				currentCell.textContent = Number( currentCell.textContent )[ this.bytesToSize ]();
			}
			if ( Number.isInteger( recvdPosition ) ) {
				const currentCell = rows[ i ].children[ recvdPosition ];
				currentCell.textContent = Number( currentCell.textContent )[ this.bytesToSize ]();
			}
			/** @type {HTMLCollection} */
			const cells = ( rows[ i ].children );
			cellsLoop: // eslint-disable-line no-unused-labels
			for ( let i = 0; i < cells.length; i++ ) {
				/** @type {HTMLTableCellElement} */
				const td = ( cells[ i ] );
				this.percentageFromRaw( td, [ 'dur', 'sent', 'recvd' ] ); // faster then autodetection from 'data-raw-content-' attribute prefix

				if ( td.getAttribute( 'data-percentage' ) ) {
					if ( Number( td.getAttribute( 'data-percentage' ) ) > 0 ) {
						td.style.backgroundSize = td.getAttribute( 'data-percentage' ) + '% 0.2em';
					}
					td.removeAttribute( 'data-percentage' );
				}
			}
		}

		return true;
	}


	makeSimpleGraphs ()
	{
		const container = document.createElement( 'div' );

		const list = this.settings.statisticsData.graphs.createFor;
		for ( const i in list ) { // @todo : refactor… better names then protoXYZ (reference to proto column)

			if ( list[ i ].dataStore ) {
				const protoRoot = document.createElement( 'div' );
				protoRoot.id = i;
				protoRoot.className = 'chart';

				const protoList = document.createElement( 'ol' );

				const singleItem = list[ i ].dataStore;
				for ( const i in singleItem ) {
					if ( i === 'length' ) {
						continue;
					}
					const percentage = Math.round( ( 100 / this.settings.statisticsData.nHits ) * singleItem[ i ].length );
					const protoItem = document.createElement( 'li' );
					protoItem.style.width = percentage + '%';
					protoItem.appendChild( document.createTextNode( i + ': ' ) );
					const protoVal = document.createElement( 'span' );
					protoVal.appendChild( document.createTextNode( singleItem[ i ].length + this.settings.itemsTextContent ) );
					protoItem.appendChild( protoVal );
					const protoPercentage = document.createElement( 'span' );
					protoPercentage.appendChild( document.createTextNode( ' (' + percentage + '\u00A0%)' ) ); // NO-BREAK SPACE
					protoItem.appendChild( protoPercentage );
					protoList.appendChild( protoItem );
				}

				protoRoot.appendChild( document.createTextNode( this.getColumnNameBy( i ) ) );
				protoRoot.appendChild( protoList );

				container.appendChild( protoRoot );
			}

		}
		/* option - write nItems into new p element inside statisticsElement
				const nItemsElement = document.createElement( 'p' );
				nItemsElement.id = 'nItems';
				nItemsElement.appendChild( document.createTextNode( 'n: ' ) );
				const innerElement = document.createElement( 'span' );
				innerElement.appendChild( document.createTextNode( this.dataStructure[ 'lengthOfVisible' ] ) );
				nItemsElement.appendChild( innerElement );
				container.appendChild( nItemsElement );
		*/
		this.settings.nItemsElement.textContent = this.settings.nItemsPrefix + '(' + this.dataStructure[ 'lengthOfVisible' ] + ')';

		if ( this.virtualStatistics && this.settings.eventSource.dumpIntoStatistics ) { // can be done after resolve() …
			const nodes = this.virtualStatistics;
			while ( nodes.firstChild ) { // node is deleted automatically after append
				container.appendChild( nodes.firstChild );
			}
		}
		this.virtualStatistics = container;

		return true;
	}


	makeFullGraphs ()
	{
		if ( !( Chart instanceof Function ) ) { // Chart.js library is missing
			return false;
		}
		if ( !this.settings.statisticsElement ) { // nothing to do
			return true;
		}
		const CANVAS_TAG_NAME = 'CANVAS';
		const statisticParts = this.settings.statisticsElement.children; // real already-drawed element
		for ( let i = 0; i < statisticParts.length; i++ ) {
			if ( statisticParts[ i ].classList.contains( 'chart' ) ) {
				const labels = [];
				const data = [];
				const items = statisticParts[ i ].firstElementChild.children;
				for ( let i = 0; i < items.length; i++ ) {
					labels.push( items[ i ].childNodes[ 0 ].textContent + items[ i ].childNodes[ 2 ].textContent );
					data.push( items[ i ].childNodes[ 1 ].textContent.replace( this.settings.itemsTextContent, '' ) );
				}
				/** @type {HTMLCanvasElement} */
				const canvasElement = ( document.createElement( CANVAS_TAG_NAME.toLowerCase() ) );
				statisticParts[ i ].appendChild( canvasElement );
				/*const chart = */new Chart( canvasElement.getContext( '2d' ), {
					type: this.settings.statisticsData.graphs.type,
					data: {
						labels: labels,
						datasets: [ {
							data: data,
							backgroundColor: this.createColorsFrom( labels ),
						} ],
					},
					options: {
						title: {
							display: true,
							fontSize: 15, // in px
							text: ( items.length === this.settings.statisticsData.graphs.maxItems ) ?
								statisticParts[ i ].firstChild.textContent + ' [' + items.length + this.settings.statisticsData.graphs.mostFrequentTextContent + ']' :
								statisticParts[ i ].firstChild.textContent,
						},
						legend: {
							position: 'right',
						},
					},
				} );
				while ( statisticParts[ i ].firstChild ) { // better performance then simple statisticParts[i].innerHTML = '';
					if ( statisticParts[ i ].firstChild.nodeName === CANVAS_TAG_NAME ) { // do not remove canvas
						break;
					}
					statisticParts[ i ].removeChild( statisticParts[ i ].firstChild );
				}
				statisticParts[ i ].appendChild( document.createElement( 'br' ) );
			}
		}

		return true;
	}


	createColorsFrom ( labels = [] )
	{
		const color = this.CHART_COLORS.lightness300;
		const colors = [];
		const base = ( Object.keys( color ).length < 36 ) ? Object.keys( color ).length : 36;
		for ( const i in labels ) {
			const labelParts = labels[ i ].split( ': ' );
			const knownColors = this.settings.statisticsData.graphs.knownColors;
			let currentColor;
			if ( Object.keys( knownColors ).includes( labelParts[ 0 ] ) ) { // known colors
				currentColor = color[ knownColors[ labelParts[ 0 ] ] ];
			} else { // pseudo-random color from label name
				const labelHash = labelParts[ 0 ][ this.hashCode ]().toString( base );
				let firstInDecimal = ( labelHash[ 0 ] === '-' ) ? parseInt( labelHash[ 1 ], base ) : parseInt( labelHash[ 0 ], base );
				currentColor = color[ Object.keys( color )[ firstInDecimal ] ];
				if ( labels.length < base ) {
					while ( colors.includes( currentColor ) ) {
						const n = ( firstInDecimal < base ) ? firstInDecimal++ : firstInDecimal--;
						currentColor = color[ Object.keys( color )[ n ] ];
					}
				} else {
					if ( colors[ i ] === colors[ Number( i ) - 1 ] ) {
						const n = ( firstInDecimal < base ) ? firstInDecimal++ : firstInDecimal--;
						currentColor = color[ Object.keys( color )[ n ] ];
					}
				}
			}
			colors.push( currentColor );
		}

		return colors;
	}


	getColumnPositionBy ( key = '' )
	{
		/** @type {HTMLTableElement} */
		const table = ( this.settings.resultsTable );
		const tHeadElements = ( table.tHead ) ? table.tHead.firstElementChild.children : null;
		if ( tHeadElements ) { // real already-drawed table
			let columnPosition = -1;
			for ( let i = 0; i < tHeadElements.length; i++ ) {
				if ( tHeadElements[ i ].textContent === this.getColumnNameBy( key ) ) {
					columnPosition = i;
					break;
				}
			}

			return columnPosition;
		} else { // take from settings
			let n = 0;
			for ( const i in this.settings.refactoringTableHeader ) {
				if ( i === key ) {
					return n;
				}
				n++;
			}
		}

		return -1; // -1 = not found

	}


	getColumnNameBy ( key = '' )
	{
		const theader = this.settings.refactoringTableHeader;
		for ( const i in theader ) {
			if ( i === key ) {
				return theader[ i ].caption;
			}
		}

		return false;
	}


	getMaxDataFrom ( col = '' ) // from visible results table
	{
		/** @type {HTMLTableElement} */
		const table = ( this.settings.resultsTable );
		if ( table.tBodies.length ) {
			const columnPosition = this.getColumnPositionBy( col );
			if ( columnPosition ) {
				const rows = table.tBodies[ 0 ].rows;
				for ( let i = 0; i < rows.length; i++ ) {
					let rawContent = Number( rows[ i ].children[ columnPosition ].textContent[ this.fromLocaleString ]() );
					if ( rawContent === -1 ) { // @todo : after js aggregation when parsing number failed
						rawContent = Number( rows[ i ].children[ columnPosition ].textContent[ this.hms2Secs ]( this.settings.lang ) ); // @todo : test it!
					}
					rows[ i ].children[ columnPosition ].setAttribute( 'data-raw-content-' + col, String( rawContent ) );
					if ( rawContent > this.settings[ 'max' + col[ this.capitalize ]() ] ) {
						this.settings[ 'max' + col[ this.capitalize ]() ] = rawContent;
					}
				}
				return this.settings[ 'max' + col[ this.capitalize ]() ];
			}
		}
		return false;
	}


	createTHead ()
	{
		const thead = document.createElement( 'thead' );
		const row = document.createElement( 'tr' );

		const tableHeader = this.settings.refactoringTableHeader;
		const tableHeaderArray = [];
		for ( const i in tableHeader ) {
			const th = tableHeader[ i ];
			th.id = i;
			tableHeaderArray[ th.order ] = th;
		}
		tableHeaderArray.forEach( ( /** @type { {id, hidden, caption, title, dataType} } */ item ) =>
		{
			if ( !item.hidden ) {
				const cell = document.createElement( 'th' );
				cell.appendChild( document.createTextNode( item.caption ) );
				if ( item.title ) {
					cell.title = item.title;
				}
				if ( item.dataType ) {
					cell.className = item.dataType;
				}
				if ( item.id === 'datetime' ) {
					cell.classList.add( 'current' );
					cell.setAttribute( 'data-order', 'desc' );
				}
				row.appendChild( cell );
			}
		} );
		thead.appendChild( row );
		return thead;
	}


	applyFilters () // @depricated ... soon
	{
		if ( !this.settings.filterBy ) {
			return true;
		}
		if ( this.settings.filterBy === this.FILTER_BY_OPTIONS[ 'DATETIME' ] ) {
			const ds = this.dataStructure;
			for ( const i in ds ) {
				ds[ i ].hidden = false;
				if ( ds[ i ].datetime.from < this.settings.timeLimitation.from ) {
					ds[ i ].hidden = true;
					continue;
				}
				if ( ds[ i ].datetime.to > this.settings.timeLimitation.to ) {
					ds[ i ].hidden = true;
					continue;
				}
			}

			return true;
		}
	}


	readTimeLimitationForm ()
	{
		/** @type {HTMLInputElement} */
		const dateFrom = ( this.settings.controlForm.timeLimitationInputs.dateFrom );
		/** @type {HTMLInputElement} */
		const timeFrom = ( this.settings.controlForm.timeLimitationInputs.timeFrom );
		/** @type {HTMLInputElement} */
		const dateTo = ( this.settings.controlForm.timeLimitationInputs.dateTo );
		/** @type {HTMLInputElement} */
		const timeTo = ( this.settings.controlForm.timeLimitationInputs.timeTo );
		let fromString = '';
		let toString = '';
		const d = new Date();
		if ( dateTo && dateTo.value ) {
			const part1 = dateTo.value.substr( 0, 4 );
			const part2 = dateTo.value.substr( 5 );
			toString += part2.replace( '-', ', ' ) + ', ' + part1 + ', ';
		} else {
			toString += ( d.getMonth() + 1 ) + ', ' + d.getDate() + ', ' + d.getFullYear() + ', ';
		}
		if ( timeFrom && timeFrom.value ) {
			toString += timeTo.value;
		} else {
			toString += '23:59:59';
		}
		if ( dateFrom && dateFrom.value ) {
			const part1 = dateFrom.value.substr( 0, 4 );
			const part2 = dateFrom.value.substr( 5 );
			fromString += part2.replace( '-', ', ' ) + ', ' + part1 + ', ';
		} else {
			d.setDate( d.getDate() - this.settings.timeLimitation.suggestedInterval );
			fromString += ( d.getMonth() + 1 ) + ', ' + d.getDate() + ', ' + d.getFullYear() + ', ';
		}
		if ( timeFrom && timeFrom.value ) {
			fromString += timeFrom.value;
		} else {
			fromString += '00:00:00';
		}
		let fromDate = new Date( fromString );
		let toDate = new Date( toString );
		if ( toDate < fromDate ) { // if user set bad interval
			[ toDate, fromDate ] = [ fromDate, toDate ]; // swap
		}
		return {
			'from': fromDate,
			'to': toDate,
		};
	}


	readAggregation ()
	{
		/** @type {HTMLInputElement} */
		const element = ( this.settings.controlForm.aggregate );
		if ( element && element.nodeType === Node.ELEMENT_NODE ) {
			return element.checked;
		}

		return false;
	}


	readFromTextarea ( /** @type {HTMLTextAreaElement | HTMLElement} */ element )
	{
		if ( element && element.nodeType === Node.ELEMENT_NODE && 'value' in element && element.value ) {
			const regexp = new RegExp( '(?:,|;|\\s| |\\r?\\n)+', 'u' ); // lot of possible dividers
			const list = element.value.split( regexp );
			const withoutEmptyItems = list.filter( String );
			return [ ...new Set( withoutEmptyItems ) ]; // this make [] unique
		}

		return [];
	}


	readFromEditableElement ( /** @type {HTMLElement} and it's descendants */ element )
	{
		if ( element && element.nodeType === Node.ELEMENT_NODE && element.children && element.children.length ) {
			const withoutEmptyItems = [];
			[ ...element.children ].forEach( ( child ) =>
			{
				withoutEmptyItems.push( child.textContent );
			} );
			return [ ...new Set( withoutEmptyItems ) ]; // this make [] unique
		}

		return [];
	}


	readAndSetControlForm () // set into settings
	{
		this.timeLimitation = this.readTimeLimitationForm(); // special setter into settings
		this.settings.eventSource.query.aggregate = this.readAggregation();
		this.settings.eventSource.query.hostname = this.readFromTextarea( this.settings.controlForm.hostnameFilter );
		this.settings.eventSource.query.mac = this.readFromTextarea( this.settings.controlForm.srcMACFilter );

		return true;
	}


	/**
	 * Make real elements from virtual DOM (table and statistics)
	 * @returns {Boolean}
	 */
	flush () // @todo : future request : argument to draw only table or only statistics
	{
		if ( this.virtualTable && this.settings.resultsTable ) {
			const resultsTable = this.settings.resultsTable;
			for ( let i = 0; i < resultsTable.attributes.length; i++ ) {
				this.virtualTable.setAttribute( resultsTable.attributes[ i ].nodeName, resultsTable.attributes[ i ].value );
			}
			resultsTable.parentNode.replaceChild( this.virtualTable, resultsTable );
			this.settings.resultsTable = this.virtualTable;
			//this.settings['eventSource'].currentlyDrawed.table = this.settings['eventSource'].completeUrl; // @todo : future request … not in use actually
		}

		if ( this.virtualStatistics && this.settings.statisticsElement ) {
			const resultsElement = this.settings.statisticsElement;
			for ( let i = 0; i < resultsElement.attributes.length; i++ ) {
				this.virtualStatistics.setAttribute( resultsElement.attributes[ i ].nodeName, resultsElement.attributes[ i ].value );
			}
			resultsElement.parentNode.replaceChild( this.virtualStatistics, resultsElement );
			this.settings.statisticsElement = this.virtualStatistics;
			//this.settings['eventSource'].currentlyDrawed.statistics = this.settings['eventSource'].completeUrl; // @todo : future request … not in use actually
		}

		return true;
	}


	showEmptyResponseInfo () // @todo : if filter exist, than create a oprion for drop it. If not show only info for user.
	{
		alert( this.settings.userMessages.errors.failedLoadingData[ 0 ] );

		return true;
	}


	universalFormHook ( /** @type {Event} */ event )
	{ // @todo : only flush when fakeUntrustedEvent
		/*
		if (event.isTrusted && event.target && event.target.nodeType === Node.ELEMENT_NODE && event.target.type === 'textarea') {
			return true;
		}
		*/
		this.setSyncWorkTo( true, event.isTrusted ).then( () =>
		{
			this.readAndSetControlForm(); // set into settings
			this.makeObsoleteItemsInIndexedDB().then( () =>
			{
				this.makeObsoleteDataStructure();
				this.makeObsoleteStatisticsData();
				this.loadFreshHits().then( () =>
				{
					if ( !this.dataStructure[ 'lengthOfVisible' ] ) {
						this.showEmptyResponseInfo();
						return true;
					}
					if ( this.settings.controlForm.controlFormSubmit && event.isTrusted ) {
						this.setSyncWorkTo( false, true );
						return true;
					}
					this.storeHitsToIndexedDB();
					this.groupData().then( () =>
					{
						this.dataStructure = this.combinatedSorting( this.dataStructure );
						this.setSyncWorkTo( false, true );
						this.createFullStatistic().then( () =>
						{
							this.makeSimpleGraphs();
							this.flush();// place virtual DOM elements instead of real site elements
							this.makeFullGraphs(); // post render improvement
						} );
						this.createFullTable().then( () =>
						{
							this.flush(); // place virtual DOM elements instead of real site elements
							setTimeout( () =>
							{
								this.improveTableUX(); // post render improvement
							}, 1 ); // 1ms winting force browser to redraw website
							//this.makeTableSortable(); // post render improvement
						} );
					} );
				} );
			} );
		} );

		return true;
	}


	inicializeHTMLHooks ()
	{
		const CHANGE_EVENT_NAME = 'change';
		const CLICK_EVENT_NAME = 'click';
		const KEYUP_EVENT_NAME = 'keyup';
		const inputs = this.settings.controlForm;
		for ( const i in inputs ) {
			if ( inputs[ i ] && inputs[ i ].nodeType ) {
				if ( inputs[ i ].type === 'submit' ) {
					const fakeUntrustedEvent = {};
					fakeUntrustedEvent.isTrusted = false;
					inputs[ i ].addEventListener( CLICK_EVENT_NAME, this.universalFormHook.bind( this, fakeUntrustedEvent ), false ); // @todo : only flush when fakeUntrustedEvent
					inputs[ i ].addEventListener( CLICK_EVENT_NAME, () =>
					{
						this.disabled = true;
					}, false );
				} else {
					inputs[ i ].addEventListener( CHANGE_EVENT_NAME, this.universalFormHook.bind( this ), false );
					inputs[ i ].addEventListener( KEYUP_EVENT_NAME, () =>
					{
						this.settings.controlForm.controlFormSubmit[ 'disabled' ] = false;
					}, false );
				}
			} else {
				for ( const ii in inputs[ i ] ) {
					if ( inputs[ i ][ ii ] ) {
						inputs[ i ][ ii ].addEventListener( CHANGE_EVENT_NAME, this.universalFormHook.bind( this ), false );
						inputs[ i ][ ii ].addEventListener( CHANGE_EVENT_NAME, () =>
						{
							this.settings.filterBy = this.FILTER_BY_OPTIONS[ 'DATETIME' ]; // change settings of current filter
							this.fillTimeLimitationForm().then(); // from this.settings.timeLimitation
						}, false );
					}
				}
			}
		}

		return true;
	}


	/**
	 * @todo : description
	 * @returns {Boolean}
	 */
	run ()
	{
		this.improveControlFormTextareas(); // async
		this.setSyncWorkTo( true ).then( () =>
		{
			this.makeObsoleteItemsInIndexedDB().then( () =>
			{
				this.readAndSetControlForm(); // set into settings
				this.loadFreshHits().then( () =>
				{
					if ( !this.dataStructure[ 'lengthOfVisible' ] ) {
						this.fillTimeLimitationForm(); // from this.settings.timeLimitation
						this.showEmptyResponseInfo();
						this.inicializeHTMLHooks();
						return true;
					}
					this.storeHitsToIndexedDB();
					this.inicializeHTMLHooks();
					this.fillTimeLimitationForm(); // from this.settings.timeLimitation
					this.groupData().then( () =>
					{
						this.setSyncWorkTo( false );
						//this.applyFilters(); // works with virtual DOM
						this.createFullStatistic().then( () =>
						{
							this.makeSimpleGraphs();
							this.flush(); // place virtual DOM elements instead of real site elements
							this.makeFullGraphs(); // post render improvement
						} );
						this.createFullTable().then( () =>
						{
							this.flush(); // place virtual DOM elements instead of real site elements
							setTimeout( () =>
							{
								this.improveTableUX(); // post render improvement
								this.makeTableSortable(); // post render improvement
							}, 1 ); // 1ms winting force browser to redraw website
						} );
					} );
				} );
			} );
		} );

		return true;
	}

};

/*
 * Example usage:
 *
	<script src="czNicTurrisPakon.js"></script>
	<script>
		const cntp = new czNicTurrisPakon(window);
		//cntp.settings = {'lang': 'cs', '…': true};
		cntp.run();
		//const cs = window.document.currentScript;
		//cs.parentNode.removeChild(cs);
	</script>
 */
