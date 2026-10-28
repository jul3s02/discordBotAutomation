import "dotenv/config";
import { askModel } from "./ai/classify.js";

const text = process.argv[2] ?? "Tandläkare på torsdag kl 14";
console.log(await askModel(text))