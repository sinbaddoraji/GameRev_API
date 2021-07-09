
/* accounts.js */

import { compare, genSalt, hash } from 'https://deno.land/x/bcrypt@v0.2.4/mod.ts'
import { db } from './db.js'

const saltRounds = 10
const salt = await genSalt(saltRounds)

export async function login(credentials) {
	const { user, pass } = credentials

	let sql = `SELECT count(id) AS count FROM accounts WHERE user="${user}";`
	let records = await db.query(sql)

	if(!records[0].count) throw new Error(`username "${user}" not found`)
	sql = `SELECT pass FROM accounts WHERE user = "${user}";`
	records = await db.query(sql)

	console.log(records)

	const valid = await compare(pass, records[0].pass)
	if(valid === false) throw new Error(`invalid password for account "${user}"`)
	return user
}

export async function getUser(username) {

	let sql = `SELECT id, user, email, first_name, last_name, country FROM ` + "`accounts`" + `WHERE user = "${username}"`;
	let records = await db.query(sql)
	console.log(records)
	return records
}

export async function register(credentials) {
	credentials.pass = await hash(credentials.pass, salt)
	const sql = `INSERT INTO accounts(user, pass, email, first_name, last_name, country) VALUES("${credentials.user}", "${credentials.pass}", "${credentials.email}", "${credentials.first_name}", "${credentials.last_name}", "${credentials.country}" )`
	console.log(sql)
	const records = await db.query(sql)
	return true
}
