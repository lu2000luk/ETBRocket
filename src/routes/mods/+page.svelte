<script>
    //@ts-nocheck

    import ModCard from "$lib/components/modcard.svelte"
    import Mods from "$lib/db/mods.json"
    import { NexusConfig } from "$lib/nexus"
    import { getClient, ResponseType } from '@tauri-apps/api/http';

    let loadingModsPhase = 0;

    function limitStringTo240WordsAndRemoveBr(inputString) {
        let stringWithoutBr = inputString.replace(/<br\s*\/?>/gi, ' ');
        let wordsArray = stringWithoutBr.split(/\s+/);

        if (wordsArray.length > 240) {
            wordsArray = wordsArray.slice(0, 240);
        }

        return wordsArray.join(' ');
    }

    async function NexusGetOthers() {
        let modz = [];
        if ($NexusConfig.apiKey === false) {return [];}

        const httpclient = await getClient();

        console.info("HTTPClient Loaded")

        loadingModsPhase++;

        let latest_added = await httpclient.get("https://api.nexusmods.com/v1/games/escapethebackrooms/mods/latest_added.json", {
            responseType: ResponseType.JSON,
            headers: {
                apiKey: $NexusConfig.apiKey
            }
        });

        loadingModsPhase++;

        let latest_updated = await httpclient.get("https://api.nexusmods.com/v1/games/escapethebackrooms/mods/latest_updated.json", {
            responseType: ResponseType.JSON,
            headers: {
                apiKey: $NexusConfig.apiKey
            }
        });

        loadingModsPhase++;

        let trending = await httpclient.get("https://api.nexusmods.com/v1/games/escapethebackrooms/mods/trending.json", {
            responseType: ResponseType.JSON,
            headers: {
                apiKey: $NexusConfig.apiKey
            }
        });

        loadingModsPhase++;

        let latest_added_mods = latest_added.data;
        let latest_updated_mods = latest_updated.data;
        let trending_mods = trending.data;

        console.log(latest_added_mods)
        console.log(latest_updated_mods)
        console.log(trending_mods)

        console.log("Indexing mods")

        function isModAlreadyScanned(mod) {
            for (let i = 0; i < modz.length; i++) {
                if (modz[i].mod_id === mod.mod_id) {
                    return true;
                }
            }

            console.log("Mod not found in array: "+mod)

            return false;
        }

        await latest_added_mods.forEach(async element => {
            if (element.name === "Interpose Map Loader" || element.name === "Interpose Mod Loader" || element.contains_adult_content === true) {return;}

            if (isModAlreadyScanned(element)) {return;}

            modz.push({
                cover: element.picture_url,
                modVersion: element.version,
                nexus: true,
                description: limitStringTo240WordsAndRemoveBr(element.summary),
                author: element.author,
                name: element.name,
                mod_id: element.mod_id
            })
        });

        await latest_updated_mods.forEach(async element => {
            if (element.name === "Interpose Map Loader" || element.name === "Interpose Mod Loader" || element.contains_adult_content === true) {return;}

            if (isModAlreadyScanned(element)) {return;}

            modz.push({
                cover: element.picture_url,
                modVersion: element.version,
                nexus: true,
                description: limitStringTo240WordsAndRemoveBr(element.summary),
                author: element.author,
                name: element.name,
                mod_id: element.mod_id
            })
        });
        await trending_mods.forEach(async element => {
            if (element.name === "Interpose Map Loader" || element.name === "Interpose Mod Loader" || element.contains_adult_content === true) {return;}

            if (isModAlreadyScanned(element)) {return;}

            modz.push({
                cover: element.picture_url,
                modVersion: element.version,
                nexus: true,
                description: limitStringTo240WordsAndRemoveBr(element.summary),
                author: element.author,
                name: element.name,
                mod_id: element.mod_id
            })
        });

        loadingModsPhase++;

        return modz;
    }
</script>

{#each Mods as mod}
    <ModCard {...mod} />
{/each}

{#await NexusGetOthers()}
    Loading more... [{loadingModsPhase}/5]
{:then nlmods} 
    {#each nlmods as mod}
        <ModCard {...mod} />
    {/each}
{/await}