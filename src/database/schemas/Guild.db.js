// require('dotenv').config()
const JsonDb = require('@kreisler/js-jsondb')
const { isEmptyArray } = require('../../helpers/helpers.js')

module.exports = class {
  constructor () {
    this.guildDb = new JsonDb('src/json')
    this.guildJson = 'guild'
  }

  getGuildAllData () {
    return this.guildDb.select(this.guildJson)
  }

  getGuildData (guildID) {
    const [exist, [guildData]] = this.guildExist(guildID)
    const data = {
      guildID,
      prefix: process.env.PREFIX,
      language: process.env.LANGUAGE
    }
    if (!exist) {
      this.guildDb.insert(this.guildJson, data)
    }
    return exist ? guildData : data
  }

  guildExist (id) {
    const q = this.guildDb.select(
      this.guildJson,
      ({ guildID }) => guildID === id
    )
    if (isEmptyArray(q)) {
      return [false, q]
    }
    return [true, q]
  }
}
