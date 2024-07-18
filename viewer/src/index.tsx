/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import { Route, Router, useNavigate } from "@solidjs/router";
import { createEffect, createSignal, lazy, Show } from "solid-js";
import { detectLocale } from "./i18n/i18n-util";
import {
	htmlLangAttributeDetector,
	localStorageDetector,
	navigatorDetector,
} from "typesafe-i18n/detectors";
import TypesafeI18n from "./i18n/i18n-solid";
import { loadLocaleAsync } from "./i18n/i18n-util.async";
import { setThemeStore } from "./lib/stores/ThemeStore";
import { Toaster } from "solid-sonner";

const Login = lazy(() => import("./routes/login/Login"));
const HomeLayout = lazy(() => import("./routes/home/HomeLayout"));
const HomeTimeline = lazy(() => import("./routes/home/HomeTimeline"));

render(() => {
	const [loaded, setLoaded] = createSignal(false);
	const detectedLocale = detectLocale(
		localStorageDetector,
		navigatorDetector,
		htmlLangAttributeDetector,
	);
	createEffect(() => {
		const storedTheme = localStorage.getItem("theme");
		const isDark =
			(storedTheme ?? "") === "dark" ||
			window.matchMedia("(prefers-color-scheme: dark)").matches;
		const name = isDark ? "dark" : "light";

		setThemeStore({ theme: name });
		if (isDark) {
			document.documentElement.classList.add("dark");
		}
		if (storedTheme === null) {
			localStorage.setItem("theme", name);
		}

		loadLocaleAsync(detectedLocale).then(() => setLoaded(true));
	});

	return (
		<Show when={loaded()}>
			<TypesafeI18n locale={detectedLocale}>
				<Toaster />
				<Router>
					<Route path="/login" component={Login} />
					<Route path="/" component={HomeLayout}>
						<Route
							path="/"
							preload={() => useNavigate()("/home", { replace: true })}
						/>
						<Route path="/home" component={HomeTimeline}></Route>
					</Route>
				</Router>
			</TypesafeI18n>
		</Show>
	);
}, document.getElementById("app")!);
