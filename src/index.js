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

var whichWay = null;

function stringToSpans( str ) {
	var newHTML = '';

	for ( var i = 0; i < str.length; i++ ) {
		newHTML += `<span>${str[i]}</span>`;
	}

	return newHTML;
}

function getPosition( whichWay ) {
	if ( window.getSelection ) {
		var sel = window.getSelection();

		if ( whichWay === "left" && sel.anchorNode ) {
			if ( sel.type === "Range" ) {
				return sel.anchorNode.children;
			} else {
				return sel.anchorNode.parentNode.previousSibling;
			}
		} else {
			if ( sel.type === "Range" ) {
				return sel.anchorNode.children;
			} else {
				return sel.anchorNode.parentNode;
			}
		}
	}
	return null;
}

function isIterable(obj) {
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === 'function';
}

function getKerningValue( letter ) {
	var kerning = 0;

	if ( letter.style.letterSpacing !== "" ) {
		kerning = parseInt( letter.style.letterSpacing );
	}

	return kerning;
}

function getKerning( selection ) {
	var kerning = 0; // Initial value, if none has been set

	if ( isIterable( selection ) ) {
		kerning = []

		for (var i = 0; i < kerning.length; i++) {
			kerning.push( getKerningValue( kerning[i] ) );
		}
	} else {
		kerning = getKerningValue( selection );
	}

	return kerning;
}

function kernControls(e) {
	var pressed = e.keyCode,
		 altPressed = e.altKey,
		 metaPressed = e.metaKey,
		 currentLetter = getPosition(),
		 amount = 0;

	if ( whichWay !== null ) {
		currentLetter = getPosition( whichWay );
	}

	if ( altPressed ) {
		e.preventDefault();
		amount = getKerning( currentLetter );
	}

	// Prevent default for all keypresses except alt and arrows.
	switch( pressed ) {
		case 18: case 224:
			break;
		case 65:
			if ( !metaPressed ) {
				e.preventDefault();
			} else {
				currentLetter = getPosition();

				for (var i = 0; i <= currentLetter.length; i++ ) {
					currentLetter[i];
				}
			}
			break;
		case 37:
			if ( altPressed ) {
				// This feels weird. Refactor maybe
				amount--;

				if ( currentLetter.length ) {
					for (var i = 0; i <= currentLetter.length; i++ ) {
						var amount = getKerningValue( currentLetter[i] );
						amount--;
						currentLetter[i].style.letterSpacing = `${amount}px`;
					}
				} else {
					currentLetter.style.letterSpacing = `${amount}px`;
				}
			} else {
				whichWay = "left";
			}
			break;

		case 39:
			if ( altPressed ) {
				amount++;

				if ( currentLetter.length ) {
					for (var i = 0; i <= currentLetter.length; i++ ) {
						var amount = getKerningValue( currentLetter[i] );
						amount++;
						currentLetter[i].style.letterSpacing = `${amount}px`;
					}
				} else {
					currentLetter.style.letterSpacing = `${amount}px`;
				}
			} else {
				whichWay = "right";
			}
			break;

		default:
			e.preventDefault();
	}
}

var kernArea = document.getElementById( `kerning` );

// Might need an addt event listener for focus or click or something.
// When you go away and come back, we need to set whichWay back to null.
kernArea.addEventListener( 'keydown', kernControls );
