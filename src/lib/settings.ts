import { persisted } from 'svelte-persisted-store'
import { writable } from 'svelte/store'

export const steamPath = persisted("steamPath", "")

export const uidev = persisted("ui_debug", false)

export const banana = persisted("banana", false)