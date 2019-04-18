import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

createConnection({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "expireAfterSecondsBug",
    entities: [User]
}).then(async connection => {
    await connection.synchronize(true);

    const user = new User();
    user.login = "user1";
    await connection.manager.save(user);

    console.log('Done!');
    process.exit();
}).catch(error => console.log(error));
