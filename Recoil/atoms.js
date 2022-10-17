import { atom } from 'recoil';

import { COLORS, FONTS, SIZES, DEFAULT_AVATAR } from '../NutonConstants';

/////////////
// GENERAL //
/////////////

	// Determines the Active User. Duh
	export const userState = atom({
		key: 'userState',
		default: false,
	});

	// Determines the Token from Login or SignUp
	export const tokenState = atom({
		key: 'tokenState',
		default: false
	});

	// Tracks All Meetings (therapist and user)
	export const meetingState = atom({
		key: "meetingState",
		default: []
	});

	// Gets all Assignments
	export const assignState = atom({
		key: "assignState",
		default: []
	});

/////////////////////
// THERAPIST STATE //
/////////////////////

	// Holds Client List Data
	export const clientListState = atom({
		key: 'clientListState',
		default: false
	})

	// Only to be used when the USER is the Organization Owner
	export const organizationState = atom({
		key: "organizationState",
		default: false
	})

//////////////////
// MEDAL STATES //
//////////////////

	// Tracks all earned medals
	export const medalsDataState = atom({
		key: "medalDataState",
		default: []
	})

	// Tracks what type of medal you are currently looking at
	export const medalsTypeState = atom({
		key: "medalTypeState",
		default: false
	})

	// If Therapist, tracks which child is being viewed for Medals
	export const selectedClientForMedals = atom({
		key: "clientForMedals",
		default: false
	})

/////////////////
// VIDEO STATE //
/////////////////

	// Tracks all videos from API upon login
	export const videoDataState = atom({
		key: "videoDataState",
		default: []
	})

	// Tracks all videos from API upon login
	export const firstVideoAccessState = atom({
		key: "firstVideoAccessState",
		default: false
	})


//////////////////
// STYLE STATES //
//////////////////

	// Determines the Color Layout for the Active User
	export const colorState = atom({
		key: 'colorState',
		default: {
			...COLORS.scheme0
		}
	})

	// Determines the Font Layout for the Active User (likely won't be used)
	export const fontState = atom({
		key: 'fontState',
		default: {
			...FONTS
		}
	})

	// Adjusts sizes for people who have stupid eyes
	export const sizeState = atom({
		key: 'sizeState',
		default: {
			...SIZES
		}
	})

	export const avatarState = atom({
		key: 'avatarState',
		default:{
			...DEFAULT_AVATAR
		}
	})

