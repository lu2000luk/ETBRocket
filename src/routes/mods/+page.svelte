<script>
    //@ts-nocheck

    import ModCard from "$lib/components/modcard.svelte"
    import Mods from "$lib/db/mods.json"
    import { NexusConfig } from "$lib/nexus"
    import { getClient, ResponseType } from '@tauri-apps/api/http';

    function limitStringTo240WordsAndRemoveBr(inputString) {
    // Remove any <br /> tags
    let stringWithoutBr = inputString.replace(/<br\s*\/?>/gi, ' ');

    // Split the string into an array of words
    let wordsArray = stringWithoutBr.split(/\s+/);

    // Ensure the string is limited to 240 words
    if (wordsArray.length > 240) {
        wordsArray = wordsArray.slice(0, 240);
    }

    // Join the array back into a string and return
    return wordsArray.join(' ');
}

    async function nexusGetTrending() {
        if ($NexusConfig.apiKey === false) {return [];}

        const httpclient = await getClient();
        console.info("HTTPClient Loaded")

        const nmods = await httpclient.get("https://api.nexusmods.com/v1/games/escapethebackrooms/mods/trending.json", {
            responseType: ResponseType.JSON,
            headers: {
                apiKey: $NexusConfig.apiKey
            }
        });


        let mappedMods = [];

        await nmods.data.forEach(async element => {
            if (element.name === "Interpose Map Loader" || element.name === "Interpose Mod Loader" || element.contains_adult_content === true) {return;}

            mappedMods.push({
                cover: element.picture_url,
                modVersion: element.version,
                nexus: true,
                description: limitStringTo240WordsAndRemoveBr(element.summary),
                author: element.author,
                name: element.name,
                mod_id: element.mod_id
            })
        });

        console.log(mappedMods)

        return mappedMods
    }
</script>

{#each Mods as mod}
    <ModCard {...mod} />
{/each}

{#await nexusGetTrending()}
    Loading...
{:then nlmods} 
    {#each nlmods as mod}
        <ModCard {...mod} />
    {/each}
{/await}