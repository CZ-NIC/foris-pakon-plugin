'use strict';
( function ()
{
	const LANG = window[ 'lang' ] || 'en';
	const DATE_FORMAT = window[ 'dateFormat' ] || 'long';
	const RENEW_INTERVAL = window[ 'renewInterval' ] || 15; // (float) in secs
	const TIME_DIFF = 300; // (float) in secs

	const TIME_UNITS_IN_LANGUAGES = { // for live time view
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
	 * @todo : description
	 */
	function renewDateTextContent ()
	{ // can be runed periodicly
		document.querySelectorAll( 'time' ).forEach( (/** @type {HTMLTimeElement} */ element ) =>
		{ // @todo : take time also from time[datetime] and maybe time from microformats date
			let date = new Date( element.dateTime );
			if ( isNaN( date.valueOf() ) ) {
				date = new Date( Number( element.getAttribute( 'data-raw-content' ) ) * 1000 );
			}
			if ( !isNaN( date.valueOf() ) ) {
				const timeDiff = getTimeDiff( date, new Date(), false, LANG, DATE_FORMAT );
				if ( timeDiff && timeDiff.length > 1 ) {
					element.textContent = timeDiff;
					if ( !element.title ) {
						element.title = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
					}
					if ( !element.dateTime ) {
						element.dateTime = date.toISOString();
					}
				}
			}
		} );
	}


	/**
	 * @todo : description
	 */
	function getTimeDiff ( /** @type {Date} */ timeA, /** @type {Date} */ timeB, relative = false, lang = 'en', type = 'long' )
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
			return Math.floor( int * ( ( 1 / TIME_DIFF ) / 1000 ) );
		};

		const currentDate = new Date();

		const closerDate = [ timeA, timeB ].reduce( ( prev, curr ) =>
		{
			return ( Math.abs( Number( curr ) - Number( currentDate ) ) < Math.abs( Number( prev ) - Number( currentDate ) ) ? curr : prev );
		} );

		const UNITS = TIME_UNITS_IN_LANGUAGES[ lang ];
		const DIVIDER = ' ';

		const coolDateString = ( name = '', n = 0 ) =>
		{
			return UNITS.preffix + n + DIVIDER + inflect( name, n, UNITS.plural ) + UNITS.suffix;
		};

		if ( diff < justNow - 1 * s ) { // no SWITCH… switch() have very bad performance!
			return UNITS.justNow;
		} else if ( diff < m - 1 * s ) {
			return coolDateString( UNITS[ type ].s, Math.round( diff / s ) );
		} else if ( diff < h - 1 * s ) {
			return coolDateString( UNITS[ type ].m, Math.round( diff / m ) );
		} else if ( diff < d - 1 * s ) {
			return coolDateString( UNITS[ type ].h, Math.round( diff / h ) );
		} else if ( diff < w - 1 * s ) {
			if ( diff < 3 * d && ( rc( Number( closerDate ) ) === rc( Number( currentDate ) ) ) ) {
				const comparedDate = ( closerDate === timeA ) ? timeB : timeA;
				const yesterdayDate = new Date();
				yesterdayDate.setDate( yesterdayDate.getDate() - 1 );
				const theDayBeforeYesterdayDayDate = new Date();
				theDayBeforeYesterdayDayDate.setDate( theDayBeforeYesterdayDayDate.getDate() - 2 );

				const comparedShred = String( comparedDate.getDate() ) + comparedDate.getMonth() + comparedDate.getFullYear();
				const todayShred = String( currentDate.getDate() ) + currentDate.getMonth() + currentDate.getFullYear();
				const yesterdayShred = String( yesterdayDate.getDate() ) + yesterdayDate.getMonth() + yesterdayDate.getFullYear();
				const theDayBeforeYesterdayShred = String( theDayBeforeYesterdayDayDate.getDate() ) + theDayBeforeYesterdayDayDate.getMonth() + theDayBeforeYesterdayDayDate.getFullYear();

				if ( UNITS.today && comparedShred === todayShred ) {
					return UNITS.today + DIVIDER + comparedDate.toLocaleTimeString();
				} else if ( UNITS.yesterday && comparedShred === yesterdayShred ) {
					return UNITS.yesterday + DIVIDER + comparedDate.toLocaleTimeString();
				} else if ( UNITS.theDayBeforeYesterday && comparedShred === theDayBeforeYesterdayShred ) {
					return UNITS.theDayBeforeYesterday + DIVIDER + comparedDate.toLocaleTimeString();
				}
			}
			return coolDateString( UNITS[ type ].d, Math.round( diff / d ) );
		} else if ( diff < stop - 1 * s ) {
			return coolDateString( UNITS[ type ].w, Math.round( diff / w ) );
		}

		return true;
	}


	window.setInterval( renewDateTextContent, RENEW_INTERVAL * 1000 );
	window[ 'renewDateTextContent' ] = renewDateTextContent;
	renewDateTextContent();

} )();
