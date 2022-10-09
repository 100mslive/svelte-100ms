<script>
    import {hmsActions, hmsStore} from "./hms.ts";
    import {onMount} from "svelte";
    import {selectCameraStreamByPeerID} from "@100mslive/hms-video-store";

    export let isLocal;
    export let peerId;

    let videoElement;

    // video Element will be available only after mount, the result of subscribe function is an unsubscribe function.
    // It's returned as is so unsubscription can happen on unmount
    onMount(() => {
      return hmsStore.subscribe((track) => {
        if (!track || !videoElement) {
          return
        }
        if (track?.enabled) {
          hmsActions.attachVideo(track.id, videoElement);
        } else {
          hmsActions.detachVideo(track.id, videoElement);
        }
      }, selectCameraStreamByPeerID(peerId));
    })
</script>

<video class="peer-video"
    class:local={isLocal}
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
        object-fit: cover;
    }

    /*mirror the video for local peer*/
    .peer-video.local {
        transform: scaleX(-1);
    }
</style>