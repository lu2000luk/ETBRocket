<script>
// @ts-nocheck

  import "$lib/app.css"
  import Mod from "lucide-svelte/icons/blocks";
  import Loaders from "lucide-svelte/icons/unplug";
  import SideIcon from "$lib/components/sideicon.svelte";
  import Rocket from "lucide-svelte/icons/rocket";
  import Settings from "lucide-svelte/icons/settings"
  import Banana from "lucide-svelte/icons/banana"
  import Wrench from "lucide-svelte/icons/wrench"
  import Package from "lucide-svelte/icons/package"

  import CloudUpload from "lucide-svelte/icons/cloud-upload";
  import { Tooltip, Dialog, Separator, Label, Button as BitsButton } from "bits-ui";
  import { goto } from "$app/navigation";
  import Button from "$lib/ui/button.svelte";
  import { getClient, ResponseType } from '@tauri-apps/api/http';
  import { invoke } from "@tauri-apps/api"

  import { fade } from "svelte/transition";

  import { get } from 'svelte/store'

  import { NexusConfig, dialogOpened, NXMDialog, NXMData } from "$lib/nexus";
  import { open } from '@tauri-apps/api/shell';

  import { steamPath, uidev, banana } from "$lib/settings";

  import { once, listen } from '@tauri-apps/api/event';

  import parseNxmUrl from "$lib/nxm_parser";

  import { gsap } from "gsap";

  import NXMCard from "$lib/components/nxmcard.svelte";

  if (!$NexusConfig.apiKey) {
    nexusConnect()
  }

  const application_slug = "etbrocket"

  function nexusConnect() {
    let socket = new WebSocket("wss://sso.nexusmods.com");

    socket.onopen = function (event) {
      console.log("CONNECTION TO SSO OPENED");

      var uuid = $NexusConfig.uuid;
      var token = $NexusConfig.token;

      const data = {
              id: uuid,
              token: token,
              protocol: 2
          };

      socket.send(JSON.stringify(data));

      console.log("https://www.nexusmods.com/sso?id="+uuid+"&application="+application_slug)

      open("https://www.nexusmods.com/sso?id="+uuid+"&application="+application_slug);
    }

    socket.onmessage = function(event) {
      let response = JSON.parse(event.data);

      if (response && response.success) {
        if (response.data.hasOwnProperty('connection_token')) {
          NexusConfig.set({...$NexusConfig, token: response.data.connection_token})
        }

        if (response.data.hasOwnProperty('api_key')) {
            console.log("API Key Received: " + response.data.api_key);
            NexusConfig.set({...$NexusConfig, apiKey: response.data.api_key})
        }
      } else {
        alert("Error while logging in!")
      }
    }
  }

  if (!$steamPath) {
    invoke("get_steam_path").then(path => {steamPath.set(path)})
  }

  let apiKeyInput = $NexusConfig.apiKey ? $NexusConfig.apiKey : "";

  let bananaCursor;

  if ($banana) {
    onmousemove = (e) => {
      gsap.to(".bananaCursor", {duration: 0.05, x: e.clientX-(bananaCursor.clientWidth/2), y: e.clientY-(bananaCursor.clientHeight/2), ease: "power2.inOut"})
    }
  }

  const unlisten = listen('scheme-request-received', (event) => {
    console.log(`Got NXM link. Payload: ${event.payload}`);
    let nxm_data = parseNxmUrl(event.payload)
    console.log(nxm_data)
    nxm_data_d = nxm_data;
    NXMData.set(NXMData);
    NXMDialog.set(true);
  });

  let nxm_data_d;
</script>

<div class="bananaCursor fixed pointer-events-none cursor-none" hidden={!$banana} bind:this={bananaCursor}>
  <div class="bananaCircle flex bg-slate-600 bg-opacity-25 z-50 cursor-none rounded-full backdrop-blur-md p-2 justify-center items-center">
    <Banana />
  </div>
</div>

<div class="flex h-screen" style="{$banana ? "cursor: none;" : ""}" ui-debug={$uidev}>
  <div class="sidebar w-18 bg-background-alt flex flex-col justify-between" ui-debug={$uidev}>
      <div class="topitems flex flex-col" ui-debug={$uidev}>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <SideIcon click={() => {goto("../../../../")}}>{#if $banana}<Banana />{:else}<Rocket />{/if}</SideIcon>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">
            <div class="bg-secondary rounded-md ml-1 transition-all p-2">
              Home
            </div>
          </Tooltip.Content>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger>
            <SideIcon click={() => {goto("../../../../mods")}}><Mod /></SideIcon>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">
            <div class="bg-secondary rounded-md ml-1 transition-all p-2">
              Mods
            </div>
          </Tooltip.Content>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger>
            <SideIcon click={() => {goto("../../../../loaders")}}><Loaders /></SideIcon>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">
            <div class="bg-secondary rounded-md ml-1 transition-all p-2">
              Loaders
            </div>
          </Tooltip.Content>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger>
            <SideIcon click={() => {goto("../../../../packages")}}><Package /></SideIcon>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">
            <div class="bg-secondary rounded-md ml-1 transition-all p-2">
              Packages
            </div>
          </Tooltip.Content>
        </Tooltip.Root>
      </div>



      <div class="bottomitems flex flex-col" ui-debug={$uidev}>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <SideIcon click={() => {goto("../../../../creators/coming_soon")}}><Wrench /></SideIcon>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">
            <div class="bg-secondary rounded-md ml-1 transition-all p-2">
              Tools
            </div>
          </Tooltip.Content>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger>
            <SideIcon click={() => {goto("../../../../creators")}}><CloudUpload /></SideIcon>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">
            <div class="bg-secondary rounded-md ml-1 transition-all p-2">
              Creator Hub
            </div>
          </Tooltip.Content>
        </Tooltip.Root>

        <Tooltip.Root>
          <Tooltip.Trigger>
            <SideIcon click={() => {goto("../../../../settings")}}><Settings /></SideIcon>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">
            <div class="bg-secondary rounded-md ml-1 transition-all p-2">
              Settings
            </div>
          </Tooltip.Content>
        </Tooltip.Root>
      </div>
  </div>
  <div class="m-2 w-full overflow-y-auto" ui-debug={$uidev}>
    <slot />
  </div>
</div>

<Dialog.Root open={$NXMDialog} onOutsideClick={(e) => e.preventDefault()}>
  <Dialog.Portal>
    <Dialog.Overlay
      transition={fade}
      transitionConfig={{ duration: 150 }}
      class="fixed inset-0 z-50 bg-black/80"
    />
    <Dialog.Content
      class="fixed left-[50%] top-[50%] z-50 w-full max-w-[75%] translate-x-[-50%] translate-y-[-50%] rounded-card-lg border bg-background p-5 shadow-popover outline-none md:w-full"
    >
      <Dialog.Title
        class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
        >Download mod from Nexus</Dialog.Title
      >
      <Separator.Root class="-mx-5 mb-6 mt-3 block h-px bg-muted" />
      <Dialog.Description class="text-sm text-foreground-alt">
        {#if $NXMDialog}<NXMCard nxm_data_d={nxm_data_d}/>{/if}
      </Dialog.Description>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>