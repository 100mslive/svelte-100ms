import type { HMSStore } from '@100mslive/hms-video-store';
import type { Readable } from 'svelte/store';
import { readable } from 'svelte/store';
import { hmsStore } from './hms';
import {
	selectDevices,
	selectIsConnectedToRoom,
	selectIsLocalAudioEnabled,
	selectIsLocalVideoEnabled,
	selectLocalMediaSettings,
	selectPeers
} from '@100mslive/hms-video-store';

function hmsToSvelteStore<T>(selector: (store: HMSStore) => T): Readable<T> {
	return readable(hmsStore.getState(selector), (set) => {
		return hmsStore.subscribe(set, selector);
	});
}

export const hmsIsConnected = hmsToSvelteStore(selectIsConnectedToRoom);
export const hmsPeers = hmsToSvelteStore(selectPeers);
export const hmsIsAudioEnabled = hmsToSvelteStore(selectIsLocalAudioEnabled);
export const hmsIsVideoEnabled = hmsToSvelteStore(selectIsLocalVideoEnabled);

// For knowing list of audio and video devices as well as the currently selected ones
export const hmsAllDevices = hmsToSvelteStore(selectDevices);
export const hmsSelectedDevices = hmsToSvelteStore(selectLocalMediaSettings);
