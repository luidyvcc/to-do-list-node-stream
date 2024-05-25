import { Readable, Writable } from "node:stream";
import { parse } from "csv-parse";
import fs from "node:fs";

const BASE_URL = "http://localhost:3335";
const URL_CSV_FILE = new URL("./tasksMock.csv", import.meta.url);

class readCSVFile extends Readable {
  #parser;
  constructor(url) {
    super({ objectMode: true });
    this.#parser = fs
      .createReadStream(url)
      .pipe(parse({ delimiter: ",", columns: true }));
  }
  async _read() {
    for await (const record of this.#parser) {
      this.push(Buffer.from(JSON.stringify(record)));
    }
  }
}

class sendTask extends Writable {
  _write(chunk, _, callback) {
    fetch(`${BASE_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: chunk.toString(),
      duplex: "half",
    })
      .then((res) => res.text())
      .then(console.log)
      .then(callback);
  }
}

new readCSVFile(URL_CSV_FILE).pipe(new sendTask());
