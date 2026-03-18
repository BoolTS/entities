import { build } from "bun";
import { rm } from "node:fs/promises";

(async () => {
    const currentDir = import.meta.dir;

    await rm(`${currentDir}/dist`, { recursive: true, force: true });

    await build({
        entrypoints: [`${currentDir}/src/index.ts`],
        root: `${currentDir}/src`,
        outdir: `${currentDir}/dist`,
        publicPath: "../",
        sourcemap: "external",
        target: "bun",
        format: "esm",
        packages: "external",
        minify: true
    });
})();
