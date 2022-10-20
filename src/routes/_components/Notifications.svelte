<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import Modal, { bind } from 'svelte-simple-modal';
	import { hmsNotifications } from '../hms.js';
	import type { HMSException } from '@100mslive/hms-video-store';
	import { HMSNotificationTypes } from '@100mslive/hms-video-store';
	import { toast } from './toasts';
	import type { SvelteComponent } from 'svelte';
	import { onDestroy } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { writable } from 'svelte/store';
	import AutoPlayError from './AutoPlayError.svelte';
	import { isChatOpen } from '../hmsStores';

	const defaultOptions = {reversed: true, duration: 3000};
		const unClosableModal: Writable<SvelteComponent> = writable(null);
		const closeUnClosableModal = () => unClosableModal.set(null); // I do see the irony!

		const unsub = hmsNotifications.onNotification((notification) => {
			switch (notification.type) {
				case HMSNotificationTypes.PEER_JOINED:
					toast.info(`${notification.data.name} joined the room`)
					break;
				case HMSNotificationTypes.PEER_LEFT:
					// toast.info(`${notification.data.name} left the room`)
					break;
				case HMSNotificationTypes.DEVICE_CHANGE_UPDATE:
					toast.info(notification.message);
					break;
				case HMSNotificationTypes.ERROR:
					const error = notification.data as HMSException;
					const code = error?.code;
					console.log("error received ", error);
					if (error.isTerminal) {
						toast.terminal(`Error, you're disconnected: ${error.message}: ${error.description}`);
					} else if ([3001, 3011].includes(code)) { // device permission error
						const isSystemError = code === 3011; // there are two types - system denied permission or user denied permission
						const isScreenShare = error.message.includes("screen");
						const action = isSystemError
							? "Please enable permissions from system settings"
							: "Please enable permissions from the address bar or browser settings";
						if (isSystemError || !isScreenShare) {
							// screenshare user denied permission is pretty obvious(user clicks cancel), don't show it
							toast.error(`${error.message} => ${action}`, false);
						}
					} else if (code === 3008) { // autoplay error
						unClosableModal.set(bind(AutoPlayError, {onClose: closeUnClosableModal}));
					} else {
						toast.error(`Error: ${error.message}: ${error.description}`);
					}
					break;
				case HMSNotificationTypes.RECONNECTING:
					toast.changeable('reconnection', 'warn',
						'You are offline for now. While we try to reconnect, please check your internet connection.');
					break;
				case HMSNotificationTypes.RECONNECTED:
					toast.changeable('reconnection', 'success', 'You are now connected');
					break;
				case HMSNotificationTypes.NEW_MESSAGE:
					if (!$isChatOpen) {
						const data = notification.data;
						const toastStr = `<strong>Message from ${data.senderName}:</strong><br>${data.message}`
						toast.info(toastStr);
					}
					break;
			}
		})

		onDestroy(unsub);
</script>

<SvelteToast options={defaultOptions}/>
<Modal styleWindow={{ background: 'rgb(44,56,63)', color: 'white' }}
			 show={$unClosableModal} closeButton={false} closeOnEsc={false} closeOnOuterClick={false}/>
