import React from 'react';
import { Redirect } from 'react-router-dom';


class ProtectedRoute extends React.Component {
	render() {
		//eslint-disable-next-line
		const Component = this.props.component;
		const isAuthenticated =
			window.localStorage.getItem('loggedInUser') !== null;
		return isAuthenticated ? (
			<Component />
		) : (
			<Redirect to={{ pathname: '/login' }} />
		);
	}
}

export default ProtectedRoute;
