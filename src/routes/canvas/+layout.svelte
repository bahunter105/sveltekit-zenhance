<script>
  import { currentUser, pb } from '$lib/pocketbase';
  import { applyAction, enhance } from '$app/forms';
  import avatar from '$lib/images/avatar-user-circle.svg'
  import Modal from '$lib/Modal.svelte'
  // /** @type {import('./$types').ActionData} */
  // export let form;

</script>

<Modal/>
<div class="drawer">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Page content here -->
    <div class="navbar bg-base-100">
      <div class="flex-1">
      <div class="navbar-start">
        <label for="my-drawer" class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          {#if $currentUser}
          <label tabindex="0" class="btn btn-ghost btn-circle avatar online">
            <img src={avatar} />
          </label>
          {:else}
          <label tabindex="0" class="btn btn-ghost btn-circle avatar offline">
            <img src={avatar} />
          </label>
          {/if}
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {#if $currentUser}
            <li class="btn text-xs">{$currentUser.email}</li>
            <li>
              <form
                method="POST"
                action="/logout"
                use:enhance={() => {
                  return async ({ result }) => {
                    pb.authStore.clear();
                    await applyAction(result);
                  };
                }}
              >
                <button>Log out</button>
              </form>
            </li>
          {:else}
            <li><a href="/login">Log in</a></li>
            <li><a href="/register">Register</a></li>
          {/if}
          </ul>
        </div>
      </div>
    </div>
    <slot />
  </div>
  <div class="drawer-side">
    <label for="my-drawer" class="drawer-overlay"></label>
    <ul class="menu p-4 w-80 bg-base-100 text-base-content">
      <!-- Sidebar content here -->
      <!-- <a href="/" class="btn btn-ghost normal-case text-xl" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      </a> -->
      <li><a href="/">Home</a></li>
      <li><a href="/sorting">Sorting Algorithm</a></li>
    </ul>
  </div>
</div>
