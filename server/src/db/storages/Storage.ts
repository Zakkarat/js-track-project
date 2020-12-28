import {POSTGRES_INSTANCE} from "../../constants/database";
// import PostgresStorage from "./PostgresStorage";
// import MongoStorage from "./MongoStorage";
import PostgresStorage from "./PostgresStorage";


export default class Storage {
    public storage;

    constructor(instanceType:string) {
        this.storage = instanceType === POSTGRES_INSTANCE ? new PostgresStorage() : new PostgresStorage();
    }
}