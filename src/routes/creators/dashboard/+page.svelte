<script>
    import Dashbtn from "$lib/ui/dash/button.svelte";
    import Version from "$lib/ui/dash/version.svelte";
</script>

<div class="flex w-full h-full">
    <div class="flex flex-col w-3/4 p-4">
      <h1 class="text-2xl font-bold">BananaExplosive</h1>
      <div class="flex flex-col space-y-2">
        <span class="text-lg pt-3">Media</span>
        <div class="flex space-x-2">
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 px-4 py-2 w-24 h-24 bg-[#3a3a3a]">
            Cover
          </button>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 px-4 py-2 w-24 h-24 bg-[#3a3a3a]">
            Image
          </button>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 px-4 py-2 w-24 h-24 bg-[#3a3a3a]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="w-6 h-6 mx-auto"
            >
              <polygon points="6 3 20 12 6 21 6 3"></polygon>
            </svg>
          </button>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 px-4 py-2 w-24 h-24 bg-[#3a3a3a]">
            +
          </button>
        </div>
      </div>
      <div class="flex flex-col space-y-2">
        <span class="text-lg pt-3">Files</span>
        <div class="flex flex-col space-y-2">
          <Version version="1.0" link="https://raw.githubusercontent.com/lu2000luk/ETBRocket/main/bun.lockb"/>
          <Version version="2.0"/>
          <Version link="https://raw.githubusercontent.com/lu2000luk/ETBRocket/main/package.json"/>
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-[#3a3a3a]">
            + Add version
          </button>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-1/4 p-4 bg-background-alt">
      <h2 class="text-lg font-bold">Mods</h2>
      <div class="flex flex-col space-y-2 overflow-y-auto overflow-x-hidden">
        <Dashbtn>My epic mod #1</Dashbtn>
        <Dashbtn>My mod menu</Dashbtn>
        <Dashbtn>Fast fireworks</Dashbtn>
        <Dashbtn selected>
            Banana Explosive
        </Dashbtn>
        <br>
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 w-full text-left bg-primary-dark">
            + New mod
        </button>
      </div>
    </div>
  </div>