
/* login.js */

import { createToken, customiseNavbar, secureGet, loadPage, showMessage } from '../util.js'

export async function setup(node) {
	try {
		console.log('LOGIN: setup')
		console.log(node)
		document.querySelector('header p').innerText = 'Login Page'
		customiseNavbar(['home', 'register', 'login'])
		node.querySelector('form').addEventListener('submit', await login)
	} catch(err) {
		console.error(err)
	}
}

async function login() {
	event.preventDefault()
	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData.entries())

	const token = 'Basic ' + btoa(`${data.user}:${data.pass}`)
	print(`token = ${token}`)
	const response = await secureGet('/accounts', token)

	//console.log(response)
	if(response.status === 200) {
		localStorage.setItem('username', response.json.data.username)
		localStorage.setItem('authorization', token)
		showMessage('you are logged in')
		await loadPage('foo')
	} else {
		showMessage('Unsuccessful login')
		document.querySelector('input[name="pass"]').value = ''
	}
}

async function register() {
	event.preventDefault()
	const formData = new FormData(event.target)
	const data = Object.fromEntries(formData.entries())
	
	const url = '/accounts'
	const options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}
	const response = await fetch(url, options)
	const json = await response.json()
	console.log(json)
	showMessage('new account registered')
	loadPage('login')
}