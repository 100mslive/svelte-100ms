<script>
    import {hmsActions, hmsStore} from "./hms.ts";
    import {onMount} from "svelte";
    import {selectCameraStreamByPeerID, selectPeerAudioByID} from "@100mslive/hms-video-store";

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

    // show audio level by creating a box shadow around the video element when the person speaks
    onMount(() => {
      return hmsStore.subscribe((level) => {
        if (!videoElement) {
          return
        }
        const sigmoid = (num) => 1 / (1 + Math.exp(-num));
        const color = "#afd3ea";
        videoElement.style['box-shadow'] = level ? `0px 0px ${24 * sigmoid(level)}px ${color}, 0px 0px ${16 * sigmoid(level)}px ${color}` : '';
      }, selectPeerAudioByID(peerId));
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
        transition: box-shadow 0.4s ease-in-out;
    }

    /*mirror the video for local peer*/
    .peer-video.local {
        transform: scaleX(-1);
    }
</style>