'use strict';
( function ()
{
	const PLACEHOLDER_CLASS_NAME = 'placeholder';
	const FAKE_TRUSTED_DETAIL_STRING = 'fakeTrusted';
	const TEXTAREA_SEPARATOR = ',';
	const INPUT_EVENT_NAME = 'input';
	const DIVIDER_OPTIONS_REGEXP = new RegExp( '(?:,|;|\\s| |\\r?\\n)+', 'i' ); // many possible dividers
	const NO_BREAK_SPACE = '\u00A0';


	/**
	 * @todo : description
	 * @returns {HTMLElement}
	 */
	function createFakePlaceholder ( placeholderText/* = ''*/, placeHolderClassName/* = ''*/ )
	{
		const fakePlaceholder = document.createElement( 'small' );
		fakePlaceholder.classList.add( placeHolderClassName );
		fakePlaceholder.appendChild( document.createTextNode( placeholderText ) );

		return fakePlaceholder;
	}


	/**
	 * @todo : description
	 * @returns {true}
	 */
	function setCaretAtTheEndOf ( /** @type {HTMLElement} and it's descendants */ element )
	{
		const range = document.createRange();
		const sel = window.getSelection();

		if ( element.textContent.slice( -TEXTAREA_SEPARATOR.length ) === TEXTAREA_SEPARATOR ) {
			range.setStart( element.lastChild, TEXTAREA_SEPARATOR.length );
		} else if ( element.lastElementChild ) {
			range.setStart( element.lastElementChild, 1 );
		}
		range.collapse( true );
		sel.removeAllRanges();
		sel.addRange( range );

		return true;
	}


	/**
	 * @todo : description
	 * @returns {true}
	 */
	function moveCaretBy ( /** @type {Number} positive or negative */ charCount/* = 1*/ )
	{
		/** @type {Selection} */
		let selection;

		if ( window.getSelection ) {
			selection = window.getSelection();
			if ( selection.rangeCount > 0 ) {

				/** @type {HTMLDivElement} */
				const focusNode = ( selection.focusNode ); // HTMLDivElement in FF, Text in Chrome
				if ( focusNode.constructor.name === 'HTMLDivElement' ) { // FF specific
					setCaretAtTheEndOf( focusNode );
					return true;
				}

				const position = Math.min( focusNode.textContent.length, selection.focusOffset + charCount );
				//console.log( position );
				if ( !Number.isInteger( position ) ) {
					return true;
				}
				if ( position < 0 ) {
					//console.log( 'a' );
					return true;
				} else if ( position === 0 ) {
					//console.log( 'b' );
					if ( focusNode.previousSibling ) {
						//console.log( 'c' );
						selection.collapse( focusNode.previousSibling, 1 );
					} else {
						selection.collapse( focusNode.parentNode.previousSibling, 1 );
						//console.log( 'd' );
					}
				} else if ( position === 1 ) {
					//console.log( 'e' );
					selection.collapse( focusNode.nextSibling, 1 );
				} else {
					//console.log( 'f' );
					selection.collapse( focusNode, position );
				}
			}
		} else if ( ( selection = window.document[ 'selection' ] ) ) { // old IE's
			if ( selection.type !== 'Control' ) {
				/** @type {any} */
				const ieSel = selection;
				const range = ieSel.createRange();
				range.move( 'character', charCount );
				range.select();
			}
		}

		return true;
	}


	/**
	 * @todo : description
	 * @todo : in future returns HTMLSpanElement or input
	 * @returns {HTMLSpanElement}
	 */
	function createSingleTag ( textContent/* = ''*/ )
	{
		const USE_SUGGESTIONS = false; // @todo : create suggestions by using input[list="<id>"] and shared datalist[id="<id>"]
		const CLOSER_DIMENSIONS = [ 30, 23 ]; // [start, width] in px
		const CLOSING_HOVER_CLASS_NAME = 'closing-hover';

		const tag = document.createElement( USE_SUGGESTIONS ? 'input' : 'span' ); // @todo
		if ( 'value' in tag ) {
			tag.value = textContent;
		} else {
			tag.appendChild( document.createTextNode( NO_BREAK_SPACE + textContent ) );
		}

		tag.onmouseout = function ( /** @type {MouseEvent} */ event )
		{
			/** @type {HTMLSpanElement} */
			const eventTarget = ( event.target );

			eventTarget.classList.remove( CLOSING_HOVER_CLASS_NAME );
		};

		tag.onmousemove = function ( /** @type {MouseEvent} */ event )
		{
			/** @type {HTMLSpanElement} */
			const eventTarget = ( event.target );

			if ( event.pageX + CLOSER_DIMENSIONS[ 0 ] > eventTarget.offsetLeft + eventTarget.offsetWidth ) {
				if ( event.pageX + CLOSER_DIMENSIONS[ 0 ] > eventTarget.offsetLeft + eventTarget.offsetWidth + CLOSER_DIMENSIONS[ 1 ] ) {
					eventTarget.classList.remove( CLOSING_HOVER_CLASS_NAME );
				} else {
					eventTarget.classList.add( CLOSING_HOVER_CLASS_NAME );
				}
			} else {
				eventTarget.classList.remove( CLOSING_HOVER_CLASS_NAME );
			}

		};

		tag.onclick = function ( /** @type {MouseEvent} */ event )
		{ // tag self-destruction by click

			/** @type {HTMLSpanElement} */
			const eventTarget = ( event.target );

			if (
				( eventTarget.offsetLeft + eventTarget.offsetWidth ) < ( event.pageX + CLOSER_DIMENSIONS[ 0 ] )
				&& ( event.pageX + CLOSER_DIMENSIONS[ 0 ] < eventTarget.offsetLeft + eventTarget.offsetWidth + CLOSER_DIMENSIONS[ 1 ] )
			) { // if clicked on ::after pseudo element content
				/** @type {HTMLDivElement} */
				const tagsRoot = ( eventTarget.parentNode );
				const nextText = eventTarget.nextSibling;
				if ( nextText && nextText.nodeType === Node.TEXT_NODE && nextText.textContent === TEXTAREA_SEPARATOR ) {
					tagsRoot.removeChild( nextText );
				}
				tagsRoot.removeChild( eventTarget );
				tagsRoot.dispatchEvent( new CustomEvent( INPUT_EVENT_NAME, { 'detail': FAKE_TRUSTED_DETAIL_STRING } ) );
				//setCaretAtTheEndOf( tagsRoot );
			}
		};

		return tag;
	}


	/**
	 * @todo : description
	 * @returns {Array}
	 */
	function readFromTextarea ( /** @type {HTMLTextAreaElement } */ element )
	{
		if ( element && element.nodeType === Node.ELEMENT_NODE && 'value' in element && element.value ) {
			const regexp = DIVIDER_OPTIONS_REGEXP;
			const list = element.value.split( regexp );
			const withoutEmptyItems = list.filter( String );
			return Array.from( new Set( withoutEmptyItems ) ); // it make [] unique
		}

		return [];
	}


	/**
	 * @todo : description
	 * @returns {Array}
	 */
	function readFromEditableElement ( /** @type {HTMLElement} and it's descendants */ element )
	{
		if ( element && element.nodeType === Node.ELEMENT_NODE && element.children && element.children.length ) {
			const withoutEmptyItems = [];
			Array.from( element.children ).forEach( function ( /** @type {HTMLSpanElement } */ child )
			{
				withoutEmptyItems.push( child.textContent );
			} );
			return Array.from( new Set( withoutEmptyItems ) ); // it make [] unique
		}

		return [];
	}


	/**
	 * @todo : description
	 * @returns {true}
	 */
	function removeFirstSeparatorFrom (/** @type {HTMLElement} */ tagsRoot )
	{
		if ( ( tagsRoot.firstChild ) && ( tagsRoot.firstChild.textContent === TEXTAREA_SEPARATOR ) ) {
			tagsRoot.removeChild( tagsRoot.firstChild );
		}

		return true;
	}


	Array.from( document.getElementsByTagName( 'textarea' ) ).forEach( function ( /** @type {HTMLTextAreaElement} */ textarea )
	{
		const INITIALIZE_TEXTAREA_CLASS_NAME = 'tags';
		const TAGS_ROOT_CLASS_NAME = INITIALIZE_TEXTAREA_CLASS_NAME;
		const FOCUS_NAME = 'focus';

		if ( textarea.classList.contains( INITIALIZE_TEXTAREA_CLASS_NAME ) ) {
			const tagsRoot = document.createElement( 'div' );
			tagsRoot.contentEditable = 'true';
			tagsRoot.classList.add( TAGS_ROOT_CLASS_NAME );

			if ( textarea.placeholder ) {
				if ( !textarea.value ) {
					tagsRoot.appendChild( createFakePlaceholder( textarea.placeholder, PLACEHOLDER_CLASS_NAME ) );
				}

				tagsRoot.addEventListener( FOCUS_NAME, function ( /** @type {FocusEvent} */  event )
				{
					/** @type {HTMLElement} - some HTMLElement (HTMLDivElement for example) with contentEditable attribute */
					const eventTarget = ( event.target );

					let rootElement = eventTarget;
					while ( rootElement.contentEditable !== 'true' ) { // contentEditable can be strings 'true', 'false', 'inherit', and more
						rootElement = rootElement.parentElement;
					}
					Array.from( rootElement.children ).forEach( function ( /** @type {HTMLElement} */ item )
					{
						if ( item.classList.contains( PLACEHOLDER_CLASS_NAME ) ) {
							setCaretAtTheEndOf( eventTarget );
							item.remove();
						}
					} );

					return true;
				}, false );

				tagsRoot.addEventListener( 'focusout', function ( /** @type {FocusEvent} */ event )
				{
					/** @type {HTMLElement} - some HTMLElement (HTMLDivElement for example) with contentEditable attribute */
					const eventTarget = ( event.target );
					if ( !eventTarget.textContent ) {
						eventTarget.appendChild( createFakePlaceholder( textarea.placeholder, PLACEHOLDER_CLASS_NAME ) );
					}
				}, false );
			}

			tagsRoot.addEventListener( 'keypress', function ( /** @type {KeyboardEvent} */ event )
			{ // Backspace and Delete are not in keypress, only in keydown
				const ENTER_NAME = 'Enter';
				const SPACE_NAME = ' ';
				const COMMA_NAME = ',';
				if (
					event.key === ENTER_NAME || event.code === ENTER_NAME
					|| event.key === SPACE_NAME || event.code === SPACE_NAME
					|| event.key === COMMA_NAME || event.code === COMMA_NAME
				) {
					event.stopPropagation();
					event.preventDefault();

					/** @type {HTMLDivElement} */
					const eventTarget = ( event.target );
					setCaretAtTheEndOf( eventTarget );
				}

				return true;
			}, false );

			tagsRoot.addEventListener( 'keydown', function ( /** @type {KeyboardEvent} */ event )
			{ // Backspace and Delete are not in keypress, only in keydown
				const BACKSPACE_NAME = 'Backspace';
				const DELETE_NAME = 'Delete'; // eslint-disable-line no-unused-vars

				/** @type {HTMLDivElement} */
				const eventTarget = ( event.target );

				Array.from( eventTarget.childNodes ).forEach( function ( /** @type {Text | HTMLSpanElement} */ item )
				{ // @ todo
					if ( item.nodeType === Node.TEXT_NODE && item.nextSibling && item.nextSibling.nodeType === Node.TEXT_NODE ) { // remove multiple separators if needed
						eventTarget.removeChild( item.nextSibling );
					} else if ( item.nodeType === Node.ELEMENT_NODE && item.nextSibling && item.nextSibling.nodeType === Node.ELEMENT_NODE ) { // add separator between tags if missing
						item.parentNode.insertBefore( document.createTextNode( TEXTAREA_SEPARATOR ), item.nextSibling );
					}
				} );

				if ( event.key === BACKSPACE_NAME || event.code === BACKSPACE_NAME ) {
					/** @type {Selection} */
					const selection = window.getSelection();
					if (
						( selection.focusNode && selection.focusNode.textContent === TEXTAREA_SEPARATOR )
						|| selection.baseOffset === 1
					) {
						/** @type {HTMLElement} - some HTMLElement (HTMLDivElement for example) with contentEditable attribute */
						const eventTarget = ( event.target );

						event.stopPropagation();
						event.preventDefault();
						moveCaretBy( -1 );
						Array.from( eventTarget.children ).forEach( function ( /** @type {HTMLSpanElement} */tag )
						{
							if ( tag.textContent === NO_BREAK_SPACE ) {
								if ( tag === eventTarget.firstElementChild ) {
									setCaretAtTheEndOf( eventTarget ); // @todo : create function setCaretAtTheBeginningOf() and use it in here
								}
								tag.parentNode.removeChild( tag );
							}
						} );
					}
				}

				removeFirstSeparatorFrom( eventTarget );

				return true;
			}, false );

			tagsRoot.addEventListener( FOCUS_NAME, function ( /** @type {FocusEvent} */  event )
			{
				/** @type {HTMLElement} - some HTMLElement (HTMLDivElement for example) with contentEditable attribute */
				const eventTarget = ( event.target );

				if (
					eventTarget.lastElementChild
					&& !eventTarget.lastElementChild.classList.contains( PLACEHOLDER_CLASS_NAME )
				) {
					setCaretAtTheEndOf( eventTarget );
				}
			}, false );

			tagsRoot.addEventListener( INPUT_EVENT_NAME, function ( /** @type {Event} */ event )///
			{ // it can be also InputEvent (waiting for browsers to implement)… than {Event | InputEvent}
				/** @type {HTMLDivElement} - some HTMLElement with contentEditable attribute */
				const eventTarget = ( event.target );

				/** @type {HTMLTextAreaElement} */
				const originalTextarea = ( tagsRoot.previousElementSibling );

				if ( event.isTrusted || event[ 'detail' ] === FAKE_TRUSTED_DETAIL_STRING ) { // click on element with contenteditable
					Array.from( eventTarget.childNodes ).forEach( function ( /** @type {Text | HTMLSpanElement} */ item )
					{
						if ( item.nodeType === Node.TEXT_NODE ) {
							const regexp = DIVIDER_OPTIONS_REGEXP;
							const clearedItem = item.textContent.replace( regexp, '' );
							if ( clearedItem ) {
								const tag = createSingleTag( clearedItem );

								eventTarget.insertBefore( document.createTextNode( TEXTAREA_SEPARATOR ), item );
								eventTarget.replaceChild( tag, item );

								moveCaretBy( 1 );

								eventTarget.insertBefore( document.createTextNode( TEXTAREA_SEPARATOR ), tag.nextElementSibling );

							}
						}
					} );
					const values = readFromEditableElement( eventTarget );
					originalTextarea.value = values.join( TEXTAREA_SEPARATOR ).replace( new RegExp( NO_BREAK_SPACE, 'g' ), '' );
					removeFirstSeparatorFrom( eventTarget );
					if ( eventTarget.lastChild ) {
						while (
							eventTarget.lastChild.nodeType === Node.TEXT_NODE
							&& eventTarget.lastChild.previousSibling
							&& eventTarget.lastChild.previousSibling.nodeType === Node.TEXT_NODE
						) {
							eventTarget.lastChild.previousSibling[ 'textNode' ] += eventTarget.lastChild[ 'textNode' ];
							eventTarget.removeChild( eventTarget.lastChild );
						}
						if ( eventTarget.lastChild.textContent !== TEXTAREA_SEPARATOR ) {
							eventTarget.appendChild( document.createTextNode( TEXTAREA_SEPARATOR ) );
						}
					}

				} else { // inicialise tags

					while ( tagsRoot.lastChild && !tagsRoot.lastElementChild.classList.contains( PLACEHOLDER_CLASS_NAME ) ) {
						tagsRoot.removeChild( tagsRoot.lastChild );
					}

					readFromTextarea( originalTextarea ).forEach( function ( /** @type {String} */ tagText )
					{
						tagsRoot.appendChild( createSingleTag( tagText ) );
						tagsRoot.appendChild( document.createTextNode( TEXTAREA_SEPARATOR ) );
					} );

				}
			}, false );

			textarea.parentNode.insertBefore( tagsRoot, textarea.nextSibling );
			tagsRoot.dispatchEvent( new Event( INPUT_EVENT_NAME ) );

			textarea.addEventListener( INPUT_EVENT_NAME, function ( /** @type {Event} */ event )
			{
				/** @type {HTMLDivElement} */
				const eventTarget = ( event.target );

				eventTarget.nextElementSibling.dispatchEvent( new Event( INPUT_EVENT_NAME ) );
			}, false );

			textarea.hidden = true;
		}
	} );
} )();
