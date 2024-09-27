import { Routes as Switch, Route, Navigate } from "react-router-dom";
import { UserProfilePage } from "../pages/usuario";
import { PrivateRoute, LoginAuth } from "./PrivateRoutes";
import { LoginPage } from "../pages/login";
import { NotFound } from "../pages/notFound";
import { Unauthorized } from "../pages/unauthorized";
import { EmployeeRecords } from "../pages/arquivo";
import { Navbar } from "../components/navbar";
import { EmployeeDetails } from "../pages/arquivo-detalhes";

const Routes = () => {
  return (
    <>
      {/* Barra de navegação, exceto na página de login */}
      <Navbar />

      <Switch>
        {/* Página de login */}
        <Route
          path="/login"
          element={
            <LoginAuth>
              <LoginPage />
            </LoginAuth>
          }
        />

        {/* Rota protegida */}
        <Route element={<PrivateRoute roles={["ADMIN"]} />}>
          <Route path="/users" element={<UserProfilePage />} />
        </Route>

        <Route element={<PrivateRoute roles={["USER" ]} />}>
          <Route path="/arquivo" element={<EmployeeRecords />} />
          <Route path="/arquivo/:id" element={<EmployeeDetails />} />
        </Route>

        {/* Página de autorização negada */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Página não encontrada */}
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Switch>
    </>
  );
};

export { Routes };
