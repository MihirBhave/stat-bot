import Command from "../../../lib/Command.js";
import { ApplicationCommandOptionType, EmbedBuilder,  GuildMember,  PermissionFlagsBits, } from "discord.js";


export default new Command({
    name : "statistics",
    description : "The Stats of this server!",
    options : [],
    type : ApplicationCommandOptionType.Subcommand,
    run: async(client , interaction , options) => {
        const {guild } = interaction;
        const member = interaction.member as GuildMember;
        await guild?.members.fetch();
        const membersOnline = guild?.members.cache.filter(member => member.presence?.status === "online") 
       
        const embed = new EmbedBuilder()
                .setColor('Random')
                .setAuthor({name : `${guild?.name}` , iconURL : `${guild?.iconURL({forceStatic:false})}`})
                .addFields(
                    {
                        name : "General",
                        value : 
                        `
                        Owner : <@${guild?.ownerId}>
                        Created : <t:${Math.floor(guild?.createdTimestamp! / 1000)}:R>
                        Description : ${guild?.description ? guild?.description : "None"}
                        Boosts : ${guild?.premiumSubscriptionCount}
                        ` 
                    },
                    {
                        name : "Members",
                        value : 
                        `   
                        Total Members : ${guild?.memberCount}
                        Bots : ${(guild?.members.cache.filter(m => m.user.bot))?.size}
                        Online : ${membersOnline?.size}
                        Administrators : ${(guild?.members.cache.filter(m => m.permissions.has(PermissionFlagsBits.Administrator)))?.size}
                        `
                    },
                    {
                        name : "Roles",
                        value : 
                        `
                        Total Roles : ${guild?.roles.cache.size}
                        Admin Roles : ${(guild?.roles.cache.filter(r => r.permissions.has(PermissionFlagsBits.Administrator)))?.size}
                        Highest Role : ${guild?.roles.highest}
                        `
                    },
                    {
                        name : "Channels",
                        value : 
                        `
                        Total Channels : ${guild?.channels.cache.size}
                        Text Channels : ${(guild?.channels.cache.filter(c=> c.isTextBased()))?.size}
                        Voice Channels : ${(guild?.channels.cache.filter(c => c.isVoiceBased()))?.size}
                        `
                    }
                )
                .setFooter({text : `Requested By ${member?.user.username}` , iconURL : `${member?.displayAvatarURL() ? member.displayAvatarURL() : null}`})
                    
                interaction.reply({
                    embeds : [embed]
                })

    }
})