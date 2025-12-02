import { useUserContext } from "@/context/UserContext"

const Profile = () => {
    const { userData } = useUserContext()

    return (
        <div className="px-3">
            <div className="text-base">
                <p className=" justify-between flex border-b pb-5">
                    <span>Username</span> {userData?.username ?? "—"}
                </p>
                <p className=" justify-between flex border-b py-5">
                    <span>Email</span> {userData?.email ?? "—"}
                </p>
                {/* <p className=" justify-between flex border-b py-5">
                    <span>User ID:</span> {userData?.userId ?? "—"}
                </p> */}
                <p className="justify-between flex border-b py-5">
                    <span>Authenticated</span>{" "}
                    {userData?.auth ? "Yes" : "No"}
                </p>
                <div className="justify-between items-center flex border-b py-3">
                    Logout of all devices <button className="text-destructive bg-destructive/5 hover:bg-destructive/10 rounded-full border-destructive/25 border py-2 px-5 transition-all duration-300 ease-in-out cursor-pointer">Logout</button>
                </div>
                <div className="justify-between items-center flex border- py-3">
                    Delete Account <button className="text-destructive bg-destructive/5 hover:bg-destructive/10 rounded-full border-destructive/25 border py-2 px-5 transition-all duration-300 ease-in-out cursor-pointer">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Profile