var express = require("express");
var router = express.Router();
var fs = require("fs");

const DATA_PATH = "data/teams.json";

/**
 *
 */
router.get("/", function (req, res, next) {
  console.log("reading file %o", DATA_PATH);
  const teams = getTeams();
  res.json(teams);
});

/**
 *
 */
router.post("/create", function (req, res, next) {
  const promotion = req.body.promotion;
  const members = req.body.members;
  const name = req.body.name;
  const url = req.body.url;

  const teams = getTeams();
  const id = Math.random().toString(36).substring(7) + new Date().getTime();

  teams.push({
    id,
    promotion,
    members,
    name,
    url
  });

  setTeams(teams);

  res.json({ success: true, id });
  res.status(201);
});

/**
 *
 */
router.delete("/delete", function (req, res, next) {
  const id = req.body.id;

  const teams = getTeams().filter(team => team.id != id);

  setTeams(teams);

  res.json({ success: true });
});

/**
 *
 */
router.put("/update", function (req, res, next) {
  const id = req.body.id;
  const promotion = req.body.promotion;
  const members = req.body.members;
  const name = req.body.name;
  const url = req.body.url;

  const teams = getTeams();

  const team = teams.find(team => team.id == id);
  if (team) {
    team.promotion = promotion;
    team.members = members;
    team.name = name;
    team.url = url;
  }

  setTeams(teams);

  res.json({ success: true });
});

function getTeams() {
  const content = fs.readFileSync(DATA_PATH);
  return JSON.parse(content);
}

function setTeams(teams) {
  const content = JSON.stringify(teams, null, 2);
  fs.writeFileSync(DATA_PATH, content);
}

module.exports = router;
