const axios = require('axios')
const { sheetsu } = require('../auth.json')

class Action {


    loadNotes() {
        return new Promise((resolve, reject) => {
            axios.get(sheetsu)
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
    }

    async findNote(command) {

        if (command.option === "sheet") {
            return sheetsu;
        }

        let notes = await this.loadNotes()
        let note = notes.data.filter(item => item.key === command.option);

        if (!note.length) {
            return `não encontrei nada com *${command.option}*... :cry:`
        } 

        return note[0].value;
    
    }

}

module.exports = Action