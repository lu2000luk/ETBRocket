<script>
  import "$lib/app.css";
  import Mod from "lucide-svelte/icons/blocks"
  import Loaders from "lucide-svelte/icons/unplug"
  import SideIcon from "$lib/components/sideicon.svelte"
  import Rocket from "lucide-svelte/icons/rocket"
</script>

<div class="flex">
  <div class="sidebar w-20 bg-background-alt flex flex-col content-center items-center">
    <div class="p-3 m-1"><Rocket /></div>
    <SideIcon><Mod /></SideIcon>
    <SideIcon><Loaders /></SideIcon>
  </div>
  <div>
    <slot />
  </div>
</div>
