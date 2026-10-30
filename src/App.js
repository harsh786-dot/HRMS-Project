import { RouterProvider } from "react-router-dom";
import "./App.css";
import "./styles/variable.css";
import { store } from "./store/Store";
import { Provider } from "react-redux";
import router from "./constants/routes";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;