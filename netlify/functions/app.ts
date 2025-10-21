// import express, { Router } from "express";
// import serverless from "serverless-http";

// const api = express();

// const router = Router();

// app.use(express.static(__dirname + '/public'))

// router.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

// api.use("/api/", router);

// export const handler = serverless(api);

import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);

export const handler = serverless(api);