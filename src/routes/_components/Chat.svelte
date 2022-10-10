<script lang="ts">
	import { hmsMessages, isChatOpen } from '../hmsStores';
	import { hmsActions } from '../hms';
	import { toast } from './toasts';
	import {XIcon} from 'svelte-feather-icons';
	import { afterUpdate, beforeUpdate, onMount } from 'svelte';

	let chatBodyElement: HTMLDivElement;
	const scrollToBottom = (instant = false) => {
		if (chatBodyElement) {
			chatBodyElement.scrollTo({top: chatBodyElement.scrollHeight, behavior: instant ? 'auto': 'smooth'});
		}
	}

	let draftMessage = '';
	const sendMessage = async () => {
		if (draftMessage && draftMessage.trim().length > 0) {
			try {
				await hmsActions.sendBroadcastMessage(draftMessage);
				draftMessage = '';
			} catch (err) {
				toast.error(`Failed to send message - ${err.message}`);
			}
		}
	}

	const formatTime = (time: Date) => {
		return time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
	}

	// when new message comes auto scroll to bottom if it was already scrolled to bottom
	let autoScroll;
	beforeUpdate(() => {
		// it's scrolled to bottom already
		autoScroll = chatBodyElement && (chatBodyElement.offsetHeight + chatBodyElement.scrollTop) > (chatBodyElement.scrollHeight - 20);
	});
	afterUpdate(() => {
		if (autoScroll) scrollToBottom();
	});

	// scroll to bottom when the component opens for the first time
	onMount(() => scrollToBottom(true));

	const closeChat = () => {isChatOpen.set(false)};
</script>

<div class="chat-container">
	<div class="chat-header">
		<span>Chat</span>
		<button class="chat-close-btn" on:click={closeChat}><XIcon/></button>
	</div>
	<div bind:this={chatBodyElement} class="chat-messages">
		{#each $hmsMessages as msg (msg.id)}
			<div class="chat-message" class:msgRight={msg.senderName === "You"}>
				<p class="chat-message-message">{msg.message}</p>
				<span class="chat-message-info">{msg.senderName}, {formatTime(msg.time)}</span>
			</div>
		{/each}
		{#if ($hmsMessages.length === 0)}
			<div class="chat-no-messages">
				<p>There are no messages here</p>
			</div>
		{/if}
	</div>
	<form class="flex-center chat-input-container" on:submit|preventDefault={sendMessage}>
		<input bind:value={draftMessage}
							placeholder="Send a message..." autocomplete="off" aria-autocomplete="none" class="chat-input"/>
	</form>
</div>

<style>
	.chat-container {
			position: fixed;
			bottom: 5rem;
			right: 1rem;
			width: min(400px, 75%);
			height: 65%;
			padding: 1rem;
			z-index: 10;
      background-color: #1b2528;
			border-radius: 0.5rem;
	}

	.chat-header {
			height: 5%;
			display: flex;
			align-items: center;
			font-size: 1.5rem;
			margin-bottom: 0.5rem;
	}

	.chat-close-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			background: transparent;
			outline: none;
			border: none;
			color: white;
			cursor: pointer;
			margin-left: auto;
			padding: 0.1rem;
			border-radius: 0.3rem;
	}

	.chat-close-btn:hover {
			background: rgba(255, 255, 255, 0.25);
	}

	.chat-no-messages {
			display: flex;
			height: 100%;
			width: 100%;
			align-items: center;
			justify-content: center;
	}

	.chat-messages {
			display: flex;
			flex-direction: column;
			height: 85%;
			padding-bottom: 1rem;
			overflow-y: scroll;
			gap: 0.5rem;
			align-items: flex-start;
			padding-right: 0.5rem;
	}

	.chat-message {
      padding: 0.4rem;
			min-width: 60%;
			max-width: 90%;
			background-color: #3c5a67;
			border-radius: 0.5rem;
  }

	.chat-message-message {
      font-size: 1rem;
      line-height: 1.25rem;
	}

	.chat-message-info {
			display: flex;
			align-items: center;
			justify-content: end;
			font-size: .6rem;
			margin-top: 0.1rem;
	}

	.msgRight {
			margin-left: auto;
	}

	.chat-input-container {
      display: flex;
      align-items: center;
			min-height: 3rem;
			max-height: 6rem;
			background-color: #30404b;
			height: 10%;
			position: relative;
			border: 0.5rem;
			padding: 0.5rem;
			border-radius: 0.5rem;
	}

	.chat-input {
			width: 100%;
			background-color: transparent;
			line-height: 1rem;
			resize: none;
			font-size: 100%;
			color: white;
			font-family: inherit;
			border: 0;
			outline: none;
	}
</style>