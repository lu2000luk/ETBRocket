<script lang="ts">
    //@ts-nocheck

    import Button from "$lib/ui/button.svelte";
    import Download from "lucide-svelte/icons/download";
    import Loading from "$lib/components/loading.svelte";
    import Check from "lucide-svelte/icons/check";
    import Error from "lucide-svelte/icons/circle-x"

    import { steamPath } from "$lib/settings";

    import { writeBinaryFile, BaseDirectory, createDir } from '@tauri-apps/api/fs';

    import { getClient, ResponseType } from '@tauri-apps/api/http';
    import { invoke } from "@tauri-apps/api"

    type Modloader = "interpose" | "ue4ss";

    export let modloader: Modloader = "interpose";

    let isInterpose = modloader === "interpose";
    let isUE4SS = modloader === "ue4ss";

    async function installLoader() {
        if (isInterpose) {
            alert("Interpose modloader installer coming soon cuz nexus...");
            return;
        } else if (isUE4SS) {
            try {
                loading = true;

                await installUE4SS();

                let dc = get(downloaded);
                dc.push(modloader);
                downloaded.set(dc);

                loading = false;
                installed = true;
            } catch (e) {
                console.error(e);
                loading = "error";
            }
        }
    }

    import { get } from "svelte/store"

    import downloaded from "$lib/downloaded";

    let loading = false;
    let installed = false;

    async function installUE4SS() {
        const httpclient = await getClient();

        const steam_game_loc = $steamPath+"/steamapps/common/EscapeTheBackrooms"
        const basePath = steam_game_loc + "/EscapeTheBackrooms/Binaries/Win64/"

        invoke("expand_scope", { folderPath: basePath })

        try {await createDir(basePath+"Mods")} catch {console.log("No directory was created!")}

        const DLL = await httpclient.get(location.origin+"/UE4SS.dll", {
              responseType: ResponseType.Binary
            });
        
        console.log("DLL downloaded!")
        
        const INI = await httpclient.get(location.origin+"/UE4SS-settings.ini", {
              responseType: ResponseType.Binary
            });

        console.log("INI downloaded!")

        const DWM = await httpclient.get(location.origin+"/dwmapi.dll", {
              responseType: ResponseType.Binary
            });

        console.log("DWM downloaded!")

        const MODS = await httpclient.get(location.origin+"/mods.txt", {
              responseType: ResponseType.Binary
            });
        
        console.log("MODS downloaded!")

        invoke("expand_scope", { folderPath: basePath+"Mods" })

        await writeBinaryFile(basePath+"/UE4SS.dll", new Uint8Array(DLL.data));

        console.log("DLL saved!")

        await writeBinaryFile(basePath+"/UE4SS-settings.ini", new Uint8Array(INI.data));

        console.log("INI saved!")

        await writeBinaryFile(basePath+"/dwmapi.dll", new Uint8Array(DWM.data));

        console.log("DWM saved!")

        await writeBinaryFile(basePath+"Mods"+"/mods.txt", new Uint8Array(MODS.data));

        console.log("MODS saved!")

        alert("UE4SS installed!");
    }
</script>

<div class="flex justify-between w-120 my-2 h-1/5 bg-background-alt rounded-md">
    <div class="det p-3">
        <h1 class="text-4xl f600">{isInterpose ? "Interpose" : "UE4SS"} Modloader</h1>
        <span class="text-l">{@html isInterpose ? "The new and improved Mod Loader for Escape the Backrooms made by Mythical" : "Injectable LUA scripting system. Credit to the UE4SS authors.<br> <a style='color:blue;' href='https://github.com/UE4SS-RE/RE-UE4SS'>Repo</a> <a style='color:blue;' class='ue4sslink' href='https://github.com/UE4SS-RE/RE-UE4SS/blob/main/LICENSE'>License</a> [ Links in-app ]"}</span>
    </div>
    <div class="dwn flex flex-col-reverse p-3">
        {#if installed || get(downloaded).includes(modloader)}
                    <Button disabled bg="secondary">
                        <Check /> Installed
                    </Button>
                {:else}
                    {#if loading !== "error" && loading}
                        <Button disabled bg="primary-dark">
                            <Loading /> Installing...
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
