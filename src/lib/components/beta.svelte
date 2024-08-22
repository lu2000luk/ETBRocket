<script>
    import { FallingConfetti } from 'svelte-canvas-confetti';
	import {tick} from 'svelte';

    import { particle_count } from '$lib/settings';

    let fallingConfetti = false;

    const makeFallingConfetti = async () => {
		fallingConfetti = false;
		await tick();
		fallingConfetti = true;
	}
</script>

{#if fallingConfetti}
	<FallingConfetti particleCount={$particle_count} />
{/if}

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="beta_icon bg-gradient-to-r from-violet-600 to-indigo-600 px-2 py-1 cursor-pointer rounded-full select-none" on:click={makeFallingConfetti}>Beta</span>