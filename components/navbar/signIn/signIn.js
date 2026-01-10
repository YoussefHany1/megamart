const SignInModal = ({ show, handleClose }) => {
  // إذا لم يكن المودال مطلوباً للعرض، لا نرجع شيئاً
  if (!show) return null;

  return (
    // 1. الخلفية (Overlay) - تغطي الشاشة وتجعل المحتوى في المنتصف
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* 2. جسم المودال (Modal Content) */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden animate-fade-in-down">
        {/* Modal Body */}
        <div className="p-6">
          {/* Logo Heading */}
          <h1 className="text-center font-bold text-4xl text-(--primary) mb-8 mt-4">
            MegaMart
          </h1>

          <form className="space-y-4 px-2">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email address or phone number"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-(--primary) focus:outline-none focus:ring-2 focus:ring-(--primary)/50"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-700 focus:border-(--primary) focus:outline-none focus:ring-2 focus:ring-(--primary)/50"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center mb-6">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-(--primary) focus:ring-(--primary)"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-gray-700 select-none"
              >
                Remember Me
              </label>
            </div>
          </form>

          {/* Helper Links */}
          <div className="mt-4 px-2 space-y-2">
            <div>
              <a
                href="#"
                className="font-semibold text-(--primary) hover:text-blue-800 hover:underline"
              >
                Forget password?
              </a>
            </div>
            <div className="text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="font-bold text-(--primary) hover:text-blue-800 hover:underline"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition duration-200"
          >
            Close
          </button>
          <button className="rounded bg-(--primary) px-4 py-2 text-white hover:bg-blue-700 transition duration-200">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
