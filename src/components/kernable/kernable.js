import React from 'react';
import { stringToSpans } from 'components/library';
import './kernable.scss';

/**
* "Intent" only happens when you hit an arrow, so when you
* first encounter a kernable word, you haven't shown intent yet.
*/

const initialState = {
	intendedDirection: null,
};

class Kernable extends React.Component {
	/**
	* Build a kernable word from settings, and help our event
	* listeners understand the context of "this".
	*/
	constructor (props) {
		super(props);
		this.state = {
			...initialState,
		};

		this.kern = this.kern.bind(this);
		this.resetState = this.resetState.bind(this);
	}

	/**
	* Resets the state to null.
	*/
	resetState() {
		this.setState({
			intendedDirection: null,
		});
	}

	/**
	* Get the letter or letters to kern, based on the user selection
	* and with assumptions about intended direction based on previous
	* arrow press. ☕
	*/
	getSelected( intendedDirection ) {
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

	/**
	* Get the existing kerning value, if it exists.
	*/
	getKerning( letter ) {
		var kerning = 0;

		if ( letter.style.letterSpacing !== "" ) {
			kerning = parseInt( letter.style.letterSpacing );
		}

		return kerning;
	}

	/**
	* Adjust kerning value up or down based on pressed arrow direction.
	*/
	adjustAmount( amount, direction ) {
		if ( direction === "left" ) {
			amount--;
		} else {
			amount++;
		}

		return amount;
	}

	/**
	* Kern a single letter based on user input.
	*/
	kernLetter( letter, direction ) {
		var amount = this.getKerning( letter );
		amount = this.adjustAmount( amount, direction );
		letter.style.letterSpacing = `${amount}px`;
	}

	/**
	* Kern the current selection based on user input.
	* Supports both single and multiple letter selections.
	*/
	kernSelection( selection, direction ) {
		if ( selection.length ) {
			for ( var i = 0; i < selection.length; i++ ) {
				this.kernLetter( selection[i], direction );
			}
		} else {
			this.kernLetter( selection, direction );
		}
	}

	/**
	* Kern, baby kern!
	* Disallows all keypresses except alt, meta (windows/mac key), and arrows.
	* Sets the intended direction or requests kerning based on keypress values.
	*/
	kern(e) {
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

		// Prevent default for all keypresses except alt, meta, and arrows.
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

	/**
	* Go time!
	*
	* contentEditable is used to allow cursor and selection only.
	* This content isn't actually editable because we disable all key
	* default behaviors besides alt, meta, and arrows.
	*/
	render() {
		return (
			<div className="kernable"
				contentEditable="true"
				onKeyDown={this.kern}
				onClick={this.resetState}>
				{stringToSpans(this.props.word)}
			</div>
		);
	}
}

export default Kernable;