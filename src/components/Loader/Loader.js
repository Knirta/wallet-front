import React from 'react';
import Loader from 'react-loader-spinner';
import './loader.scss';

const LoaderComponent = () => {
	return (
		<Loader
			className='loader'
			type='Oval'
			color='#4A56E2'
			height={100}
			width={100}
			timeout={3000} //3 secs
		/>
	);
};

export default LoaderComponent;
