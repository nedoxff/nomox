<script lang="ts">
	export let type: "button" | "submit" | "reset" = 'button';
	export let onClick: (() => void) | undefined = undefined;
</script>

<button
	on:click={() => onClick?.()}
	type="submit"
	class="mt-3 w-fit rounded-lg border border-gray-300 bg-light px-5 py-2.5 text-sm font-medium text-dark transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-dark-300 dark:bg-dark-400 dark:text-light dark:hover:border-dark-200 dark:hover:bg-dark-300 dark:focus:border-light dark:focus:ring-light"
	><slot></slot></button
>
