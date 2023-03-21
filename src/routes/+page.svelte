<script lang="ts">
  import { applyAction, deserialize } from "$app/forms";
  import { invalidateAll } from "$app/navigation";

  let messages: string[] = [];
  let loading: boolean = false;

  async function handleSubmit(event: any) {
    if (loading) {
      return;
    }

    loading = true;
    const data = new FormData(this);

    const response = await fetch(this.action, {
      method: "POST",
      body: data,
    });

    const result = deserialize(await response.text());

    if (result.type == "success" && result.data?.message) {
      messages = [...messages, result.data.message];
      invalidateAll();
    }

    applyAction(result);
    loading = false;
  }
</script>

<h1>Welcome to SvelteKit-ChatGPT</h1>

<p>The API will answer you as a greek philosopher.</p>

<form method="POST" action="?/doPrompt" on:submit|preventDefault={handleSubmit}>
  <input name="prompt" value="Who goes there?" placeholder="Who goes there?" />

  <button type="submit" disabled={loading}>Send</button>
</form>

<div
  style="white-space: pre-wrap; border: solid 1px #000; padding: 15px; margin-top: 30px; max-width: 600px;"
>
  <code>Output goes here</code>

  {#each messages as msg}
    <br />
    <code>{msg}</code>
  {/each}
</div>
