<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
  import * as Form from "$lib/components/ui/form";
  import { Input } from "$lib/components/ui/input";
  import { signUpSchema } from "$lib/schema/auth";
  import Icon from "@iconify/svelte";
</script>

<section class="min-h-screen flex items-center justify-center">
  <div class="w-screen max-w-md">
    <Card.Root>
      <Card.Header>
        <Card.Title>Sign In</Card.Title>
      </Card.Header>
      <Card.Content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
        similique, quia maxime ab quibusdam id sed quidem sequi temporibus
        nostrum inventore minima adipisci cupiditate pariatur repudiandae
        explicabo? Quo, dolor dignissimos!
      </Card.Content>
      <Card.Footer>
        <a
          class="text-sm text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
          href="/sign-up"
        >
          don't have an account ?
        </a>
      </Card.Footer>
    </Card.Root>
  </div>
</section>
