<script>
    import Video from "./Video.svelte";

    export let peer;
</script>

<div class="peer-container">
    <Video isLocal={peer.isLocal} peerId={peer.id} />
    <div class="peer-name">
        {peer.name} {peer.isLocal ? "(You)" : ""}
    </div>
</div>

<style>
    .peer-name {
        font-size: 14px;
        text-align: center;
    }

    .peer-container {
        padding: 10px;
    }
</style>