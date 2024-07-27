/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import "overlayscrollbars/overlayscrollbars.css";

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
import { Toaster } from "solid-sonner";
import { OverlayScrollbarsComponent } from "overlayscrollbars-solid";
import { setThemeStore } from "./lib/stores";
import UserProfile from "./routes/home/user/UserProfile";

const Login = lazy(() => import("./routes/login/Login"));
const Playground = lazy(() => import("./routes/playground/Playground"));
const HomeLayout = lazy(() => import("./routes/home/HomeLayout"));
const HomeTimeline = lazy(() => import("./routes/home/HomeTimeline"));

const app = document.getElementById("app");
if (app === null) {
	console.error("failed to render the app: cannot find the root container");
} else {
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
					<OverlayScrollbarsComponent defer>
						<Router>
							<Route path="/login" component={Login} />
							<Route path="playground" component={Playground} />
							<Route path="/" component={HomeLayout}>
								<Route
									path="/"
									preload={() => useNavigate()("/home", { replace: true })}
								/>
								<Route path="/home" component={HomeTimeline} />
								<Route path="/user/:username" component={UserProfile} />
							</Route>
						</Router>
					</OverlayScrollbarsComponent>
				</TypesafeI18n>
			</Show>
		);
	}, app);
}
