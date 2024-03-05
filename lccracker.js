#!/usr/bin/env node

// Lunar Client Cracker
// by Josh (Ashish Agarwal on GitHub)
// ./lccracker.exe crack <username>

const { program } = require("commander");
const { exec, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const filePath = path.join(
  process.env.USERPROFILE,
  ".lunarclient",
  "settings",
  "game",
  "accounts.json"
);

const processName = "Lunar Client.exe";
const username =
  process.env.USERNAME || process.env.USERPROFILE.split("\\").pop();
const lunarClientPath = `C:\\Users\\${username}\\AppData\\Local\\Programs\\launcher\\Lunar Client.exe`;

async function kill() {
  console.log("Killing Lunar Client...");
  await exec(`taskkill /im "${processName}" /f`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error killing lunar: ${error}`);
      return;
    }
    console.log(`Killed Lunar Client: ${stdout}`);
  });
}

function launch() {
  const lunarClientProcess = spawn(lunarClientPath, [], {
    detached: true,
    stdio: "ignore",
  });
  lunarClientProcess.unref();
  console.log(`Relaunched Lunar Client from: ${lunarClientPath}`);
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function main() {
  await kill();
  await sleep(500);
  launch();
  console.log("Lunar Client has been cracked and launched.");
}

program
  .version("1.0.0")
  .description(
    "A minimal CLI tool for cracking Lunar Clint.\nMade by @josh.266! Github: github.com/ashishagarwal2023/LunarCracker/"
  );

program.parse(process.argv);
program
  .command("crack <name>")
  .description("Cracks Lunar Client for you!")
  .action((name) => {
    const content = `{"activeAccountLocalId":"e1a3b2c4d5e6f7a8b9c0d1e2f3a4b5c6","accounts":{"e1a3b2c4d5e6f7a8b9c0d1e2f3a4b5c6":{"accessTokenExpiresAt":"2024-02-20T09:31:18.192459100Z","eligibleForMigration":false,"hasMultipleProfiles":false,"legacy":false,"persistent":true,"userProperites":[],"localId":"e1a3b2c4d5e6f7a8b9c0d1e2f3a4b5c6","minecraftProfile":{"id":"f1e2d3c4b5a6e7f8a9b0c1d2e3f4a5b6","name":"${name}"},"remoteId":"a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6","type":"Xbox","username":"${name}"}}}`;
    console.log(
      `Attempting to crack Lunar Client for cracked username: ${name}`
    );

    try {
      if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content, { flag: "w" });
        console.log(
          "Cracked successfully. Run Lunar Client to see if it works!"
        );
      }
    } catch (error) {
      console.error("Writting the file failed:", error.message);
    }
    main();
  });

program.parse(process.argv);
