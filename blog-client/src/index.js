import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "antd/dist/antd.css";
import "./index.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
const client = new ApolloClient({
  uri: ""
});

const render = Component => {
  return ReactDOM.render(
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>,
    document.getElementById("root")
  );
};
render(App);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(NextApp);
  });
}

serviceWorker.unregister();
