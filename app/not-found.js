import Link from "next/link";
function NotFound() {
  return (
    <main className="text-center h-175 flex flex-col justify-center items-center">
      <h1 className="font-bold text-red-600 text-2xl">This page not found</h1>
      <p>
        It seems you are on the wrong path. Try to go back to the{" "}
        <Link href="/" className="text-primary underline">
          home page
        </Link>
        .
      </p>
    </main>
  );
}
export default NotFound;
