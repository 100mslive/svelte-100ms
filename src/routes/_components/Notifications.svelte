<script lang="ts">
		import { SvelteToast } from '@zerodevx/svelte-toast';
		import { hmsNotifications } from '../hms.js';
		import type { HMSException } from '@100mslive/hms-video-store';
		import { HMSNotificationTypes } from '@100mslive/hms-video-store';
		import { toast } from './toasts';
		import { onDestroy } from 'svelte';

		const defaultOptions = {reversed: true, duration: 3000};

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
					} else if ([3001, 3011].includes(code)) {
						const isSystemError = code === 3011;
						const action = isSystemError
							? "Please enable permissions from system settings"
							: "Please enable permissions from the address bar or browser settings";
						toast.error(`${error.message} => ${action}`, false);
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
			}
		})

		onDestroy(unsub);
</script>

<SvelteToast options={defaultOptions}/>
