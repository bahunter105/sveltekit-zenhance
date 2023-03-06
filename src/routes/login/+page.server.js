import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ locals, request }) => {
    const formData = await request.formData();
		const data = Object.fromEntries([...formData]);
		try {
			await locals.pb.collection('users').authWithPassword(data.email, data.password);
		} catch (e) {
			console.error(e);
			throw e;
		}

		throw redirect(303, '/');
	}
};
