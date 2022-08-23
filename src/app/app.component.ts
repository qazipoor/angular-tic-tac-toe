import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div id="statusArea" className="status">
      It's your turn
      <span
        ><b>{{ currentPlayer }}</b></span
      >
    </div>
    <div id="winnerArea" className="winner">
      Winner: <span>{{ winner }}</span>
    </div>
    <button (click)="resetGame()">Reset Game</button>
    <section>
      <div class="row" *ngFor="let row of [0, 1, 2]">
        <button
          *ngFor="let col of [0, 1, 2]"
          class="cell"
          style="width:40px;height:40px;"
          (click)="switch(row, col)"
        >
          {{ grid[row][col] }}
        </button>
      </div>
    </section>

    <pre>{{ grid | json }}</pre>
  `,
  styles: [
    `
      .cell {
        vertical-align: top;
      }
    `,
  ],
})
export class AppComponent {
  title = 'angular-tic-tac-toe';
  grid: any = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  winner: string = '';
  currentPlayer = 'X';
  winningCombos = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  switch(row: number, col: number) {
    if (this.grid[row][col] === '' && this.winner === '') {
      this.grid[row][col] = this.currentPlayer;
      this.getWinner(0, this.currentPlayer);

      if (this.winner === '') {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      } else {
        this.currentPlayer = '__';
      }
    }
  }

  getWinner(combo: number, currentPlayer: string): string {
    if (combo > this.winningCombos.length - 1) return '';
    const map: any = [];

    for (let i = 0; i < this.winningCombos[combo].length; i++) {
      const [row, col] = this.winningCombos[combo][i];

      map.push(this.grid[row][col]);
    }

    const foundWinner = map.every((cell: string) => cell === currentPlayer);

    if (foundWinner) this.winner = currentPlayer;

    return this.getWinner(combo + 1, currentPlayer);
  }

  resetGame() {
    this.grid = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.winner = '';
    this.currentPlayer = 'X';
  }
}
