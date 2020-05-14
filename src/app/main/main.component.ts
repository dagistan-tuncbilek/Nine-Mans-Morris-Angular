import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GameElementsService } from '../shared/game-elements.service';
import { Colour } from '../shared/colour.enum';
import anime from 'animejs/lib/anime.es.js';
import { IsTreePieceInaRowService } from '../shared/istreepieceinarow.service';
import { DeleteTileColorService } from '../shared/delete-tile-color.service';
import { CalculationService } from '../shared/calculation.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
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
  animX:number = 0;
  animY:number = 0;
  isDragComleted: boolean = true;
  moves = ["Moves"];
  @Output() changeMoves = new EventEmitter();

  constructor(
    private gameElementService: GameElementsService,
    private deleteTileColorService: DeleteTileColorService,
    private isTreePeaceInaRowService: IsTreePieceInaRowService,
    private calculationService: CalculationService) { }

  ngOnInit(): void {
    this.possibleTilesToMoves = this.gameElementService.possibleTilesForMove();
    this.tileColours = this.gameElementService.getTileColours();
    for (let i=0 ; i<42 ; i++){
      if (i<24){
        this.stones.push({
          cssStyle : 'position: absolute; height: 50px; width: 50px; border-radius: 50%;'
        });
      } else this.reserves.push(i)
    }
  }

  allowDrop(ev) {
    this.droppedTitle = parseInt(ev.target.id);
		let controlNumber = this.draggedTitle > 24 ? 24 : this.draggedTitle;
		if (this.whoIsNext === Colour.BLUE && this.totalBlueStones === 3 || this.whoIsNext === Colour.RED && this.totalRedStones === 3) {
			controlNumber = 24;
		}
		if (this.possibleTilesToMoves[controlNumber].includes(this.droppedTitle)) {
			ev.preventDefault();
		}
  }

	drag(ev) {
		this.stoneNumber = parseInt(ev.target.id)[0];
		this.draggedTitle = parseInt(ev.target.parentNode.id);
		if (this.whoIsNext === Colour.BLUE && this.stoneNumber > 32 || this.whoIsNext === Colour.RED && this.stoneNumber < 33) {
			ev.preventDefault();
		}
    ev.dataTransfer.setData("text", ev.target.id);
  }

	drop(ev) {
		ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const stone = document.getElementById(data);
		if (this.draggedTitle > 23) {
			stone.classList.remove("blueStonesCSS");
			stone.classList.remove("redStonesCSS");
		}
    ev.target.appendChild(stone);
    console.log(ev.target);
		this.tileColours.set(this.droppedTitle, this.tileColours.get(this.draggedTitle));
		this.tileColours.set(this.draggedTitle, Colour.WHITE);
    this.whoIsNext = this.whoIsNext === Colour.BLUE ? Colour.RED : Colour.BLUE;
    this.moves.push(this.droppedTitle + "-" + this.draggedTitle);
    this.changeMoves.emit(this.moves);
    if (this.isTreePeaceInaRowService.isTreePieceInaRow(this.tileColours, this.droppedTitle)){
      this.selectedStoneForDelete = Colour.RED;
    }
    if (this.selectedStoneForDelete === Colour.WHITE && this.whoIsNext === Colour.RED) {
      this.calculatePositions();
		}
  }

  onClick(ev, stoneNumber: number) {
		if (this.selectedStoneForDelete === Colour.RED) {
      console.log("clicked for delete");
      const selectedStone = document.getElementById(ev.target.id);
      console.log(selectedStone);
      const parentStoneID = parseInt(selectedStone.parentElement.id);
      console.log(parentStoneID);
			if (!this.isTreePeaceInaRowService.isTreePieceInaRow(this.tileColours, parentStoneID)) {
				this.tileColours.set(parentStoneID, Colour.WHITE);
        this.whoIsNext === Colour.RED;
        this.moves.push(this.moves.pop() + " -> Red stone (" + selectedStone.parentElement.id + ") is deleted.");
        selectedStone.remove();
        this.totalRedStones -= 1;
        this.selectedStoneForDelete = Colour.WHITE;
        console.log(selectedStone);
				this.isGameOver();
				if (this.whoIsNext === Colour.RED) {
          this.calculatePositions();
				}
			}
		}
  }

	isGameOver() {
    console.log("TotalBlue :" + this.totalBlueStones + "   TotalRed : " + this.totalRedStones);
    if (this.totalRedStones < 3 || this.totalBlueStones < 3) {
      console.log("Game Over");
    }
  }

  calculatePositions() {
    let redMoveArray = this.calculationService.calculateNewMove(this.tileColours, this.whoIsNext);
    const start = document.getElementById(redMoveArray[0].toString()).firstElementChild;
    const target = document.getElementById(redMoveArray[1].toString());
    const transX = target.getBoundingClientRect().left - start.getBoundingClientRect().left;
    const transY = target.getBoundingClientRect().top - start.getBoundingClientRect().top;
		anime({
      targets: start,
			translateX: transX,
      translateY: transY,
			duration: 1000,
      easing: 'linear',
      begin: ()=> {
        start.removeAttribute('style');
      },
      complete: function() {
        start.removeAttribute('style');
        target.appendChild(start);
      }
    });


    this.whoIsNext = this.whoIsNext === Colour.BLUE ? Colour.RED : Colour.BLUE;
    this.tileColours.set(redMoveArray[0], Colour.WHITE);
    this.tileColours.set(redMoveArray[1], Colour.RED);
    if (this.isTreePeaceInaRowService.isTreePieceInaRow(this.tileColours, redMoveArray[1])){
      const blueTileForDelete: number = this.deleteTileColorService.getTileForDelete(this.tileColours, Colour.BLUE);
      this.tileColours.set(blueTileForDelete, Colour.WHITE);
      const blueStone = document.getElementById(blueTileForDelete.toString()).firstChild;
      setTimeout(() => {
        this.moves.push(this.moves.pop() + " -> Blue stone (" + blueStone.parentElement.id + ") is deleted.");
        blueStone.remove();
        this.totalBlueStones -= 1;
      }, 1000);
    }
    this.moves.push(this.moves.pop() + " : " + start.parentElement.id + "-" + target.id);
    this.changeMoves.emit(this.moves);
    this.isGameOver();
	}
}
