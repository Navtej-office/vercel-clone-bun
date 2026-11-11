import { posix } from "node:path";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;


export function deploymentIdFromHost(host:string):string|null{
  if(!host.includes(".")){
    return null;
  }
  const label=host.split(".")[0]??"";
  return UUID.test(label) ? label:null;
}