import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "@tower-of-hanoi/components/App";
import store from "@tower-of-hanoi/redux/store";
import "@tower-of-hanoi/index.css";

// Because we `defer` this script in the entrypoint (index.html), we can assert
// the app can be populated within <div id="root" />
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
