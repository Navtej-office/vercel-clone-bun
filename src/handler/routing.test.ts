import { describe, expect, it } from "bun:test";
import { deploymentIdFromHost } from "./routing";
const ID = "d82570e3-aa32-47b7-a90d-31253501bae6";

describe("deployedIdFromHost",()=>{

   it("takes the id from the first label, ignoring the domain and port", () => {
    expect(deploymentIdFromHost(`${ID}.127.0.0.1.nip.io:8082`)).toBe(ID);
    expect(deploymentIdFromHost(`${ID}.localtest.com`)).toBe(ID);
  });

   it("returns null when there is no subdomain", () => {
    expect(deploymentIdFromHost("localhost:8082")).toBeNull();
  });


  it("returns null when the first label is not a uuid", () => {
    expect(deploymentIdFromHost("evil.localtest.com")).toBeNull();
    expect(deploymentIdFromHost("admin.127.0.0.1.nip.io:8082")).toBeNull();
  });

});
