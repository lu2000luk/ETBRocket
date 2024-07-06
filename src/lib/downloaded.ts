import { persisted } from 'svelte-persisted-store'
import { writable } from 'svelte/store'

const downloaded = persisted('downloaded-mods', [])
export const downloaded_path = persisted('downloaded-path', {})

export default downloaded