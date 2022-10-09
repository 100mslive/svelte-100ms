<script>
    import {hmsAllDevices, hmsSelectedDevices} from "./hmsStores";
    import {hmsActions} from "./hms";

    const changeVideo = (e) => hmsActions.setVideoSettings({deviceId: e.target.value});
    const changeAudio = (e) => hmsActions.setAudioSettings({deviceId: e.target.value});
    const changeSpeaker = (e) => hmsActions.setAudioOutputDevice(e.target.value);
</script>

<div class = "device-settings">
<h1>Device Settings</h1>
<div class="selection">
    <h2>Video</h2>
    <select value={$hmsSelectedDevices.videoInputDeviceId} on:change={changeVideo}>
        {#each $hmsAllDevices.videoInput as value (value.deviceId)}<option value={value.deviceId}>{value.label}</option>{/each}
    </select>
</div>
<div class="selection">
    <h2>Audio</h2>
    <select value={$hmsSelectedDevices.audioInputDeviceId} on:change={changeAudio}>
        {#each $hmsAllDevices.audioInput as value (value.deviceId)}<option value={value.deviceId}>{value.label}</option>{/each}
    </select>
</div>
<div class="selection">
    <h2>Speaker</h2>
    <select value={$hmsSelectedDevices.audioOutputDeviceId} on:change={changeSpeaker}>
        {#each $hmsAllDevices.audioOutput as value (value.deviceId)}<option value={value.deviceId}>{value.label}</option>{/each}
    </select>
</div>
</div>


<style>
    h1 {
        text-align: center;
        margin-bottom: 15px;
    }

    .selection {
        display: flex;
        justify-content: space-between;
        margin-bottom: 15px;
    }

    select {
        width: 80%;
        background: rgb(60, 76, 86);
        color: white;
        outline: none;
        border: none;
        font-size: inherit;
    }
</style>