<script>
//@ts-nocheck

    import Button from "$lib/ui/button.svelte"

    import { dialogOpened } from "$lib/nexus"
    import { steamPath, uidev, banana, particle_count } from "$lib/settings";

    import { getClient, ResponseType } from '@tauri-apps/api/http';
    import { NexusConfig } from "$lib/nexus";

    import { Switch, Label } from "bits-ui";
</script>

<div class="m-2" ui-debug={$uidev}>
    <p class="text-2xl" id="steampath">Steam Path (the game must be in there)</p>
    <input type="text" class="h-input w-full border-none bg-background-alt rounded focus:outline-none p-2" placeholder="C:/Program Files (x86)/Steam/" bind:value={$steamPath}>
    <br>
    <br>
    <p class="text-2xl" id="uidebug">UI Debug</p>
    <div class="flex items-center space-x-3">
        <Switch.Root
        onCheckedChange={(e) => { uidev.set(e) }}
        checked={$uidev}
        ui-debug={$uidev}
          id="uidebug_switch"
          class="peer inline-flex h-[26px] min-h-[26px] w-[50px] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 bg-primary data-[state=unchecked]:shadow-mini-inset"
        >
          <Switch.Thumb
            class="pointer-events-none block size-[20px] shrink-0 rounded-full bg-background transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:shadow-mini dark:border dark:border-background/30 dark:bg-foreground dark:shadow-popover dark:data-[state=unchecked]:border"
          />
        </Switch.Root>
      </div>
      <p class="text-2xl" id="uidebug">Banana Mode</p>
      <div class="flex items-center space-x-3">
          <Switch.Root
          onCheckedChange={(e) => { banana.set(e) }}
          checked={$banana}
          ui-debug={$uidev}
            id="uidebug_switch"
            class="peer inline-flex h-[26px] min-h-[26px] w-[50px] shrink-0 cursor-pointer items-center rounded-full px-[3px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 bg-primary data-[state=unchecked]:shadow-mini-inset"
          >
            <Switch.Thumb
              class="pointer-events-none block size-[20px] shrink-0 rounded-full bg-background transition-transform data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0 data-[state=unchecked]:shadow-mini dark:border dark:border-background/30 dark:bg-foreground dark:shadow-popover dark:data-[state=unchecked]:border"
            />
          </Switch.Root>
        </div>
        <br />
        <p class="text-2xl" id="steampath">Max Particle Count</p>
        <input type="number" class="h-input w-full border-none bg-background-alt rounded focus:outline-none p-2" placeholder="150" min={5} max={10000} bind:value={$particle_count}>
        <br />
        <br />
</div>

