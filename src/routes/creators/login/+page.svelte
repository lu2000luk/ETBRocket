<script>
    //@ts-nocheck

    import client from "$lib/aw";
    import { Account, ID } from "appwrite";
    import { goto } from "$app/navigation"

    let step = 0;
    let email = "";
    let code = "";
    let userId;

    async function checkLogin() {
        try {
            await account.get();
            goto("../creators/dashboard")
        } catch {
            step = 1;
        }
    }
    

    const account = new Account(client);

    async function continueLogin() {
        const sessionToken = await account.createEmailToken(
            ID.unique(),
            email
        );

        userId = sessionToken.userId;

        step = 2;
    }

    async function finalizeLogin() {
        const session = await account.createSession(
            userId,
            code
        );

        console.log(session)
    }

    checkLogin()
</script>

<div class="flex min-h-[100dvh] items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
    <div class="mx-auto w-full max-w-md space-y-6">
      <div class="text-center">
        <h1 class="text-3xl font-bold tracking-tight text-foreground">Log in to your account</h1>
        <p class="mt-2 text-muted-foreground">Enter your email and one-time password to access your account.</p>
      </div>
      {#if step === 1}
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

              bind:value={email}
            />
          </div>
        </div>
        <div class="flex items-center p-6">
          <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full" on:click={continueLogin}>
            Send Mail
          </button>
        </div>
      </div>
      {:else if step === 2}
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
      <div
      data-input-otp-container="true"
      class="flex items-center gap-2"
      
    >
      <div class="flex justify-center p-2 m-2">
        <input
          autocomplete="one-time-code"
          inputmode="numeric"
          pattern="^[0-9]+$"
          maxlength="6"
          bind:value={code}
          class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
    </div>
    <div class="flex items-center p-6">
        <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full" on:click={finalizeLogin}>
          Log In
        </button>
      </div></div>
      {/if}
    </div>
  </div>