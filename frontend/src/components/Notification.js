import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Notification.css'

// eslint-disable-next-line react/prop-types
const Notification = ({isError, message}) => {

	let state = '';
	if(isError)
		state = 'alert alert-danger';
	else
		state = 'alert alert-success';

	console.log(isError, message)

	if(message != null){
		return(
			<div>
				<div className={state} role="alert" id="Notification">
					{message}
				</div>
			</div>

		);
	}else return(
		<div>
		</div>
	);


};


export default Notification;
