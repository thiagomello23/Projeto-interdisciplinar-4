import {} from 'react'
import {
  RouterProvider
} from "react-router-dom"
import { router } from "../routes/route"

export default function Router() {
  return (
    <RouterProvider router={router} />
  )
}
