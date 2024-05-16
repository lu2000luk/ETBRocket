# ETB Rocket
This CURRENTLY IN BETA mod installer will simplify the process of installing EscapeTheBackrooms mods with a mod hosting system and nexus integration for the authors that want to stick with them (I understand). Lots of features are still missing so dont expect much. Plans for social integrations, profiles (packs) & in-game inegrations are scheduled for past stable. The app is made with a SvelteKit (TS, Tailwind & Bits UI) frontend and a (scuffed) Rust backend. Contributing to the project whould be actually amazing, expecially for the Rust side.

# Building the app by yourself
Step 1: Download repo (Possibly the [Release Branch](https://github.com/lu2000luk/ETBRocket/tree/release))

Step 2: Install Rust, NodeJS (comes with NPM) and PNPM

Step 3: Open the terminal in the repo's root and run "pnpm i"

Step 4: In the terminal type "pnpm tauri build"

Then you'll suffer for my shitty code but it should build the app, for any questions ask on Discord or make an Issue
(You might need to disable the antivirus to build, check tauri's ds for an exaplanation)

Github Actions will also build the app for you automatically when i merge to the release branch
