import React from "react";
import { renderToString } from "react-dom/server";
import App from "../src/App";

const fs = require("fs");
const express = require("express");
const port = 9898;
const html = fs.readFileSync("dist/index.html").toString();
const parts = html.split("loading...");

const app = express();
app.use("/dist", express.static("dist"));
app.use((req, res) => {
  const reactMarkUp = <App />;
  res.send(parts[0] + renderToString(reactMarkUp) + parts[1]);
  res.end();
});

console.log(`Listening at http://localhost:${port}`);
app.listen(port);
