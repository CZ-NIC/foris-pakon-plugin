'use strict';
( function ()
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

		for ( let i = 0; i < currentCell.attributes.length; i++ ) {
			if ( currentCell.attributes[ i ].nodeName.substr( 0, 16 ) === 'data-raw-content' ) {
				return currentCell.attributes[ i ].nodeValue;
			}
		}

		if ( innerElement && innerElement.title ) {
			return innerElement.title;
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

	window[ 'makeTableSortable' ] = function ()
	{
		document.querySelectorAll( '.sortable th' ).forEach( ( /** @type {HTMLTableCellElement} */ th ) =>
		{
			const ENTER_NAME = 'Enter';
			const SPACE_NAME = ' ';
			th.tabIndex = 0; // focusable with TAB, but low priority
			th.classList.add( 'clickable' );
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
	};
	window[ 'makeTableSortable' ]();

} )();
