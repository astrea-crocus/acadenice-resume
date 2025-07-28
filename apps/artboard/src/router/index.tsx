import { createBrowserRouter, createRoutesFromChildren, Route } from "react-router";

import { ArtboardPage } from "../pages/artboard";
import { BuilderLayout } from "../pages/builder";
import { PreviewLayout } from "../pages/preview";
import { ResumePreviewLayout } from "../pages/resume-preview";
import { Providers } from "../providers";

export const routes = createRoutesFromChildren(
  <Route element={<Providers />}>
    <Route path="artboard" element={<ArtboardPage />}>
      <Route path="builder" element={<BuilderLayout />} />
      <Route path="preview" element={<PreviewLayout />} />
      <Route path="resume-preview" element={<ResumePreviewLayout />} />
    </Route>
  </Route>,
);

export const router = createBrowserRouter(routes);
