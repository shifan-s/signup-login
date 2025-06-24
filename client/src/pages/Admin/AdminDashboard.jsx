import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import AdminMenu from '../../components/AdminMenu';

const AdminDashboard = () => {
  const { auth } = useContext(AuthContext);
  const user = auth?.user;

  return (
    <div className="w-full h-full py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto flex gap-10">
        <AdminMenu />
        <div className="py-6 space-y-6">
          <InfoRow label="Name:" value={user?.name} className="text-pink-400 uppercase" />
          <InfoRow label="Email:" value={user?.email} className="lowercase" />
          <InfoRow label="Contact:" value={user?.phone} className="uppercase" />
          <InfoRow label="Address:" value={user?.address} className="lowercase" />
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, className = '' }) => (
  <div>
    <span className="text-gray-400">{label}</span>
    <span className={`ml-6 font-semibold tracking-wide ${className}`}>{value}</span>
  </div>
);

export default AdminDashboard;
