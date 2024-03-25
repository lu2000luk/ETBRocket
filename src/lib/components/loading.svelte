<script>
    export let size = 20;
    export let props = {};
    import Loader from "lucide-svelte/icons/loader-circle"
</script>

<style>
    .loader {
        animation: rotate 0.5s normal ease-in-out infinite;
    }

    @keyframes rotate {
        0% {
            rotate: 0deg;
        }
        100% {
            rotate: 360deg;
        }
    }
</style>

<div class="loader mr-1 origin-center">
    <Loader size={size} {...props} />
</div>