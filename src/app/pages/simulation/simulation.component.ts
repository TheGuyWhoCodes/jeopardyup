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
      this.board = boardV;
      // Update UI
      this.cd.detectChanges();
      console.log(this.board);
    });  }

  setCurrentQuestion(question: Question){
    this.currentQuestion = question;
  }

  clearCurrentQuestion() {
    this.currentQuestion = undefined;
    this.revealAnswer = false;
  }

  updateShow() {
    this.getBoard();
  }
  showerAnswer() {
    this.revealAnswer = true;
  }
}
