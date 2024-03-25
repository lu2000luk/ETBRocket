<script>
    import Button from "$lib/ui/button.svelte";
    import Download from "lucide-svelte/icons/download";
    import Loading from "$lib/components/loading.svelte";
    import Check from "lucide-svelte/icons/check";
</script>

<div class="flex justify-between w-120 my-2 h-1/5 bg-background-alt rounded-md">
    <div class="det p-3">
        <h1 class="text-4xl f600">Interpose Modloader</h1>
        <span class="text-l">The new and improved Mod Loader for Escape the Backrooms made by Mythical</span>
    </div>
    <div class="dwn flex flex-col-reverse p-3">
        <Button click={() => {alert("Loader installers coming soon...")}}><Download size={20} class="pr-1" /> Download</Button>
    </div>
</div>