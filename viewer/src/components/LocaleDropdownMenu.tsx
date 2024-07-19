import { createEffect, createSignal, For, Show } from "solid-js";
import { loadAllLocalesAsync } from "../i18n/i18n-util.async";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import type { DropdownMenuSubTriggerProps } from "@kobalte/core/dropdown-menu";
import { useI18nContext } from "../i18n/i18n-solid";
import { i18nObject, loadedLocales } from "../i18n/i18n-util";
import type { Locales } from "../i18n/i18n-types";
import { FaSolidChevronDown } from "solid-icons/fa";
import Twemojify from "./Twemojify";

export default function LocaleDropdownMenu() {
	const [ready, setReady] = createSignal(false);
	const { LL, locale, setLocale } = useI18nContext();

	createEffect(() => {
		loadAllLocalesAsync().then(() => setReady(true));
	});

	const updateLocale = (value: string) => {
		setLocale(value as Locales);
		localStorage.setItem("lang", value);
	};

	return (
		<Show when={ready()}>
			<DropdownMenu placement="top">
				<DropdownMenuTrigger
					as={(props: DropdownMenuSubTriggerProps) => (
						<Button {...props} variant="outline" class="gap-2 items-center">
							<Twemojify>{LL().flag()}</Twemojify> {LL().name()}{" "}
							<FaSolidChevronDown />
						</Button>
					)}
				/>
				<DropdownMenuContent>
					<DropdownMenuRadioGroup value={locale()} onChange={updateLocale}>
						<For each={Object.keys(loadedLocales) as Array<Locales>}>
							{(item) => (
								<DropdownMenuRadioItem closeOnSelect value={item} class="gap-2">
									<Twemojify>{i18nObject(item).flag()}</Twemojify>{" "}
									{i18nObject(item).name()}
								</DropdownMenuRadioItem>
							)}
						</For>
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</Show>
	);
}
