import { useUserContext } from "@/context/UserContext";
const X = () => {
    const { userData } = useUserContext();
    return (
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
        </div>
    )
}

export default X
