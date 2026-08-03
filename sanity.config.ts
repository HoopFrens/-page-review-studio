"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import {
  sanityDataset,
  sanityPreviewOrigin,
  sanityProjectId,
} from "./sanity/env";
import { resolve } from "./sanity/presentation/resolve";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const developerTools = process.env.NODE_ENV === "development" ? [visionTool()] : [];

export default defineConfig({
  name: "default",
  title: "Page Review Studio",
  basePath: "/studio",
  projectId: sanityProjectId,
  dataset: sanityDataset,
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve,
      previewUrl: {
        origin: sanityPreviewOrigin,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      allowOrigins: [
        "http://localhost:*",
        "https://pagereviewstudio.com",
        "https://www.pagereviewstudio.com",
      ],
    }),
    ...developerTools,
  ],
  schema: { types: schemaTypes },
});
