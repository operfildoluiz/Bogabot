const sheetsuNode = require('sheetsu-node')
const { sheetsu } = require('../auth.json')
const sheetsuClient = new sheetsuNode({address: sheetsu})

class Action {


    loadNotesFromSheet() {
        return new Promise((resolve, reject) => {
            sheetsuClient.read()
            .then(data => resolve(JSON.parse(data)))
            .catch(error => reject(error))
        })
    }

    sendNoteToSheet(body) {
        return new Promise((resolve, reject) => {
            sheetsuClient.create(body)
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    }    

    async addNote(command) {

        if (!command.args.length) {
            return 'Você deve adicionar um valor para esse comando'
        }

        let note = {
            key: command.option,
            value: command.args
        }

        let response = await this.sendNoteToSheet(note)

        if (!response.error) {
            return `adicionei **${note.key}** => *${note.value}* à lista`
        }
        
        return `**NÃO ROLOU** adicionar **${note.key}** => *${note.value}* à lista`


    }

    async getNote(command) {

        if (command.option === "sheet") {
            return sheetsu;
        }

        let notes = await this.loadNotesFromSheet()
        let note = notes.filter(item => item.key === command.option);

        if (!note.length) {
            return `não encontrei nada com *${command.option}*... :cry:`
        } 

        return note[0].value;
    
    }

}

module.exports = Action