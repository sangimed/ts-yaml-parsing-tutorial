import express from "express";
import { promises as fsp } from "fs";
import { parse as yamlParse } from "yaml";

const app = express();
const port = process.env.PORT || 3000;

// Basic route
app.get("/", async (req, res) => {
  res.send("Hello World!");

  let apisConfigContent: string;
  try {
    apisConfigContent = await fsp.readFile("apis-config.yml", {
      encoding: "utf8",
    });

    const config = yamlParse(apisConfigContent) as SquareBalanceConfig;
  } catch (error) {
    console.error(`Error while parsing the YML file`);
    return;
  }
});

// Starting the server
const startServer = async () => {
  try {
    app.listen(port);
    console.log(`Server running on http://localhost:${port}`);
  } catch (error: any) {
    console.error(`Error starting server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
