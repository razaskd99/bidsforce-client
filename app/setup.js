// setup.js

import { getCookieValue } from "@/lib/scripts";

// set backend url
/*if (process.env.NODE_ENV == "development") {
    bakend = "http://localhost:8888/";
}
if (process.env.NODE_ENV == "production") {
    bakend = "https://server.bidsforce.com/";
}*/
let bakend = "https://bidsforce-server-1.vercel.app/";


export let API_BACKEND_SERVER = bakend;

