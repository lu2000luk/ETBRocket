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

    import { unzip } from 'unzipit';

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
        } else {
            foundLoader = true
            is_interpose = false;
            loader = "Cant ";
        }

        loading = "Cleaning up";

        loading = "Ready to install";
        await installMod()
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
        
        loading = "Checking"
        
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

        loading = "Extracting";
        
        //@ts-ignore
        let fileBlob = new Blob([new Uint8Array(raw_mod.data)])

        let fileBlobUrl = URL.createObjectURL(fileBlob)

        let { entries } = await unzip(fileBlobUrl);

        let zipdataname = Object.keys(entries)[0]
        let zipfolder;

        if (zipdataname.split("/").length > 1) {
            zipfolder = zipdataname.split("/")[0]
        }

        switch (zipfolder) {
            case "interpose_mods":
                folder = "interpose_mods"
                loader = "Interpose"
                break;
            case "LogicMods":
                folder = "LogicMods"
                loader = "UE4SS"
                break;
            case "~mods":
                folder = "~mods"
                loader = "Unknown"
                break;
            case "basefolder":
                folder = ""
                loader = "Unknown"
                break;
            default:
                if (is_interpose) {
                    folder = ""
                } else {
                    folder = "~mods"
                    loader = "Unknown"
                }
                break;
        }

        console.log(entries[zipdataname])

        // Comment to whoever will look at the code:
        // Its a mess i know. But, it somehow work. It seems that it dosent if you look at the files but at the same time
        // for some wierd magic, it works. I dont know why. I dont know how. But it works. So, i will leave it as is.
        // If you think you have a better solution go to the Pull Request and make a PR. I will be happy to merge it.

        //@ts-ignore
        let modfile = entries[zipdataname]._reader.blob

        loading = "Foldering";

        invoke("expand_scope", { folderPath: basePath })
        try {await createDir(basePath+folder)} catch {console.log("No directory was created!")}

        loading = "Writing";

        await writeBinaryFile(basePath+folder+"/"+zipdataname, new Uint8Array(await modfile.arrayBuffer()));

        loading = "Cleaning";
        console.log("Mod File Saved to "+basePath+folder+"/"+zipdataname)

        let dc = get(downloaded)

        if (is_interpose) {
            // @ts-ignore
            dc.push("interpose")
        } else {
            // @ts-ignore
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
