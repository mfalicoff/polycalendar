// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Admin from './adminPanel/admin';
import Home from './home';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path="/">
						<Redirect to="/home" />
					</Route>
					<Route
						path="/home"
						exact
						component={() => <Home />}
					></Route>
					<Route
						path="/admin"
						exact
						component={() => <Admin />}
					></Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
