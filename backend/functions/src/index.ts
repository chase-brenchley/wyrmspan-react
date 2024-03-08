/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest, onCall } from 'firebase-functions/v2/https'
import * as logger from 'firebase-functions/logger'
import {
  DocumentData,
  FieldValue,
  QueryDocumentSnapshot,
  getFirestore
} from 'firebase-admin/firestore'
import { initializeApp } from 'firebase-admin/app'
import { BoardGame } from './helper/BoardGame'

initializeApp()

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

export const startGame = onCall({}, async request => {
  logger.info('New game started')

  const initialState = new BoardGame('test relpace with actual value later')

  const document = await getFirestore()
    .collection('games')
    .withConverter({
      toFirestore (data: BoardGame): DocumentData {
        return BoardGame.transformToFirestore(data)
      },
      fromFirestore (snap: QueryDocumentSnapshot): BoardGame {
        return snap.data() as BoardGame
      }
    })
    .add(initialState)
  // response will send back which collection to listen to
  return { id: document.id }
})

export const tryJoinGame = onCall({}, async request => {
  if (request.data.gameId) {
    const { gameId, player } = request.data

    const document = getFirestore().collection('games').doc(gameId)
    await document.update({
      players: FieldValue.arrayUnion(player),
      numPlayers: FieldValue.increment(1)
    })

    return { id: document.id }
  }
  return 'no gameID included'
})
