import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import { ConstructorProvider } from "./context/ConstructorContext";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConstructorProvider>
        <App />
      </ConstructorProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
