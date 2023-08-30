import {
  createBrowserRouter
} from "react-router-dom"
import Login from "../pages/login/Login"
import RootElement from "../pages/RootElement"
import Dashboard from "../pages/dashboard/Dashboard"
import Cadastro from "../pages/cadastro/Cadastro"
import Procedimento from "../pages/procedimento/Procedimento"
import Relatorio from "../pages/relatorio/Relatorio"

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
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  }
])