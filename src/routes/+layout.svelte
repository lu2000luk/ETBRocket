<script>
  import "$lib/app.css"
  import Mod from "lucide-svelte/icons/blocks";
  import Loaders from "lucide-svelte/icons/unplug";
  import SideIcon from "$lib/components/sideicon.svelte";
  import Rocket from "lucide-svelte/icons/rocket";
  import { Tooltip } from "bits-ui";
  import { goto } from "$app/navigation";
</script>

<div class="flex h-screen">
  <div class="sidebar w-18 bg-background-alt flex flex-col content-center items-center">
    <SideIcon click={() => {goto("../../../../")}}><Rocket /></SideIcon>
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
  <div class="m-2 w-full">
    <slot />
  </div>
</div>
