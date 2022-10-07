<script>
    import {hmsActions, hmsStore} from "./hms.ts";
    import {onMount} from "svelte";
    import {selectCameraStreamByPeerID} from "@100mslive/hms-video-store";

    export let isLocal;
    export let peerId;

    let videoElement;

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
        height: 250px;
        width: 250px;

        margin-bottom: 10px;

        border-radius: 40%;

        object-fit: cover;
    }

    .peer-video.local {
        transform: scaleX(-1);
    }
</style>