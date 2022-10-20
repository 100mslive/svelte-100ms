<script lang="ts">
	import {hmsPeers} from "../hmsStores.ts";
	import Peer from "../Peer.svelte";
	import { onMount } from 'svelte';
	import { findBestFitLayout } from './bestFit';

	let galleryContainer: HTMLDivElement;

	const arrangeTiles = (parent, peers) => {
		if (!galleryContainer){
			return;
		}
		const containerWidth = parent.getBoundingClientRect().width;
		const containerHeight = parent.getBoundingClientRect().height;
		const numTiles = peers.length;
		let result = findBestFitLayout({containerHeight, containerWidth, numTiles});
		galleryContainer.style.setProperty("--width", `${result.width}px`);
		galleryContainer.style.setProperty("--height", `${result.height}px`);
		galleryContainer.style.setProperty("--cols", `${result.cols}`);
	}

	onMount(() => {
		const resizeObserver = new ResizeObserver(() => arrangeTiles(galleryContainer, $hmsPeers));
		resizeObserver.observe(galleryContainer);
		return () => resizeObserver.unobserve(galleryContainer);
	})

	$: arrangeTiles(galleryContainer, $hmsPeers)

</script>

<div class="gallery-container" bind:this={galleryContainer}>
	<div class="gallery">
		{#each $hmsPeers as peer (peer.id)}
			<div class="tile">
				<Peer {peer} />
			</div>
		{/each}
	</div>
</div>

<style>
		.gallery-container {
				display: flex;
				align-items: center;
				justify-content: center;
        height: 100%;
        width: 100%;
		}

    .gallery {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        max-width: calc(var(--width) * var(--cols));
    }

    .tile {
        width: var(--width);
        height: var(--height);
				padding: 5px;
    }

</style>