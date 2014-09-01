
/**
 * components/ripple.jsx
 *
 * Ripple component
 */

var Ripple = React.createClass({

	componentDidMount: function() {

		this.getDOMNode().parentNode.addEventListener("click", this.handleClick, false);

	},

	handleClick: function() {
		
		if ((" " + this.getDOMNode().parentNode.className + " ").search("is-disabled") < 0) {

			/*var parentOffset = El(parent).offset();
			
			var clickX = event.changedTouches ? event.changedTouches[0].pageX : event.pageX,
				clickY = event.changedTouches ? event.changedTouches[0].pageY : event.pageY;
			
			circle.style.left = clickX - parentOffset.x + "px";
			circle.style.top = clickY - parentOffset.y + "px";*/

			React.renderComponent(

				<RippleCircle x="50" y="50" />,
				this.getDOMNode()

			);

		}

	},

	render: function() {

		return (
			<div className="ripple" onClick={this.handleClick}>
				{this.props.children}
			</div>
		);

	}

});

var RippleCircle = React.createClass({

	render: function() {

		var style = {

			top: this.props.y,
			left: this.props.x

		};

		return (
			<div className="ripple__circle ripple__circle--animate" style={style}></div>
		);

	}

});