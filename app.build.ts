import { build } from "bun";

(async () => {
    const currentDir = import.meta.dir;

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
