<script lang="ts">
    //@ts-nocheck

    import Button from "$lib/ui/button.svelte";
    import Download from "lucide-svelte/icons/download";
    import Loading from "$lib/components/loading.svelte";
    import Check from "lucide-svelte/icons/check";
    import Error from "lucide-svelte/icons/circle-x";

    import { steamPath, uidev } from "$lib/settings";

    import { writeBinaryFile, copyFile, createDir } from '@tauri-apps/api/fs';
    import { resolveResource } from '@tauri-apps/api/path'
    import { getClient, ResponseType } from '@tauri-apps/api/http';
    import { invoke } from "@tauri-apps/api";
    import { open } from '@tauri-apps/api/shell';

    type Modloader = "interpose" | "ue4ss";

    export let modloader: Modloader = "interpose";

    let isInterpose = modloader === "interpose";
    let isUE4SS = modloader === "ue4ss";

    async function installLoader() {
        if (isInterpose) {
            open("https://www.nexusmods.com/escapethebackrooms/mods/7?tab=files&file_id=50&nmm=1")
            return;
        } else if (isUE4SS) {
            try {
                loading = "Starting";

                await installUE4SS();

                let dc = get(downloaded);
                dc.push(modloader);
                downloaded.set(dc);

                loading = false;
                installed = true;
            } catch (e) {
                console.error(e);
                alert(e)
                loading = "error";
            }
        }
    }

    import { get } from "svelte/store"

    import downloaded from "$lib/downloaded";

    let loading = false;
    let installed = false;

    async function installUE4SS() {

        loading = "Preparing"

        const steam_game_loc = $steamPath+"/steamapps/common/EscapeTheBackrooms"
        const basePath = steam_game_loc + "/EscapeTheBackrooms/Binaries/Win64/"

        invoke("expand_scope", { folderPath: basePath })

        try {await createDir(basePath+"Mods")} catch {console.log("No directory was created!")}

        loading = "Resolving"

        const DLLpath = await resolveResource('resources/UE4SS.dll')
        const INIpath = await resolveResource('resources/UE4SS-settings.ini')
        const DWMpath = await resolveResource('resources/dwmapi.dll')
        const MODSpath = await resolveResource('resources/mods.txt')
        
        console.log("Paths resolved")

        loading = "Preparing"

        invoke("expand_scope", { folderPath: basePath+"Mods" })

        loading = "Copying"

        await copyFile(DLLpath, basePath+"UE4SS.dll");
        await copyFile(INIpath, basePath+"UE4SS-settings.ini");
        await copyFile(DWMpath, basePath+"dwmapi.dll");
        await copyFile(MODSpath, basePath+"Mods"+"/mods.txt");

        console.log("Files copied")

        loading = "Cleaning"
    }
</script>

<div class="flex justify-between w-120 my-2 h-1/5 bg-background-alt rounded-md" ui-debug={$uidev}>
    <div class="det p-3">
        <h1 class="text-4xl f600">{isInterpose ? "Interpose" : "UE4SS"} Modloader</h1>
        <span class="text-l">{@html isInterpose ? "The new and improved Mod Loader for Escape the Backrooms made by Mythical" : "Injectable LUA scripting system. Credit to the UE4SS authors.<br> <a style='color:blue;' href='https://github.com/UE4SS-RE/RE-UE4SS'>Repo</a> <a style='color:blue;' class='ue4sslink' href='https://github.com/UE4SS-RE/RE-UE4SS/blob/main/LICENSE'>License</a> [ Links in-app ]"}</span>
    </div>
    <div class="dwn flex flex-col-reverse p-3" ui-debug={$uidev}>
        {#if installed || $downloaded.includes(modloader)}
                    <Button disabled bg="secondary">
                        <Check /> Installed
                    </Button>
                {:else}
                    {#if loading !== "error" && loading}
                        <Button disabled bg="primary-dark">
                            <Loading /> {loading}
                        </Button>
                    {:else if loading === "error"}
                        <Button click={() => {installLoader()}} bg="error" >
                            <Error size={20} class="pr-1" /> Error
                        </Button>
                    {:else}
                        <Button click={() => {installLoader()}} >
                            <Download size={20} class="pr-1" /> Download
                        </Button>
                    {/if}
                {/if}
    </div>
</div>
