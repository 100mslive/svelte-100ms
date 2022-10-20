<script>
    import GalleryView from './_components/GalleryView.svelte';
    import { hmsIsAnyoneScreenSharing } from './hmsStores';
    import ScreenShare from './_components/ScreenShare.svelte';
</script>


<section class="conference-section">
    {#if (!$hmsIsAnyoneScreenSharing)}
        <GalleryView/>
    {:else}
        <div class="screenshare-view">
            <div class="screenshare">
                <ScreenShare/>
            </div>
            <div class="gallery">
                <GalleryView/>
            </div>
        </div>
    {/if}
</section>

<style>
    .conference-section {
        height: 100%;
        width: 100%;

        padding: 10px;
        margin: 0 auto;
    }

    .screenshare-view {
        display: flex;
        flex-direction: row;
        height: 100%;
        justify-content: space-around;
    }

    .screenshare-view>.screenshare {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        flex: 1 auto;
    }

    .screenshare-view>.gallery {
        flex: 1 20%;
    }

    /* For mobile devices put the gallery view below the screenshare */
    @media (max-width: 600px) {
        .screenshare-view {
            flex-direction: column;
        }

        .screenshare-view>.screenshare {
            flex-basis: auto;
            height: unset;
        }

        .screenshare-view>.gallery {
            flex-basis: auto;
            height: 20%;
            flex-grow: 1;
        }
    }
</style>
