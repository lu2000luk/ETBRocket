import { persisted } from 'svelte-persisted-store'
import { writable } from 'svelte/store'

export const NexusConfig = persisted('nexus', {
    apiKey: false,
})

export const dialogOpened = writable(false)