import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { Layout } from "./Components";
import { AuthPage, Board, NotFoundPage } from "./Pages";
import PublicOnlyRoute from "./Utils/route/PublicOnlyRoute";
import PrivateRoute from "./Utils/route/PrivateRoute";
import AuthGate from "./Utils/route/AuthGate";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AuthGate />}>
      <Route path="" element={<Layout />}>
        {/* PUBLIC */}
        <Route index element={<PublicOnlyRoute Component={AuthPage} />} />

        {/* PRIVATE */}
        <Route path="board" element={<PrivateRoute Component={Board} />} />

        {/* CATCH-ALL */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
