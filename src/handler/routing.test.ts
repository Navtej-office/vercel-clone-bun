import { describe, expect, it } from "bun:test";
import { contentTypeFor, deploymentIdFromHost, objectKeyFor } from "./routing";
import { cloneSourceFileData } from "typescript/unstable/ast";
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





describe("contentTypeFor", () => {
  it("returns the right type for the files a static site is made of", () => {
    expect(contentTypeFor("index.html")).toBe("text/html; charset=utf-8");
    expect(contentTypeFor("assets/style.css")).toBe("text/css; charset=utf-8");
    expect(contentTypeFor("assets/index-DoBic8l_.js")).toBe("text/javascript; charset=utf-8");
    expect(contentTypeFor("logo.svg")).toBe("image/svg+xml");
  });

  it("ignores case in the extension", () => {
    expect(contentTypeFor("APP.JS")).toBe("text/javascript; charset=utf-8");
  });

  it("falls back to application/octet-stream for unknown or missing extensions", () => {
    expect(contentTypeFor("data.xyz")).toBe("application/octet-stream");
    expect(contentTypeFor("README")).toBe("application/octet-stream");
  });
});



describe("objectKeyFor",()=>{

  it("maps a normal path under the deployment folder",()=>{
    expect(objectKeyFor(ID, "/assets/app.js")).toBe(`dist/${ID}/assets/app.js`);
  })
})