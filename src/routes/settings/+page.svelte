<script>
    import Button from "$lib/ui/button.svelte"

    import { dialogOpened } from "$lib/nexus"
    import { steamPath } from "$lib/settings";

</script>

<div class="m-2">
    <p class="text-2xl" id="steampath">Steam Path (the game must be in there)</p>
    <input type="text" class="h-input w-full border-none bg-background-alt rounded focus:outline-none p-2" placeholder="C:/Program Files (x86)/Steam/" bind:value={$steamPath}>
    <br>
    <br>
    <p class="text-2xl" id="keypopup">Change Nexus Key</p>
    <Button click={() => {
        dialogOpened.set(true)
    }} bg="secondary">Re-Open popup</Button>
</div>

