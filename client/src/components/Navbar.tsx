import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import logoutMutation from "../graphql/mutations/logout";
import getCurrentUser from "../graphql/queries/getCurrentUser";
import { Query, Mutation } from "../graphql/generated-types";

const Navbar = () => {
  const {
    error: queryError,
    data: queryData,
    loading: queryLoading,
  } = useQuery<Query>(getCurrentUser);
  const [logout] = useMutation<Mutation>(logoutMutation, {
    refetchQueries: [{ query: getCurrentUser }],
  });

  return (
    <div className="flex flex-row justify-end py-10 px-96">
      <div className="flex flex-row justify-between w-3/12">
        {!queryLoading && !queryError && queryData && queryData.me ? (
          <>
            <p>Welcome {queryData.me.email}</p>
            <button
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
