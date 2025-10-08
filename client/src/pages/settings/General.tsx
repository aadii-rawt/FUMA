export default function General() {
    return (
        <section className="flex-1 p-6 lg:p-8">
            
              <div className="max-w-xl">
                <h2 className="text-lg font-semibold">General</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Change the settings for your current workspace
                </p>

                <label className="mt-6 block text-xs font-medium text-gray-500">
                  Workspace Name
                </label>
                <input
                //   value={name}
                //   onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500/40"
                  placeholder="Workspace name"
                />

                <button
                  onClick={() => console.log("update:", name)}
                  className="mt-5 w-full rounded-lg bg-purple-600 hover:bg-purple-600/90 text-white text-sm font-semibold py-2.5"
                >
                  Update
                </button>

                <hr className="my-6" />

                <button
                  onClick={() => console.log("refresh permissions")}
                  className="w-full rounded-lg bg-purple-600 hover:bg-purple-600/90 text-white text-sm font-semibold py-2.5"
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
            

            {/* {tab === "members" && (
              <div className="max-w-xl">
                <h2 className="text-lg font-semibold">Members</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Invite teammates and manage roles.
                </p>
                <div className="mt-6 rounded-xl border p-4 text-sm text-gray-500">
                  Placeholder list — wire to your data later.
                </div>
              </div>
            )} */}

            {/* {tab === "billing" && (
              <div className="max-w-xl">
                <h2 className="text-lg font-semibold">Billing</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Plan, invoices, and payment method.
                </p>
                <div className="mt-6 rounded-xl border p-4 text-sm text-gray-500">
                  Billing details placeholder.
                </div>
              </div>
            )} */}
          </section> 
    )
}