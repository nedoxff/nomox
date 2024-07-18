import { createEffect, Match, Switch } from "solid-js";
import { Button } from "./ui/button";
import { setThemeStore, themeStore } from "../lib/stores/ThemeStore";
import { FaSolidMoon, FaSolidSun } from "solid-icons/fa";

export default function ThemeSwitchButton() {
	const toggleTheme = () => {
		setThemeStore({ theme: themeStore.theme === "dark" ? "light" : "dark" });
	};

	createEffect(() => {
		if (
			themeStore.theme === "dark" &&
			!document.documentElement.classList.contains("dark")
		) {
			document.documentElement.classList.add("dark");
		} else if (
			themeStore.theme === "light" &&
			document.documentElement.classList.contains("dark")
		) {
			document.documentElement.classList.remove("dark");
		}
	});

	return (
		<Button variant="outline" onClick={toggleTheme}>
			<Switch>
				<Match when={themeStore.theme === "dark"}>
					<FaSolidSun />
				</Match>
				<Match when={themeStore.theme === "light"}>
					<FaSolidMoon />
				</Match>
			</Switch>
		</Button>
	);
}
