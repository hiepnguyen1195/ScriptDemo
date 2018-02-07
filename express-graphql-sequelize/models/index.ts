'use strict'
import * as fs from 'fs'
import * as path from 'path'
import * as Sequelize from 'sequelize'
import config from '../config/config'

const env  = process.env.NODE_ENV || 'development'

const dbConfig = config[env]

const sequelize = new Sequelize(
  dbConfig[`database`],
  dbConfig[`username`],
  dbConfig[`password`],
  dbConfig,
)

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
