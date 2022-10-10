<script lang="ts">
    import { hmsActions } from './hms';
    import {hmsIsAudioEnabled, hmsIsVideoEnabled} from "./hmsStores";
    import {writable} from "svelte/store";
    import type {Writable} from "svelte/store";
    import Modal from "svelte-simple-modal";
    import DeviceSettings from "./DeviceSettings.svelte";
    import {MicIcon, MicOffIcon, VideoIcon, VideoOffIcon, SettingsIcon} from "svelte-feather-icons";
    import { SvelteComponent } from 'svelte';

    function toggleAudio() {
        hmsActions.setLocalAudioEnabled(!$hmsIsAudioEnabled);
    }

    function toggleVideo() {
        hmsActions.setLocalVideoEnabled(!$hmsIsVideoEnabled);
    }

    const deviceModal: Writable<SvelteComponent> = writable(null);
    const showDeviceModal = () => deviceModal.set(DeviceSettings);
</script>

<footer class="control-bar">
    <button class="btn-control" on:click={toggleAudio}>
        {#if $hmsIsAudioEnabled}
            <MicIcon/>
        {:else}
            <MicOffIcon/>
        {/if}
    </button>

    <button class="btn-control" on:click={toggleVideo}>
        {#if $hmsIsVideoEnabled}
            <VideoIcon/>
        {:else}
            <VideoOffIcon/>
        {/if}
    </button>

    <button class="btn-control" on:click={showDeviceModal}>
        <SettingsIcon/>
    </button>

    <Modal show={$deviceModal} styleWindow={{ background: 'rgb(44,56,63)', color: 'white' }} closeButton={false}/>
</footer>

<style>
    .control-bar {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 10;

        display: flex;
        justify-content: center;

        padding: 15px;
    }

    .control-bar > *:not(:first-child) {
        margin-left: 8px;
    }

    .btn-control {
        width: 64px;
        height: 64px;

        background-color: #607d8b;

        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        text-align: center;
        color: white;

        border: 2px solid #37474f;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        cursor: pointer;
    }
</style>
