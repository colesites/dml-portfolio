import { SyntaxKind } from "ts-morph";
import { a } from "./chunk-BFNVF2P5.js";

var O = async ({ sourceFile: s, config: N }) => {
  const p = N.iconLibrary;
  if (!p || !(p in a)) return s;
  const f = p,
    m = a[f],
    g = [];
  for (const e of s.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement)) {
    if (e.getTagNameNode()?.getText() !== "IconPlaceholder") continue;
    const c = e
      .getAttributes()
      .find((r) =>
        r.getKind() !== SyntaxKind.JsxAttribute
          ? false
          : r.asKindOrThrow(SyntaxKind.JsxAttribute).getNameNode().getText() ===
            f,
      );
    if (!c) continue;
    const t = c.asKindOrThrow(SyntaxKind.JsxAttribute),
      n = t
        .getInitializer()
        ?.getText()
        .replace(/^["']|["']$/g, "");
    if (!n) continue;
    g.includes(n) || g.push(n);
    const d = m.usage.match(/<(\w+)([^>]*)\s*\/>/);
    t.remove();
    for (const r of e.getAttributes()) {
      if (r.getKind() !== SyntaxKind.JsxAttribute) continue;
      const a$1 = r.asKindOrThrow(SyntaxKind.JsxAttribute);
      a$1.getNameNode().getText() in a && a$1.remove();
    }
    if (!d) {
      e.getTagNameNode()?.replaceWithText(n);
      continue;
    }
    const [, x, T] = d;
    if (x === "ICON") {
      const r = e
        .getAttributes()
        .filter((a$1) =>
          a$1.getKind() !== SyntaxKind.JsxAttribute
            ? true
            : !(
                a$1
                  .asKindOrThrow(SyntaxKind.JsxAttribute)
                  .getNameNode()
                  .getText() in a
              ),
        )
        .map((a) => a.getText())
        .join(" ");
      r.trim()
        ? e.replaceWithText(`<${n} ${r} />`)
        : e.getTagNameNode()?.replaceWithText(n);
    } else {
      const r = new Set(
          e
            .getAttributes()
            .filter((o) => o.getKind() === SyntaxKind.JsxAttribute)
            .map((o) =>
              o.asKindOrThrow(SyntaxKind.JsxAttribute).getNameNode().getText(),
            ),
        ),
        A = T.replace(/\{ICON\}/g, `{${n}}`)
          .trim()
          .split(/\s+(?=\w+=)/)
          .filter((o) => o)
          .map((o) => {
            const h = o.split("=")[0];
            return h && !r.has(h) ? o : null;
          })
          .filter(Boolean),
        b = e
          .getAttributes()
          .filter((o) =>
            o.getKind() !== SyntaxKind.JsxAttribute
              ? true
              : !(
                  o
                    .asKindOrThrow(SyntaxKind.JsxAttribute)
                    .getNameNode()
                    .getText() in a
                ),
          )
          .map((o) => o.getText())
          .join(" "),
        I = [...A, b].filter(Boolean).join(" ");
      e.replaceWithText(`<${x} ${I} />`);
    }
  }
  for (const e of s.getImportDeclarations() ?? [])
    if (e.getModuleSpecifier()?.getText()?.includes("icon-placeholder")) {
      const n = (e.getNamedImports() ?? []).find(
        (u) => u.getName() === "IconPlaceholder",
      );
      n && n.remove(), e.getNamedImports()?.length === 0 && e.remove();
    }
  if (g.length > 0) {
    const e = m.import.split(`
`),
      c = [];
    for (const t of e) {
      const n = t.match(/import\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/);
      if (!n) continue;
      const [, u, d] = n,
        x = u
          .split(",")
          .map((r) => r.trim())
          .flatMap((r) =>
            r === "ICON" ? g.map((a) => ({ name: a })) : { name: r },
          ),
        T = s.addImportDeclaration({ moduleSpecifier: d, namedImports: x });
      c.push(T);
    }
    if (!K(s))
      for (const t of c) t.replaceWithText(t.getText().replace(";", ""));
  }
  return s;
};
function K(s) {
  return s.getImportDeclarations()?.[0]?.getText().endsWith(";") ?? false;
}
var W = async ({ sourceFile: s, config: N }) => {
  const f = N.menuColor === "inverted" ? "dark" : "";
  for (const m of s.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
    if (m.getNameNode().getText() !== "className") continue;
    const e = m.getInitializer();
    if (!e) continue;
    const c = e.getText();
    if (!c.includes("cn-menu-target")) continue;
    let t = c.replace(/cn-menu-target/g, f);
    f ||
      ((t = t.replace(/\s{2,}/g, " ")),
      (t = t.replace(/"\s+/g, '"')),
      (t = t.replace(/\s+"/g, '"')),
      (t = t.replace(/,\s*""\s*,/g, ",")),
      (t = t.replace(/\(\s*""\s*,/g, "(")),
      (t = t.replace(/,\s*""\s*\)/g, ")"))),
      m.setInitializer(t);
  }
  return s;
};
export { O as a, W as b }; //# sourceMappingURL=chunk-PMFK2ZSQ.js.map
//# sourceMappingURL=chunk-PMFK2ZSQ.js.map
