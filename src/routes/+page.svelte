<script>
    import Button from "$lib/ui/button.svelte";
    import Mod from "lucide-svelte/icons/blocks";
    import Loaders from "lucide-svelte/icons/unplug";
    import Discord from "lucide-svelte/icons/message-circle-code"
    import { goto } from "$app/navigation"
    import { open } from "@tauri-apps/api/shell"
</script>

<div class="flex justify-center mt-10 flex-wrap">
    <h1 class="f600 text-5xl">Welcome to ETB Rocket!</h1>
</div>
<br>
<div class="flex justify-center flex-wrap">
    <h3 class="text-xl">Your place to download and share EscapeTheBackrooms Mods</h3>
</div>
<br>
<div class="flex justify-center flex-wrap">
    <Button bg="secondary" click={() => {goto("../mods")}}><Mod size={20} class="pr-1" />Download some mods</Button>
    <Button bg="secondary" click={() => {goto("../loaders")}}><Loaders size={20} class="pr-1" />Install a modloader</Button>
    <Button bg="secondary" click={() => {open("https://discord.gg/6qHbEWnMS2")}}><Discord size={20} class="pr-1" />Official ETB Modding Discord</Button>
</div>
