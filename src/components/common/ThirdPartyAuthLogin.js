import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { Box } from '@mui/material';

const ThirdPartyAuthLogin = () => {
	const clientId = 'Enter your client Id';
	return (
		<Box mt={4}>
			<GoogleOAuthProvider clientId={clientId}>
				<GoogleLogin
					onSuccess={(credentialResponse) => {
						console.log(credentialResponse);
					}}
					onError={() => {
						console.log('Login Failed');
					}}
				/>
			</GoogleOAuthProvider>
		</Box>
	);
};

export default ThirdPartyAuthLogin;
