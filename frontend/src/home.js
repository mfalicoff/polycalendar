import React, { useState } from 'react';
import ClassForm from './components/ClassForm';

function Home() {
	const [nClasses, setNClasses] = useState();
	return (
		<div>
			<h1>Home</h1>
			{nClasses === undefined ? (
				<input
					type="number"
					onChange={(event) => setNClasses(event.target.value)}
				></input>
			) : (
				<ClassForm numberClasses={nClasses} />
			)}
		</div>
	);
}

export default Home;
