import Link from "next/link";
function NotFound() {
  return (
    <div className="text-center py-5 my-5">
      <h1 className="font-bold text-red-600">This page not found</h1>
      <p>
        It seems you are on the wrong path.{" "}
        <Link href="/">Try to go back to the home page.</Link>
      </p>
    </div>
  );
}
export default NotFound;
