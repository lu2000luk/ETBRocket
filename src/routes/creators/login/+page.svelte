<script>
    import client from "$lib/aw";
    import { Account, ID } from "appwrite";

    let step = 0;
</script>

<div class="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
    <div class="mx-auto w-full max-w-md space-y-6">
      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-tight text-foreground">Log in to your account</h1>
        <p class="mt-2 text-muted-foreground">Enter your email and one-time password to access your account.</p>
      </div>
      {#if step === 0}
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
        <div class="p-6 space-y-2">
          <div class="space-y-1">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="email"
            >
              Email
            </label>
            <input
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              id="email"
              placeholder="etbrocket@example.com"
              required={true}
              type="email"
            />
          </div>
        </div>
        <div class="flex items-center p-6">
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
            Log In
          </button>
        </div>
      </div>
      {:else if step === 1}
      <div
      data-input-otp-container="true"
      class="flex items-center gap-2"
      style="position: relative; cursor: text; user-select: none; pointer-events: none; --root-height: 40px;"
    >
      <div class="flex items-center">
        <div class="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"></div>
        <div class="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"></div>
        <div class="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"></div>
        <div class="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"></div>
        <div class="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"></div>
        <div class="relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md"></div>
      </div>
      <div style="position: absolute; inset: 0px; pointer-events: none;">
        <input
          autocomplete="one-time-code"
          data-input-otp="true"
          inputmode="numeric"
          pattern="^[0-9]+$"
          maxlength="6"
          value=""
          style="position: absolute; inset: 0px; width: 100%; height: 100%; display: flex; text-align: left; opacity: 1; color: transparent; pointer-events: all; background: transparent; caret-color: transparent; border: 0px solid transparent; outline: transparent solid 0px; box-shadow: none; line-height: 1; letter-spacing: -0.5em; font-size: var(--root-height); font-family: monospace; font-variant-numeric: tabular-nums;"
          data-input-otp-mss="0"
          data-input-otp-mse="0"
        />
      </div>
    </div>
      {/if}
    </div>
  </div>