import {
  createBrowserRouter
} from "react-router-dom"
import Login from "../pages/login/Login"
import RootElement from "../pages/RootElement"
import Dashboard from "../pages/dashboard/Dashboard"
import Cadastro from "../pages/cadastro/Cadastro"
import Procedimento from "../pages/procedimento/Procedimento"
import Relatorio from "../pages/relatorio/Relatorio"
import Admin from "../pages/admin/Admin"
import EditCadastro from "../pages/editCadastro/EditCadastro"

export const router = createBrowserRouter([
  {
    element: <RootElement />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "/cadastro",
        element: <Cadastro />
      },
      {
        path: '/procedimentos',
        element: <Procedimento />
      },
      {
        path: '/relatorios',
        element: <Relatorio />
      },
      {
        path: '/cadastro/:id',
        element: <EditCadastro />
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: '/admin',
    element: <Admin />
  }
])