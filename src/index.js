'use strict';

import "./styles.css";

const UI = {
  render: function(content, where = "beforeend") {
    const container = document.querySelector("#app");
    container.insertAdjacentHTML(where, content);
  }
};

UI.render( "<h1>Learn Design</h1>", "afterbegin" );

UI.render( `<div id="kerning" contenteditable="true">Wave</div>`,

"afterbegin" );

function getPosition() {
    if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.getRangeAt) {
            return sel.getRangeAt(0).startOffset;
        }
    }
    return null;
}


function kernControls(e) {
	var pressed = e.keyCode,
		 altPressed = e.altKey;

	switch( pressed ) {
		case 18:
			console.log( "Valid Alt" );
			break;
		case 37: case 39:
			console.log( "Valid Arrow" );

			if ( altPressed ) {
				e.preventDefault();
				console.log( getPosition() );
			};

			break;
		default:
			e.preventDefault();
	}
}

var kernArea = document.getElementById( `kerning` );

kernArea.addEventListener( 'keydown', kernControls );
