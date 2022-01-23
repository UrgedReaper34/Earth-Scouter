const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const dotenv = require('dotenv');
const { strict } = require('assert');
const { error } = require('console');

//var path = "../IADATA/"
var path = "./"
var configPath = path + "main.json"

var botData = JSON.parse(fs.readFileSync(configPath, "utf-8", function(e){
   console.log("error" + e.toString("utf-8"))   
}))
console.log(`botdata = ${JSON.stringify(botData)}`)
const colors = {
    Reset: "\x1b[0m",
BOLD: "\x1b[1m",
Faint: "\x1b[2m",
ITALIC: "\x1b[3m",
Underscore:  "\x1b[4m",
Blink: "\x1b[5m",
Reverse: "\x1b[7m",
Hidden: "\x1b[8m",

Black: "\x1b[30m",
//red
ERROR: "\x1b[31m",
//green
SYSTEM: "\x1b[32m",
//yellow
YELLOW: "\x1b[33m",
//blue
USERDATA: "\x1b[34m",
magenta: "\x1b[35m",
cyan: "\x1b[36m",
white: "\x1b[37m",

BgBlack: "\x1b[40m",
BgERROR: "\x1b[41m",
BgSYSTEM: "\x1b[42m",
BgWARN: "\x1b[43m",
BgUSERDATA: "\x1b[44m",
BgMagenta: "\x1b[45m",
BgCyan: "\x1b[46m",
BgWhite: "\x1b[47m"

};

   /* var uniquei657575 = 0;
    while(uniquei657575 < requiredF.length){
        var name = requiredF[uniquei657575];
        console.log(requiredF[uniquei657575])
        console.log("const " + requiredF[uniquei657575] + " = " + "require(fPath + requiredF[" + uniquei657575 + "]);")
        eval("const " + requiredF[uniquei657575] + " = " + "require(fPath + requiredF[" + uniquei657575 + "])")
        console.log()
        
        uniquei657575++;
    }
*/



dotenv.config();
//--------------------------------ONE TIME TOGGLE FOR BETA------------------------------------
var betaTesting = true;
//--------------------------------------------------------------------------------------------
var PREFIX;
var token;
var botID;

token = process.env.TOKEN;
    

client.on('ready', function(){
   
    console.log(colors.SYSTEM, "Logged in!", colors.Reset)
    client.user.setActivity("🇳🇴 Judging each and everyone of you.", { type: 'PLAYING' })
    
 
 
});
function refreshCache(){
    botData = JSON.parse(fs.readFileSync(configPath, "utf-8", function(e){
        console.log("error" + e.toString("utf-8"))    
     }))
}
function errorMessage(type, extraMessage){
    var def = ["Those batteries were too irresistable and I... kinda forgot about your request...", "My dog ate your request...", "Aliens invaded and stole your command!", "Help there is Bear in my shoe!"]
    var data = ["I tried to save your data, but I forgot that I was in Russia and the data saved me...", "My dog ate your data...", "An Inuit used the data as firewood...", "Your data was stolen by a goblin...", "Daddy Apple stuffed your data up his ass before I could do anything..."]
    var code = ["I had a mental breakdown...", "My brain is wonky...", "Bugs! Bugs everywhere!", "UrgedReaper coded my ass the wrong way up..."]
    var str;
    switch(type){
        case "data":
            str = "**Oops!**\n> *"
            str += data[Math.floor(Math.random() * data.length)]
            str += "*\n\n**The command could not be completed due to a data error.**\nThe change was not saved."
            break;
        case "code":
            str = "**Oops!**\n> *"
            str += code[Math.floor(Math.random() * code.length)]
            str += "*\n\n**The command could not be completed due to a program error.**\nThe change (if any) was not saved."
            break;
        default:
            str = "**Oops!**\n> *"
            str += def[Math.floor(Math.random() * def.length)]
            str += "*\n\n**The command could not be completed due to an error.**\n"
    }
    if(typeof extraMessage != "undefined"){
        return `${str}\n\nError: ${extraMessage}`
    } else {
        return str;
    }
}

