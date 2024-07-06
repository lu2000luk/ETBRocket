<script>
// @ts-nocheck

    export let name = "Missing title";
    export let description = "";
    export let author = "Unknown";
    export let cover = "../../../../no_image.png";
    export let loader = "Unknown";
    export let downloadLink = "";
    export let folder = "noFolder";
    export let modVersion = "0.0.0";
    export let gameVersion = "Unknown";
    export let nexus = false;
    export let mod_id = 0;

    let ignore_errors = [modVersion, gameVersion, mod_id]
    let ignore_installed = false;

    import Img from "$lib/ui/image.svelte";
    import Button from "$lib/ui/button.svelte";
    import Download from "lucide-svelte/icons/download";
    import Loading from "$lib/components/loading.svelte";
    import Check from "lucide-svelte/icons/check";
    import Error from "lucide-svelte/icons/circle-x"
    import { Tooltip, Dialog, Separator, Label } from "bits-ui";

    import { steamPath, uidev } from "$lib/settings";

    import { writeBinaryFile, BaseDirectory, createDir, removeFile } from '@tauri-apps/api/fs';
    import { Select } from "bits-ui";

    import { getClient, ResponseType } from '@tauri-apps/api/http';
    import { invoke } from "@tauri-apps/api"

    import { NexusConfig } from "$lib/nexus"
    import { open } from '@tauri-apps/api/shell';

    import { once, listen } from '@tauri-apps/api/event';

    import { get } from "svelte/store"
    import downloaded, { downloaded_path } from "$lib/downloaded";
    import { linear } from "svelte/easing";

    let loading = false;
    let installed = false;

    // @ts-ignore
    async function downloadMod(url, folder, reinstalling = false) {
        try {
            loading = "Starting";
            const httpclient = await getClient();
            console.log("HTTP Client loaded!")
            
            const steam_game_loc = $steamPath+"/steamapps/common/EscapeTheBackrooms"
            const basePath = steam_game_loc + "/EscapeTheBackrooms/Content/Paks/"

            if (nexus) {
                loading = "Loading";

                let file_data_url = "https://api.nexusmods.com/v1/games/escapethebackrooms/mods/"+mod_id+"/files.json?category=update%2Cmain";

                let file_data_http = await httpclient.get(file_data_url, {
                responseType: ResponseType.JSON,
                headers: {
                        apiKey: $NexusConfig.apiKey
                    }
                });

                let file_data = file_data_http.data;

                console.log(file_data);

                loading = "Opening"

                open("https://www.nexusmods.com/escapethebackrooms/mods/"+mod_id+"?tab=files&file_id="+file_data.files.at(-1).file_id+"&nmm=1")

                ignore_installed = false;

                return;
            }

            loading = "Downloading";

            const file = await httpclient.get(url, {
              responseType: ResponseType.Binary
            });

            console.log("File downloaded!")

            loading = "Foldering";
            invoke("expand_scope", { folderPath: basePath })

            try {await createDir(basePath+folder)} catch {console.log("No directory was created!")}

            loading = "Writing";
            console.log("Writing binary file")
            await writeBinaryFile(basePath+folder+"/"+url.split('#')[0].split('?')[0].split('/').pop(), new Uint8Array(file.data));

            loading = "Cleaning";
            console.log("Mod File Saved to "+basePath+folder+"/"+url.split('#')[0].split('?')[0].split('/').pop())

            if (!reinstalling)  {
                let dc = get(downloaded)
                dc.push(downloadLink)
                downloaded.set(dc)
            }
            
            let ddc = get(downloaded_path)
            ddc[name] = folder+"/"+url.split('#')[0].split('?')[0].split('/').pop()
            downloaded_path.set(ddc)

            installed = true;
            ignore_installed = false;
        } catch (e) {
            console.error(e);
            loading = "error";
            installed = false;
        }   
    }


    function limitDescription(desc){
        if (desc.length > 60) {
            return desc.slice(0, 60) + "..."
        } else {
            return desc.slice(0, 60)
        }
    }

    async function deleteMod() {
        if (get(downloaded_path).hasOwnProperty(name)) {
            let dc = get(downloaded)
            let ddc = get(downloaded_path)

            const steam_game_loc = $steamPath+"/steamapps/common/EscapeTheBackrooms"
            const basePath = steam_game_loc + "/EscapeTheBackrooms/Content/Paks/"

            await removeFile(basePath+ddc[name])
            installed = false;
            
            dc = dc.filter((item) => item !== downloadLink)
            dc = dc.filter((item) => item !== name)
            delete ddc[name]

            downloaded.set(dc)
            downloaded_path.set(ddc)
        } else {
            console.error("Mod not installed!")
            alert("Ayo? Wtf? This should not be accessible... Error: Mod not installed!")
        }
    }

    let installedButtonHovered = false;
</script>

<div class="modcard flex h-30 w-50 bg-background-alt shadow-sm hover:shadow-md rounded-md p-2 m-2 max-w-full" ui-debug={$uidev}>
    <Img src={cover} alt="Mod" />
    <div class="details pl-2 pt-2 w-full flex justify-between">
        <div class="data">
            <h2 class="text-2xl inter f600">{name}</h2>
            <h4 class="text-l inter f400 overflow-hidden line-clamp-2">{limitDescription(description)}</h4>
            <p class="text-success text-s">{loader} modloader</p>
        </div>
        <div class="download flex items-end" ui-debug={$uidev}>
            <div class="flex items-center" ui-debug={$uidev}>
                <p class="px-1">Made by {author}</p>
                {#if (installed || get(downloaded).includes(downloadLink) || $downloaded.includes(name)) && !ignore_installed}
                    <Button click={() => {downloadMod(downloadLink, folder, true); ignore_installed = true; }} bg="primary-dark">
                        <Download size={20} />
                    </Button>

                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div on:mouseenter={() => {installedButtonHovered = true;}} on:mouseleave={() => {installedButtonHovered = false;}} on:click={deleteMod}>
                        {#if installedButtonHovered}
                            <Button bg="error">
                                <Error size={20} class="pr-1" /> Uninstall
                            </Button>
                        {:else}
                            <Button bg="secondary">
                                <Check size={20} class="pr-1" /> Installed
                            </Button>
                        {/if}
                    </div>
                {:else}
                    {#if loading !== "error" && loading}
                        <Button disabled bg="primary">
                            <Loading /> {loading}
                        </Button>
                    {:else if loading === "error"}
                        <Button click={() => {downloadMod(downloadLink, folder)}} bg="error">
                            <Error size={20} class="pr-1" /> Error
                        </Button>
                    {:else}
                        <Button click={() => {downloadMod(downloadLink, folder)}} bg="primary-dark">
                            <Download size={20} class="pr-1" /> Download
                        </Button>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
</div>