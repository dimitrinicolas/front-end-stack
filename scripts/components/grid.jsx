
/**
 * components/grid.jsx
 *
 * Grid component
 */

var Grid = React.createClass({

	render: function() {
		
		return (
			
			<div className="grid">
				{this.props.children}
			</div>

		);

	}

});

var Col = React.createClass({

	render: function() {

		var className = "col-" + (this.props.i || 12);
		
		return (
			
			<div className={className}>
				{this.props.children}
			</div>

		);

	}

});