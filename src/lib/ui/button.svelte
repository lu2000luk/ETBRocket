<script>
  export let click = () => {};
  export let bg = "primary";
  export let text = "text"
</script>

<button on:click={click} class="rounded py-1 px-3 m-1" style="background: var(--{bg}); color: var(--{text});">
    <slot />
</button>