import React from 'react';
import { stringToSpans } from './library';

class Kern extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			intendedDirection: null,
		};
	}

	resetIntendedDirection = () => {
		this.setState({ intendedDirection: null });
	}

	getKerning = ( letter ) => {
		var kerning = 0;

		if ( letter.style.letterSpacing !== "" ) {
			kerning = parseInt( letter.style.letterSpacing );
		}

		return kerning;
	}

	adjustAmount = ( amount, direction ) => {
		if ( direction === "left" ) {
			amount--;
		} else {
			amount++;
		}

		return amount;
	}

	getSelected = ( intendedDirection ) => {
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

	kernLetter = ( letter, direction ) => {
		var amount = this.getKerning( letter );
		amount = this.adjustAmount( amount, direction );
		letter.style.letterSpacing = `${amount}px`;
	}

	kernSelection = ( selection, direction ) => {
		if ( selection.length ) {
			for ( var i = 0; i < selection.length; i++ ) {
				this.kernLetter( selection[i], direction );
			}
		} else {
			this.kernLetter( selection, direction );
		}
	}

	kernControls = (e) => {
		var pressed = e.keyCode,
			 altPressed = e.altKey,
			 metaPressed = e.metaKey,
			 selected = this.getSelected();

		if ( this.state.intendedDirection !== null ) {
			selected = this.getSelected( this.state.intendedDirection );
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
					selected = this.getSelected();
				}
				break;
			case 37:
				if ( altPressed ) {
					this.kernSelection( selected, "left" );
				} else {
					this.setState({ intendedDirection: "left" });
				}

				break;

			case 39:
				if ( altPressed ) {
					this.kernSelection( selected, "right" );
				} else {
					this.setState({ intendedDirection: "right" });
				}

				break;

			default:
				e.preventDefault();
		}
	}

	render() {
		let type = stringToSpans(this.props.word);
		return (
			<div id="kerning"
				contenteditable="true"
				onKeyDown={this.kernControls}
			>
				{type}
			</div>
		);
	}
}

export default Kern;