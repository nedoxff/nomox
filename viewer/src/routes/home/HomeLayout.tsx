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

export default function HomeLayout(props: ParentProps) {
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
								Home
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
								Explore
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
								Notifications
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
								Messages
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
								Bookmarks
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
								Profile
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
								Settings
							</HomeCategoryButton>
						</div>
						<HomeProfileButton />
					</div>
				</div>
				<div class="col-span-2">{props.children}</div>
				<div class="col-span-1"> </div>
			</div>
		</div>
	);
}
