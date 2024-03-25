<script>
    export let name = "Missing title";
    export let description = "";
    export let author = "Unknown";
    export let cover = "../../../../no_image.png";
    export let loader = "Unknown"

    import Img from "$lib/ui/image.svelte";
    import Button from "$lib/ui/button.svelte";
    import Download from "lucide-svelte/icons/download";
    import Loading from "$lib/components/loading.svelte"

    let loading = false;
</script>

<div class="modcard flex h-30 w-50 bg-background-alt shadow-sm hover:shadow-md rounded-md p-2 m-2">
    <Img src={cover} alt="Mod" />
    <div class="details pl-2 pt-2 w-full flex justify-between">
        <div class="data">
            <h2 class="text-2xl inter f600">{name}</h2>
            <h4 class="text-l inter f400 overflow-hidden line-clamp-2">{description}</h4>
            <p class="text-success text-s">{loader} modloader</p>
        </div>
        <div class="download flex items-end">
            <div class="flex items-center">
                <p class="px-1">Made by {author}</p>
                {#if loading}
                    <Button disabled bg="primary-dark">
                        <Loading /> Downloading...
                    </Button>
                {:else}
                    <Button click={() => {loading = true;}} >
                        <Download size={20} class="pr-1" /> Download
                    </Button>
                {/if}
            </div>
        </div>
    </div>
</div>