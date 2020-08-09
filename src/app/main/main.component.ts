import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GameElementsService } from '../shared/game-elements.service';
import { Colour } from '../shared/colour.enum';
import anime from 'animejs/lib/anime.es.js';
import { ControlRows } from '../shared/istreepieceinarow.service';
import { DeleteTileColorService } from '../shared/delete-tile-color.service';
import { CalculationService } from '../shared/calculation.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  stones = [];
  reserves = [];
  possibleTilesToMoves = [];
  whoIsNext: Colour = Colour.BLUE;
  tileColours = new Map<number, Colour>();
  draggedTitle: number = -1;
  droppedTitle: number = -1;
  stoneNumber: number = -1;
  selectedStoneForDelete: Colour = Colour.WHITE;
  totalBlueStones: number = 9;
  totalRedStones: number = 9;
  preventDrag = false;
  moves = ['Moves'];
  @Output() changeMoves = new EventEmitter();

  constructor(
    private gameElementService: GameElementsService,
    private deleteTileColorService: DeleteTileColorService,
    private isTreePeaceInaRowService: ControlRows,
    private calculationService: CalculationService
  ) {}

  ngOnInit(): void {
    this.possibleTilesToMoves = this.gameElementService.possibleTilesForMove();
    this.tileColours = this.gameElementService.getTileColours();
    for (let i = 0; i < 42; i++) {
      if (i < 24) {
        this.stones.push({
          cssStyle:
            'position: absolute; height: 50px; width: 50px; border-radius: 50%;',
        });
      } else this.reserves.push(i);
    }
  }

  dragStart(ev) {
    if (!this.preventDrag && this.totalBlueStones > 2 && this.totalRedStones > 2) {
      this.stoneNumber = parseInt(ev.target.id)[0];
      this.draggedTitle = parseInt(ev.target.parentNode.id);
      ev.dataTransfer.setData('text', ev.target.id);
    } else {
      ev.preventDefault();
    }
  }

  allowDrop(ev) {
    this.droppedTitle = parseInt(ev.target.id);
    let controlNumber =
      this.draggedTitle > 24 || this.totalBlueStones === 3
        ? 24
        : this.draggedTitle;
    if (this.possibleTilesToMoves[controlNumber].includes(this.droppedTitle)) {
      ev.preventDefault();
    }
  }

  drop(ev) {
    ev.preventDefault();
    new Audio("../../assets/audio/normalMove.wav").play();
    const data = ev.dataTransfer.getData('text');
    const stone = document.getElementById(data);
    ev.target.appendChild(stone);
    this.tileColours.set(
      this.droppedTitle,
      this.tileColours.get(this.draggedTitle)
    );
    this.tileColours.set(this.draggedTitle, Colour.WHITE);
    this.moves.push(this.droppedTitle + '-' + this.draggedTitle);
    this.changeMoves.emit(this.moves);
    if (
      this.isTreePeaceInaRowService.controlRow(
        this.tileColours,
        this.droppedTitle,
        this.isTreePeaceInaRowService.isTreeInARow
      )
    ) {
      this.selectedStoneForDelete = Colour.RED;
    }
    if (
      this.selectedStoneForDelete === Colour.WHITE
    ) {
      this.whoIsNext = Colour.RED;
      this.preventDrag = true;
      this.calculatePositions();
    }
  }

  onClick(ev) {
    if (!this.preventDrag && this.selectedStoneForDelete === Colour.RED) {
      new Audio("../../assets/audio/deleteMove.wav").play();
      const selectedStone = document.getElementById(ev.target.id);
      const parentStoneID = parseInt(selectedStone.parentElement.id);
      this.tileColours.set(parentStoneID, Colour.WHITE);
      this.moves.push(
        this.moves.pop() +
          ' -> Red stone (' +
          selectedStone.parentElement.id +
          ') is deleted.'
      );
      selectedStone.remove();
      this.whoIsNext = Colour.RED;
      this.selectedStoneForDelete = Colour.WHITE;
      this.totalRedStones -= 1;
      this.isGameOver();
      if (this.whoIsNext === Colour.RED && this.totalRedStones > 2) {
        this.preventDrag = true;
        this.calculatePositions();
      }
    }
  }

  isGameOver() {
    console.log(
      'TotalBlue :' +
        this.totalBlueStones +
        '   TotalRed : ' +
        this.totalRedStones
    );
    if (this.totalRedStones < 3 || this.totalBlueStones < 3) {
      if (this.totalRedStones<3){
        this.moves.push(" ------- GAME OVER - BLUE WINS --------");
        new Audio("../../assets/audio/start.wav").play();
        alert("BLUE WINS!!!");
        this.newGame();
      } else {
        this.moves.push(" ------- GAME OVER - RED WINS --------");
        new Audio("../../assets/audio/start.wav").play();
        alert("RED WINS!!!");
        this.newGame();
      }
      this.changeMoves.emit(this.moves);
    }
  }

  calculatePositions() {
    let redMoveArray;
    if (this.totalRedStones > 3) {
      redMoveArray = this.calculationService.calculateNewMove(
        this.tileColours,
        this.totalBlueStones
      );
    } else {
      redMoveArray = this.calculationService.calculateNewMoveLastTree(
        this.tileColours,
        this.totalBlueStones
      );
    }
    const start = document.getElementById(redMoveArray[0].toString())
      .firstElementChild;
    const target = document.getElementById(redMoveArray[1].toString());
    anime({
      targets: start,
      translateX:
        target.getBoundingClientRect().left -
        start.getBoundingClientRect().left,
      translateY:
        target.getBoundingClientRect().top - start.getBoundingClientRect().top,
      duration: 1000,
      easing: 'linear',
      begin: () => {
        start.removeAttribute('style');
      },
      complete: function () {
        start.removeAttribute('style');
        target.appendChild(start);
      },
    });

    this.whoIsNext = Colour.BLUE;
    this.tileColours.set(redMoveArray[0], Colour.WHITE);
    this.tileColours.set(redMoveArray[1], Colour.RED);
    if (
      this.isTreePeaceInaRowService.controlRow(
        this.tileColours,
        redMoveArray[1],
        this.isTreePeaceInaRowService.isTreeInARow
      )
    ) {
      const blueTileForDelete: number = this.deleteTileColorService.getTileForDelete(
        this.tileColours,
        Colour.BLUE
      );
      this.tileColours.set(blueTileForDelete, Colour.WHITE);
      const blueStone = document.getElementById(blueTileForDelete.toString())
        .firstChild;
      setTimeout(() => {
        this.moves.push(
          this.moves.pop() +
            ' -> Blue stone (' +
            blueStone.parentElement.id +
            ') is deleted.'
        );
        blueStone.remove();
        this.totalBlueStones -= 1;
        new Audio("../../assets/audio/deleteMove.wav").play();
        this.isGameOver();
      }, 1000);
    } else {
      setTimeout( () => new Audio("../../assets/audio/normalMove.wav").play(), 1000 );
    }
    this.moves.push(
      this.moves.pop() + ' : ' + start.parentElement.id + '-' + target.id
    );
    this.changeMoves.emit(this.moves);
    this.preventDrag = false;
  }

  newGame(){
    new Audio("../../assets/audio/start.wav").play();
    location.reload();
  }
}
