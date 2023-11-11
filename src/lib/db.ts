import { MongoClient } from "mongodb";

class Database {
  private static _Instance: Database | undefined;
  private _cluster: MongoClient;
  private _database = "me";

  private constructor() {
    this._cluster = new MongoClient(process.env.MONGO_URI);
    console.log("New Database Instance Created");
  }

  static getInstance() {
    if (!Database._Instance) Database._Instance = new Database();

    return Database._Instance;
  }

  async connect() {
    try {
      const client = await this._cluster.connect();
      const db = client.db(this._database);
      return db;
    } catch (e) {
      console.log(e);
      throw new Error("Mongo Connection Error");
    }
  }

  async disconnect() {
    try {
      await this._cluster.close();
    } catch (e) {
      console.log(e);
      throw new Error("Mongo Disconnection Error");
    }
  }
}

export default Database;
