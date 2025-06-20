function NotFound() {
  return (
    <div className='text-center py-5 my-5'>
      <h1 className="fw-bold">This page is not found</h1>
      <p>It seems you are on the wrong path. Try to go back to the home page.</p>
      <a href="/">
        <a>Go Back to Home Page</a>
      </a>
    </div>
  );
}
export default NotFound;