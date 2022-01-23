const fs = require("fs")
var obj = {quests: [], names: [], tags: []}
fs.writeFile("featData.json", JSON.stringify(obj), function(err){ console.log(err)})