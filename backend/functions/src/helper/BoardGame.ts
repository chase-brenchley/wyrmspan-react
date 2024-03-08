export class BoardGame {
  private state: object

  constructor () {
    this.state = {
      numPlayers: 0,
      gameStarted: false
    }
  }

  public printBoard (): string {
    return JSON.stringify(this.state)
  }

  public static transformToFirestore (
    boardGame: BoardGame
  ): Record<string, any> {
    return {
      state: Object(boardGame.state)
    }
  }
}
