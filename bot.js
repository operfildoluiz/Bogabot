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

    if (content.substr(0,1) === '?') {
        let command = parseNoteCommand(content);
        return message.reply(await actions.notes.getNote(command))
    } 
    else if (content.substr(0,1) === '+') {
        let command = parseNoteCommand(content);
        return message.reply(await actions.notes.addNote(command))
    }
})

//
function parseNoteCommand(content)  {
    let cmd = content.substring(1).split(' ')
    let option = cmd[0]
    let args = cmd[1] || null

    return {
        option,
        args
    }
}

