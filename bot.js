/*
	Project Name: Tbot's Discord Bot
	Written By: Thomas Ruigrok
    
    Copyright 2019-2020 By Thomas Ruigrok.
    
	This Source Code Form is subject to the terms of the Mozilla Public
    License, v. 2.0. If a copy of the MPL was not distributed with this
    file, You can obtain one at http://mozilla.org/MPL/2.0/.

    This Source Code Form is "Incompatible With Secondary Licenses", as
    defined by the Mozilla Public License, v. 2.0.
*/



/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////
//Variable declarations below this line                        //
////////////////////////////////////////////////////////////////

//Declare Discord Integration variables
const Discord = require('discord.js');
const client = new Discord.Client();

//Declare other integration variables
const fs = require('fs');

//Declare other const variables
const KEY_FILE_NAME = "DiscordLoginToken.key";

// Declare Bot const variables
const BOT_VERSION = '1.6';
const ADMIN_ROLE_NAME = "BotAdmin";
const CMD_PREFIX = '!!';
const AdminCmdPrefix = '*!';

// Declare one-time assignment variables
var DISCORD_LOGIN_TOKEN = 'TOKEN-AUTO-INJECTED-FROM-INIT';

// Commands Arrays
const CMDS = ['!!help', '!!ping', '!!cookie', '!!marco', '!!mcServer'];
const CMDS_DESCRP = ["Srsly Becky? It's pretty obvious m8", "Pong!", "Give a cookie, Get a Cookie!", "Polo!", "Minecraft Server IPs"];
const ADMINCMDS = ['*!reset', '*!shutdown'];
const ADMINCMDS_DESCRP = ["Restarts the bot", "Stops the bot"];

/////////////////////////////////////////////////////////////////
//MAIN                                                         //
////////////////////////////////////////////////////////////////

//Load Discord Login Token from file & Login to discord
init();

// On Client Ready, Send message to console
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// When a message is received, check against available commands
client.on('message', msg => {
    //Set msg to lowercase for command Checking
    msg = convertToLowercase(msg);

    //Command Checking
    checkForCommand(msg);
});


/////////////////////////////////////////////////////////////////
//END MAIN                                                     //
////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
//INITIALIZATION functions below this line                     //
////////////////////////////////////////////////////////////////


function init() {
    if (readKeyFromFile()) {
        //Login to client
        client.login(DISCORD_LOGIN_TOKEN);
    } else {

    }
}

function readKeyFromFile() {
    var keyLoaded = true;

    var keyFileData;
    fileArray = [];

    //Read token from file
    try {
        //Read login token from key file
        keyFileData = fs.readFileSync(KEY_FILE_NAME);
        //Split file data at new line char
        fileArray = keyFileData.toString().split(/\r?\n/);
        //Set login token to 3rd line of file
        DISCORD_LOGIN_TOKEN = fileArray[2];
    } catch (err) {
        console.log("Error getting token from file. Terminating...");
        keyLoaded = false
    }

    return keyLoaded;
}


/////////////////////////////////////////////////////////////////
//Cammand Functions below this line                            //
////////////////////////////////////////////////////////////////


function convertToLowercase(msg) {
    // Convert msg to lowercase
    msg.content = msg.content.toLowerCase();

    //Return the changed message
    return msg;
}


function checkForCommand(msg) {
    if (msg.content === CMD_PREFIX + 'ping') {
        Ping(msg);
    } else if (msg.content === CMD_PREFIX + 'cookie') {
        Cookie(msg);
    } else if (msg.content === CMD_PREFIX + 'marco') {
        Marco_polo(msg);
    } else if (msg.content === CMD_PREFIX + 'mcserver') {
        MinecraftIPs(msg);
    } else if (msg.content === AdminCmdPrefix + 'reset') {
        ResetBot(msg);
    } else if (msg.content === AdminCmdPrefix + 'shutdown') {
        StopBot(msg);
    } else if (msg.content === CMD_PREFIX + 'help') {
        Help(msg);
    } else if (msg.content === 'bubblegum') {
        BubbleGum(msg);
    };
}


function Help(msg) {
    //Regular Commands
    response = '\n' + "Available Commands" + '\n' + "-------------------\n";
    for (i = 0; i < CMDS.length; i++) {
        response += CMDS[i] + " - " + CMDS_DESCRP[i] + '\n';
    }

    //Admin Commands
    response += "\n ADMIN Commands" + '\n' + "-------------------\n";
    for (i = 0; i < ADMINCMDS.length; i++) {
        response += ADMINCMDS[i] + " - " + ADMINCMDS_DESCRP[i] + '\n';
    }

    //Reply
    msg.reply(response);
}


function Ping(msg) {
    msg.reply('pong');
}


function Cookie(msg) {
    msg.reply(':cookie:');
}


function Marco_polo(msg) {
    msg.reply('Polo!');
}


function MinecraftIPs(msg) {
    msg.reply('\n Main MC Server: mc.thesmc.ca \n Backup MC Server: mc3.thesmc.ca \n Skyblock MC Server (MC Version 1.12): mc2.thesmc.ca');
}


function RockPaperScissors(msg) {

    /* 	if (userChoice ==! 'rock' || userChoice ==! 'paper' || userChoice ==! 'scissors'){
    		msg.reply("Please choose either rock, paper, or scissors (All Lowercase)")
    	}
    	else{
    	} */
}

function BubbleGum(msg) {
    const BUBBLEGUM_RESPONSE = "shut your bubble gum dumb dumb skin tone chicken bone google chrome no homo flip phone disowned ice cream cone garden gnome extra chromosome metronome dimmadome genome full blown monochrome student loan indiana jones over grown flint stone X and Y Chromosome friend zome sylvester stalone sierra leone auto zone friend zone professionally seen silver patrone big headed ass UP";
    msg.reply(BUBBLEGUM_RESPONSE);
}


function CheckUserRole(msg) {
    var returnVar = false;
    //Validate user has sufficient permissions
    if (msg.guild.roles.find(role => role.name === ADMIN_ROLE_NAME)) {
        returnVar = true;
    }

    return returnVar;
}


function ResetBot(msg) {
    var channel = msg.channel;

    //Validate User role
    if (CheckUserRole(msg)) {
        // send channel a message that you're resetting bot
        channel.send('Bot Restarting...')
            .then(msg => client.destroy())
            .then(() => client.login(DISCORD_LOGIN_TOKEN));
    } else {
        msg.reply("You don't have permission to use that command. You must have the role of:  `" + ADMIN_ROLE_NAME + "`");
    }
}


function StopBot(msg) {
    var channel = msg.channel;

    //Validate User role
    if (CheckUserRole(msg)) {
        // send channel a message that you're stopping bot
        channel.send('Bot Shutting Down...')
            .then(msg => client.destroy());
    } else {
        msg.reply("You don't have permission to use that command. You must have the role of:  `" + ADMIN_ROLE_NAME + "`");
    }
}