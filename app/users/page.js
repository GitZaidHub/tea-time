"use client";

import { fetchUsers } from "@/action/userAction";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const users = async () => {
      setLoading(true);
      try {
        const response = await fetchUsers();

        setUsers(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    users();
  }, []);

  if (loading) {
    return (
      <div class="relative flex justify-center h-screen items-center">
    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
    <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"  class="rounded-full h-28 w-28"/>
</div>
  );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Creators</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {users.map((user) => (
        <div
        key={user._id}
        className="max-w-sm  bg-white shadow-lg rounded-lg text-gray-900 mx-auto"
      >
        <div className="rounded-t-lg h-36 overflow-hidden">
          {user.coverpic ? (
            <img
              className="object-cover w-full h-full"
              src={user.coverpic}
              alt="Cover"
            />
          ) : (
            <div className="flex items-center px-6 justify-center w-full h-full bg-gray-200 text-gray-500 font-semibold text-2xl">
              {user.username.toUpperCase()}
            </div>
          )}
        </div>
      
        <div className="w-28 h-28 relative -mt-14 mx-auto border-4 border-white rounded-full overflow-hidden bg-gray-200">
          {user.profilepic ? (
            <img
              className="object-cover w-full h-full"
              src={user.profilepic}
              alt={`${user.username} profile`}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500 font-semibold text-2xl">
              {user.username[0].toUpperCase()}
            </div>
          )}
        </div>
      
        <div className="text-center mt-4">
          <h2 className="font-semibold text-lg">{user.username}</h2>
          <p className="text-gray-500">{user.name}</p>
        </div>
      
        <div className="p-4 border-t mt-4 text-center">
          <Link href={`/${user.username}`} className="w-full rounded-full bg-gray-900 hover:bg-gray-500 hover:text-gray-900 font-semibold text-white px-6 py-2">
            Profile
          </Link>
        </div>
      </div>
      
      ))}
    </div>
  </div>
  

  
  );
};

export default UsersPage;
