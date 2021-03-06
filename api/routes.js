
/* routes.js */

import { Router } from 'https://deno.land/x/oak@v6.5.1/mod.ts'

import { extractCredentials, saveFile } from './modules/util.js'
import { login, register, getUser } from './modules/accounts.js'

import { getAllGames, addGame, getGame, updateGame, deleteGame } from './modules/games.js'
import { getAllGameReviews, addGameReview, getGameReview, updateGameReview, deleteGameReview } from './modules/gameReviews.js'
const router = new Router()

// the routes defined here
router.get('/', async context => {
	console.log('GET /')
	const data = await Deno.readTextFile('spa/index.html')
	context.response.body = data
})

router.get('/accounts', async context => {
	console.log('GET /accounts')
	const token = context.request.headers.get('Authorization')
	console.log(`auth token: ${token}`)
	try {
		const credentials = extractCredentials(token)
		console.log(credentials)
		const username = await login(credentials)
		console.log(`username: ${username}`)

		let data =  await getUser(username)
		context.response.body = JSON.stringify({ status: 'success', data }, null, 2)
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'unauthorised', msg: err.msg })
	}
})

router.post('/accounts', async context => {
	console.log('POST /accounts')
	const body  = await context.request.body()
	const data = await body.value


	console.log(data)
	await register(data)
	context.response.status = 201
	context.response.body = JSON.stringify({ status: 'success', msg: 'account created' })
})

router.post('/files', async context => {
	console.log('POST /files')
	try {
		const token = context.request.headers.get('Authorization')
		console.log(`auth: ${token}`)
		const body  = await context.request.body()
		const data = await body.value
		console.log(data)
		saveFile(data.base64, data.user)
		context.response.status = 201
		context.response.body = JSON.stringify({ status: 'success', msg: 'file uploaded' })
	} catch(err) {
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'unauthorised', msg: err.msg })
	}
})



//Routes for games

router.get('/api/v1/games', async context =>  {
	// Get all games
	console.log('GET /api/v1/games')
	try 
	{
		context.response.status = 201
		context.response.body = await getAllGames();
		console.log(await getAllGames());
	} catch (error) {
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'Error accessing list of games', msg: err.msg })
	}
	
})

router.post('/api/v1/games', async context => {
	try 
	{
		// Add a game
		console.log('POST /api/v1/games')
		const body  = await context.request.body()
		const data = await body.value
		//console.log(data)
		await addGame(data)

		context.response.status = 201
		context.response.body = JSON.stringify({ status: 'success', msg: 'Game added' })	
	} catch (err) 
	{
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'Failed to add game to database', msg: err.msg })
	}
	
})


router.get('/api/v1/games/:id', async context => {
	// Get one games of game: id
	let id = context.captures[0]

	console.log("GET /api/v1/games/" + id)
	
	try 
	{
		context.response.body = await getGame(id);
		context.response.status = 201
	} catch (error) 
	{
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'Game does not exist', msg: err.msg })
	}
})


router.put('/api/v1/games/:id', async context => {
	// Update a game

	let id = context.captures[0]
	console.log("PUT /api/v1/games/" + id)

	try 
	{
		// Add a game
		const body  = await context.request.body()
		const data = await body.value
		//console.log(data)
		await updateGame(id, data)

		context.response.status = 201
		context.response.body = JSON.stringify({ status: 'success', msg: 'Game Updated' })	
	} catch (err) 
	{
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'Failed to update game information', msg: err.msg })
	}
})


router.delete('/api/v1/games/:id', async context => {
	// Delete a game
	// Get one games of game: id
	//console.log(context.captures)
	let id = context.captures[0]
	//console.log(context.captures)
	console.log("DELETE /api/v1/games/" + id)
	
	try 
	{
		context.response.body = await deleteGame(id);
		context.response.status = 201
		context.response.body = JSON.stringify({ status: 'success', msg: 'Game Deleted' })
	} catch (error) 
	{
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'Game does not exist', msg: err.msg })
	}
})






//Routes for game reviews




router.get('/api/v1/games/:id/reviews', async context => {
	// Get all reviews of game
	let gameId = context.captures[0]
	console.log("GET /api/v1/games/" + gameId + "/reviews")

	try 
	{
		context.response.body = await getAllGameReviews(gameId);
		context.response.status = 201
	} catch (error) {
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'Error accessing list of game reviws', msg: err.msg })
	}
	//console.log(id)
})

router.post('/api/v1/games/:id/reviews', async context => {
	// Post reviews of game
	let gameId = context.captures[0]
	console.log("POST /api/v1/games/" + gameId + "/reviews")

	try 
	{
		// Add a game
		const body  = await context.request.body()
		const data = await body.value
		//console.log(data)
		await addGameReview(gameId, data)

		context.response.status = 201
		context.response.body = JSON.stringify({ status: 'success', msg: 'Game review added' })	
	} catch (err) 
	{
		console.log(err)
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'Failed to add game review to database', msg: err.msg })
	}
})

router.get('/api/v1/games/:id/reviews/:id', async context => {
	// Update particular review of game

	let gameId = context.captures[0]
	let id = context.captures[1]

	try 
	{
		context.response.status = 201
		context.response.body = await getGameReview(gameId, id);
	} catch (error) {
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'Error accessing list game', msg: err.msg })
	}
})

router.put('/api/v1/games/:id/reviews/:id', async context => {
	// Update particular review of game

	let gameId = context.captures[0]
	let id = context.captures[1]

	try 
	{
		// Add a game
		const body  = await context.request.body()
		const data = await body.value
		//console.log(data)
		await updateGameReview(gameId, id, data)

		context.response.status = 201
		context.response.body = JSON.stringify({ status: 'success', msg: 'Game Updated' })	
	} catch (err) 
	{
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'Failed to update game review', msg: err.msg })
	}
})

router.put('/api/v1/games/:id/reviews/:id', async context => {
	// Delete particular review of game
	let gameId = context.captures[0]
	let id = context.captures[1]

	try 
	{
		// Add a game
		const body  = await context.request.body()
		const data = await body.value
		//console.log(data)
		await deleteGameReview(gameId, id)

		context.response.status = 201
		context.response.body = JSON.stringify({ status: 'success', msg: 'Game Review Deleted' })	
	} catch (err) 
	{
		context.response.status = 401
		context.response.body = JSON.stringify({ status: 'Failed to delete game review', msg: err.msg })
	}
})




router.get("/(.*)", async context => {      
	// 	const data = await Deno.readTextFile('static/404.html')
	// 	context.response.body = data
		const data = await Deno.readTextFile('spa/index.html')
		context.response.body = data
	})


export default router

