<script>
	import { hmsActions } from '../hms';

	export let onClose;

	const unblockAudio = async () => {
		await hmsActions.unblockAudio();
		onClose();
	}
</script>

<div class="autoplay-modal">
	<h2>Couldn't Play Audio :(</h2>
	<p>
		The browser wants us to get a confirmation for playing the Audio.
		Please allow audio to proceed.
	</p>
	<div class='unblock-btn'>
		<button on:click={unblockAudio} class='btn-primary'>Allow Audio</button>
	</div>
</div>

<style>
    h2 {
        text-align: center;
        margin-bottom: 2rem;
    }

		.unblock-btn {
				margin-top: 2rem;
				display: flex;
				align-items: center;
				justify-content: center;
		}
</style>

