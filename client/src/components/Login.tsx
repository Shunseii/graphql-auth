import { useMutation } from "@apollo/client";
import { useState } from "react";

import loginMutation from "../graphql/mutations/login";
import getCurrentUser from "../graphql/queries/getCurrentUser";
import { Mutation, MutationLoginArgs } from "../graphql/generated-types";

const Login = () => {
  const [login, { error, loading }] = useMutation<Mutation, MutationLoginArgs>(
    loginMutation,
    {
      refetchQueries: [{ query: getCurrentUser }],
    }
  );

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login({ variables: { email, password } });
          setEmail("");
          setPassword("");
        }}
      >
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          placeholder="Enter your email"
          type="email"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          placeholder="Enter your password"
          type="password"
        />
        <button>Login</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
    </div>
  );
};

export default Login;
