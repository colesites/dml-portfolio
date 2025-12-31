export { a as transformIcons, b as transformMenu } from "../chunk-PMFK2ZSQ.js";
import "../chunk-BFNVF2P5.js";
import z$1 from "postcss";
import K from "postcss-selector-parser";
import { Node, Project, ScriptKind, SyntaxKind } from "ts-morph";
import { z } from "zod";

var N = "cn-",
  R = z.record(z.string().startsWith(N), z.string());
function W(t) {
  const e = z$1.parse(t),
    r = {};
  return (
    e.walkRules((s) => {
      const n = s.selectors ?? [];
      if (n.length === 0) return;
      const i = D(s);
      if (i)
        for (const g of n) {
          const c = B(g);
          K((o) => {
            o.each((l) => {
              const u = k(l);
              if (!u) return;
              const f = u.value;
              f.startsWith(N) && (r[f] = r[f] ? `${i} ${r[f]}` : i);
            });
          }).processSync(c);
        }
    }),
    R.parse(r)
  );
}
function B(t) {
  return t.replace(/\s*&\s*/g, "").trim();
}
function D(t) {
  const e = [];
  for (const r of t.nodes || [])
    if (r.type === "atrule" && r.name === "apply") {
      const s = r.params.trim();
      s && e.push(s);
    }
  return e.length === 0 ? null : e.join(" ");
}
function k(t) {
  const e = [];
  return (
    t.walkClasses((r) => {
      r.value.startsWith(N) && e.push(r);
    }),
    e.length === 0 ? null : e[e.length - 1]
  );
}
var X = new Set(["cn-menu-target"]);
function p(t) {
  return Node.isStringLiteral(t) || Node.isNoSubstitutionTemplateLiteral(t);
}
var $ = async ({ sourceFile: t, styleMap: e }) => {
  const r = new Set();
  return _(t, e, r), q(t, e, r), Q(t, e, r), t;
};
function O(t, e, r) {
  const s = t.getLiteralText(),
    n = y(s);
  if (n.length === 0) return;
  const i = n.filter((c) => !r.has(c));
  if (i.length === 0) {
    const c = m(s);
    t.setLiteralValue(c);
    return;
  }
  const g = i.map((c) => e[c]).filter((c) => !!c);
  if (g.length > 0) {
    const c = g.join(" "),
      o = m(E(c, s));
    t.setLiteralValue(o), i.forEach((l) => r.add(l));
  } else {
    const c = m(s);
    t.setLiteralValue(c);
  }
}
function _(t, e, r) {
  t.forEachDescendant((s) => {
    if (!Node.isCallExpression(s)) return;
    const n = s.getExpression();
    if (!Node.isIdentifier(n) || n.getText() !== "cva") return;
    const i = s.getArguments()[0];
    Node.isStringLiteral(i) && O(i, e, r);
    const g = s.getArguments()[1];
    if (!g || !Node.isObjectLiteralExpression(g)) return;
    const c = g
      .getProperties()
      .find(
        (l) =>
          Node.isPropertyAssignment(l) &&
          Node.isIdentifier(l.getNameNode()) &&
          l.getNameNode().getText() === "variants",
      );
    if (!c || !Node.isPropertyAssignment(c)) return;
    const o = c.getInitializer();
    !o ||
      !Node.isObjectLiteralExpression(o) ||
      o.getProperties().forEach((l) => {
        if (!Node.isPropertyAssignment(l)) return;
        const u = l.getInitializer();
        !u ||
          !Node.isObjectLiteralExpression(u) ||
          u.getProperties().forEach((f) => {
            if (!Node.isPropertyAssignment(f)) return;
            const x = f.getInitializer();
            x && Node.isStringLiteral(x) && O(x, e, r);
          });
      });
  });
}
function q(t, e, r) {
  t.forEachDescendant((s) => {
    if (!Node.isJsxAttribute(s) || s.getNameNode().getText() !== "className")
      return;
    const n = s.getInitializer();
    if (!n) return;
    const i = G(n);
    if (i.length === 0) return;
    const g = s.getParent()?.getParent();
    if (
      !g ||
      (!Node.isJsxOpeningElement(g) && !Node.isJsxSelfClosingElement(g))
    )
      return;
    const c = i.filter((l) => !r.has(l));
    if (c.length === 0) {
      I(n);
      return;
    }
    const o = c.map((l) => e[l]).filter((l) => !!l);
    if (o.length > 0) {
      const l = o.join(" ");
      H(g, l);
    } else I(n);
  });
}
function G(t) {
  const e = [];
  if (p(t)) return y(t.getLiteralText());
  if (!Node.isJsxExpression(t)) return e;
  const r = t.getExpression();
  if (!r) return e;
  if (p(r)) return y(r.getLiteralText());
  if (Node.isCallExpression(r) && A(r))
    for (const s of r.getArguments()) p(s) && e.push(...y(s.getLiteralText()));
  return e;
}
function I(t) {
  if (p(t)) {
    const r = m(t.getLiteralText());
    t.setLiteralValue(r);
    return;
  }
  if (!Node.isJsxExpression(t)) return;
  const e = t.getExpression();
  if (e) {
    if (p(e)) {
      const r = m(e.getLiteralText());
      e.setLiteralValue(r);
      return;
    }
    if (Node.isCallExpression(e) && A(e)) {
      for (const r of e.getArguments())
        if (p(r)) {
          const s = m(r.getLiteralText());
          r.setLiteralValue(s);
        }
      C(e);
    }
  }
}
function y(t) {
  const e = t.matchAll(/\bcn-[\w-]+\b/g);
  return Array.from(e, (r) => r[0]);
}
function m(t) {
  return t
    .replace(/\bcn-[\w-]+\b/g, (e) => (X.has(e) ? e : ""))
    .replace(/\s+/g, " ")
    .trim();
}
function C(t) {
  if (!A(t)) return;
  const e = t.getArguments(),
    r = e.filter((s) => (p(s) ? s.getLiteralText().trim() !== "" : true));
  if (r.length !== e.length) {
    const s = r.map((i) => i.getText()),
      n = t.getParent();
    n && Node.isJsxExpression(n)
      ? n.replaceWithText(`{cn(${s.join(", ")})}`)
      : t.replaceWithText(`cn(${s.join(", ")})`);
  }
}
function H(t, e) {
  if (!Node.isJsxOpeningElement(t) && !Node.isJsxSelfClosingElement(t)) return;
  const r = t
    .getAttributes()
    .find(
      (i) =>
        Node.isJsxAttribute(i) && i.getNameNode().getText() === "className",
    );
  if (!r || !Node.isJsxAttribute(r)) {
    t.addAttribute({
      name: "className",
      initializer: `{cn(${JSON.stringify(e)})}`,
    });
    return;
  }
  const s = r.getInitializer();
  if (!s) {
    r.setInitializer(`{cn(${JSON.stringify(e)})}`);
    return;
  }
  if (p(s)) {
    const i = s.getLiteralText(),
      g = m(E(e, i));
    s.setLiteralValue(g);
    return;
  }
  if (!Node.isJsxExpression(s)) return;
  const n = s.getExpression();
  if (!n) {
    r.setInitializer(`{cn(${JSON.stringify(e)})}`);
    return;
  }
  if (p(n)) {
    const i = n.getLiteralText(),
      g = m(E(e, i));
    n.setLiteralValue(g);
    return;
  }
  if (Node.isCallExpression(n) && A(n)) {
    const i = n.getArguments()[0];
    if (p(i)) {
      const o = i.getLiteralText(),
        l = m(E(e, o));
      i.setLiteralValue(l);
      for (let u = 1; u < n.getArguments().length; u++) {
        const f = n.getArguments()[u];
        if (p(f)) {
          const x = f.getLiteralText(),
            T = m(x);
          T !== x && f.setLiteralValue(T);
        }
      }
      C(n);
      return;
    }
    const g = n
        .getArguments()
        .map((o) => {
          if (p(o)) {
            const l = m(o.getLiteralText());
            return l ? JSON.stringify(l) : null;
          }
          return o.getText();
        })
        .filter((o) => o !== null),
      c = [JSON.stringify(e), ...g];
    r.setInitializer(`{cn(${c.join(", ")})}`);
    return;
  }
  r.setInitializer(`{cn(${JSON.stringify(e)}, ${n.getText()})}`);
}
function E(t, e) {
  const r = e.split(/\s+/).filter(Boolean);
  return [...t.split(/\s+/).filter(Boolean), ...r].join(" ").trim();
}
function A(t) {
  const e = t.getExpression();
  return Node.isIdentifier(e) && e.getText() === "cn";
}
function Q(t, e, r) {
  t.forEachDescendant((s) => {
    if (!Node.isCallExpression(s)) return;
    const n = s.getExpression();
    if (!(!Node.isIdentifier(n) || n.getText() !== "mergeProps"))
      for (const i of s.getArguments()) {
        if (!Node.isObjectLiteralExpression(i)) continue;
        const g = i
          .getProperties()
          .find(
            (o) =>
              Node.isPropertyAssignment(o) &&
              Node.isIdentifier(o.getNameNode()) &&
              o.getNameNode().getText() === "className",
          );
        if (!g || !Node.isPropertyAssignment(g)) continue;
        const c = g.getInitializer();
        if (c && Node.isCallExpression(c) && A(c)) {
          const o = U(c);
          if (o.length === 0) continue;
          const l = o.filter((f) => !r.has(f));
          if (l.length === 0) {
            P(c);
            continue;
          }
          const u = l.map((f) => e[f]).filter((f) => !!f);
          if (u.length > 0) {
            const f = u.join(" ");
            Y(c, f, r, l);
          } else P(c);
        }
      }
  });
}
function U(t) {
  const e = [];
  for (const r of t.getArguments()) p(r) && e.push(...y(r.getLiteralText()));
  return e;
}
function P(t) {
  for (const e of t.getArguments())
    if (p(e)) {
      const r = m(e.getLiteralText());
      e.setLiteralValue(r);
    }
  C(t);
}
function Y(t, e, r, s) {
  const n = t.getArguments()[0];
  if (p(n)) {
    const o = n.getLiteralText(),
      l = m(E(e, o));
    n.setLiteralValue(l), s.forEach((u) => r.add(u));
    for (let u = 1; u < t.getArguments().length; u++) {
      const f = t.getArguments()[u];
      if (p(f)) {
        const x = f.getLiteralText(),
          T = m(x);
        T !== x && f.setLiteralValue(T);
      }
    }
    C(t);
    return;
  }
  const i = t
      .getArguments()
      .map((o) => {
        if (p(o)) {
          const l = m(o.getLiteralText());
          return l ? JSON.stringify(l) : null;
        }
        return o.getText();
      })
      .filter((o) => o !== null),
    g = [JSON.stringify(e), ...i];
  s.forEach((o) => r.add(o)),
    t.getParent() && t.replaceWithText(`cn(${g.join(", ")})`);
}
async function et(t, { styleMap: e, transformers: r = [$] }) {
  const n = new Project({ useInMemoryFileSystem: true }).createSourceFile(
    "component.tsx",
    t,
    { scriptKind: ScriptKind.TSX, overwrite: true },
  );
  for (const i of r) await i({ sourceFile: n, styleMap: e });
  return n.getText();
}
var rt = async ({ sourceFile: t, config: e }) => {
  if (!e.style?.startsWith("base-")) return t;
  const r = [],
    s = t.getDescendantsOfKind(SyntaxKind.JsxElement);
  for (const n of s) {
    const i = n.getOpeningElement(),
      g = i.getAttribute("render");
    if (!g) continue;
    const o = n
      .getJsxChildren()
      .map((S) => S.getText())
      .join("")
      .trim();
    if (!o || g.getKind() !== SyntaxKind.JsxAttribute) continue;
    const u = g.asKindOrThrow(SyntaxKind.JsxAttribute).getInitializer();
    if (!u || u.getKind() !== SyntaxKind.JsxExpression) continue;
    const x = u.asKindOrThrow(SyntaxKind.JsxExpression).getExpression();
    if (!x || x.getKind() !== SyntaxKind.JsxSelfClosingElement) continue;
    const T = x.asKindOrThrow(SyntaxKind.JsxSelfClosingElement),
      h = T.getTagNameNode().getText(),
      b = T.getAttributes()
        .map((S) => S.getText())
        .join(" "),
      j = b ? `{<${h} ${b}>${o}</${h}>}` : `{<${h}>${o}</${h}>}`,
      w = i.getTagNameNode().getText(),
      J = i
        .getAttributes()
        .filter((S) =>
          S.getKind() === SyntaxKind.JsxAttribute
            ? S.asKindOrThrow(SyntaxKind.JsxAttribute)
                .getNameNode()
                .getText() !== "render"
            : true,
        )
        .map((S) => S.getText())
        .join(" "),
      M = J ? `${J} render=${j}` : `render=${j}`,
      V = `<${w} ${M} />`;
    r.push({ elementStart: n.getStart(), elementEnd: n.getEnd(), newText: V });
  }
  for (const n of r.reverse()) {
    const i = t.getFullText(),
      g =
        i.substring(0, n.elementStart) + n.newText + i.substring(n.elementEnd);
    t.replaceWithText(g);
  }
  return t;
};
export { W as createStyleMap, rt as transformRender, et as transformStyle }; //# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map
