import { fileURLToPath } from "url";
import { dirname } from "path";

const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export { __dirname, PORT };
