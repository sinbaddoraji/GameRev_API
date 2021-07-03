import { db } from './db.js'

export async function getAllGames() {
	let sql = "SELECT * FROM `game`"
	console.log(sql)

	let records = await db.query(sql)
    
	return records
}

export async function getGame(id) {
	//SELECT * FROM `game` where id = "1"
	let sql = `SELECT * FROM` +  ' `game`' + ` where id = "${id}"`
	console.log(sql)

	let records = await db.query(sql)
	if(records == [])
		throw 401
	console.log(records)
    
	return records
}

export async function addGame(gameDetails) {
	//console.log(gameDetails)
	//credentials.pass = await hash(credentials.pass, salt)
	const sql = `INSERT INTO game (title, thumbnail, publisher, release_year, description, genre, platforms, username, post_time, post_date) VALUES("${gameDetails.title}", "${gameDetails.thumbnail}", "${gameDetails.publisher}", "${gameDetails.release_year}", "${gameDetails.description}", "${gameDetails.genre}", "${gameDetails.platforms}", "${gameDetails.username}", "${gameDetails.post_time}", "${gameDetails.post_date}")`
	
	console.log(sql)

	const records = await db.query(sql)
	return true
}

export async function updateGame(id, gameDetails) {
	//console.log(gameDetails)
	//credentials.pass = await hash(credentials.pass, salt)
	const sql = `UPDATE game SET title = "${gameDetails.title}", thumbnail = "${gameDetails.thumbnail}", publisher = "${gameDetails.publisher}", release_year = "${gameDetails.release_year}", description = "${gameDetails.description}", genre = "${gameDetails.genre}", platforms = "${gameDetails.platforms}", username = "${gameDetails.username}", post_time = "${gameDetails.post_time}", post_date = "${gameDetails.post_date}" WHERE id = "${id}"`
	
	console.log(sql)

	const records = await db.query(sql)
	return true
}

export async function deleteGame(id) {
	//console.log(gameDetails)
	//credentials.pass = await hash(credentials.pass, salt)
	const sql = `DELETE FROM game WHERE id = "${id}"`
	
	console.log(sql)

	const records = await db.query(sql)
	return true
}
