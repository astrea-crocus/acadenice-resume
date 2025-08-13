import { createBrowserRouter, createRoutesFromChildren, Route } from "react-router";

import { HomePage } from "../pages/home";
import { PreviewLayout } from "../pages/preview";
import { Providers } from "../providers";

export const routes = createRoutesFromChildren(
  <Route element={<Providers />}>
    <Route path="preview" element={<HomePage />}>
      <Route path=":template" element={<PreviewLayout />} />
    </Route>
  </Route>,
);

export const router = createBrowserRouter(routes);
