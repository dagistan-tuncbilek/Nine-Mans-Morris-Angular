import { Injectable } from '@angular/core';
import { Colour } from './colour.enum';
import { GameElementsService } from './game-elements.service';
import { ControlRows } from './istreepieceinarow.service';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  moveList = this.gameElementService.possibleTilesForMove();

  constructor(
    private gameElementService: GameElementsService,
    private isTreePeaceInaRowService: ControlRows
  ) {}

  calculateNewMoveLastTree(
    tileColours: Map<number, Colour>,
    totalBlueStones: number
  ) {
    for (let i = 0; i < 24; i++) {
      if (tileColours.get(i) === Colour.RED) {
        for (let unknownTile of this.moveList[24]) {
          let tempTileColours = new Map(tileColours);
          if (tileColours.get(unknownTile) === Colour.WHITE) {
            tempTileColours.set(unknownTile, Colour.RED);
            tempTileColours.set(i, Colour.WHITE);
            if (
              this.isTreePeaceInaRowService.controlRow(
                tempTileColours,
                unknownTile,
                this.isTreePeaceInaRowService.isTreeInARow
              )
            ) {
              tempTileColours.clear();
              console.log('Calculate LAST: TREE RED');
              return [i, unknownTile];
            }
          }
          tempTileColours.clear();
        }
      }
    }

    for (let i = 0; i < 24; i++) {
      if (tileColours.get(i) === Colour.BLUE) {
        let controlNumber = totalBlueStones === 3 ? 24 : i;
        for (let unknownTile of this.moveList[controlNumber]) {
          if (tileColours.get(unknownTile) === Colour.WHITE) {
            let tempTileColours = new Map(tileColours);
            tempTileColours.set(unknownTile, Colour.BLUE);
            tempTileColours.set(controlNumber, Colour.WHITE);
            if (
              this.isTreePeaceInaRowService.controlRow(
                tempTileColours,
                unknownTile,
                this.isTreePeaceInaRowService.isTreeInARow
              )
            ) {
              tempTileColours.clear();
              console.log(tileColours);
              console.log('Calculate LAST: TREE BLUE');
              for (let j = 0; j < 24; j++) {
                if(tileColours.get(j) === Colour.RED){
                  return [j, unknownTile];
                }
              }

            }
            tempTileColours.clear();
          }
        }
      }
    }

    for (let i = 23; i > 0; i--) {
      if (tileColours.get(i) === Colour.RED) {
        for (let tileRed of this.moveList[24]) {
          if (tileColours.get(tileRed) === Colour.WHITE) {
            let tempTileColours = new Map(tileColours);
            tempTileColours.set(tileRed, Colour.RED);
            tempTileColours.set(i, Colour.WHITE);
            if (
              this.isTreePeaceInaRowService.controlRow(
                tempTileColours,
                tileRed,
                this.isTreePeaceInaRowService.isTwoInARow
              )
            ) {
              tempTileColours.clear();
              console.log('Calculate LAST: two RED');
              return [i, tileRed];
            }
            tempTileColours.clear();
          }
        }
      }
    }

    while (true) {
      const randomNumber = Math.floor(Math.random() * 24);
      if (tileColours.get(randomNumber) === Colour.RED) {
        for (let isStnRed of this.moveList[24]) {
          if (tileColours.get(isStnRed) === Colour.RED) {
            console.log('Calculate LAST: RANDOM NUMBER');
            return [isStnRed, randomNumber];
          }
        }
      }
    }
  }

  calculateNewMove(tileColours: Map<number, Colour>, totalBlueStones: number) {
    let realRedTile: number;
    for (let i = 33; i < 42; i++) {
      if (tileColours.get(i) === Colour.RED) {
        realRedTile = i;
        break;
      }
    }

    let maxTileBlue = 24;
    for (let i = 25; i < 33; i++) {
      if (tileColours.get(i) === Colour.BLUE) {
        maxTileBlue = 25;
      }
    }
    let maxTileRed = 24;
    for (let i = 33; i < 42; i++) {
      if (tileColours.get(i) === Colour.RED) {
        maxTileRed = 25;
      }
    }

    for (let i = maxTileRed - 1; i > 0; i--) {
      if (tileColours.get(i) === Colour.RED || i === 24) {
        for (let unknownTile of this.moveList[i]) {
          if (tileColours.get(unknownTile) === Colour.WHITE) {
            let tempTileColours = new Map(tileColours);
            tempTileColours.set(unknownTile, Colour.RED);
            tempTileColours.set(i, Colour.WHITE);
            if (
              this.isTreePeaceInaRowService.controlRow(
                tempTileColours,
                unknownTile,
                this.isTreePeaceInaRowService.isTreeInARow
              )
            ) {
              tempTileColours.clear();
              if (i === 24) i = realRedTile;
              console.log('Calculate: istree RED');
              return [i, unknownTile];
            }
            tempTileColours.clear();
          }
        }
      }
    }

    for (let i = 0; i < maxTileBlue; i++) {
      if (tileColours.get(i) === Colour.BLUE || i === 24) {
        let controlNumber = totalBlueStones === 3 ? 24 : i;
        for (let unknownTile of this.moveList[controlNumber]) {
          if (tileColours.get(unknownTile) === Colour.WHITE) {
            let tempTileColours = new Map(tileColours);
            tempTileColours.set(unknownTile, Colour.BLUE);
            tempTileColours.set(controlNumber, Colour.WHITE);
            if (
              this.isTreePeaceInaRowService.controlRow(
                tempTileColours,
                unknownTile,
                this.isTreePeaceInaRowService.isTreeInARow
              )
            ) {
              console.log('Calculate: istree BLUE');
              tempTileColours.clear();
              if (maxTileRed === 25) {

                return [realRedTile, unknownTile];
              }
              for (let tileControl of this.moveList[unknownTile]) {
                if (tileColours.get(tileControl) === Colour.RED) {
                  return [tileControl, unknownTile];
                }
              }
            }
            tempTileColours.clear();
          }
        }
      }
    }

    for (let i = maxTileRed - 1; i > 0; i--) {
      if (tileColours.get(i) === Colour.RED || i === 24) {
        for (let tileRed of this.moveList[i]) {
          if (tileColours.get(tileRed) === Colour.WHITE) {
            let tempTileColours = new Map(tileColours);
            tempTileColours.set(tileRed, Colour.RED);
            tempTileColours.set(i, Colour.WHITE);

            if (
              this.isTreePeaceInaRowService.controlRow(
                tempTileColours,
                tileRed,
                this.isTreePeaceInaRowService.isTwoInARow
              )
            ) {
              tempTileColours.clear();
              if (i === 24) i = realRedTile;
              console.log('Calculate: istwo RED');
              return [i, tileRed];
            }
            tempTileColours.clear();
          }
        }
      }
    }

    while (true) {
      const randomNumber = Math.floor(Math.random() * 24);
      if (maxTileRed === 25) {
        if (tileColours.get(randomNumber) === Colour.WHITE) {
          return [realRedTile, randomNumber];
        }
      } else {
        if (tileColours.get(randomNumber) === Colour.WHITE) {
          for (let isStnRed of this.moveList[randomNumber]) {
            if (tileColours.get(isStnRed) === Colour.RED) {
              console.log(isStnRed, randomNumber);
              console.log('Calculate: RANDOM NUMBER');
              return [isStnRed, randomNumber];
            }
          }
        }
      }
    }
  }
}
