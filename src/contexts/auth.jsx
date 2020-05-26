import React, { useContext, useState } from 'react';

export const authDefaults = {
	client_id: 68924,
	auth: null,
	wpcom: null,
	user: {
		'display_name': ''
	},
	site: null
}

export const AuthContext = React.createContext();
