<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { signUpSchema } from "$lib/schema/auth";
  import Icon from "@iconify/svelte";

  import {
    superForm,
    type Infer,
    type SuperValidated,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  interface Props {
    data: {
      form: SuperValidated<Infer<typeof signUpSchema>>;
    };
  }

  let { data }: Props = $props();
  const { form: SignUpForm } = $state(data);
  const form = superForm(SignUpForm, {
    validators: zodClient(signUpSchema),
  });
  const { delayed, enhance, form: formData } = $state(form);
</script>

<section class="min-h-screen flex items-center justify-center">
  <div class="w-screen max-w-md">
    <Card.Root>
      <Card.Header>
        <Card.Title>Sign up</Card.Title>
      </Card.Header>
      <Card.Content>
        <form method="POST" use:enhance class="grid gap-2">
          <Form.Field {form} name="name">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Name</Form.Label>
                <Input {...props} bind:value={$formData.name} />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="email">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Email</Form.Label>
                <Input {...props} type="email" bind:value={$formData.email} />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <Form.Field {form} name="passowrd">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>Passowrd</Form.Label>
                <Input
                  {...props}
                  type="password"
                  bind:value={$formData.passowrd}
                />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

          <div class="flex items-center justify-center">
            {#if $delayed}
              <Button variant="default" size="icon">
                <Icon icon="tabler:loading" class="animate-spin text-black" />
              </Button>
            {:else}
              <Form.Button>Sign up</Form.Button>
            {/if}
          </div>
        </form>
      </Card.Content>
      <Card.Footer>
        <a
          class="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          href="/sign-in"
        >
          have an account ?
        </a>
      </Card.Footer>
    </Card.Root>
  </div>
</section>
