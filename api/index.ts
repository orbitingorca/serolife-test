import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import nano, * as Nano from 'nano'
import { dbName, dbPassword, dbUser, dbHost } from "./constants/db";
import { Recipe } from "./models/recipe";

const app = express();

export class Application {
  db: any;
  constructor() {
    this.setupApplicationSettings();
    this.setupControllers();
    const connection = nano(`http://${dbUser}:${dbPassword}@${dbHost}:5984`);
    this.db = connection.db.use(dbName);
  }

  setupApplicationSettings() {
    app.use(cors());
    app.use(urlencoded({ extended: false }));
    app.use(json());
  }

  listen() {
    app.listen(3080, () => console.log("Listening on port 3080"));
  }

  setupControllers() {
    app.get("/recipes", async(req: Request, res: Response) => {
      try {
        const recipes = await this.db.list();
        res.status(200).send(recipes);
      } catch (e) {
        res.status(400).send(e.message);
      };
    });

    app.get("/recipes/:id", async(req: Request, res: Response) => {
      try {
        res.status(200).send(await this.db.get(req.params.id));
      } catch (e) {
        res.status(400).send(e.message);
      };
    });

    app.post("/recipes", (req: Request, res: Response) => {
      const recipe = new Recipe(req.body);
      this.db.insert(recipe, req.body.name).then((n: any) => {
        res.status(200).send("worked");
      }).catch((e: Error) => {
        res.status(400).send(e.message);
      });
    });

    app.delete("/recipes/:id", async(req: Request, res: Response) => {
      try {
        const rev = await this.db.get(req.params.id);
        res.status(200).send(await this.db.destroy(req.params.id, rev._rev));
      } catch (e) {
        res.status(400).send(e.message);
      };
    });
  }
}

const application = new Application();

application.listen();
