'use strict';

/** @typedef {function(): true} Chart - global Chart export from library Chart.js */
var Chart;

class czNicTurrisPakon // eslint-disable-line no-unused-vars
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
			'db_credentials': {
				'db_name': 'PakonLive',
				'table_name': 'hits',
				'version': 2,
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
				'brandColorsUrl': null,
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
					'cellInlineCss': {
						'property': 'border-left',
						'value': '2px solid --color', // string '--color' will be replaced by real color
						'notFoundColorValue': 'transparent',
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
				'downloadView': document.getElementById( 'download-current-view' ),
			},
			'timeLimitation': {
				'from': null,
				'to': null,
				'suggestedInterval': 1, // in days (0 means 'only today, from 00:00:00 to 23:59:59')
			},
			'tableHeader': { // @todo : refactoring in use
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
					'divider': ': ',
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
					'knownColors': { // names from this.CHART_COLORS.lightnessXXX
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
		this._brandColors = null;

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

	/**
	 * Get CHART_COLORS
	 */
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


	set brandColors ( jsonObject )
	{
		this._brandColors = jsonObject;
	}


	get brandColors () // async
	{
		return new Promise( ( /** @type {Function} */ resolve ) =>
		{
			if ( this._brandColors ) {
				resolve( this._brandColors );
				return true;
			} else {
				if ( this.settings.postRenderImprove.brandColorsUrl ) {
					fetch( this.settings.postRenderImprove.brandColorsUrl.href ).then( ( /** @type {Response} */ response ) =>
					{
						return response.json();
					} ).then( ( /** @type { {} } */ jsonResponse ) =>
					{
						this._brandColors = jsonResponse;
						resolve( jsonResponse );
						return true;
					} );
				} else {
					resolve( [] );
					return true;
				}
			}
		} );
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

		/** @type {IDBOpenDBRequest} */
		const openReq = this.idb.open( this.settings.db_credentials.db_name, this.settings.db_credentials.version );

		openReq.onupgradeneeded = this.db_init.bind( this, openReq );

		openReq.onsuccess = function ()
		{

			/** @type {IDBDatabase} */
			const db = openReq.result;

			const tx = db.transaction( this.settings.db_credentials.table_name, 'readwrite' );
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


	/**
	 * @todo : description
	 * @returns { {} | Array }
	 */
	combinatedSorting ( /** @type { {} | Array } */ inArray, by = this.settings.sortBy )
	{
		let sortedUniqueHostnameKeys;
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
		return new Promise( ( /** @type {Function} */ resolve ) => // eslint-disable-line no-unused-vars
		{
			this.createSourceUrl(); // set into settings

			if ( !this.dataStructure ) {
				this.dataStructure = [];
			}

			if ( false ) { // eslint-disable-line no-constant-condition
				// @todo : eventsource - asynchronous
				const evtSource = new EventSource( this.settings.eventSource.completeUrl, { withCredentials: true } );
				evtSource.onmessage = this.eventMessage.bind( this );
				resolve( true );
				return true;
			} else { // fetch - asynchronout but with waiting
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

						/** @type { Array } */
						const currentRow = JSON.parse( sortedNonEmpty[ i ].substr( 6 ) );

						this.dataStructure[ currentRow.join()[ this.hashCode ]().toString( 36 ) ] = currentRow.concat( [ false ] ); // add bool 'hidden' column and set default to false
					}
					this.dataStructure[ 'length' ] = Object.keys( this.dataStructure ).length;
					this.dataStructure[ 'lengthOfVisible' ] = i;
					resolve( true );
					return true;
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
		return new Promise( ( /** @type {Function} */ resolve ) =>
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
				this.setSyncWorkTo( false, true );
			} else {
				this.repairUserInputs();
				this.createSourceUrl();
				this.fetchEventSource( true ).then( ( result ) =>
				{
					resolve( result );
					return true;
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
		return new Promise( ( /** @type {Function} */ resolve ) =>
		{
			fetch( this.settings.eventSource.completeUrl.href, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
				},
				credentials: 'include',
			} ).then( ( response ) =>
			{
				if ( response.ok && ( response.status === 200 ) ) {
					resolve( response.text() );
					return true;
				} else {
					this.fetchEventSourceError.bind( this, repeatedCalls )().then( ( result ) =>
					{
						resolve( result );
						return true;
					} );
				}
			} ).catch( () =>
			{
				this.fetchEventSourceError.bind( this, repeatedCalls )().then( ( result ) =>
				{
					resolve( result );
					return true;
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
		return new Promise( ( /** @type {Function} */ resolve ) =>
		{
			resolve( this.dataStructure[ 'lengthOfVisible' ] );
			return true;
		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Array>}
	 */
	async mostUsedHostnames ()
	{
		return new Promise( ( /** @type {Function} */ resolve ) =>
		{
			/** @type {IDBOpenDBRequest} */
			const openReq = this.idb.open( this.settings.db_credentials.db_name, this.settings.db_credentials.version );

			openReq.onsuccess = function ()
			{
				/** @type {IDBDatabase} */
				const db = openReq.result;

				const tx = db.transaction( this.settings.db_credentials.table_name, 'readonly' );
				const store = tx.objectStore( this.settings.db_credentials.table_name );
				const uniqueHostnameKeys = [];
				store.openCursor().onsuccess = function ( event )
				{ // alternative and easier .getAll() is badly supported in browsers yet

					/** @type {IDBRequest} */
					const eventTarget = ( event.target );

					/** @type {IDBCursorWithValue} */
					const cursor = eventTarget.result;

					if ( cursor ) {
						/** @type { {} } */
						const clearedValues = cursor.value;

						uniqueHostnameKeys[ cursor.value.hostname ] = uniqueHostnameKeys[ cursor.value.hostname ] || []; // initialize or add
						uniqueHostnameKeys[ cursor.value.hostname ].push( clearedValues ); // initialize or add
						cursor.continue();
					} else {
						resolve( this.groupSortData( uniqueHostnameKeys ) );
					}
				}.bind( this );
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
		return new Promise( ( /** @type {Function} */ resolve ) =>
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
				return true;
			} else if ( this.settings.groupBy === this.GROUP_BY_OPTIONS[ 'HOSTNAME_COUNT' ] ) {
				this.mostUsedHostnames().then( ( result ) =>
				{
					this.dataStructure = result;
					this.dataStructure[ 'length' ] = Object.keys( result ).length;
					this.dataStructure[ 'lengthOfVisible' ] = '@todo : count this!';
					resolve( result );
					return true;
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
		return new Promise( ( /** @type {Function} */ resolve ) =>
		{
			/** @type {IDBOpenDBRequest} */
			const openReq = this.idb.open( this.settings.db_credentials.db_name, this.settings.db_credentials.version );

			openReq.onsuccess = function ()
			{

				/** @type {IDBDatabase} */
				const db = openReq.result;

				const tx = db.transaction( this.settings.db_credentials.table_name, 'readonly' );
				const store = tx.objectStore( this.settings.db_credentials.table_name );
				const protos = [];
				const index = store.index( column );
				const openCursorRequest = index.openCursor( null, 'next' );

				openCursorRequest.onsuccess = function ( /** @type {Event} */ event )
				{

					/** @type { IDBRequest } */
					const eventTarget = ( event.target );

					/** @type {IDBCursorWithValue} */
					const cursor = eventTarget.result;

					if ( cursor ) {
						if ( !cursor.value.hidden ) {
							protos[ cursor.value[ column ] ] = protos[ cursor.value[ column ] ] || []; // initialize or add
							protos[ cursor.value[ column ] ].push( cursor.primaryKey ); // initialize or add
						}
						cursor.continue();
					} else {

						/** @type {Array} */
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
		return new Promise( ( /** @type {Function} */ resolve ) =>
		{
			const NO_BREAK_SPACE = '\u00A0';

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
			const tableHeader = this.settings.tableHeader;
			const tableHeaderArray = [];
			for ( const i in tableHeader ) {

				/** @type { {id, order, caption, title, dataType, hidden} } */
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
									const timeString = this.dataStructure[ i ][ columnPosition ].replace( ' ', 'T' ) + 'Z'; // For Safari browser
									const currentDate = new Date( timeString );
									const d = new Date;
									const offsetMinutes = d.getTimezoneOffset();
									currentDate.setMinutes( currentDate.getMinutes() + offsetMinutes );
									cell.setAttribute( 'data-raw-content', String( Number( currentDate ) / 1000 ) );
									node = document.createElement( 'time' );
									node.dateTime = currentDate.toISOString();
									node.appendChild( document.createTextNode(
										currentDate.toLocaleDateString( this.settings.lang ).replace( ' ', NO_BREAK_SPACE ).replace( ' ', NO_BREAK_SPACE ) // .replace().replace() has better performance than regexp
										+ ' '
										+ currentDate.toLocaleTimeString( this.settings.lang ).replace( ' ', NO_BREAK_SPACE ).replace( ' ', NO_BREAK_SPACE ) // .replace().replace() has better performance than regexp
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
								const idText = this.dataStructure[ i ][ 'ids' ].length + NO_BREAK_SPACE + '\u00D7'; // MULTIPLICATION SIGN
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
			return true;

		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async createFullStatistic ()
	{
		return new Promise( ( /** @type {Function} */ resolve ) =>
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
			const theader = this.settings.tableHeader;
			for ( const i in theader ) {
				existingColumns.push( i );
			}

			const afterAsyncGraphs = [];
			let completedPartsSum = 0;
			for ( const i in list ) {
				if ( i === 'length' ) {
					continue;
				} else if ( existingColumns.includes( i ) ) {
					this.getDataFrom( i ).then( ( /** @type { {} } */ result ) =>
					{
						list[ i ].dataStore = result; // set into settings
						completedPartsSum++;
						if ( completedPartsSum === list.length ) {
							afterAsyncGraphs.forEach( () =>
							{
								// @todo : get data & place them into dataStore
							} );
							resolve( true );
							return true;
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
		return new Promise( ( /** @type {Function} */ resolve ) =>
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
			return true;
		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async setSyncWorkTo ( status = false, visual = true )
	{
		return new Promise( ( /** @type {Function} */ resolve ) =>
		{

			/** @type {HTMLInputElement} */
			const submitButton = ( this.settings.controlForm.controlFormSubmit );

			const safeStatus = status ? ( submitButton ? false : true ) : false;
			const formControls = ( this.settings.controlForm );

			for ( const i in formControls ) {
				if ( formControls[ i ] && formControls[ i ].nodeType === Node.ELEMENT_NODE ) {
					if (
						formControls[ i ].type !== 'submit'
						|| !visual
						|| formControls[ i ] === this.settings.controlForm.downloadView // download current view button
					) {
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

			if ( visual === false ) {
				resolve( true );
				return true;
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
			} else if ( loader.open ) { // cannot close dialog which is not opened
				loader.close();
			}

			if ( safeStatus ) {
				requestAnimationFrame( () =>
				{
					resolve( true );
				} ); // force browser to redraw website
			} else {
				resolve( true );
			}

			return true;

		} );
	}


	/**
	 * @todo : description
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async makeObsoleteItemsInIndexedDB ()
	{
		return new Promise( ( /** @type {Function} */ resolve ) =>
		{

			/** @type {IDBOpenDBRequest} */
			const openReq = this.idb.open( this.settings.db_credentials.db_name, this.settings.db_credentials.version );

			openReq.onsuccess = function ()
			{

				/** @type {IDBDatabase} */
				const db = openReq.result;

				const tx = db.transaction( this.settings.db_credentials.table_name, 'readwrite' );
				const store = tx.objectStore( this.settings.db_credentials.table_name );

				store.clear();
				resolve( true );
				/* @todo : for future use
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
				*/
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
		return new Promise( ( /** @type {Function} */ resolve ) =>
		{
			if ( key ) {
				const queryFrom = ( key = '' ) =>
				{
					const KEYS_TO_QUERY = {
						'srcMAC': 'mac',
					};
					if ( Object.keys( KEYS_TO_QUERY ).includes( key ) ) {
						return KEYS_TO_QUERY[ key ];
					}
					return key;
				};

				const FILTER_ELEMENT_SUFFIX = 'Filter';
				const INPUT_EVENT_NAME = 'input';
				let filterValues = this.settings.eventSource.query[ queryFrom( key ) ] = this.readFromTextarea( this.settings.controlForm[ key + FILTER_ELEMENT_SUFFIX ] );

				/** @type {HTMLElement} */
				const eventTarget = ( event.target );

				/** @type {HTMLTableCellElement} */
				const currnetCell = ( eventTarget.parentNode );

				currnetCell.setAttribute( 'aria-hidden', 'true' );
				const currentValue = currnetCell.firstElementChild.textContent;
				if ( Array.isArray( filterValues ) ) {

					/** @type {HTMLTextAreaElement} */
					const currentControlFormElement = this.settings.controlForm[ key + FILTER_ELEMENT_SUFFIX ];

					if ( filterValues.includes( currentValue ) ) { // remove
						eventTarget.title = this.settings.postRenderImprove[ key ].filter.remove.title;
						eventTarget.classList.remove( 'add', this.settings.postRenderImprove[ key ].filter.add.faClassName ); // it does perfectly sense XD
						eventTarget.classList.add( 'remove', this.settings.postRenderImprove[ key ].filter.remove.faClassName );
						if ( event.isTrusted ) {
							filterValues = this.settings.eventSource.query[ queryFrom( key ) ] = filterValues.filter( item => item !== currentValue ); // removes current from array
							currentControlFormElement.value = filterValues.join( this.settings.textareaSeparator );

							currentControlFormElement.dispatchEvent( new Event( INPUT_EVENT_NAME ) );
						}
					} else { // add
						//eventTarget.textContent = this.settings.postRenderImprove[ key ].filter.add.textContent;
						eventTarget.title = this.settings.postRenderImprove[ key ].filter.add.title;
						eventTarget.classList.remove( 'remove', this.settings.postRenderImprove[ key ].filter.remove.faClassName );
						eventTarget.classList.add( 'add', this.settings.postRenderImprove[ key ].filter.add.faClassName );
						if ( event.isTrusted ) {

							/** @type {HTMLLabelElement} */
							const wrappingElement = ( currentControlFormElement.parentNode );

							/** @type {HTMLElement} */
							const contentEditableElement = ( wrappingElement.nextElementSibling );

							contentEditableElement.dispatchEvent( new Event( 'focus' ) );
							filterValues.push( currentValue );
							currentControlFormElement.value = filterValues.join( this.settings.textareaSeparator );
							currentControlFormElement.dispatchEvent( new Event( INPUT_EVENT_NAME ) );
						}
					}
				}
			}
			resolve( true );
			return true;
		} );
	}


	async createColorsFrom ( labels = [] )
	{
		return new Promise( ( /** @type {Function} */ resolve ) =>
		{
			if ( labels.length <= 0 ) {
				resolve( [] );
				return true;
			}
			const color = this.CHART_COLORS.lightness300;
			const colors = [];
			const base = ( Object.keys( color ).length < 36 ) ? Object.keys( color ).length : 36;
			const labelsLength = labels.length;
			for ( const i in labels ) {

				/** @type {Array} */
				const labelParts = labels[ i ].split( this.settings.statisticsData.graphs.divider );

				const knownColors = this.settings.statisticsData.graphs.knownColors;
				let currentColor;
				this.brandcolorsIncludes( labelParts[ 0 ] ).then( ( /** @type {String | Boolean} */ knownBrandColor ) =>
				{
					if ( Object.keys( knownColors ).includes( labelParts[ 0 ] ) ) { // known colors
						currentColor = color[ knownColors[ labelParts[ 0 ] ] ];
					} else if ( knownBrandColor ) { // colors from brandcolors.net
						currentColor = knownBrandColor;
					} else { // pseudo-random color from label name

						/** @type {String} */
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
					if ( colors.length >= labelsLength ) {
						resolve( colors );
						return true;
					}
				} );
			}
		} );
	}


	db_init ( /** @type {IDBOpenDBRequest} */ openReq )
	{

		/** @type {IDBVersionChangeEvent} */
		const event = arguments[ 1 ];

		/** @type {IDBDatabase} */
		const db = openReq.result;

		if ( event.oldVersion > 0 && event.oldVersion < event.newVersion ) {
			db.deleteObjectStore( this.settings.db_credentials.table_name );
		}
		const store = db.createObjectStore( this.settings.db_credentials.table_name, { keyPath: 'id', autoIncrement: false } );
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


	async brandcolorsIncludes (/** @type {String} */ name )
	{
		return new Promise( ( /** @type {Function} */ resolve ) =>
		{
			this.brandColors.then( ( brandColorsJson ) =>
			{
				const NUMBER_SIGN = '#';
				const part = name.split( '.' );
				const index = Math.max(
					Object.keys( brandColorsJson ).indexOf( part[ 0 ] ),
					Object.keys( brandColorsJson ).indexOf( 'www.' + part[ 0 ] ),
					Object.keys( brandColorsJson ).indexOf( part[ 1 ] ), // example: from 'api.soundclound.com' take 'soundcloud' part
					( part[ 2 ] ) ? Object.keys( brandColorsJson ).indexOf( part[ 2 ] ) : -1,
					( part[ 3 ] ) ? Object.keys( brandColorsJson ).indexOf( part[ 3 ] ) : -1,
				);
				if ( index !== -1 ) {
					resolve( NUMBER_SIGN + brandColorsJson[ Object.keys( brandColorsJson )[ index ] ] );
				} else {
					resolve( ( name in brandColorsJson ) ? NUMBER_SIGN + brandColorsJson[ name ] : false );
				}
				return true;
			} );
		} );
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
		const NO_BREAK_SPACE = '\u00A0';

		this.getMaxDataFrom( 'sent' ); // sets it into settings and as data-XZY attribute into cell
		this.getMaxDataFrom( 'recvd' ); // sets it into settings and as data-XZY attribute into cell
		this.getMaxDataFrom( 'dur' ); // sets it into settings and as data-XZY attribute into cell

		const hostnamePosition = this.getColumnPositionBy( 'hostname' );
		const durPosition = this.getColumnPositionBy( 'dur' );
		const dstPortPosition = this.getColumnPositionBy( 'dstPort' );
		const srcMACPosition = this.getColumnPositionBy( 'srcMAC' );
		const sentPosition = this.getColumnPositionBy( 'sent' );
		const recvdPosition = this.getColumnPositionBy( 'recvd' );

		document.querySelectorAll( '.sortable th' ).forEach( ( /** @type {HTMLTableCellElement} */ th ) =>
		{
			if (
				th.textContent === this.getColumnNameBy( 'sent' )
				|| th.textContent === this.getColumnNameBy( 'recvd' )
				|| th.textContent === this.getColumnNameBy( 'dur' )
			) {
				th.setAttribute( 'data-order', 'asc' );
			}
		} );

		if ( 'renewDateTextContent' in this.window ) {
			window[ 'renewDateTextContent' ](); // from window namespace added in file timeLiveView.defer.js
		}

		/** @type {HTMLTableElement} */
		const table = ( this.settings.resultsTable );

		const rows = table.tBodies[ 0 ].rows;

		rowsLoop: // eslint-disable-line no-unused-labels
		for ( let i = 0; i < rows.length; i++ ) {
			if ( Number.isInteger( hostnamePosition ) ) {

				/** @type {HTMLElement} */
				const currentCell = ( rows[ i ].children[ hostnamePosition ] );

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
					currentCell.appendChild( document.createTextNode( NO_BREAK_SPACE ) );
					currentCell.appendChild( link );
				}

				const filter = document.createElement( 'i' );
				filter.classList.add( 'fas', 'filter', this.settings.postRenderImprove.hostname.filter.className );
				filter.onclick = this.filterClickHandlerFor.bind( this, 'hostname' );

				this.brandcolorsIncludes( code.textContent ).then( (/** @type {String | Boolean} */ result ) =>
				{

					/** @type {String} */
					const color = ( result ? result : this.settings.postRenderImprove.hostname.cellInlineCss.notFoundColorValue );

					const inlineCss = this.settings.postRenderImprove.hostname.cellInlineCss.property + ':' + this.settings.postRenderImprove.hostname.cellInlineCss.value.replace( '--color', color );
					currentCell.setAttribute( 'style', inlineCss );
				} );

				currentCell.appendChild( document.createTextNode( NO_BREAK_SPACE ) );
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
				currentCell.appendChild( document.createTextNode( NO_BREAK_SPACE ) );
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

				/** @type { {} } */
				const singleItem = list[ i ].dataStore;

				for ( const i in singleItem ) {
					if ( i === 'length' ) {
						continue;
					}
					const percentage = Math.round( ( 100 / this.settings.statisticsData.nHits ) * singleItem[ i ].length );
					const protoItem = document.createElement( 'li' );
					protoItem.style.width = percentage + '%';
					protoItem.appendChild( document.createTextNode( i + this.settings.statisticsData.graphs.divider ) );
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
		if ( !( Chart instanceof Function ) ) {
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
				const title = ( items.length === this.settings.statisticsData.graphs.maxItems ) ?
					statisticParts[ i ].firstChild.textContent + ' [' + items.length + this.settings.statisticsData.graphs.mostFrequentTextContent + ']' :
					statisticParts[ i ].firstChild.textContent;
				for ( let i = 0; i < items.length; i++ ) {
					labels.push( items[ i ].childNodes[ 0 ].textContent[ this.truncate ]( this.settings.strLen ) + items[ i ].childNodes[ 2 ].textContent );
					data.push( items[ i ].childNodes[ 1 ].textContent.replace( this.settings.itemsTextContent, '' ) );
				}

				/** @type {HTMLCanvasElement} */
				const canvasElement = ( document.createElement( CANVAS_TAG_NAME ) );

				statisticParts[ i ].appendChild( canvasElement );

				const chart = new Chart( canvasElement.getContext( '2d' ), { // @type {t}
					type: this.settings.statisticsData.graphs.type,
					data: {
						labels: labels,
						datasets: [ {
							data: data,
						} ],
					},
					options: {
						title: {
							display: true,
							fontSize: 15, // in px
							text: title,
						},
						legend: {
							position: 'right',
						},
					},
				} );
				this.createColorsFrom( labels ).then( ( /** @type { Array } */ colors ) =>
				{
					chart.data.datasets[ 0 ].backgroundColor = colors; // colors are set asynchronously
					chart.update();
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
			for ( const i in this.settings.tableHeader ) {
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
		const theader = this.settings.tableHeader;
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

		const tableHeader = this.settings.tableHeader;
		const tableHeaderArray = [];
		for ( const i in tableHeader ) {

			/** @type { {id, order, caption, title, dataType, hidden} } */
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

		const offsetMinutes = d.getTimezoneOffset();

		if ( dateTo && dateTo.value ) {
			toString += dateTo.value;
		} else {
			toString += d.getFullYear() + '-' + String( d.getMonth() + 1 )[ 'padStart' ]( 2, '0' ) + '-' + String( d.getDate() )[ 'padStart' ]( 2, '0' );
		}
		toString += 'T';
		if ( timeFrom && timeFrom.value ) {
			toString += timeTo.value + ':00';
		} else {
			toString += '23:59:59';
		}
		toString += 'Z';
		if ( dateFrom && dateFrom.value ) {
			fromString += dateFrom.value;
		} else {
			d.setDate( d.getDate() - this.settings.timeLimitation.suggestedInterval );
			fromString += d.getFullYear() + '-' + String( d.getMonth() + 1 )[ 'padStart' ]( 2, '0' ) + '-' + String( d.getDate() )[ 'padStart' ]( 2, '0' );
		}
		fromString += 'T';
		if ( timeFrom && timeFrom.value ) {
			fromString += timeFrom.value + ':00';
		} else {
			fromString += '00:00:00';
		}
		fromString += 'Z';

		let fromDate = new Date( fromString );
		let toDate = new Date( toString );

		fromDate.setMinutes( fromDate.getMinutes() + offsetMinutes );
		toDate.setMinutes( toDate.getMinutes() + offsetMinutes );

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

			/** @type {HTMLTableElement} */
			const resultsTable = ( this.settings.resultsTable );

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
		this.setSyncWorkTo( false, true );

		return true;
	}


	universalFormHook ( /** @type {Event} */ event )
	{ // @todo : only flush when fakeUntrustedEvent
		/*
		if (event.isTrusted && event.target && event.target.nodeType === Node.ELEMENT_NODE && event.target.type === 'textarea') {
			return true;
		}
		*/

		this.setSyncWorkTo( true, !event.isTrusted ).then( () =>
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
							requestAnimationFrame( () =>
							{
								this.improveTableUX(); // post render improvement
							} ); //force browser to redraw website
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
				if ( inputs[ i ] === inputs.downloadView ) {
					inputs[ i ].addEventListener( CLICK_EVENT_NAME, ( /** @type {Event} */ event ) =>
					{
						event.preventDefault();
						event.stopPropagation();
						const blob = new Blob( [ JSON.stringify( this.dataStructure, null, '\t' ) ], { type: 'text/json' } );
						const virtualA = document.createElement( 'a' );
						virtualA.href = window.URL.createObjectURL( blob );
						virtualA.download = 'Pakon-export-' + Math.round( new Date().getTime() / 1000 ) + '.json';
						virtualA.click(); // event will be trusted
					}, false );
				} else if ( inputs[ i ].type === 'submit' ) {
					const fakeUntrustedEvent = {};
					fakeUntrustedEvent.isTrusted = false;
					inputs[ i ].addEventListener( CLICK_EVENT_NAME, this.universalFormHook.bind( this, fakeUntrustedEvent ), false ); // @todo : only flush when fakeUntrustedEvent
					inputs[ i ].addEventListener( CLICK_EVENT_NAME, ( /** @type {Event} */ event ) =>
					{

						/** @type {HTMLInputElement} */
						const eventTarget = ( event.target );

						eventTarget.disabled = true;
					}, false );
				} else {
					const fakeTrustedEvent = {};
					fakeTrustedEvent.isTrusted = true;
					inputs[ i ].addEventListener( CHANGE_EVENT_NAME, this.universalFormHook.bind( this, fakeTrustedEvent ), false );
					inputs[ i ].addEventListener( KEYUP_EVENT_NAME, () =>
					{
						inputs.controlFormSubmit[ 'disabled' ] = false;
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
		this.setSyncWorkTo( true, true ).then( () =>
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
						this.setSyncWorkTo( false, true );
						this.brandColors; // lazy load
						this.createFullStatistic().then( () =>
						{
							this.makeSimpleGraphs();
							this.flush(); // place virtual DOM elements instead of real site elements
							this.makeFullGraphs(); // post render improvement
						} );
						this.createFullTable().then( () =>
						{
							this.flush(); // place virtual DOM elements instead of real site elements
							requestAnimationFrame( () =>
							{
								this.improveTableUX(); // post render improvement
								if ( 'makeTableSortable' in this.window ) {
									window[ 'makeTableSortable' ](); // from window namespace added in file sortableTable.defer.js
								}
							} ); // force browser to redraw website
						} );
					} );
				} );
			} );
		} );

		return true;
	}

}
