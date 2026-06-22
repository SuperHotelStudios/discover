export default function Stats() {
  return (
    <section className="mt-40">
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">

        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl text-center">
          <h2 className="text-5xl font-bold text-indigo-400">
            500+
          </h2>
          <p className="text-gray-400 mt-2">
            Servers
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl text-center">
          <h2 className="text-5xl font-bold text-purple-400">
            25K+
          </h2>
          <p className="text-gray-400 mt-2">
            Members
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl text-center">
          <h2 className="text-5xl font-bold text-cyan-400">
            100+
          </h2>
          <p className="text-gray-400 mt-2">
            Advertisements
          </p>
        </div>

      </div>
    </section>
  );
}