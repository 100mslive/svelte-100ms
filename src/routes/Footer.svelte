<script lang="ts">
    import { hmsActions } from './hms';
    import { hmsIsAudioEnabled, hmsIsVideoEnabled, isChatOpen } from './hmsStores';
    import {writable} from "svelte/store";
    import type {Writable} from "svelte/store";
    import Modal from "svelte-simple-modal";
    import DeviceSettings from "./DeviceSettings.svelte";
    import {MicIcon, MicOffIcon, VideoIcon, VideoOffIcon, SettingsIcon, MessageSquareIcon} from "svelte-feather-icons";
    import { SvelteComponent } from 'svelte';
    import Chat from './_components/Chat.svelte';

    function toggleAudio() {
        hmsActions.setLocalAudioEnabled(!$hmsIsAudioEnabled);
    }

    function toggleVideo() {
        hmsActions.setLocalVideoEnabled(!$hmsIsVideoEnabled);
    }

    const deviceModal: Writable<SvelteComponent> = writable(null);
    const showDeviceModal = () => deviceModal.set(DeviceSettings);

    const toggleChat = () => {isChatOpen.set(!$isChatOpen)};
</script>

<footer class="control-bar">
    <div class="control-bar-left"></div>
    <div class="control-bar-center">
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
    </div>

    <div class="control-bar-right">
        <button class="btn-control" on:click={toggleChat}>
            <MessageSquareIcon/>
        </button>
    </div>
</footer>

{#if ($isChatOpen)}
    <Chat/>
{/if}

<style>
    .control-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 10;
        margin-bottom: 1rem;
    }

    .control-bar-right {
        margin-right: 1rem;
    }

    .btn-control {
        width: 45px;
        height: 45px;

        background-color: #607d8b;

        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        text-align: center;
        color: white;

        border: 2px solid #37474f;
        border-radius: 15%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
        cursor: pointer;
        margin: 3px;
    }
</style>
