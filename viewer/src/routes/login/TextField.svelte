<script lang="ts">
	export let labelSize: string = 'xl';
	export let name: string = '';
	export let placeholder: string = '';
	export let id: string;
	export let type: string = 'text';
	export let required: boolean = false;
	export let onChange: ((value: string) => void) | undefined = undefined;

	let value: string;
</script>

<div>
	<label for={id} class="block text-{labelSize} mb-1 font-normal text-dark dark:text-light"
		>{name}</label
	>
	<input
		bind:value
		on:input={() => onChange?.(value)}
		{id}
		{...{ type }}
		class="text-md block w-full rounded-lg border border-dark-100 bg-gray-50 p-2.5 text-dark outline-none focus:border-dark focus:ring-2 focus:ring-dark dark:border-dark-300 dark:bg-dark-400 dark:text-light dark:placeholder-light-400 dark:focus:border-light dark:focus:ring-light"
		{placeholder}
		{required}
	/>
</div>
