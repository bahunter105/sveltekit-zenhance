import { error } from '@sveltejs/kit';
import {serializeNonPOJOs} from '$lib/functions/utils'

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ locals, request }) => {
    // TODO log the user in
    const pb = locals.pb
    const user = locals.user
    const formData = await request.formData();
    // console.log(locals)
    // console.log(formData)

    const data = {
      "name": formData.get('name'),
      "goal": formData.get('goal'),
      "organization": user.organization
    };

    // const record =
    await pb.collection('teams').create(data);

    // const organization = await locals.pb.collection('organizations').getOne(user.organization)
    // let teams = organization.teams
    // teams.push(record.id)
    // // example update data
    // const updateData = {
    //     "teams": teams
    // };
    // await pb.collection('organizations').update(user.organization, updateData);
    return { success: true };
  }
};



export const load = ({ locals }) => {
	const getOrganization = async () => {
		try {
			const user = locals.user
      const organization = serializeNonPOJOs(await locals.pb.collection('organizations').getOne(user.organization,{
        expand: 'creator, groups(organization), teams(organization), teams(organization).roles, users(organization)'
        // expand: 'users(organization)'
      }));
			return organization;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};
	return {
		organization: getOrganization()
	};
};
