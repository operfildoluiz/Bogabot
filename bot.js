const discord = require('discord.js')
const { token } = require('./auth.json')
const client = new discord.Client()
client.login(token)

const imports = {
    Notes: require('./actions/notes')
}

const actions = {
    notes: new imports.Notes()
}

client.on('ready', () => {
    console.log('[BOT]', 'Started');
})

client.on('message', async message => {
    const { content } = message

    if (content.substr(0,1) === '!') {
        let command = parseNote(content);
        return message.reply(await actions.notes.findNote(command))
    }
})

//
function parseNote(content)  {
    let cmd = content.substring(1).split(' ')
    let option = cmd[0]
    let args = cmd[1] || []

    return {
        option,
        args
    }
}

