<script>
    import {hmsActions, hmsStore} from "./hms.ts";
		import { onDestroy } from 'svelte';
		import { selectVideoTrackByID } from '@100mslive/hms-video-store';

    export let mirror;
    export let trackId;
		export let objectFit = "cover";

		let unsub;
    let videoElement; // this will be populated on mount

		function manageVideo(trackId, videoElement) {
			if (unsub) unsub();  // unsubscribe previous

			if (!trackId || !videoElement) return;

			unsub = hmsStore.subscribe((track) => {
				if (!track) {
					return
				}
				if (track?.enabled) {
					hmsActions.attachVideo(track.id, videoElement);
				} else {
					hmsActions.detachVideo(track.id, videoElement);
				}
			}, selectVideoTrackByID(trackId));
		}

		// reactive expression, call the function everytime track or video element changes
		$: manageVideo(trackId, videoElement);

		onDestroy(() => unsub?.());
</script>

<video class="peer-video" style='--objectFit: {objectFit}'
    class:mirror={mirror}
    bind:this={videoElement}
    autoPlay
    muted
    playsInline>
</video>


<style>
    .peer-video {
        height: 100%;
        width: 100%;
        border-radius: 0.25rem;
        object-fit: var(--objectFit);
    }

    /*mirror the video for local peer*/
    .peer-video.mirror {
        transform: scaleX(-1);
    }
</style>