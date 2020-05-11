import { Component, OnInit } from '@angular/core';
import { GameElementsService } from '../shared/game-elements.service';
import { Colour } from '../shared/colour.enum';
import anime from 'animejs/lib/anime.es.js';

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

  constructor(private gameElementService: GameElementsService) { }

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
		this.tileColours.set(this.droppedTitle, this.tileColours.get(this.draggedTitle));
		this.tileColours.set(this.draggedTitle, Colour.WHITE);
		this.whoIsNext = this.whoIsNext === Colour.BLUE ? Colour.RED : Colour.BLUE;
		this.checkRow();
  }

  checkRow() {
    if (this.gameElementService.isTreePieceInaRow(this.tileColours, this.droppedTitle)) {
			this.selectedStoneForDelete = this.tileColours.get(this.droppedTitle) === Colour.BLUE ? Colour.RED : Colour.BLUE;
		}
		if (this.selectedStoneForDelete === Colour.WHITE && this.whoIsNext === Colour.RED) {
      this.calculatePositions();
		}
  }

  onClick(ev, stoneNumber: number) {
		if (this.selectedStoneForDelete !== Colour.WHITE) {
			let tileNumber = parseInt(ev.target.parentNode.id);
			const stone = document.getElementById(stoneNumber.toString());
			if (!this.gameElementService.isTreePieceInaRow(this.tileColours, tileNumber)) {
				this.tileColours.set(tileNumber, Colour.WHITE);
				if (this.whoIsNext === Colour.BLUE && stoneNumber < 33) {
					stone.remove();
					this.totalBlueStones -= 1;
				} else if (this.whoIsNext === Colour.RED && stoneNumber > 32) {
					stone.remove();
					this.totalRedStones -= 1;
				}
				this.selectedStoneForDelete = Colour.WHITE;
				if (this.totalRedStones = 3) this.tileColours.set(32, Colour.RED);
				if (this.totalRedStones = 3) this.tileColours.set(42, Colour.RED);
				if (this.totalRedStones < 3 || this.totalBlueStones < 3) {
					console.log("TotalBlue :" + this.totalBlueStones + "   TotalRed : " + this.totalRedStones);
					this.gameOver();
				} else if (this.whoIsNext === Colour.RED) {
          this.calculatePositions();
				}
				// console.log("Red: " + this.totalRedStones + "  Blue : " + this.totalBlueStones);
			}
		}
	}
	gameOver() {
		console.log("Game Over");
  }

  calculatePositions() {
    let redMoveArray = this.gameElementService.calculateNewMove(this.tileColours, this.whoIsNext);
    const start = document.getElementById(redMoveArray[0].toString()).firstElementChild;
    const target = document.getElementById(redMoveArray[1].toString());
    const transX = target.getBoundingClientRect().left - start.getBoundingClientRect().left;
    const transY = target.getBoundingClientRect().top - start.getBoundingClientRect().top;
    console.log(redMoveArray);
		anime({
      targets: start,
			translateX: transX,
      translateY: transY,
			duration: 1000,
			easing: 'linear'
    }, ()=> {
      start.removeAttribute('style');
      target.appendChild(start);
    });
    this.whoIsNext = this.whoIsNext === Colour.BLUE ? Colour.RED : Colour.BLUE;
    this.tileColours.set(redMoveArray[0], Colour.WHITE);
    this.tileColours.set(redMoveArray[1], Colour.RED);
	}
}
