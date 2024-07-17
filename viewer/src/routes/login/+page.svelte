<script lang="ts">
	import { t } from '$lib/translations';
	import Button from './Button.svelte';
	import TextField from './TextField.svelte';

	let id: string | undefined;
	let password: string | undefined;

	const tryLogin = () => {
        if(id === undefined || password === undefined) {
            return;
        }
    };
</script>

<div class="w-dvh grid h-dvh grid-cols-2 grid-rows-1">
	<div class="col-span-1 flex items-center justify-center bg-light">
		<p class="text-xl">{$t('login.noGraphic')}</p>
	</div>
	<div class="col-span-1 flex flex-col justify-center p-10 dark:bg-dark">
		<h1 class="text-5xl dark:text-light">{$t('login.title')}</h1>
		<p class="text-xl dark:text-light">{$t('login.description')}</p>
		<form>
			<div class="mt-3 flex max-w-[50%] flex-col gap-2">
				<TextField
					onChange={(value) => (id = value)}
					id="id"
					labelSize="xl"
					name={$t('login.id')}
					placeholder={$t('login.idPlaceholder')}
					required={true}
				></TextField>
				<TextField
					onChange={(value) => (password = value)}
					id="password"
					type="password"
					labelSize="xl"
					name={$t('login.password')}
					placeholder={$t('login.passwordPlaceholder')}
					required={true}
				></TextField>
				<Button type="submit" onClick={() => tryLogin()}>{$t('login.login')}</Button>
			</div>
		</form>
	</div>
</div>
