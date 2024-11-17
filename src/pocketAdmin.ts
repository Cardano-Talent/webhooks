import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./types/pocketbase-types";

const POCKETBASE_HOST = `${process.env.POCKETBASE_HOST}`;
const POCKETBASE_ADMIN_EMAIL = `${process.env.POCKETBASE_ADMIN_EMAIL}`;
const POCKETBASE_ADMIN_PASSWORD = `${process.env.POCKETBASE_ADMIN_PASSWORD}`;

const pb = new PocketBase(POCKETBASE_HOST) as TypedPocketBase;

pb.admins.authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD);

export { pb as pbAdmin };
