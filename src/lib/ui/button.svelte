<script>
  export let click = () => {};
  export let bg = "primary";
  export let text = "text";
  export let disabled = false;
  export let classes = "";
</script>

<button on:click={click} disabled={disabled} class="flex items-center rounded py-[0.1rem] h-8 shadow-sm px-3 m-1 {classes}" style="background: var(--{bg}); color: var(--{text});">
    <slot />
</button>