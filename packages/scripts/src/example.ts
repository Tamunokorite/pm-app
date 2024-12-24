import { Resource } from "sst";
import { Example } from "@project-management-app/core/example";

console.log(`${Example.hello()} Linked to ${Resource.MyBucket.name}.`);
