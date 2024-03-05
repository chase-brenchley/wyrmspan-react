/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from 'firebase-functions/v2/https'
import * as logger from 'firebase-functions/logger'
import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp } from 'firebase-admin/app'
import { BoardGame } from './helper/BoardGame'

initializeApp()

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

export const startGame = onRequest(async (request, response) => {
  logger.info('New game started')

  const initialState = new BoardGame(1)

  const document = await getFirestore()
    .collection('games')
    .add(JSON.parse(JSON.stringify(initialState)))
  // response will send back which collection to listen to
  response.json({ id: document.id })
})
