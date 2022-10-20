<script>
	import { hmsPeerScreenSharing } from '../hmsStores';
	import { hmsStore } from '../hms';
	import { onDestroy } from 'svelte';
	import { selectScreenShareByPeerID } from '@100mslive/hms-video-store';
	import Video from '../Video.svelte';

	let unsub;
	let screenTrack;

	const retrieveScreenTrack = (peerId) => {
		if (unsub) unsub();
		if (!peerId) return;
		unsub = hmsStore.subscribe((track) => {
			screenTrack = track;
		}, selectScreenShareByPeerID(peerId));
	}

	$: retrieveScreenTrack($hmsPeerScreenSharing?.id);

	onDestroy(() => unsub?.());
</script>


<div class='screenshare-container'>
	<Video mirror={false} trackId={screenTrack?.id} objectFit="contain"/>
</div>

<style>
	.screenshare-container {
			padding: 5px;
			height: 100%;
			width: 100%;
	}
</style>