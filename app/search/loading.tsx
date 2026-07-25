export default function Loading() {
  return (
    <main className="min-h-screen py-10 px-[5%]">
      <div className="h-9 w-72 mx-auto bg-gray-200 animate-pulse rounded mb-8" />
      <div className="flex flex-wrap justify-center gap-5">
        {Array.from(new Array(12)).map((_, i) => (
          <div
            key={i}
            className="w-56 h-80 bg-gray-200 animate-pulse rounded-xl"
          />
        ))}
      </div>
    </main>
  );
}
