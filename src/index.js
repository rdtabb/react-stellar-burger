import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ConstructorProvider } from "./context/ConstructorContext";
import { Provider } from "react-redux";
import { store } from "./store/store";

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <ConstructorProvider>
          <App />
        </ConstructorProvider>
      </Provider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
