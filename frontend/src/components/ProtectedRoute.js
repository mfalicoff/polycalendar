import React from 'react';
import { Redirect } from 'react-router-dom';


class ProtectedRoute extends React.Component {
	render() {
		//eslint-disable-next-line
		const Component = this.props.component;
		const isAuthenticated =
			// eslint-disable-next-line no-undef
			window.localStorage.getItem(process.env.REACT_APP_SECRET) !== null;
		return isAuthenticated ? (
			<Component />
		) : (
			<Redirect to={{ pathname: '/login' }} />
		);
	}
}

export default ProtectedRoute;
