
/**
 * components/container.jsx
 *
 * Container component
 */

var Container = React.createClass({

	render: function() {
		
		return (
			
			<div className="container">
				{this.props.children}
			</div>

		);

	}

});