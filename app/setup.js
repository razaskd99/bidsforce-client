// setup.js

import { getCookieValue } from "@/lib/scripts";

// set backend url
/*if (process.env.NODE_ENV == "development") {
    bakend = "http://localhost:8888/";
}
if (process.env.NODE_ENV == "production") {
    bakend = "https://server.bidsforce.com/";
}*/
let bakend = "http://127.0.0.1:8888/";


export let API_BACKEND_SERVER = bakend;