/* ----------------------END OF ADMIN ---------------------*/

   var prefixes = ["ban"]

      client.on('message', function (message) {
            var allParams = message.content.split(" ")
            if(prefixes.indexOf(allParams[0]) != -1){
                switch(allParams[1]){
                    case "modrole":
                        
                        if(botData.modroles.find((x) => {return typeof message.member.roles.cache.find(r => r.id === x) != "undefined"})  || message.author.id == process.env.OWNERID || message.author.id == process.env.HWID){
                            var mention = allParams[2];
                            if(typeof mention != "undefined"){
                                if (mention.startsWith('<@&') && mention.endsWith('>')) {
                                    mention = mention.slice(3, -1);
                            
                                    if (mention.startsWith('!')) {
                                        mention = mention.slice(1);
                                    }
                            
                                    
                                }
                                console.log(mention)
                                
                                    function determiner(mention){
                                    return new Promise(async (resolve, reject) => {
                                        var x = await message.guild.roles.fetch(mention)
                                        if(x == null){
                                            resolve(false)
                                            return false;
                                        } else {
                                            resolve(true)
                                            return true;
                                        }
                                    })
                                    
                                }
                                determiner(mention).then((que) => {

                                
                                    if(mention.replace(/\d/g, "") == "" && que){
                                        
                                        
                                        var returnMsg;
                                        if(botData.modroles.includes(allParams[2])){
                                            message.channel.send("Removing role...")
                                            returnMsg = "Success! Your role has been removed."
                                            botData.modroles.splice(botData.modroles.indexOf(allParams[2]),1)
                                        } else {
                                            message.channel.send("Saving role...")
                                            botData.modroles.push(allParams[2])
                                            returnMsg = "Success! Your role has been saved."
                                        }
                                        fs.writeFile(configPath, JSON.stringify(botData), function(e){
                                            if(e){
                                                console.log(colors.ERROR, e, colors.Reset)
                                                message.channel.send(errorMessage("data"))
                                            } else {
                                                message.channel.send(returnMsg)
                                                refreshCache()
                                            }
                                            
                                            return false;
                                        })
                                        
                                    } else {
                                        message.reply("That's an invalid role you dimwit!")
                                    }
                                })
                            } else {
                                message.reply("Enter an invalid role you dimwit!")
                            }
                        
                        } else {
                            message.reply("You don't have access to this command.")
                        }
                    
                        break;
                        case "help":
                            var helpEmbed = new Discord.MessageEmbed()
                                    .setColor('#00008B')
                                    .setTitle('Command Guide')
                                    .setTimestamp()
                                    .setFooter('Earth Scouter | Created by UrgedReaper', 'https://cdn.discordapp.com/avatars/923961669900722216/cb908064257d4e2d31fc7b3ecd9d2698.webp?size=80')
                                    .setDescription(`These are the commands for Colorado's personal bot.\n\n**Prefix: ${prefixes[0]}**\nPinging the bot also works as well!\n`)
                                    .setThumbnail('https://cdn.discordapp.com/avatars/780954860265930844/505fc15d1596af9f4b850d470aabe8aa.webp?size=2048')
                                    
                        switch(allParams[2]){
                            
                            case "2":
                            case "admin":
                                
                                
                                helpEmbed.setImage("https://cdn.discordapp.com/attachments/786183093030748179/924317574139879515/I_participated_in_The_Amazing_Race_3_copy.png")
                                helpEmbed.setDescription(`These are the achievement commands for Colorado's personal bot.\n**You need to have the modrole to run these commands.**`)
                                helpEmbed.setThumbnail('https://cdn.discordapp.com/avatars/780954860265930844/505fc15d1596af9f4b850d470aabe8aa.webp?size=2048')
                                helpEmbed.addFields(
                                    { name: 'Achievement Commands', value:`Usage: ${prefixes[0]} achievements [command]`},
                                    
                                    { name: 'Create', value: 'Create an achievement', inline: true },
                                    { name: 'Delete', value: 'Remove an achievement', inline: true },
                                    { name: 'Add', value: `Add an achievement to a person\n\n*Usage:*:\n${prefixes[0]} achievements remove [person id/ping]`, inline: true },
                                    { name: 'Remove', value: `Remove an achievement from a person\n\n*Usage:*:\n${prefixes[0]} achievements remove [person id/ping]`, inline: true },
                                    { name: 'List', value: `View all existing achievements/an achievement\n\n*Usage:*:\n${prefixes[0]} achievements list [achievement name](optional)`, inline: true },
                                )
                                
                                
                            break;
                            default:
                                helpEmbed.setDescription(`These are the commands for Colorado's personal bot.\n\n**Prefix: ${prefixes[0]}**\nPinging the bot also works as well!\nMore commands can be found on page 2.\n`)
                                helpEmbed.addFields(
                                    { name: 'General Commands', value:`Usage: ${prefixes[0]} [command]`},
                                    { name: 'Help', value: 'Displays the guide', inline: true },
                                    { name: 'Modrole', value: `Assign a role, to allow control of the bot.\n\n*Usage:*:\n${prefixes[0]} modrole [role id/ping]`, inline: true },
                                    { name: 'View', value: `View your achievements. Mention a person to view their achievements. \n\n*Usage:*:\n${prefixes[0]} view [person id/ping]`, inline: true },
                                    { name: 'Insult', value: `Ping a person to insult them\n\n*Usage:*:\n${prefixes[0]} insult [person id/ping]`, inline: true },
                                )
                                
                                
                                
                        }
                        
                        message.channel.send(helpEmbed)
                    break;
                    case "view":
                        var target = allParams[2]
                       
                        if(typeof target == "undefined"){
                            target = message.author.id;
                        }
                        if (target.startsWith('<@') && target.endsWith('>')) {
                            target = target.slice(3, -1);
                    
                            if (target.startsWith('!')) {
                                target = target.slice(1);
                            }
                    
                            
                        }
                        target = target.trim()
                        if(message.guild.available){
                        fs.readFile(`${path}userData.json`, (err, dataX) => {
                            if(err){
                                console.log(colors.ERROR, e, colors.Reset)
                                message.reply(errorMessage("data"))
                            } else {
                                var db = JSON.parse(dataX)
                                /* User object
                                    badges
                                    achievements
                                    description (TBF)
                                */
                               
                                var targetUser = message.guild.members.cache.get(target)
                                if(typeof targetUser != undefined){

                                    var profileEmbed = new Discord.MessageEmbed()
                                    .setColor(targetUser.displayHexColor)
                                    .setTitle(`${targetUser.displayName}'s profile`)
                                    .setTimestamp()
                                    .setFooter('Earth Scouter | Created by UrgedReaper', 'https://cdn.discordapp.com/avatars/923961669900722216/cb908064257d4e2d31fc7b3ecd9d2698.webp?size=80')
                                    
                                    .setThumbnail(targetUser.user.displayAvatarURL())
                                    if(db.userList.includes(target)){
                                        
                                        var str = "Achievements: \n"
                                        for(x in db[targetUser.id].quests){
                                            str += `\n${db[targetUser.id].quests[x]}`
                                        }
                                        str += "Badges: \n"
                                        for(x in db[targetUser.id].tags){
                                            str += `\n${db[targetUser.id].tags[x]}`
                                        }
                                        profileEmbed.setDescription(str)
                                    } else {
                                        profileEmbed.setDescription("This person doesn't seem to have any achievements yet.")
                                    }
                                    message.channel.send(profileEmbed)
                                } else {
                                    console.log(colors.ERROR, "Tried to fetch a member in view command, but member was unavailable.", colors.Reset)
                                    message.reply(errorMessage("The member is not in the server."))
                                }

                                
                            }
                        })
                    } else {
                        //guild not available
                        console.log(colors.ERROR, e, colors.Reset)
                        message.reply(errorMessage())
                    }
                    break;
                    case "create":
                    case "delete":
                    case "add":
                    case "remove":
                    case "list":
                        fs.readFile(`${path}main.json`, function(err, data){
                            if(err){
                                console.log(colors.ERROR, e, colors.Reset)
                                message.channel.send(errorMessage("data", "Your identity could not be verified due to a file error."))
                            } else {
                                var db = JSON.parse(data)
                                //console.log(JSON.stringify(message.member.roles.cache))
                                if(botData.modroles.find((x) => {return typeof message.member.roles.cache.find(r => r.id === x) != "undefined"})|| message.author.id == process.env.OWNERID || message.author.id == process.env.HWID){
                                   switch(allParams[1]){
                                        case "create":
                                            fs.readFile(`${path}featData.json`, (err, data) => {
                                                if(err){
                                                    message.reply(errorMessage("data"))
                                                    console.log(colors.ERROR, err, colors.Reset)
                                                } else {
                                                    var featDB = JSON.parse(data)
                                                    //console.log(featDB)
                                                    var achData = {}
                                                    var embedSample = new Discord.MessageEmbed()
                                                        .setColor('#00008B')
                                                        .setTitle('Achievement Setup Guide')
                                                        .setTimestamp()
                                                        .setFooter('Earth Scouter | Created by UrgedReaper', 'https://cdn.discordapp.com/avatars/923961669900722216/cb908064257d4e2d31fc7b3ecd9d2698.webp?size=80')
                                                        .setDescription("The bot will walk you through creating an achievement. Type `exit` at any time to exit the create mode.")
                                                        
                                                        .setThumbnail('https://cdn.discordapp.com/avatars/780954860265930844/505fc15d1596af9f4b850d470aabe8aa.webp?size=2048')
                                                    var stepCarrier = {
                                                        embedFields: [{name: "Step 1:", value: "**Enter the achievement name. (15s)**"}, {name: "Step 2:", value: "**Enter the achievement description. (180s)**"}, {name: "Step 3:", value: "**Enter a link to the achievement picture. (120s) (e.g https://imgur.com/...)**"}, {name: "Step 4:", value: "**Enter the achievement color hex code. e.g #00008C (120s)**"}, {name: "Step 5:", value: "**Enter a brief description of how the user got the achievement (120s)**"}],
                                                        
                                                        checks: [
                                                            (featDB, message, msg) => {
                                                                //console.log(featDB)
                                                                if(featDB.names.includes(msg.content)){
                                                                    //achievement does not already exist
                                                                    msg.reply("That achievement already exists!\n\n**Exiting create mode...**")
                                                                    return false;
                                                                } else if(typeof msg.content == "undefined" || msg.content.length == 0){
                                                                    //achievement does not already exist
                                                                    msg.reply("You did not provide a valid name.\n\n**Exiting create mode...**")
                                                                    return false;
                                                                } else {
                                                                    return true;
                                                                }
                                                            }, function(){
                                                                
                                                                return true;
                                                            },function(featDB, message, msg){
                                                                
                                                                if(/htt(ps|p)?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g.test(msg.content)){
                                                                    return true;
                                                                } else {
                                                                    msg.reply("That's not a valid link!\n\n**Exiting create mode...**")
                                                                    return false;
                                                                }
                                                                
                                                            },function(featDB, message, msg){
                                                                console.log(msg.content.replace(/(?<=#)[0-9-A-F]{6}/g, ""))
                                                                if(msg.content.replace(/#+(?<=#)[0-9-A-F]{6}/g, "") == "" && msg.content.length == 7){
                                                                    return true;
                                                                } else {
                                                                    msg.reply("That's not a valid hex code!\n\n**Exiting create mode...**")
                                                                    return false;
                                                                }
                                                                
                                                            },function(){
                                                                
                                                                return true;
                                                            },
                                                        ],
                                                        timers: [15000, 180000, 120000, 120000, 120000, 120000],
                                                        dataAlloc: ["name", "desc", "image", "color", "shortDesc"],
                                                    }
                                                    function recursion(x){
                                                            if(x < stepCarrier.dataAlloc.length){
                                                                var startEmbed = new Discord.MessageEmbed()
                                                                .setColor('#00008B')
                                                                .setTitle('Achievement Setup Guide')
                                                                .setTimestamp()
                                                                .setFooter('Earth Scouter | Created by UrgedReaper', 'https://cdn.discordapp.com/avatars/923961669900722216/cb908064257d4e2d31fc7b3ecd9d2698.webp?size=80')
                                                                .setDescription("The bot will walk you through creating an achievement. Type `exit` at any time to exit the create mode.")
                                                                
                                                                .setThumbnail('https://cdn.discordapp.com/avatars/780954860265930844/505fc15d1596af9f4b850d470aabe8aa.webp?size=2048')
                                                                //generate dynembed
                                                                var i = 0;
                                                                //render previous results
                                                                while(i < x){
                                                                    
                                                                    var currentVal = stepCarrier.embedFields[i].value;
                                                                    startEmbed.addFields({name: `Step ${i+1}: `, value:`${currentVal.substring(2, currentVal.indexOf(". (") + 1)}\n**Input:** ${achData[stepCarrier.dataAlloc[i]]}`})
                                                                    i++;
                                                                }
                                                                
                                                                startEmbed.addFields(stepCarrier.embedFields[x])
                                                                message.channel.send(startEmbed)
                                                                var filter = m => m.author.id == message.author.id
                                                                message.channel.awaitMessages(filter, {idle: stepCarrier.timers[x], max: 1, errors: ['time']})
                                                                    .then(collected => {
                                                                        
                                                                        var msg = collected.first()
                                                                        //console.log(featDB)
                                                                        if(msg.content != "exit" && stepCarrier.checks[x](featDB, message, msg)){
                                                                            
                                                                            //do something
                                                                            achData[stepCarrier.dataAlloc[x]] = msg.content;
                                                                            recursion(x+1)
                                                                        } else {
                                                                            msg.reply("Exiting create mode. Your changes will not be saved.")
                                                                        }
                                                                    })
                                                                    .catch((e) => {
                                                                        //console.log(typeof e.message)
                                                                        if(e.message.includes("Cannot read property 'content' of undefined")){
                                                                            message.reply("You did not send a message in time.\nExiting create mode...\n\n**Your changes will not be saved.**")
                                                                        } else {
                                                                            console.log(colors.ERROR, e, colors.Reset)
                                                                            message.reply(errorMessage("code"))
                                                                        }
                                                                    })
                                                                } else {
                                                                    message.reply("Done, saving...")
                                                                    featDB.quests.push(achData)
                                                                    featDB.names.push(achData.name)
                                                                    fs.writeFile("featData.json", JSON.stringify(featDB), function(err){
                                                                        
                                                                        if(err){
                                                                            message.reply(errorMessage("data", "An error occured while saving to the database."))
                                                                            console.log(err)
                                                                        } else {
                                                                            message.channel.send(`Saved successfully!\n\n*View your new achievement with \`ban achievements view\`*`)
                                                                        }
                                                                    })
                                                                    
                                                                }
                                                            }
                                                        recursion(0)
                                                        
                                                        }
                                                    })
                                            break;
                                        case "delete":
                                            var target = message.content.substring(message.content.indexOf("delete") + 7)
                                            if(typeof target != undefined && target.length != 0){
                                                fs.readFile(`${path}featData.json`, (err, data) => {
                                                    if(err){
                                                        message.reply(errorMessage("data"))
                                                        console.log(colors.ERROR, err, colors.Reset)
                                                    } else {
                                                        message.reply("Deleting...")
                                                        var featDB = JSON.parse(data)
                                                        if(featDB.names.includes(target)){
                                                            featDB.names.splice(featDB.names.indexOf(target), 1)
                                                            featDB.quests.forEach((x) => {
                                                                if(x.name == target){
                                                                    featDB.quests.splice(featDB.quests.indexOf(x), 1)
                                                                }
                                                            })
                                                            fs.writeFile(`${path}featData.json`, JSON.stringify(featDB), (err) => {
                                                                if(err){
                                                                    message.reply(errorMessage("data"))
                                                                    console.log(err)
                                                                } else {
                                                                    message.reply("Achievement deleted successfully!")
                                                                }
                                                            })
                                                        } else {
                                                            message.reply("You did not provide a valid achievement to delete.")
                                                        }
                                                    }
                                                })
                                            } else {
                                                message.reply("You did not provide a valid achievement to delete.")
                                            }
                                            
                                                    break;
                                        case "list":
                                            
                                                fs.readFile(`${path}featData.json`, (err, data) => {
                                                    if(err){
                                                        message.reply(errorMessage("data"))
                                                        console.log(colors.ERROR, err, colors.Reset)
                                                    } else {
                                                        var db = JSON.parse(data)
                                                        var listEmbed = new Discord.MessageEmbed()
                                                        .setColor("#00008C")
                                                        .setTitle(`List of achievements/badges`)
                                                        .setTimestamp()
                                                        .setFooter('Earth Scouter | Created by UrgedReaper', 'https://cdn.discordapp.com/avatars/923961669900722216/cb908064257d4e2d31fc7b3ecd9d2698.webp?size=80')
                                                        
                                                        .setThumbnail("https://cdn.discordapp.com/avatars/923463675191369748/51c64caa74cdab65fa33cc30964bf856.webp")
                                                        
                                                            
                                                        var str = "Achievements: \n"
                                                        for(x in db.quests){
                                                            str += `\n**Name:**\n${db.quests[x].name}\n${db.quests[x].desc}\n**Image:** ${db.quests[x].image}\n**Color:** ${db.quests[x].color}\n**Short Desc:** ${db.quests[x].shortDesc}\n`
                                                        }
                                                        str += "Badges: \n"
                                                        for(x in db.tags){
                                                            str += `\n${db.tags[x]}`
                                                        }
                                                        listEmbed.setDescription(str)
                                                        
                                                        message.channel.send(listEmbed)
                                                    }
                                                })
                                            
                                            break;
                                        case "add":
                                        case "remove":
                                        default:
                                   }
                                } else {
                                    message.reply("You do not have access to this command.")
                                }
                            
                            }
                        })     
                        break;
                    default:
                        
                }
            }
      })
      function rand(Array) {
                       
        return Array[Math.floor(Math.random() * Array.length)]; 
    }
      client.login(token)