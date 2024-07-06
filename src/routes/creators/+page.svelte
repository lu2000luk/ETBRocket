<script>
// @ts-nocheck

    import Button from "$lib/ui/button.svelte";
    import LogIn from "lucide-svelte/icons/log-in";

    import { Account } from 'appwrite';
    import client from '$lib/aw';

    import { uidev } from "$lib/settings"
</script>

<div class="flex justify-center mt-10 flex-wrap" ui-debug={$uidev}>
    <h1 class="f600 text-5xl">Welcome the Mod Creators Hub!</h1>
</div>
<br>
<div class="flex justify-center flex-wrap" ui-debug={$uidev}>
    <h3 class="text-xl">Here you can upload your mods to our service and give users the best experience downloading your mods!</h3>
</div>
<br>
<div class="flex justify-center flex-wrap" ui-debug={$uidev}>
    <a href="../creators/coming_soon"><Button bg="accent-dark" classes="py-5 px-5"><LogIn size={20} class="pr-1" />Start today</Button></a>
</div>
<br />
<div class="flex justify-center flex-wrap" ui-debug={$uidev}>
    <h3 class="text-l">Disclamer: Your mods must follow the rules on the ETBModding Discord. The author of ETB Rocket is not responsible for any mod uploaded.</h3>
</div>
