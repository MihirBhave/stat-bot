import {ApplicationCommandOptionType , EmbedBuilder, Guild, GuildMember, PermissionFlagsBits} from 'discord.js';
import Command from '../../../lib/Command.js';

export default new Command({
    name : "statistics",
    description : "Displays Member's statistics !",
    options : [{
        name : "member",
        description : "The Target Member",
        type : ApplicationCommandOptionType.User,
        required : false
    }],
    type : ApplicationCommandOptionType.Subcommand,

    async run(client , interaction , options ){
        const member = options.getMember('member')? options.getMember('member') as GuildMember : interaction.member as GuildMember;
        const nitroSince = `<t:${Math.floor(member.premiumSinceTimestamp!/1000)}:R>`
        const roles = member.roles.cache.filter(r => r.name !== "@everyone")

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
                                Username : **${member.user.username}#${member.user.discriminator}**
                                Nickname : ${member.nickname ? member.nickname! : "--"}
                                Accounted Created : <t:${Math.floor(member.user.createdTimestamp!/1000)}:R>
                                Joined Server : <t:${Math.floor(member.joinedTimestamp!/1000)}:R>
                                Administrator : ${member.permissions.has(PermissionFlagsBits.Administrator) ? "\`Yes\`" : "\`No\`" }
                                `
                            },
                            {
                                name : "Roles",
                                value : `${roles.map(role => `${role}`).join(",")}`
                            },
                            
                        )
                        .setFooter({text : `Requested By ${interaction.user.username}#${interaction.user.discriminator}` , iconURL : `${(interaction.member as GuildMember).displayAvatarURL()!}`})

        interaction.reply({
            embeds : [embed]
    })
    }
})