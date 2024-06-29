import express from "express";
import { promises as fsp } from "fs";
import { parse as yamlParse } from "yaml";

const app = express();
const port = process.env.PORT || 3000;

// Basic route
app.get("/", async (req, res) => {

  let apisConfigContent: string;
  try {
    apisConfigContent = await fsp.readFile("apis-config.yml", {
      encoding: "utf8",
    });

    const config = yamlParse(apisConfigContent) as APIsConfig;
    res.send(`${JSON.stringify(config, null, 2)}`);
    // outputs : 
    // {
    //   "apis": [
    //     {
    //       "name": "API_1",
    //       "url": "api1.example.com",
    //       "proxies": [
    //         "proxy-a.com",
    //         "proxy-b.com"
    //       ]
    //     },
    //     {
    //       "name": "API_2",
    //       "url": "api2.example.com",
    //       "proxies": [
    //         "proxy-c.com",
    //         "proxy-d.com",
    //         "proxy-e.com"
    //       ]
    //     }
    //   ]
    // }
  } catch (error: any) {
    console.error(`An error occurred: ${error.message}`);
    res.status(500).send({
      message: 'Internal Server Error',
      error: error.message
    });
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
