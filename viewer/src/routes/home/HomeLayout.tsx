import { useLocation, useNavigate } from "@solidjs/router";
import { createEffect, type ParentProps } from "solid-js";
import HomeCategoryButton from "./HomeCategoryButton";
import {
	IoBookmark,
	IoBookmarkOutline,
	IoHome,
	IoHomeOutline,
	IoMail,
	IoMailOutline,
	IoNotifications,
	IoNotificationsOutline,
	IoPerson,
	IoPersonOutline,
	IoSearch,
	IoSearchOutline,
	IoSettings,
	IoSettingsOutline,
} from "solid-icons/io";
import HomeProfileButton from "./HomeProfileButton";
import { useI18nContext } from "~/i18n/i18n-solid";
import { Card, CardContent } from "~/components/ui/card";
import Replace from "~/components/Replace";

export default function HomeLayout(props: ParentProps) {
	const { LL } = useI18nContext();
	const navigate = useNavigate();
	const location = useLocation();

	createEffect(() => {
		const auth = localStorage.getItem("auth");
		if (auth === null) {
			navigate("/login", { replace: true });
		}
	});

	return (
		<div class="w-dvw h-dvh flex justify-center items-center">
			<div class="w-[65%] grid grid-cols-4 grid-row-1 h-full">
				<div class="col-span-1">
					<div class="sticky self-start p-5 top-0 h-dvh flex flex-col justify-between">
						<div class="flex flex-col gap-2 [&>*]:w-full">
							<HomeCategoryButton
								onClick={() => navigate("home", { replace: true })}
								icon={(selected, size) =>
									selected ? (
										<IoHome size={size} />
									) : (
										<IoHomeOutline size={size} />
									)
								}
								selected={location.pathname === "/home"}
							>
								{LL().main.tabs.home()}
							</HomeCategoryButton>
							<HomeCategoryButton
								icon={(selected, size) =>
									selected ? (
										<IoSearch size={size} />
									) : (
										<IoSearchOutline size={size} />
									)
								}
								selected={location.pathname === "/explore"}
							>
								{LL().main.tabs.explore()}
							</HomeCategoryButton>
							<HomeCategoryButton
								icon={(selected, size) =>
									selected ? (
										<IoNotifications size={size} />
									) : (
										<IoNotificationsOutline size={size} />
									)
								}
								selected={location.pathname === "/notifications"}
							>
								{LL().main.tabs.notifications()}
							</HomeCategoryButton>
							<HomeCategoryButton
								icon={(selected, size) =>
									selected ? (
										<IoMail size={size} />
									) : (
										<IoMailOutline size={size} />
									)
								}
								selected={location.pathname === "/messages"}
							>
								{LL().main.tabs.messages()}
							</HomeCategoryButton>
							<HomeCategoryButton
								icon={(selected, size) =>
									selected ? (
										<IoBookmark size={size} />
									) : (
										<IoBookmarkOutline size={size} />
									)
								}
								selected={location.pathname === "/bookmarks"}
							>
								{LL().main.tabs.bookmarks()}
							</HomeCategoryButton>
							<HomeCategoryButton
								icon={(selected, size) =>
									selected ? (
										<IoPerson size={size} />
									) : (
										<IoPersonOutline size={size} />
									)
								}
								selected={location.pathname === "/profile"}
							>
								{LL().main.tabs.profile()}
							</HomeCategoryButton>
							<HomeCategoryButton
								icon={(selected, size) =>
									selected ? (
										<IoSettings size={size} />
									) : (
										<IoSettingsOutline size={size} />
									)
								}
								selected={location.pathname === "/settings"}
							>
								{LL().main.tabs.settings()}
							</HomeCategoryButton>
						</div>
						<HomeProfileButton />
					</div>
				</div>
				<div class="col-span-2">{props.children}</div>
				<div class="col-span-1">
					<div class="sticky self-start p-5 pr-0 top-0 h-dvh">
						<Card>
							<CardContent class="py-4">
								<Replace
									text={LL().main.info.projectDescription()}
									by={/(\[GITHUB\])/gi}
									replacement={
										<a
											class="text-brand hover:underline"
											target="_blank"
											rel="noreferrer"
											href="https://github.com/nedoxff/nomox"
										>
											github
										</a>
									}
								/>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
