import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { Layout } from "./Components";
import { AuthPage, Home, NotFoundPage } from "./Pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
        {/* PUBLIC */}
      <Route path="" element={<AuthPage />} />
      
      <Route path="home" element={<Home />} />

      {/* CATCH-ALL */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
