import { ApolloProvider } from "@apollo/client";
import { BrowserRouter, Route } from "react-router-dom";

import client from "../client";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navbar />
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
