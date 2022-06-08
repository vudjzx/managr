import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:flex-row md:justify-between flex flex-col items-center">
        <Link className="text-4xl text-sky-600 font-black text-center py-2" to="/projects">
          Managr
        </Link>

        <input
          type="search"
          placeholder="Search project"
          className="rounded-lg lg:w-96 block p-2 border"
        />

        <div className="flex items-center gap-4 py-2">
          <Link to="/projects" className="font-bold uppercase">
            Projects
          </Link>
          <button
            type="button"
            className="text-white text-sm bg-sky-600 rounded-md uppercase font-bold p-3">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
