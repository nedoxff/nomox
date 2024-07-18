import { useLocation, useNavigate } from "@solidjs/router";
import { createEffect, ParentProps } from "solid-js";
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
				<div class="col-span-1 p-5 flex flex-col gap-2 [&>*]:w-full">
					<HomeCategoryButton
						icon={(selected, size) =>
							selected ? <IoHome size={size} /> : <IoHomeOutline size={size} />
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
							selected ? <IoMail size={size} /> : <IoMailOutline size={size} />
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
				<div class="col-span-2 bg-background contrast-[0.95]">
					{props.children}
				</div>
				<div class="col-span-1"></div>
			</div>
		</div>
	);
}
