import LocaleDropdownMenu from "../../components/LocaleDropdownMenu";
import { Button } from "../../components/ui/button";
import { useI18nContext } from "../../i18n/i18n-solid";
import ThemeSwitchButton from "../../components/ThemeSwitchButton";
import { createSignal, Show } from "solid-js";
import NonEmptyTextField from "./NonEmptyTextField";
import LoadingIndicator from "../../components/loading_indicator/LoadingIndicator";
import { login } from "../../api/auth";
import { toast } from "solid-sonner";
import { useNavigate } from "@solidjs/router";
import { IoEllipse } from "solid-icons/io";

export default function Login() {
	const { LL } = useI18nContext();
	const navigate = useNavigate();

	const [loggingIn, setLoggingIn] = createSignal(false);
	const [id, setId] = createSignal("");
	const [password, setPassword] = createSignal("");

	const tryLogin = async () => {
		if (id() === "" || password() === "") {
			return;
		}
		setLoggingIn(true);

		const result = await login(id(), password());
		if (result === null) {
			toast.error("Failed to login");
			setLoggingIn(false);
		} else {
			localStorage.setItem(
				"auth",
				btoa(`${result.oauthToken}:${result.oauthTokenSecret}`),
			);
			navigate("/home");
		}
	};

	return (
		<div class="w-dvh grid h-dvh grid-cols-2 grid-rows-1 dark:bg-background">
			<div class="col-span-1 m-5 flex items-center justify-center rounded-xl bg-foreground">
				<p class="text-center text-xl text-background">
					{LL().login.noGraphic()}
				</p>
			</div>
			<div class="col-span-1 flex flex-col p-10 justify-between">
				<div />
				<div>
					<h1 class="text-5xl dark:text-light">{LL().login.title()}</h1>
					<p class="text-xl dark:text-light mt-2">{LL().login.description()}</p>
					<p class="text-xl dark:text-light">
						{LL().login.loginInstructions()}
					</p>

					<div class="mt-6 flex max-w-[50%] flex-col gap-2">
						<NonEmptyTextField
							disabled={loggingIn()}
							label={LL().login.id()}
							placeholder={LL().login.idPlaceholder()}
							type="text"
							onChange={setId}
						/>
						<NonEmptyTextField
							disabled={loggingIn()}
							label={LL().login.password()}
							placeholder={LL().login.passwordPlaceholder()}
							type="password"
							onChange={setPassword}
						/>

						<Button
							variant="outline"
							class={`w-fit mt-2 ${loggingIn() ? "px-2" : "px-4"}`}
							disabled={loggingIn()}
							onClick={() => tryLogin()}
						>
							<Show
								when={!loggingIn()}
								fallback={<LoadingIndicator scale={0.25} />}
							>
								{LL().login.login()}
							</Show>
						</Button>
					</div>
				</div>
				<div class="flex flex-row items-center gap-2">
					<LocaleDropdownMenu />
					<IoEllipse size={5} />
					<ThemeSwitchButton />
					<IoEllipse size={5} />
					<a
						target="_blank"
						rel="noreferrer"
						href="https://github.com/nedoxff/nomox"
						class="hover:underline"
					>
						{LL().login.sourceCode()}
					</a>
				</div>
			</div>
		</div>
	);
}
