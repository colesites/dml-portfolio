/**
 * Typing for the fields of package.json we care about
 */
export interface PackageJson {
  [key: string]: string | PackageJson;
}
/**
 * A function that json from a file
 */
export type ReadJsonSync = (packageJsonPath: string) => any | undefined;
export type FileExistsSync = (name: string) => boolean;
export type FileExistsAsync = (
  path: string,
  callback: (err?: Error, exists?: boolean) => void,
) => void;
export type ReadJsonAsyncCallback = (err?: Error, content?: any) => void;
export type ReadJsonAsync = (
  path: string,
  callback: ReadJsonAsyncCallback,
) => void;
export declare function fileExistsSync(path: string): boolean;
/**
 * Reads package.json from disk
 *
 * @param file Path to package.json
 */
export declare function readJsonFromDiskSync(
  packageJsonPath: string,
): any | undefined;
export declare function readJsonFromDiskAsync(
  path: string,
  callback: (err?: Error, content?: any) => void,
): void;
export declare function fileExistsAsync(
  path2: string,
  callback2: (err?: Error, exists?: boolean) => void,
): void;
export declare function removeExtension(path: string): string;
