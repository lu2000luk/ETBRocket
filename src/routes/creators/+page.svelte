<script>
    import Button from "$lib/ui/button.svelte";
    import LogIn from "lucide-svelte/icons/log-in";

    import { Account } from 'appwrite';
    import client from '$lib/aw';
</script>

<div class="flex justify-center mt-10 flex-wrap">
    <h1 class="f600 text-5xl">Welcome the Mod Creators Hub!</h1>
</div>
<br>
<div class="flex justify-center flex-wrap">
    <h3 class="text-xl">Here you can upload your mods to our service and give users the best experience downnloading your mods!</h3>
</div>
<br>
<div class="flex justify-center flex-wrap">
    <Button bg="accent-dark" classes="py-5 px-5"><LogIn size={20} class="pr-1" />Start today</Button>
</div>