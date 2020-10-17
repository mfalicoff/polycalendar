import React from 'react';

const Login = () => {

    const loginHandler = (event) => {
        console.log("login")
    }

	return (
		<div>
			<h1>login</h1>
            <div>
                <form onSubmit={loginHandler}>
                    <input type="text"></input>
                    <input type="password"></input>
                    <button type="submit">login</button>
                </form>
            </div>
		</div>
	);
};

export default Login;
