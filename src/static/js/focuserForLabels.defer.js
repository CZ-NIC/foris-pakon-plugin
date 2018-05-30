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

	/**
	 * @description : move focus in list of labels by pressing arrow keys (just like native function)
	 */
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
		if ( positionInList === radioListLength ) {
			positionInList = 0;
		} else if ( positionInList === -1 ) {
			positionInList = radioListLength - 1;
		}

		/** @type { HTMLInputElement } */
		const currentRadio = ( radioList[ positionInList ] );

		/** @type { HTMLLabelElement } */
		let label = ( currentRadio.parentNode );
		while ( label.nodeType !== Node.ELEMENT_NODE || label.nodeName !== LABEL_NODE_NAME ) {
			if ( label === document.body ) {
				return false;
			}
			/** @type { HTMLLabelElement } */
			label = ( label.parentNode );
		}

		currentRadio.checked = true;

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
				&& ( element[ 'type' ] === 'checkbox' || element[ 'type' ] === RADIO_ELEMENT_TYPE )
			) {

				/** @type {HTMLInputElement} */
				const input = ( element );

				label.addEventListener( 'keydown', (/** @type { KeyboardEvent } */ event ) =>
				{
					if (
						event.key === ENTER_NAME || event.code === ENTER_NAME
						|| event.key === SPACE_NAME || event.code === SPACE_NAME
					) {
						event.preventDefault();
						label.dispatchEvent( new Event( CLICK_EVENT_NAME ) );
					}
					if ( input.type === RADIO_ELEMENT_TYPE ) {
						if ( event.key === ARROW_UP || event.code === ARROW_UP
							|| event.key === ARROW_LEFT || event.code === ARROW_LEFT
						) {
							if ( arrowDealer( input, true ) ) {
								event.preventDefault();
							}
						} else if ( event.key === ARROW_RIGHT || event.code === ARROW_RIGHT
							|| event.key === ARROW_DOWN || event.code === ARROW_DOWN
						) {
							if ( arrowDealer( input, false ) ) {
								event.preventDefault();
							}
						}
					}
				}, false );

				input.style.setProperty( 'pointer-events', 'none' ); // with this input cannot be target for mouse events
				label.addEventListener( CLICK_EVENT_NAME, (/** @type { Event | MouseEvent } */ event ) =>
				{
					input.dispatchEvent( new Event( 'change' ) );
					if ( input.type === RADIO_ELEMENT_TYPE && input.checked ) {
						input.checked = true;
					} else {
						input.checked = !input.checked;
					}
					event.preventDefault();
				}, false );

			}
		} );
	} );

} )();
