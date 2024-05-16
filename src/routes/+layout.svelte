<script>
// @ts-nocheck

  import "$lib/app.css"
  import Mod from "lucide-svelte/icons/blocks";
  import Loaders from "lucide-svelte/icons/unplug";
  import SideIcon from "$lib/components/sideicon.svelte";
  import Rocket from "lucide-svelte/icons/rocket";
  import Settings from "lucide-svelte/icons/settings"
  import CloudUpload from "lucide-svelte/icons/cloud-upload";
  import { Tooltip, Dialog, Separator, Label } from "bits-ui";
  import { goto } from "$app/navigation";
  import Button from "$lib/ui/button.svelte";
  import { getClient, ResponseType } from '@tauri-apps/api/http';
  import { invoke } from "@tauri-apps/api"

  import { NexusConfig, dialogOpened } from "$lib/nexus";
  import { open } from '@tauri-apps/api/shell';

  import { steamPath, uidev } from "$lib/settings"

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
</script>

<div class="flex h-screen" ui-debug={$uidev}>
  <div class="sidebar w-18 bg-background-alt flex flex-col justify-between" ui-debug={$uidev}>
      <div class="topitems flex flex-col" ui-debug={$uidev}>
        <Tooltip.Root>
          <Tooltip.Trigger>
            <SideIcon click={() => {goto("../../../../")}}><Rocket /></SideIcon>
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
      </div>
      <div class="bottomitems flex flex-col" ui-debug={$uidev}>
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
