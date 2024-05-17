import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/auth/context/AuthProvider";

const UsersList = () => {
  const { usersList, fetchUsersList } = useContext(AuthContext);

  useEffect(() => {
    fetchUsersList();
  }, [fetchUsersList]);


  return (
    <div>
      <h2>Listado de Usuarios</h2>
      <ul>
        {usersList.map((user) => (
          <li key={user._id}>
            <div className="flex items-center">
              <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ backgroundColor: user.online ? 'green' : 'gray' }}></span>
              <div className="flex gap-1">
              <span>{user.first_name}</span>
              <span>{user.last_name}</span>
              </div>

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
