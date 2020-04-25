'use strict';

import "./styles.css";

const UI = {
  render: function(content, where = "beforeend") {
    const container = document.querySelector("#app");
    container.insertAdjacentHTML(where, content);
  }
};

UI.render( "<h1>Learn Design</h1>", "afterbegin" );

UI.render( `<div id="kerning" contenteditable="true">
	${stringToSpans( "Wave" )}
</div>`,

"afterbegin" );

var intendedDirection = null;

function stringToSpans( str ) {
	var newHTML = '';

	for ( var i = 0; i < str.length; i++ ) {
		newHTML += `<span>${str[i]}</span>`;
	}

	return newHTML;
}

function getSelected( intendedDirection ) {
	if ( window.getSelection ) {
		var sel = window.getSelection();

		if ( sel.type === "Range" ) {
			return sel.anchorNode.children;
		}

		if ( intendedDirection === "left" && sel.anchorNode ) {
			return sel.anchorNode.parentNode.previousSibling;
		} else {
			return sel.anchorNode.parentNode;
		}
	}

	return null;
}

function isIterable( obj ) {
	if ( obj === null ) {
		return false;
	}

	return typeof obj[Symbol.iterator] === 'function';
}

function resetIntendedDirection() {
	intendedDirection = null;
}

function getKerning( letter ) {
	var kerning = 0;

	if ( letter.style.letterSpacing !== "" ) {
		kerning = parseInt( letter.style.letterSpacing );
	}

	return kerning;
}

function adjustAmount( amount, direction ) {
	if ( direction === "left" ) {
		amount--;
	} else {
		amount++;
	}

	return amount;
}

function kernLetter( letter, direction ) {
	var amount = getKerning( letter );
	amount = adjustAmount( amount, direction );
	letter.style.letterSpacing = `${amount}px`;
}

function kernSelection( selection, direction ) {
	if ( selection.length ) {
		for ( var i = 0; i <= selection.length; i++ ) {
			kernLetter( selection[i], direction );
		}
	} else {
		kernLetter( selection, direction );
	}
}

function kernControls(e) {
	var pressed = e.keyCode,
		 altPressed = e.altKey,
		 metaPressed = e.metaKey,
		 selected = getSelected();

	if ( intendedDirection !== null ) {
		selected = getSelected( intendedDirection );
	}

	if ( altPressed ) {
		e.preventDefault();
	}

	// Prevent default for all keypresses except alt and arrows.
	switch( pressed ) {
		case 18: case 224:
			break;
		case 65:
			if ( !metaPressed ) {
				e.preventDefault();
			} else {
				selected = getSelected();
			}
			break;
		case 37:
			if ( altPressed ) {
				kernSelection( selected, "left" );
			} else {
				intendedDirection = "left";
			}

			break;

		case 39:
			if ( altPressed ) {
				kernSelection( selected, "right" );
			} else {
				intendedDirection = "right";
			}

			break;

		default:
			e.preventDefault();
	}
}

var kernArea = document.getElementById( `kerning` );

kernArea.addEventListener( 'keydown', kernControls );
kernArea.addEventListener( 'click', resetintendedDirection );
