<script lang="ts">
    import Img from "$lib/ui/image.svelte";
    import Button from "$lib/ui/button.svelte";
    import Download from "lucide-svelte/icons/download";
    import Loading from "$lib/components/loading.svelte";
    import Check from "lucide-svelte/icons/check";
    import Error from "lucide-svelte/icons/circle-x"
    import { Tooltip, Dialog, Separator, Label } from "bits-ui";

    import { getClient, ResponseType } from '@tauri-apps/api/http';

    import { steamPath, uidev } from "$lib/settings";
    import { NexusConfig } from "$lib/nexus"

    let loading = "Loading";

    type NxmModData = {
        modId: number;
        fileId: number;
        key: string;
        expires: number;
        userId: number;
    }

    export let nxm_data: NxmModData;

    let [name, description, author, cover, loader] = ["Loading", "Loading", "Loading", "../../../../no_image.png", "Loading"];

    async function loadMetaData() {
        let httpclient = await getClient();

        loading = "Getting meta";

        let metaurl = "https://api.nexusmods.com/v1/games/escapethebackrooms/mods/"+nxm_data.modId+".json"
        let meta = await httpclient.get(metaurl, {
              responseType: ResponseType.JSON,
              headers: {
                    apiKey: $NexusConfig.apiKey
                }
            });

        console.log(meta)
    }

    if (nxm_data.modId) {
        loadMetaData();
    }

    console.log("From NXM Card: ", nxm_data);
</script>

<div class="modcard flex h-30 w-50 bg-background-alt shadow-sm hover:shadow-md rounded-md p-2 m-2" ui-debug={$uidev}>
    <Img src={cover} alt="Mod" />
    <div class="details pl-2 pt-2 w-full flex justify-between">
        <div class="data">
            <h2 class="text-2xl inter f600">{name}</h2>
            <h4 class="text-l inter f400 overflow-hidden line-clamp-2">{description}</h4>
            <p class="text-success text-s">{loader} modloader</p>
        </div>
        <div class="download flex items-end" ui-debug={$uidev}>
            <div class="flex items-center" ui-debug={$uidev}>
                <p class="px-1">Made by {author}</p>
                <Button disabled bg="secondary">
                    {loading}
                </Button>
            </div>
        </div>
    </div>
</div>