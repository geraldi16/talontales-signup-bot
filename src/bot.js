import { Client, GatewayIntentBits } from 'discord.js';

import Command from './constants/command.constant.js';
import { showInfo } from './services/info.service.js';
import { setUpNewInstance } from './services/instance.service.js';

const PREFIX = '!';
const SPLITTER = ' ';

const client = new Client({
    intents:[
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});
client.on("ready", () =>{
    console.log("The AI bot is online"); //message when bot is online
});

client.on('messageCreate', async (message) => {
    if (!message.author.bot && message.content.startsWith(PREFIX)) {
        const params = message.content.split(SPLITTER);
        const command = params.shift().split(PREFIX)[1];

        switch (command) {
            case Command.INFO: {
                const sentMessage = showInfo();
                message.channel.send({ embeds: [sentMessage] });
                break;
            }
            case Command.NEW: {
                try {
                    const sentMessage = await setUpNewInstance(params, message.channelId);
                    message.channel.send({ embeds: [sentMessage] });
                } catch (error) {
                    console.log(error.message);
                    message.channel.send('Please provide correct instance name. See `!info` for more details.');
                }
                break;
            }
            default: message.channel.send('Command is not available. Type `!info` for more.');
        }
    }
})

client.login(process.env.DISCORD_BOT_TOKEN);