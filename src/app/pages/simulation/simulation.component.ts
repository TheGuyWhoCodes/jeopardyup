import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Question } from 'src/app/question';
import { JeopardyBoard } from 'src/app/jeopardy-board';
import { GameService } from 'src/app/services/game.service';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@Component({

  selector: 'app-game',

  templateUrl: './simulation.component.html',

  styleUrls: ['./simulation.component.scss']

})

export class SimulationComponent implements OnInit {
  board: JeopardyBoard = undefined;
  currentQuestion: Question;
  showNumberField: number;
  roundField: string;
  revealAnswer: boolean;
  constructor(
    private gameService: GameService,
    private cd: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.showNumberField = 4680;
    this.roundField = 'Jeopardy!';
    this.getBoard();
    this.clearCurrentQuestion();
    this.revealAnswer = false;
  }

  getBoard(): void {
    this.gameService
    .getGame(this.showNumberField, this.roundField)
    .then(boardV => {
      this.formatAnswer(boardV);
      this.board = boardV;
      // Update UI
      this.cd.detectChanges();
    });  }

  setCurrentQuestion(question: Question){
    this.currentQuestion = question;
  }

  clearCurrentQuestion() {
    this.currentQuestion = undefined;
    this.revealAnswer = false;
  }
  formatAnswer(boardV) {
    for(let i = 0; i < 5; i++){
      for(let j = 0; j < 5; j++) {
        boardV[i].clues[j].value = ''+((200 * (i)) + 200);
      }
      boardV[i].clues = boardV[i].clues.slice(0,5)
    }
    this.board = boardV;
  }
  showerAnswer() {
    this.revealAnswer = true;
  }
}
