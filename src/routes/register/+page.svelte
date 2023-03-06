<script>
	import { applyAction, enhance } from '$app/forms';
	import { pb } from '$lib/pocketbase';
</script>

<div class="navbar bg-base-100">
  <div class="navbar-start">
    <a href="/" class="btn btn-ghost normal-case text-xl" >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    </a>
  </div>
    <div class="navbar-center">
    <h1 class="text-2xl">Register</h1>
  </div>
</div>

<form
	method="POST"
	class="card"
	use:enhance={() => {
		return async ({ result }) => {
			pb.authStore.loadFromCookie(document.cookie);
			await applyAction(result);
		};
	}}
>
  <div class="form-control gap-2 mb-4">
		<input type="email" name="email" placeholder="Email" class="input input-bordered" />
		<input type="password" name="password" placeholder="Password" class="input input-bordered" />
		<input
			type="password"
			name="passwordConfirm"
			placeholder="Confirm password"
			class="input input-bordered"
		/>
		<button class="btn btn-primary">Register</button>
	</div>
</form>
