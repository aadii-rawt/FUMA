import useUser from "../../context/userContext"

export default function General() {
  const { user } = useUser()

  const refreshPermissions = async () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/instagram/connect`
  }

  return (
    <section className="flex-1 p-6 lg:p-8">

      <div className="max-w-xl">
        <h2 className="text-lg font-semibold">General</h2>
        <p className="mt-1 text-sm text-gray-500">
          Change the settings for your current workspace
        </p>

        <div className="my-5">
          <p className="text-gray-500"><span>Email : </span> {user?.email}</p>
          <p className="text-gray-500"><span>Instagram : </span> {user?.username}</p>
        </div>
        <hr className="my-6" />

        <button
          onClick={refreshPermissions}
          className="w-full cursor-pointer rounded-lg bg-purple-600 hover:bg-purple-600/90 text-white text-sm font-semibold py-2.5"
        >
          Refresh Permissions
        </button>

        <p className="mt-4 text-sm text-gray-500 leading-6">
          Instagram can unexpectedly lose the connection to your page
          permissions. If you encounter any trouble, like content not
          sending or setting not saving, always refresh your permissions
          first.
        </p>
      </div>

    </section>
  )
}