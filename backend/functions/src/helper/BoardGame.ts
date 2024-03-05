export class BoardGame {
  private state: object

  constructor (numPlayers: number) {
    this.state = {
      numPlayers: numPlayers
    }
  }

  public printBoard (): string {
    return JSON.stringify(this.state)
  }
}
