<script>
    export let version = ""
    export let link = ""
</script>

<div class="flex items-center justify-between p-2 bg-[#3a3a3a] rounded-md">
    <input type="text" placeholder="Raw Github Link" class="truncate bg-transparent placeholder:text-gray-500 w-[70%]" bind:value={link} pattern="https:\/\/raw\.githubusercontent\.com\/.*">
    <span>v<input bind:value={version} class="bg-transparent placeholder:text-gray-500 w-10" placeholder="1.0" type="text" pattern="\d+(\.\d+)?"></span>
</div>