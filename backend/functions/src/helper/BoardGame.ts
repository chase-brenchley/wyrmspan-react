export class BoardGame {
  private state: object
  private numPlayers: number
  private gameStarted: boolean
  private players: string[]

  constructor (creator: string) {
    this.state = {}
    ;(this.numPlayers = 1), (this.gameStarted = false)
    this.players = [creator]
  }

  public printBoard (): string {
    return JSON.stringify(this.state)
  }

  public static transformToFirestore (
    boardGame: BoardGame
  ): Record<string, any> {
    return {
      state: Object(boardGame.state),
      numPlayers: Number(boardGame.numPlayers),
      gameStarted: Boolean(boardGame.gameStarted),
      players: Array(boardGame.players)
    }
  }
}
