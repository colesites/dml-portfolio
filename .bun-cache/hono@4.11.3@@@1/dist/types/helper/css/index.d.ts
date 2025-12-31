/**
 * @module
 * css Helper for Hono.
 */
import type { HtmlEscapedString } from "../../utils/html";
import type {
  CssClassName as CssClassNameCommon,
  CssVariableType,
} from "./common";
export { rawCssString } from "./common";
type CssClassName = HtmlEscapedString & CssClassNameCommon;
type CssType = (
  strings: TemplateStringsArray,
  ...values: CssVariableType[]
) => Promise<string>;
type CxType = (
  ...args: (
    | CssClassName
    | Promise<string>
    | string
    | boolean
    | null
    | undefined
  )[]
) => Promise<string>;
type KeyframesType = (
  strings: TemplateStringsArray,
  ...values: CssVariableType[]
) => CssClassNameCommon;
interface ViewTransitionType {
  (
    strings: TemplateStringsArray,
    ...values: CssVariableType[]
  ): Promise<string>;
  (content: Promise<string>): Promise<string>;
  (): Promise<string>;
}
type StyleType = (args?: {
  children?: Promise<string>;
  nonce?: string;
}) => HtmlEscapedString;
/**
 * @experimental
 * `createCssContext` is an experimental feature.
 * The API might be changed.
 */
export declare const createCssContext: ({
  id,
}: {
  id: Readonly<string>;
}) => DefaultContextType;
interface DefaultContextType {
  css: CssType;
  cx: CxType;
  keyframes: KeyframesType;
  viewTransition: ViewTransitionType;
  Style: StyleType;
}
/**
 * @experimental
 * `css` is an experimental feature.
 * The API might be changed.
 */
export declare const css: CssType;
/**
 * @experimental
 * `cx` is an experimental feature.
 * The API might be changed.
 */
export declare const cx: CxType;
/**
 * @experimental
 * `keyframes` is an experimental feature.
 * The API might be changed.
 */
export declare const keyframes: KeyframesType;
/**
 * @experimental
 * `viewTransition` is an experimental feature.
 * The API might be changed.
 */
export declare const viewTransition: ViewTransitionType;
/**
 * @experimental
 * `Style` is an experimental feature.
 * The API might be changed.
 */
export declare const Style: StyleType;
