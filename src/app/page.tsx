export default function HomePage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        ESOP Dashboard
      </h1>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 bg-white rounded-xl shadow">
          Token Overview
        </div>

        <div className="p-4 bg-white rounded-xl shadow">
          Transactions
        </div>
      </div>
    </main>
  )
}
