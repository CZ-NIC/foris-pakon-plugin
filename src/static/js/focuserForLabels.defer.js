'use strict';

( () =>
{
	const LABEL_NODE_NAME = 'LABEL';
	const RADIO_ELEMENT_TYPE = 'radio';
	const ENTER_NAME = 'Enter';
	const SPACE_NAME = ' ';
	const ARROW_UP = 'ArrowUp';
	const ARROW_RIGHT = 'ArrowRight';
	const ARROW_DOWN = 'ArrowDown';
	const ARROW_LEFT = 'ArrowLeft';
	const CLICK_EVENT_NAME = 'click';

	function arrowDealer (/** @type { HTMLInputElement } */currentElement, directionPrev = false )
	{
		let positionInList = 0;
		const radioList = [ ...document.getElementsByName( currentElement.name ) ];
		const radioListLength = radioList.length;
		for ( let i = 0; i < radioListLength; i++ ) {
			if ( radioList[ i ] === currentElement ) {
				positionInList = i;
				break;
			}
		}
		positionInList = ( directionPrev ) ? positionInList - 1 : positionInList + 1;
		if ( positionInList === radioList.length ) {
			positionInList = 0;
		} else if ( positionInList === -1 ) {
			positionInList = radioList.length - 1;
		}

		/** @type { HTMLElement } */
		let label = radioList[ positionInList ].parentNode;
		while ( label.nodeType !== Node.ELEMENT_NODE || label.nodeName !== LABEL_NODE_NAME ) {
			if ( label === document.body ) {
				return false;
			}
			label = label.parentNode;
		}
		radioList[ positionInList ].checked = true;
		label.focus();
		return true;
	}

	[ ...document.getElementsByTagName( LABEL_NODE_NAME ) ].forEach( ( /** @type { HTMLLabelElement } */ label ) =>
	{
		[ ...label.getElementsByTagName( '*' ) ].forEach( (/** @type { HTMLElement } */ element ) =>
		{
			if (
				element.nodeType === Node.ELEMENT_NODE
				&& element.nodeName === 'INPUT'
				&& ( element.type === 'checkbox' || element.type === RADIO_ELEMENT_TYPE )
			) {

				label.addEventListener( 'keydown', (/** @type { KeyboardEvent } */ event ) =>
				{
					if (
						event.key === ENTER_NAME || event.code === ENTER_NAME
						|| event.key === SPACE_NAME || event.code === SPACE_NAME
					) {
						event.preventDefault();
						label.dispatchEvent( new Event( CLICK_EVENT_NAME ) );
					}
					if ( element.type === RADIO_ELEMENT_TYPE ) {
						if ( event.key === ARROW_UP || event.code === ARROW_UP
							|| event.key === ARROW_LEFT || event.code === ARROW_LEFT
						) {
							if ( arrowDealer( element, true ) ) {
								event.preventDefault();
							}
						} else if ( event.key === ARROW_RIGHT || event.code === ARROW_RIGHT
							|| event.key === ARROW_DOWN || event.code === ARROW_DOWN
						) {
							if ( arrowDealer( element ) ) {
								event.preventDefault();
							}
						}
					}
				}, false );

				element.style.setProperty( 'pointer-events', 'none' );
				label.addEventListener( CLICK_EVENT_NAME, (/** @type { Event | MouseEvent } */ event ) =>
				{
					if ( element.type === RADIO_ELEMENT_TYPE && element.checked ) {
						element.checked = true;
					} else {
						element.checked = !element.checked;
					}
					event.preventDefault();
				}, false );

			}
		} );
	} );
} )();
