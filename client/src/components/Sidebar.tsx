import {Link} from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <h1 className="text-xl font-bold">Hello Victor</h1>
      <Link
        to="create-project"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-md">
        New Project
      </Link>
    </aside>
  );
};

export default Sidebar;
