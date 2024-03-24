<script>
    export let click = () => {};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={click} class="p-3 m-1 hover:bg-background-overlay rounded-md transition-all cursor-pointer">
    <slot />
</div>