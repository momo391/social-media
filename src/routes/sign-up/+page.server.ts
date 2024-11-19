import { signUpSchema } from "$lib/schema/auth";
import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { fail, type Actions } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

export const load = async () => {
  const form = await superValidate(zod(signUpSchema));
  return { form };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(signUpSchema));

    if (!form.valid) {
      return fail(400, {
        form,
      });
    }

    await db.insert(user).values({
      name: form.data.name,
      email: form.data.email,
      passowrd: form.data.passowrd,
    });

    return {
      form,
    };
  },
};
