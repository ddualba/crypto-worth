import React, { Fragment } from 'react';
import spinner from './spinner2.gif';

export default () => (
	<Fragment>
		<img
			src={spinner}
			style={{ width: '200px', margin: 'auto', display: 'block' }}
			alt="Loading..."
		/>
	</Fragment>
);
