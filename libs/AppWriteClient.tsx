import { Account, Client, Databases, ID, Query, Storage } from "appwrite";

const client = new Client()
    .setEndpoint(String(process.env.NEXT_PUBLIC_APP_WRITE_URL))
    .setProject(String(process.env.NEXT_PUBLIC_APP_WRITE_ENDPOINT));

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage, Query, ID };
