const Discord = require('discord.js'),
catMe         = require('cat-me'),
request       = require('request'),
knockknock    = require('knock-knock-jokes');
// rp            = require('request-promise'),
// $             = require('cheerio');

const bot     = new Discord.Client();

const TOKEN = 'NzMyNzIzMTYyNTI5Mzk4ODg1.Xxj2Rw.3dqSIeUEOyB7QRwgo2Qnnt-c3oA';
const PREFIX = '!';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}





bot.on('ready', ()=>{
    console.log("WE ARE RUNNING");
    
});


bot.on("guildMemberAdd", (member) => { // Check out previous chapter for information about this event
    let guild = member.guild; 
    let memberTag = member.user.tag; 
    
    member.send(new Discord.MessageEmbed().setTitle("SERVER PROTOCAL").setDescription("HEY THERE! Thanks for joining. I'm your friend, Pot. I'm here to help as much as I can." + "**" + "❗Please click here <#734546639246852207> and tell us the classes that you are enrolled in." + "**" + " This is something every new user has to do in order for all of us to be known to each other. Let's keep this server low-key plz.🤫").setColor(0Xfc0366).setThumbnail(member.user.displayAvatarURL()))


    if(guild.systemChannel){
        guild.systemChannel.send(new Discord.MessageEmbed() // Creating instance of Discord.RichEmbed
        .setTitle("A new user joined the Programming Discord") // Calling method setTitle on constructor. 
        .setDescription(memberTag + " is now one of us.") // Setting embed description
        .setColor(0xF1C40F)
        .setThumbnail(member.user.displayAvatarURL()) // The image on the top right; method requires an url, not a path to file!
        .addField("Members now", member.guild.memberCount) // Adds a field; First parameter is the title and the second is the value.
        .setTimestamp() // Sets a timestamp at the end of the embed
        );
    }

    
    });


    bot.on('message', message => {
        if (message.author.bot) return;
        if (!message.content.startsWith(PREFIX)) return;
        if (message.content.startsWith(PREFIX + 'ping')) {
            message.channel.send({embed: {
                color: 0x2ed32e,
                fields: [{
                    name: "🏓 Pong",
                    value: "My Ping: " + Math.round(bot.ws.ping) + ' ms' //client.ping has been moved to the WebSocketManager under client.ws.ping
              }
             ],
        }
        })
        }})

bot.on('message', message => {
    
    let args = message.content.toLowerCase().substring(PREFIX.length).split(" ");
    

    switch(args[0]){

        case 'roll':
            message.channel.send('```The dice rolled a: ' + getRandomInt(1,6) + '```');
            break;
        
        case 'cat':
            message.channel.send('```' + catMe() + '```');
            break;

        case 'joke':
            message.channel.send('```' +  knockknock() + '```');
            break;
        case 'gl':
            var sentences = ["you are gonna ace this! you know we all believe in you, you rockstar ;)", "I can't wait for you to rock this exam! Good luck, champ!", "I never doubted your skills, you make us all look like a shrimp compared to you!", "You probably didn't study for this...but lucky for you, you got this in the BAG!", "Try your best! In the end, we're gonna be alright (:", "No matter how hard this will be, with your knowledge, this is gonna be a smooooooth ride."];
            message.channel.send(sentences[getRandomInt(0,5)]);
            break;
        case 'help':
            const embed = new Discord.MessageEmbed()
            .setTitle("Here is a list of commands") // Calling method setTitle on constructor. 
            .setDescription("**" + '!ping' + "**" + '- Show current ping\n' + "**" + '!roll' + "**" + '- Rolls the die (1-6)\n' + "**"+ '!cat'  +"**"+ '- random cat pictures lol\n' + "**" + "!joke" + "**" + "- knock knock joke\n" + "**" + '!help'+ "**" +  '- shows a list of commands.\n' + "**" + '!gl'+ "**" + ' - sends you a good luck sentence!\n' +  "**" + '!poll' + "**" + '- Initiate a \'yes\' or \'no\' poll.\n' + "**" + '!avi' + "**" + '- view someone elses by doing \'!avi (@person-name)\'\n')
            .setColor(0x34b7eb)
            message.channel.send(embed);
            break;
        case 'poll':
            const pollEmbed = new Discord.MessageEmbed()
            .setColor(0xb02dc4)
            .setTitle("Initiate Poll")
            .setDescription("Do '!poll (question goes here)' to initiate a 'yes' or 'no' poll.")

            if(!args[1]) {
                message.channel.send(pollEmbed);
                break;
            }

            let msgArgs = args.slice(1).join(" ");
            message.channel.send("📋 " + "**" + msgArgs + "**").then(messageReaction => {
                messageReaction.react("👍");
                messageReaction.react("👎");
                messageReaction.react("❓");
                message.delete({timeout: 1}).catch(console.error);
            });
           
            break;

        case 'avi':
            
            if(!args[1]) {

                let Me = message.author;
                const avatarEmbed = new Discord.MessageEmbed()
                .setColor(0xb02dc4)
                .setAuthor(Me.username + " #" + Me.discriminator)
                .setImage(Me.displayAvatarURL());
                message.channel.send(avatarEmbed);
                
            } 
            else {
                const user = message.mentions.users.first();
                const personEmbed = new Discord.MessageEmbed()
                .setColor(0xb02dc4)
                .setAuthor(user.username + " #" + user.discriminator)
                .setImage(user.displayAvatarURL());
                message.channel.send(personEmbed);
           
            }

            break;

       
        }
        
});

bot.login(TOKEN);