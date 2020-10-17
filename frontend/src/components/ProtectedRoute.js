import React from 'react';
import { Redirect } from 'react-router-dom';

class ProtectedRoute extends React.Component {
	render() {
		const Component = this.props.component;
		const isAuthenticated =
			window.localStorage.getItem('loggedInUser') !== null;
		console.log(isAuthenticated);
		return isAuthenticated ? (
			<Component />
		) : (
			<Redirect
				to={{ pathname: '/login'}}
			/>
		);
	}
}

export default ProtectedRoute;
