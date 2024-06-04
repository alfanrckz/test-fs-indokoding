import { AppDataSource } from "./data-source"
import * as express from "express"
import * as cors from "cors"
import bodyParser = require("body-parser");
import router from "./routes"
import "dotenv/config"

AppDataSource.initialize().then(async () => {

  const app = express();
  const port = 5000;

    //middleware
    app.use(cors());
    app.use(bodyParser.json());
    app.use("/api/v1", router); //group router

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    } )


}).catch(error => console.log(error))
