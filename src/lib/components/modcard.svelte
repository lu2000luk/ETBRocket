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

    import Img from "$lib/ui/image.svelte";
    import Button from "$lib/ui/button.svelte";
    import Download from "lucide-svelte/icons/download";
    import Loading from "$lib/components/loading.svelte";
    import Check from "lucide-svelte/icons/check";
    import Error from "lucide-svelte/icons/circle-x"
    import { Tooltip, Dialog, Separator, Label } from "bits-ui";

    import { steamPath, uidev } from "$lib/settings";

    import { writeBinaryFile, BaseDirectory, createDir } from '@tauri-apps/api/fs';
    import { Select } from "bits-ui";

    import { getClient, ResponseType } from '@tauri-apps/api/http';
    import { invoke } from "@tauri-apps/api"

    import { NexusConfig } from "$lib/nexus"
    import { open } from '@tauri-apps/api/shell';

    import { once, listen } from '@tauri-apps/api/event';

    import { get } from "svelte/store"
    import downloaded from "$lib/downloaded";
    import { linear } from "svelte/easing";

    let loading = false;
    let installed = false;

    // @ts-ignore
    async function downloadMod(url, folder) {
        try {
            loading = "Starting";
            const httpclient = await getClient();
            console.log("HTTP Client loaded!")
            
            const steam_game_loc = $steamPath+"/steamapps/common/EscapeTheBackrooms"
            const basePath = steam_game_loc + "/EscapeTheBackrooms/Content/Paks/"

            if (nexus) {
                alert("In this beta you'll need to manually download files from nexus to install them.")
                loading = "error";
                installed = false;
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

            let dc = get(downloaded)
            dc.push(downloadLink)

            downloaded.set(dc)

            installed = true;
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
                {#if installed || get(downloaded).includes(downloadLink)}
                    <Button disabled bg="secondary">
                        <Check /> Installed
                    </Button>
                {:else}
                    {#if loading !== "error" && loading}
                        <Button disabled bg="primary-dark">
                            <Loading /> {loading}
                        </Button>
                    {:else if loading === "error"}
                        <Button click={() => {downloadMod(downloadLink, folder)}} bg="error" >
                            <Error size={20} class="pr-1" /> Error
                        </Button>
                    {:else}
                        <Button click={() => {downloadMod(downloadLink, folder)}} >
                            <Download size={20} class="pr-1" /> Download
                        </Button>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
</div>