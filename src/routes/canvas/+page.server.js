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

    const teamRecord = await pb.collection('teams').create(data);

    // console.log(teamRecord)
    // console.log(teamRecord.id)

    let roleData

    for (let step = 0; step < 8; step++) {
      if (formData.get(`role${step}`) != undefined) {
        if (formData.get(`user${step}`) != undefined) {
          roleData = {
            "role": formData.get(`role${step}`),
            "team": teamRecord.id,
            "user": formData.get(`user${step}`)
          };
        } else {
          roleData = {
            "role": formData.get(`role${step}`),
            "team": teamRecord.id
          };
        }
        await pb.collection('roles').create(roleData);
      }
    }

    return { success: true };
  }
};



export const load = ({ locals }) => {
	const getOrganization = async () => {
		try {
			const user = locals.user
      const organization = serializeNonPOJOs(await locals.pb.collection('organizations').getOne(user.organization,{
        expand: 'creator, groups(organization), teams(organization), teams(organization).roles(team), teams(organization).roles(team).user, users(organization)'
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
