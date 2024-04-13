import { persisted } from 'svelte-persisted-store'
import { writable } from 'svelte/store'

export const steamPath = persisted("steamPath", "")