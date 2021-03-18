import { useMutation } from "@apollo/client";
import { useState } from "react";

import registerMutation from "../graphql/mutations/register";
import getCurrentUser from "../graphql/queries/getCurrentUser";
import { Mutation, MutationRegisterArgs } from "../graphql/generated-types";

const Register = () => {
  const [register, { error, loading }] = useMutation<
    Mutation,
    MutationRegisterArgs
  >(registerMutation, {
    refetchQueries: [{ query: getCurrentUser }],
  });

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          register({ variables: { data: { email, password } } });
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
        <button>Create an account</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div>Error</div>}
    </div>
  );
};

export default Register;
