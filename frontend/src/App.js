import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from './adminPanel/admin';
import Home from './home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import setToken from './adminPanel/services/calendar';

function App() {
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedInUser');
		if (loggedUserJSON !== null) {
			const user = JSON.parse(loggedUserJSON);
			//setUser(user);
			setToken.setToken(user.token);
		}
	}, []);

	return (
		<div className="container">
			<Router history={history}>
				<Switch>
					<Route exact path="/">
						<Redirect to="/home" />
					</Route>
					<Route
						path="/home"
						exact
						component={() => <Home />}
					/>
					<Route
						path="/login"
						exact
						component={() => <Login />}
					/>
					<ProtectedRoute
						path="/admin"
						exact
						component={() => <Admin />}
					/>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
