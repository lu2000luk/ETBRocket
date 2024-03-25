<script>
// @ts-nocheck

    export let name = "Missing title";
    export let description = "";
    export let author = "Unknown";
    export let cover = "../../../../no_image.png";
    export let loader = "Unknown";
    export let downloadLink = "";
    export let folder = "/";
    export let modVersion = "0.0.0";
    export let gameVersion = "Unknown";

    import Img from "$lib/ui/image.svelte";
    import Button from "$lib/ui/button.svelte";
    import Download from "lucide-svelte/icons/download";
    import Loading from "$lib/components/loading.svelte";
    import Check from "lucide-svelte/icons/check"

    import { writeTextFile, BaseDirectory } from '@tauri-apps/api/fs';

    import { getClient, ResponseType } from '@tauri-apps/api/http';
    import { invoke } from "@tauri-apps/api"

    let loading = false;
    let installed = false;

    // @ts-ignore
    async function downloadMod(url, folder, basePath = "C:/Program Files (x86)/Steam/steamapps/common/EscapeTheBackrooms/EscapeTheBackrooms/Content/Paks") {
        const httpclient = await getClient();
        console.log("HTTP Client loaded!")
        const file = await httpclient.get(url, {
          responseType: ResponseType.Binary
        });
        console.log("File downloaded!")
        invoke("expand_scope", { folderPath: basePath })
        await writeTextFile( url.split('#')[0].split('?')[0].split('/').pop(), Uint8Array.from(file.data), { dir: BaseDirectory.Desktop });
        console.log("File Saved!")
        installed = true;
    }
</script>

<div class="modcard flex h-30 w-50 bg-background-alt shadow-sm hover:shadow-md rounded-md p-2 m-2">
    <Img src={cover} alt="Mod" />
    <div class="details pl-2 pt-2 w-full flex justify-between">
        <div class="data">
            <h2 class="text-2xl inter f600">{name}</h2>
            <h4 class="text-l inter f400 overflow-hidden line-clamp-2">{description}</h4>
            <p class="text-success text-s">{loader} modloader</p>
        </div>
        <div class="download flex items-end">
            <div class="flex items-center">
                <p class="px-1">Made by {author}</p>
                {#if installed}
                    <Button disabled bg="secondary">
                        <Check /> Installed
                    </Button>
                {:else}
                    {#if loading}
                        <Button disabled bg="primary-dark">
                            <Loading /> Downloading...
                        </Button>
                    {:else}
                        <Button click={() => {loading = true; downloadMod(downloadLink, folder)}} >
                            <Download size={20} class="pr-1" /> Download
                        </Button>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
</div>