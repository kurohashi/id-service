var mongo = require('mongodb').MongoClient;
var conf = require('../configs/app.conf');
let console = conf.console;
const server = 'localhost:27017'; 
const database = 'tasks';
class Database {
  constructor() {
    this._connect().then(_ => console.log("database connected")).catch(err => console.log("Database connection error", err));
  }
  async _connect() {
    let d = await mongo.connect(`mongodb://${server}/${database}`);
    let db = d.db();
    let users = db.collection("users");
    await users.createIndexes([{
      key: { email: 1 },
      unique: true,
    }, {
      key: { uid: 1 },
      unique: true,
    }]);
    conf.collections = { users: users };
  }
}
module.exports = new Database()