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

function stringToSpans( str ) {
	var newHTML = '';

	for (var i = 0; i < str.length; i++) {
		newHTML += `<span>${str[i]}</span>`;
	}

	return newHTML;
}

function getPosition() {
	if ( window.getSelection ) {
		var sel = window.getSelection();

		if (sel.anchorNode) {
			return sel.anchorNode;
		}
	}
	return null;
}


function kernControls(e) {
	var pressed = e.keyCode,
		 altPressed = e.altKey,
		 amount = 0;

	switch( pressed ) {
		case 18:
			break;
		case 37: case 39:
			if ( altPressed ) {
				e.preventDefault();
				var text = kernArea;
				var index = getPosition();
				var currentLetterToKern = index.parentElement;
				// Note: expected current letter may be dependent on
				// arrow that was pressed.

				if ( "" !== currentLetterToKern.style.letterSpacing ) {
					amount = parseInt( currentLetterToKern.style.letterSpacing );
				}

				if ( pressed === 37 ) {
					amount--;

					if ( amount === 0 ) {
						amount--;
					}
				} else {
					amount++;

					if ( amount === 0 ) {
						amount++;
					}
				}

				currentLetterToKern.style.letterSpacing = `${amount}px`;
			};

			break;
		default:
			e.preventDefault();
	}
}

var kernArea = document.getElementById( `kerning` );

console.log(kernArea);

kernArea.addEventListener( 'keydown', kernControls );
