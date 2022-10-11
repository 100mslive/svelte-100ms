import { hmsStore } from '../hms';
import { selectPeerAudioByID } from '@100mslive/hms-video-store';

/**
 * show audio level by creating a box shadow around the peer element when the person speaks
 * @return the unsubscribe function to run on unmount
 */
export function addAudioBorder(peerId: string, element: HTMLElement) {
	return hmsStore.subscribe((level) => {
		if (!element) {
			return;
		}
		const sigmoid = (num: number) => 1 / (1 + Math.exp(-num));
		const color = '#afd3ea';
		element.style.transition = 'box-shadow 0.3s ease-in-out';
		element.style.boxShadow = level
			? `0px 0px ${24 * sigmoid(level)}px ${color}, 0px 0px ${16 * sigmoid(level)}px ${color}`
			: '';
	}, selectPeerAudioByID(peerId));
}
