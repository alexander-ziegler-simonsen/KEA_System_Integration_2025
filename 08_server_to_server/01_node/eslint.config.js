import { defineConfig } from "eslint/config";
import js from "@eslint/js";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
]);