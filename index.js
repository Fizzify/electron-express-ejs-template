const express = require("express");
const { app, BrowserWindow } = require("electron");
const path = require("path");

let win;
let application = express();

application.set("view engine", "ejs");

application.use(express.static(__dirname + "/public"));

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "app/js/preload.js"),
    },
  });

  application.get("/", (req, res) => {
    res.render("index");
  });
  application.listen(3000, () => console.log("Server started on port 3000."));

  win.loadURL("http://localhost:3000/");
  win.focus();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
