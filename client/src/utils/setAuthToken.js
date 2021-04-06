import axios from 'axios';
//not making a request with axios, just adding a global header

const setAuthToken = (token) => {
	if (token) {
		// set global header
		axios.defaults.headers.common['x-auth-token'] = token;
	} else {
		delete axios.defaults.headers.common['x-auth-token'];
	}
};

export default setAuthToken;
