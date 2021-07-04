import { db } from './db.js'

export async function getAllGameReviews(gameId) {
	let sql = `SELECT * FROM` +  ' `game_reviews`' + ` WHERE game_id = "${gameId}"`
	console.log(sql)

	let records = await db.query(sql)
    
	return records
}

export async function getGameReview(gameId,id) {
	//SELECT * FROM `game` where id = "1"
	let sql = `SELECT * FROM` +  ' `game_reviews`' + ` WHERE id = "${id}"`
	console.log(sql)

	let records = await db.query(sql)
	if(records == [])
		throw 401
	console.log(records)
    
	return records
}

export async function addGameReview(gameId, gameReviewDetails) {
	//console.log(gameReviewDetails)
	//credentials.pass = await hash(credentials.pass, salt)
	const sql = `INSERT INTO game_reviews (game_id, rating, review, user_id, review_time, review_date) VALUES("${gameId}", "${gameReviewDetails.rating}", "${gameReviewDetails.review}", "${gameReviewDetails.user_id}", "${gameReviewDetails.review_time}", "${gameReviewDetails.review_date}")`
	
	console.log(sql)

	const records = await db.query(sql)
	return true
}

export async function updateGameReview(gameId, id, gameReviewDetails) {
	//console.log(gameReviewDetails)
	//credentials.pass = await hash(credentials.pass, salt)
	const sql = `UPDATE game_reviews SET rating = "${gameReviewDetails.rating}", review = "${gameReviewDetails.review}", user_id = "${gameReviewDetails.user_id}", review_time = "${gameReviewDetails.review_time}", review_date = "${gameReviewDetails.review_date}" WHERE game_id = "${gameId}" AND id = "${id}"`
	
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
