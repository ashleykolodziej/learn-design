'use strict';

import "./styles.css";
import Painterro from 'painterro';

Painterro({
	activeColor: '#00ff00', // default brush color is green
	toolbarPosition: 'top',
	hiddenTools: [
		'select',
		'settings',
		'undo',
		'redo',
		'pixelize',
		'crop',
		//'eraser',
		//'line',
		'arrow',
		'rect',
		'ellipse',
		'brush',
		'text',
		'rotate',
		'resize',
		'save',
		'open',
		'close'
	],
	colorScheme: {
		main: '#414141', // make panels light-yellow
		control: '#414141', // change controls color
		controlContent: '#d9d9d9' // change controls color
	}
}).show();

const UI = {
  render: function(content, where = "beforeend") {
	 const container = document.querySelector("#app");
	 container.insertAdjacentHTML(where, content);
  }
};

UI.render( "<h1>Learn Design</h1>", "afterbegin" );