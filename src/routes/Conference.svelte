<script>
    import {hmsPeers} from "./hmsStores.ts";
    import Peer from "./Peer.svelte";
</script>


<section class="conference-section">
    <div class="peers-container">
        {#each $hmsPeers as peer (peer.id)}
            <Peer {peer} />
        {/each}
    </div>
</section>

<style>
    .conference-section {
        max-width: 960px;

        padding: 20px 30px;
        margin: 0 auto;
    }

    .peers-container {
        display: grid;
        grid-template-columns: repeat(3, minmax(min-content, 1fr));
        place-items: center;
        grid-gap: 10px;
        margin-top: 15px;
    }
</style>
