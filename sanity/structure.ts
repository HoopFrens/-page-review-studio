import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Page Review Studio")
    .items([
      S.documentTypeListItem("review")
        .title("Book Reviews")
        .child(
          S.documentTypeList("review")
            .title("Book Reviews")
            .defaultOrdering([{ field: "publishedOn", direction: "desc" }]),
        ),
    ]);
