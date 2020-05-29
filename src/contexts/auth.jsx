import React from 'react';

export const authDefaults = {
	client_id: 68924,
	auth: null,
	wpcom: null,
	is_logged_in: false,
}

export const AuthContext = React.createContext();

export const userDefaults = {
	user_is_loading: true,
	user: {
		'avatar_URL': '',
		'display_name': ''
	},
}

export const UserContext = React.createContext();

export const siteDefaults = {
	site_is_loading: true,
	site: {
		'url': '',
		'options': {
			'admin_url': ''
		}
	}
}

export const SiteContext = React.createContext();
