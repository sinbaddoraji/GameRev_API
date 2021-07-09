import { db } from './db.js'


export async function getAllGameReviews(gameId) {
	let sql = "SELECT id FROM `game_reviews`" + ` WHERE game_id = "${gameId}"`
	let ids = await db.query(sql)
	
	let data = []

	for (let index = 0; index < ids.length; index++) {
		const game = ids[index];

		let gameReview = await getGameReview(gameId, game.id)
		
		data.push(gameReview)
	}
	
	let output = JSON.stringify({ version : "1.0", href : `http://127.0.0.1:8086/api/v1/games/${gameId}/reviews`, data })
	return JSON.parse(output)
}

export async function getAllGameReviewRecords(gameId) {
	let sql = `SELECT * FROM` +  ' `game_reviews`' + ` WHERE game_id = "${gameId}"`
	console.log(sql)

	let records = await db.query(sql)
    
	return records
}



export async function getGameReview(gameId,id) {
	//SELECT * FROM `game` where id = "1"

	let allGames = await getAllGameReviewRecords(gameId);
	
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
		game: `http://127.0.0.1:8086/api/v1/games/${gameId}`,
		parent: `http://127.0.0.1:8086/api/v1/games/${gameId}/reviews`,
		self: `http://127.0.0.1:8086/api/v1/games/${gameId}/reviews/${id}`,
		next: `http://127.0.0.1:8086/api/v1/games/${gameId}/reviews/${nextId}`,
		first: `http://127.0.0.1:8086/api/v1/games/${gameId}/reviews/${firstId}`,
		last: `http://127.0.0.1:8086/api/v1/games/${gameId}/reviews/${lastId}`
	}

	let output = JSON.stringify({ type: "game review", links, data })

	return JSON.parse(output)
}



export async function addGameReview(gameId, gameReviewDetails) {
	//console.log(gameReviewDetails)
	//credentials.pass = await hash(credentials.pass, salt)
	var date = today.getDate()+(today.getMonth()+1)+'-'+today.getFullYear()
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	const sql = `INSERT INTO game_reviews (game_id, rating, review, username, review_time, review_date) VALUES("${gameId}", "${gameReviewDetails.rating}", "${gameReviewDetails.review}", "${gameReviewDetails.username}", "${time}", "${date}")`
	
	console.log(sql)

	const records = await db.query(sql)
	return true
}

export async function updateGameReview(gameId, id, gameReviewDetails) {
	//console.log(gameReviewDetails)
	//credentials.pass = await hash(credentials.pass, salt)
	var date = today.getDate()+(today.getMonth()+1)+'-'+today.getFullYear()
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	const sql = `UPDATE game_reviews SET rating = "${gameReviewDetails.rating}", review = "${gameReviewDetails.review}", username = "${gameReviewDetails.username}", review_time = "${time}", review_date = "${date}" WHERE game_id = "${gameId}" AND id = "${id}"`
	
	console.log(sql)

	const records = await db.query(sql)
	return true
}

export async function deleteGameReview(gameId, id) {
	//console.log(gameReviewDetails)
	//credentials.pass = await hash(credentials.pass, salt)
	const sql = `DELETE FROM game_reviews WHERE game_id = "${gameId}" AND id = "${id}"`
	
	console.log(sql)

	const records = await db.query(sql)
	return true
}
