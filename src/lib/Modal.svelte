<script>
  import { enhance } from '$app/forms';

  // /** @type {import('./$types').ActionData} */
  // export let form;

</script>

<input type="checkbox" id="my-modal-3" class="modal-toggle" />
<div class="modal">
  <div class="modal-box relative">
    <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
    <div class="flex flex-col items-center">
        <h3 class="text-lg font-bold">Create Your Team!</h3>
        <form class="flex flex-col items-center" method="post" action="/canvas">
          <input class="my-1 input input-sm input-bordered w-full" name="name" type="text" placeholder="Team Name"/>
          <!-- <select class="my-1 input input-sm input-bordered w-full" name="number">
            <option disabled selected>Number of People</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
          </select>
          <select class="my-1 input input-sm input-bordered w-full" name="group">
            <option disabled selected>Group</option>
            <option>Group A</option>
            <option>Group B</option>
          </select> -->
          <input class="my-1 input input-sm input-bordered w-full" name="goal" type="text" placeholder="Goal (You can edit this later)"/>
          <button class="my-2 btn btn-accent" >Submit</button>
        </form>
    </div>
  </div>
</div>
