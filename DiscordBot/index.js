const Axios = require('axios');
const Discord = require("discord.js")
const command = "!";
const TOKEN = "OTM2MTQyODg1MTIyODcxMjk3.YfI5AA.c2SHF7gMYxji4KgPuI33PEjOaic"
const webHookURL = "https://discord.com/api/webhooks/960752096314007572/F4IUIEcR4rllDZtQDVLy5sojLWrj9hxP_6ClQcNvU60w07wnZ0RoKN4bDcI5Mb0ajCOC";

//const generateImage = require("./generateImage")

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate", (message) => {
    if(message.content.startsWith("!"))
    if (message.content == command + "hi"){
        message.reply("Hello World!")
    }else if(message.content == command + "seasons"){
        Axios.get("http://localhost:5000/seasons")
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                console.log(res.data[i].SEASONNAME);
                message.reply(res.data[i].SEASONNAME);
            }
        })
    }else if(message.content == command+"tournaments"){
        Axios.get("http://localhost:5000/getTourneys")
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                console.log(res.data[i].NAME);
                message.reply(res.data[i].NAME);
            }
        })
    }else if(message.content === command+"test"){
        message.channel.type === ("dm") + message.author.send("testing1234")
    }
})

const welcomeChannelId = "936157019671523368"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Welcome to the server!`,
        files: [img]
    })
})

client.login(TOKEN)

const genChanId = "936194019539681280"

client.on('ready', client => {
    client.channels.cache.get(genChanId).send({content: 'Bot is LIVE!'})
})