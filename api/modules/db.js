
/* db.js */

import { Client } from 'https://deno.land/x/mysql/mod.ts'

const connectionData = {
  hostname: '127.0.0.1',
  username: 'root',
  password: '',
  db: 'game'
}

const db = await new Client().connect(connectionData)

export { db }
