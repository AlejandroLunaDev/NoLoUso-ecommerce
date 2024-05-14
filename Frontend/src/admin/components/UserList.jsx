import React, { useContext } from "react";
import { UserContext } from "@/auth/context/UserContext";

const UsersList = () => {
  const { users } = useContext(UserContext);
console.log(users)
  return (
    <div>
      <h2>Listado de Usuarios</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <div className="flex items-center">
              <span className="inline-block w-4 h-4 rounded-full mr-2" style={{ backgroundColor: user.online ? 'green' : 'gray' }}></span>
              <span>{user.first_name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
