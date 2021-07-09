import { db } from './db.js'
import { getAllGameReviews } from './gameReviews.js'

export async function getAllGames() {
	let sql = "SELECT id FROM `game`"
	let ids = await db.query(sql)
    
	
	let data = []

	for (let index = 0; index < ids.length; index++) {
		const game = ids[index];

		let gameRecord = await getGame(game.id)
		
		data.push(gameRecord)
	}
	
	let output = JSON.stringify({ version : "1.0", href : "http://127.0.0.1:8086/api/v1/games", data })
	return JSON.parse(output)

}

export async function getAllGameRecords() {
	let sql = "SELECT * FROM `game`"
	console.log(sql)

	let records = await db.query(sql)
    
	return records
}

export async function getGame(id) {
	//SELECT * FROM `game` where id = "1"

	let allGames = await getAllGameRecords();
	
	let data = null

	let i = 0;
	for (;i < allGames.length; i++) {
		const element = allGames[i];

		if(element.id == id)
		{
			data = allGames[i]
			break;
		}
	}

	if(i == allGames.length - 1) i--
	

	let nextId = allGames[i+1].id;
	let firstId = allGames[0].id;
	let lastId = allGames[allGames.length - 1].id;

	let links = {
		self: `http://127.0.0.1:8086/api/v1/games/${id}`,
		next: `http://127.0.0.1:8086/api/v1/games/${nextId}`,
		first: `http://127.0.0.1:8086/api/v1/games/${firstId}`,
		last: `http://127.0.0.1:8086/api/v1/games/${lastId}`
	}


	let included = await getAllGameReviews(id);

	let output = JSON.stringify({ type: "game", links, data, included })

	
	return JSON.parse(output)
}

export async function addGame(gameDetails) {
	//console.log(gameDetails)
	//credentials.pass = await hash(credentials.pass, salt)
	var date = today.getDate()+(today.getMonth()+1)+'-'+today.getFullYear()
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	const sql = `INSERT INTO game (title, thumbnail, publisher, release_year, description, genre, platforms, username, post_time, post_date) VALUES("${gameDetails.title}", "${gameDetails.thumbnail}", "${gameDetails.publisher}", "${gameDetails.release_year}", "${gameDetails.description}", "${gameDetails.genre}", "${gameDetails.platforms}", "${gameDetails.username}", "${time}", "${date}")`
	
	console.log(sql)

	const records = await db.query(sql)
	return true
}

export async function updateGame(id, gameDetails) {
	//console.log(gameDetails)
	//credentials.pass = await hash(credentials.pass, salt)
	var date = today.getDate()+(today.getMonth()+1)+'-'+today.getFullYear()
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	const sql = `UPDATE game SET title = "${gameDetails.title}", thumbnail = "${gameDetails.thumbnail}", publisher = "${gameDetails.publisher}", release_year = "${gameDetails.release_year}", description = "${gameDetails.description}", genre = "${gameDetails.genre}", platforms = "${gameDetails.platforms}", username = "${gameDetails.username}", post_time = "${time}", post_date = "${date}" WHERE id = "${id}"`
	
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
