
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <div className="w-64 p-5 text-white bg-black border-r border-gray-800">
      <h2 className="text-lg font-bold text-cyan-400 mb-4">ADMIN PANEL</h2>
      <ul className="space-y-3">
        <li>
          <NavLink
            to="/dashboard/admin/createcollection"
            className={({ isActive }) =>
              `block px-2 py-1 rounded transition ${
                isActive ? 'text-white bg-gray-800 font-medium' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Create Collection
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/createproduct"
            className={({ isActive }) =>
              `block px-2 py-1 rounded transition ${
                isActive ? 'text-white bg-gray-800 font-medium' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Create Product
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/admin/manageusers"
            className={({ isActive }) =>
              `block px-2 py-1 rounded transition ${
                isActive ? 'text-white bg-gray-800 font-medium' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Manage Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;