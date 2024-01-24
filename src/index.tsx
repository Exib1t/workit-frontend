import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import AppRouter from "./router/AppRouter.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme/theme.ts";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import "./assets/styles/common.scss";

const firebaseConfig = {
  apiKey: "AIzaSyBLTIObAewsODe38Ojb-RwhY05XW3VyK1Y",
  authDomain: "workit-2a960.firebaseapp.com",
  projectId: "workit-2a960",
  storageBucket: "workit-2a960.appspot.com",
  messagingSenderId: "739378291395",
  appId: "1:739378291395:web:e8a87cef5fab22a469f876",
  measurementId: "G-C1S468C7XG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <AppRouter />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
