import { persisted } from 'svelte-persisted-store'
import { writable } from 'svelte/store'

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export const NexusConfig = persisted('nexus', {
    apiKey: false,
    uuid: uuidv4(),
    token: ""
})

export const dialogOpened = writable(false)