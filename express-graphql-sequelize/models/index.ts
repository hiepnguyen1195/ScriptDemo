'use strict'
import * as fs from 'fs'
import * as path from 'path'
import * as Sequelize from 'sequelize'

const database = 'graphql'
const username = 'root'
const password = 'root'

const sequelize = new Sequelize(database, username, password, {
  dialect: 'mysql',
  port: 3306,
  host: '127.0.0.1',
})

const db = {}
const basename  = path.basename(module.filename)

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts')
  })
  .forEach((file) => {
    const model = sequelize[`import`](path.join(__dirname, file))
    db[model[`name`]] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db[`sequelize`] = sequelize
db[`Sequelize`] = Sequelize

module.exports = db
