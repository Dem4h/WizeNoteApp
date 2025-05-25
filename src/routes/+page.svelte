<script lang="ts">
	let { data } = $props();
	let login = data.login;
</script>

<svelte:head>
	<title>Account</title>
</svelte:head>
<main>
	<h1 class="ring-red-700">Welcome to Wizenote</h1>
	<p>{login.username}</p>
</main>
