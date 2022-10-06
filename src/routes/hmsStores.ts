import { hmsStore } from './hms';
import { readable } from 'svelte/store';
import type { HMSStore } from '@100mslive/hms-video-store';
import { selectIsConnectedToRoom, selectPeers } from '@100mslive/hms-video-store';

function readableStoreMaker<T>(selector: (store: HMSStore) => void) {
	return readable(hmsStore.getState(selector), (set) => {
		hmsStore.subscribe(set, selector);
	});
}

export const hmsIsConnected = readableStoreMaker(selectIsConnectedToRoom);
export const hmsPeers = readableStoreMaker(selectPeers);
