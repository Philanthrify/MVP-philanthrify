import App from "@/App";
import "@/index.css";
import { store } from "@/redux/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// export const store = configureStore({
//   reducer: { [api.reducerPath]: api.reducer },
//   middleware: (getDefault) => getDefault().concat(api.middleware),
// });
setupListeners(store.dispatch);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
