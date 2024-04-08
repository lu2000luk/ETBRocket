<script>
// @ts-nocheck


  import "$lib/app.css"
  import Mod from "lucide-svelte/icons/blocks";
  import Loaders from "lucide-svelte/icons/unplug";
  import SideIcon from "$lib/components/sideicon.svelte";
  import Rocket from "lucide-svelte/icons/rocket";
  import Settings from "lucide-svelte/icons/settings"
  import { Tooltip, Dialog, Separator, Label } from "bits-ui";
  import { goto } from "$app/navigation";
  import Button from "$lib/ui/button.svelte";
  import { getClient, ResponseType } from '@tauri-apps/api/http';

  import { NexusConfig, dialogOpened } from "$lib/nexus";
  import { open } from '@tauri-apps/api/shell';

  if (!$NexusConfig.apiKey) {
    dialogOpened.set(true);
  } else {
    dialogOpened.set(false);
  }

  let apiKeyInput = "";

  async function setKey(key=apiKeyInput) {
    console.log("Checking key... ")

    const httpclient = await getClient();
    const checker = await httpclient.get('https://api.nexusmods.com/v1/users/validate.json', {
      responseType: ResponseType.JSON,
      headers: {
        apiKey: key
      }
    });

    if (checker.status !== 200) {
      alert("Invalid key! Make sure you copied the personal API Key.")
    } else {
      NexusConfig.set({...$NexusConfig, apiKey: key})
      alert("Key saved!")
      dialogOpened.set(false);
      location.reload()
    }
  }
</script>

<div class="flex h-screen">
  <div class="sidebar w-18 bg-background-alt flex flex-col justify-between">
      <div class="topitems flex flex-col ">
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
      <div class="bottomitems">
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
  <div class="m-2 w-full overflow-y-auto">
    <slot />
  </div>
</div>

<Dialog.Root bind:open={$dialogOpened}>
  <Dialog.Portal>
    <Dialog.Overlay
      class="fixed inset-0 z-50 bg-black/80"
    />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <Dialog.Content
      class="fixed left-[50%] top-[50%] z-50 w-full max-w-[94%] translate-x-[-50%] translate-y-[-50%] rounded-md border-none bg-background p-5 shadow-popover outline-none sm:max-w-[490px] md:w-full"
    >
      <Dialog.Title
        class="flex w-full items-center justify-center text-lg font-semibold tracking-tight"
        >Add Nexus API key</Dialog.Title
      >
      <Separator.Root class="-mx-5 mb-6 mt-5 block h-px bg-muted" />
      <!-- svelte-ignore missing-declaration -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-missing-attribute -->
      <!-- svelte-ignore a11y-missing-attribute -->
      <Dialog.Description class="text-sm text-foreground-alt">
        <!-- svelte-ignore missing-declaration -->
        Adding a Nexus API key will make you able to download mods such as Interpose directly from this launcher.<br>Get a key 
        <a class="underline text-blue-600 cursor-pointer" on:click={() => open("https://next.nexusmods.com/settings/api-keys")}
         >in this page</a>, at the bottom of it you'll find a button to get a personal API Key.<br>
         <i>Your key will be stored locally and wont be shared with no one</i>
      </Dialog.Description>
      <div class="flex flex-col items-start gap-1 pb-11 pt-7">
        <Label.Root for="apiKey" class="text-sm font-medium">Nexus Personal API Key:</Label.Root
        >
        <div class="relative w-full">
          <input
            id="apiKey"
            class="h-input w-full border-none bg-background-alt rounded focus:outline-none p-2"
            placeholder="API Key"
            type="password"
            autocomplete="off"
            bind:value={apiKeyInput}
          />
        </div>
      </div>
      <div class="flex">
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div on:click={() => {setKey()}}>
            <Button bg="secondary">Save</Button>
          </div>
        
          <Dialog.Close>
            <Button bg="error">Ignore for now</Button>
          </Dialog.Close>
      </div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>