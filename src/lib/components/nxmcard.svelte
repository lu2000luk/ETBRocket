<script lang="ts">
    //@ts-ignore
    import Img from "$lib/ui/image.svelte";
    import Button from "$lib/ui/button.svelte";

    import { getClient, ResponseType } from '@tauri-apps/api/http';
    import { invoke } from "@tauri-apps/api";
    import { writeBinaryFile, BaseDirectory, createDir } from '@tauri-apps/api/fs';

    import { steamPath, uidev } from "$lib/settings";
    import { NexusConfig, NXMDialog } from "$lib/nexus";

    import downloaded from "$lib/downloaded";

    import { get } from "svelte/store";

    let loading = "Loading";

    let is_interpose = false;

    let foundLoader = false;

    type NxmModData = {
        modId: number;
        fileId: number;
        key: string;
        expires: number;
        userId: number;
    }

    export let nxm_data_d: NxmModData;
    let nxm_data: NxmModData = nxm_data_d;

    let [name, description, author, cover, loader]: any = ["Loading", "Loading", "Loading", "../../../../no_image.png", "Loading"];

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

        let meta_data: any = meta.data;

        console.log(meta.data)

        name = meta_data.name;
        description = meta_data.summary;
        author = meta_data.author;
        cover = meta_data.picture_url;

        loading = "Getting Loader";

        if (meta_data.name === "Interpose Mod Loader") {
            loader = "🍌";
            is_interpose = true;
            foundLoader = true;
        }

        loading = "Cleaning up";

        if (!foundLoader) {
            alert("This mod is currently not supported by ETBRocket");
            return;
        }

        loading = "Ready to install";
        try {
            await installMod()
        } catch (err) {
            console.error(err)
            alert("An error occured while trying to install the mod. If you are a premium user hit me up becouse premium mod downloading support is not implemented yet.")
        }
        
    }

     async function installMod() {
        loading = "Warming"
        let httpclient = await getClient();

        let steam_game_loc = $steamPath+"/steamapps/common/EscapeTheBackrooms"
        let basePath = steam_game_loc + "/EscapeTheBackrooms/Content/Paks/"

        let downloadurl = "https://api.nexusmods.com/v1/games/escapethebackrooms/mods/"+nxm_data.modId+"/files/"+nxm_data.fileId+"/download_link.json?key="+nxm_data.key+"&expires="+nxm_data.expires+"&user_id="+nxm_data.userId

        loading = "Getting info"

        let download_link = await httpclient.get(downloadurl, {
              responseType: ResponseType.JSON,
              headers: {
                    apiKey: $NexusConfig.apiKey
                }
            });

        let download_link_data: any = download_link.data;
        console.log(download_link_data)

        loading = "Checking"

        download_link_data = download_link_data[0].URI;

        loading = "Downloading"

        let raw_mod = await httpclient.get(download_link_data, {
              responseType: ResponseType.Binary,
              headers: {
                    apiKey: $NexusConfig.apiKey
                }
            });
        
        loading = "Foldering"
        
        let folder = ""

        switch (loader) {
            case "🍌":
                folder = ""
                break;
            case "Interpose":
                folder = "interpose_mods"
                break;
            case "UE4SS":
                folder = "LogicMods"
                break;
            case "Interpose Map":
                folder = "~mods"
                break;
            default:
                folder = ""
                break;
        }

        invoke("expand_scope", { folderPath: basePath })
        try {await createDir(basePath+folder)} catch {console.log("No directory was created!")}

        loading = "Writing";
        console.log("Writing binary file")
        await writeBinaryFile(basePath+folder+"/"+download_link_data.split('#')[0].split('?')[0].split('/').pop(), new Uint8Array(raw_mod.data));

        loading = "Cleaning";
        console.log("Mod File Saved to "+basePath+folder+"/"+download_link_data.split('#')[0].split('?')[0].split('/').pop())

        let dc = get(downloaded)
        
        if (is_interpose) {
            dc.push("interpose")
        } else {
           dc.push(name) 
        }

        downloaded.set(dc)
        
        loading = "Done!";

        setTimeout(() => {
            loading = "Closing"
            NXMDialog.set(false)
        }, 800)
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