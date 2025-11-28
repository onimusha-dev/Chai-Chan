import { ModeToggle } from "@/components/theme/mode-toggle";
import { useUserContext } from "@/context/AuthContext";

const SettingsPage = () => {
	const { userData } = useUserContext();

	return (
		<div className="h-full w-full flex flex-col items-center py-10 px-24 pt-20 pb-10">
			<h1 className="text-3xl font-semibold mb-8 select-none">Settings</h1>

			<div className="w-full max-w-md space-y-6">
				{/* User Info */}
				<div className="border p-6 rounded-xl bg-muted/40">
					<h2 className="text-xl font-medium mb-4 select-none">Account Information</h2>

					<div className="space-y-2 text-base">
						<p className=" justify-between flex ">
							<span className="font-semibold">Username:</span> {userData?.username ?? "—"}
						</p>
						<p className=" justify-between flex ">
							<span className="font-semibold">Email:</span> {userData?.email ?? "—"}
						</p>
						<p className=" justify-between flex ">
							<span className="font-semibold">User ID:</span> {userData?.userId ?? "—"}
						</p>
						<p className=" justify-between flex ">
							<span className="font-semibold">Authenticated:</span>{" "}
							{userData?.auth ? "Yes" : "No"}
						</p>
					</div>
				</div>

				{/* Theme */}
				<div className="border p-6 rounded-xl bg-muted/40 flex items-center justify-between">
					<h2 className="text-xl font-medium select-none">Theme</h2>
					<ModeToggle />
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
