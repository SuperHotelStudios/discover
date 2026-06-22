export default function Advertise() {
  return (
    <div className="max-w-4xl mx-auto py-32 px-6">

      <h1 className="text-5xl font-bold">
        Advertise Your Server
      </h1>

      <form className="mt-10 space-y-6">

        <input
          placeholder="Server Name"
          className="w-full p-4 rounded-xl bg-white/5"
        />

        <input
          placeholder="Discord Invite"
          className="w-full p-4 rounded-xl bg-white/5"
        />

        <textarea
          placeholder="Description"
          rows="5"
          className="w-full p-4 rounded-xl bg-white/5"
        />

        <button className="bg-indigo-600 px-8 py-3 rounded-xl">
          Submit
        </button>

      </form>

    </div>
  );
}