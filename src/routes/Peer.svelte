<script lang="ts">
    import Avatar from "./_components/Avatar.svelte";
    import Video from "./Video.svelte";
    import {hmsStore} from "./hms.js";
    import type {HMSVideoTrack} from "@100mslive/hms-video-store";
    import { selectCameraStreamByPeerID, selectIsPeerAudioEnabled } from '@100mslive/hms-video-store';
    import {onDestroy} from "svelte";
    import ConnectionQuality from "./_components/ConnectionQuality.svelte";
    import { MicOffIcon, MicIcon } from 'svelte-feather-icons';

    export let peer;

    let videoTrack: HMSVideoTrack | undefined;
    let isAudioEnabled: boolean = false;

    const unsub1 = hmsStore.subscribe((track: HMSVideoTrack | undefined) => {
      videoTrack = track;
    }, selectCameraStreamByPeerID(peer.id));

    const unsub2 = hmsStore.subscribe((enabled: boolean) => {
        isAudioEnabled = enabled;
    }, selectIsPeerAudioEnabled(peer.id));

    onDestroy(() => {unsub1();unsub2();});
</script>

<div class="peer-container">
    {#if (!videoTrack?.enabled || videoTrack?.degraded)}
        <!--show avatar if video is either muted or degraded-->
        <div class="avatar-container">
            <Avatar name={peer.name}/>
        </div>
    {/if}
    <Video isLocal={peer.isLocal} peerId={peer.id}/>
    <div class="peer-name">
        {peer.name} {peer.isLocal ? "(You)" : ""}
    </div>
    <div class="network-score">
        <ConnectionQuality peerId={peer.id}/>
    </div>
    <div class="mic-state">
        {#if !isAudioEnabled}
            <MicOffIcon size="14"/>
        {:else}
            <MicIcon size="14"/>
        {/if}
    </div>
</div>

<style>
    .peer-name {
        font-size: 14px;
        text-align: center;
        position: absolute;
        bottom: 0.25rem;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .peer-container {
        margin: 7px;
        background: rgb(52, 67, 75);
        border-radius: 0.25rem;
        position: relative;
        height: 250px;
        width: 250px;
    }

    .avatar-container{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: 100%;
        height: 100%;
    }

    .network-score {
        position: absolute;
        bottom: 0.25rem;
        left: 0.25rem;
    }

    .mic-state {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0.25rem;
        right: 0.25rem;
        color: white;
        background: #CC525F;
        border-radius: 100rem;
        padding: 6px;
    }
</style>