import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
	selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
	template:`
		<div id="statusArea" class="status"> Next player: <span>{{ currentPlayer }}</span></div>
		<div id="winnerArea" class="winner"> Winner: <span>{{ winner }}</span></div>
		<button (click)="reset()">Reset</button>
		<section>
			<div class="row" *ngFor="let row of [1, 2, 3]">
				<button *ngFor="let col of [1, 2, 3]" class="square" (click)="makeMove(row, col)">{{ board[row - 1][col - 1] }}</button>
			</div>
		</section>
	`,
	styles: []
})

export class AppComponent implements OnInit {
  currentPlayer: string = 'X';
	board: string[][] = [
		['', '', ''],
		['', '', ''],
		['', '', '']
	];
	winner: string = 'None';

	makeMove(row: number, col: number) {
		if (!this.board[row - 1][col - 1] && this.winner === 'None') {
			this.board[row - 1][col - 1] = this.currentPlayer;
			if (this.checkWinner()) {
				this.winner = this.currentPlayer;
			} else {
				this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
			}
		}
	}

	reset() {
		this.currentPlayer = 'X';
		this.board = [
			['', '', ''],
			['', '', ''],
			['', '', '']
		];
		this.winner = 'None';
	}

	checkWinner(): boolean {
		for (let i = 0; i < 3; i++) {
			if (this.board[i][0] !== '' && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) {
				return true;
			}
			if (this.board[0][i] !== '' && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]) {
				return true;
			}
		}
		if (this.board[0][0] !== '' && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
			return true;
		}
		if (this.board[0][2] !== '' && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
			return true;
		}
		return false;
	}
  ngOnInit(): void {
      
  }
}
