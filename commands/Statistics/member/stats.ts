import {ApplicationCommandOptionType , EmbedBuilder, Guild, GuildMember} from 'discord.js';
import Command from '../../../lib/Command.js';

export default new Command({
    name : "statistics",
    description : "Displays Member's statistics !",
    options : [],
    type : ApplicationCommandOptionType.Subcommand,

    async run(client , interaction ){
        const member = interaction.member as GuildMember;
        const nitroSince = `<t:${Math.floor(member.premiumSinceTimestamp!/1000)}:R>`
        const embed = new EmbedBuilder()
                        .setAuthor({name : `${member.user.username}` , iconURL : `${member.displayAvatarURL()!}`})
                        .setColor("Random")
                        .addFields(
                            {
                                name : "Presence",
                                value: 
                                `
                                Status : ${member.presence?.status.toUpperCase()}
                                Activity : \`${member.presence?.activities[0].state}\`
                                Nitro Holder Since : ${member.premiumSince ? nitroSince : "--"}
                                `
                            },
                            {
                                name : "General",
                                value :
                                `
                                Username : ${member.user.username}
                                Nickname : ${member.nickname ? member.nickname! : "--"}
                                Accounted Created : <t:${Math.floor(member.user.createdTimestamp!/1000)}:R>
                                Joined Server : <t:${Math.floor(member.joinedTimestamp!/1000)}:R>
                                `
                            },
                            {
                                name : "Roles",
                                value : `${member.roles.cache.map(role => `${role}`).join(",")}`
                            }
                        )
                        .setFooter({text : `Requested By ${member.user.username}` , iconURL : `${member.displayAvatarURL()!}`})

        interaction.reply({
            embeds : [embed]
    })
    }
})