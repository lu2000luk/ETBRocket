<script>
    import Button from "$lib/ui/button.svelte"
    import Download from "lucide-svelte/icons/download"
    import Img from "$lib/ui/image.svelte"
    import ModCard from "$lib/components/modcard.svelte"
    import Mods from "$lib/db/mods.json"
</script>

{#each Mods as mod}
    <ModCard {...mod} />
{/each}