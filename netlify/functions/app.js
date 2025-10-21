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

const app = express();

const router = Router();
router.get("/hello", (req, res) => res.send("Hello World!"));
app.use(express.static(__dirname + '/public'))

router.get('/', (req,res) => {
  res.sendFile('/index.html');
});

app.use("/", router);

export const handler = serverless(app);