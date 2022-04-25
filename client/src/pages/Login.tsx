import {Link} from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Login and manage your <span className="text-slate-700">projects</span>
      </h1>
      <form className="bg-white my-10 rounded-lg px-10 py-5 shadow">
        <div className="flex flex-col -mx-6">
          <div className="w-full mb-6 md:mb-3">
            <label className="text-gray-600 text-xl font-bold mb-5 " htmlFor="grid-first-name">
              Email
            </label>
            <input
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:shadow"
              id="grid-first-name"
              type="text"
              placeholder="user@email.com"
            />
          </div>
          <div className="w-full mb-6 md:mb-3">
            <label className="text-gray-600 text-xl font-bold  mb-2" htmlFor="grid-last-name">
              Password
            </label>
            <input
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 focus:outline-none focus:shadow"
              id="grid-last-name"
              type="password"
              placeholder="password"
            />
          </div>

          <input
            type="submit"
            className="bg-sky-700 text-white text-xl  p-3 rounded-md mt-5 cursor-pointer hover:bg-sky-800 transition-colors focus:outline-none focus:shadow"
            value="Login"
          />
        </div>
      </form>
      <nav className="lg:flex lg:justify-between px-5">
        <Link to="/register" className="block text-center my-5 text-slate-600  text-lg">
          Sign up
        </Link>
        <Link to="/forgot-password" className="block text-center my-5 text-slate-600  text-lg">
          Forgot password
        </Link>
      </nav>
    </div>
  );
};

export default Login;
