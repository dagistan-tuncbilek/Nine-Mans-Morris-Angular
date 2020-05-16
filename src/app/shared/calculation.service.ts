import { Injectable } from '@angular/core';
import { Colour } from './colour.enum';
import { GameElementsService } from './game-elements.service';
import { IsTreePieceInaRowService } from './istreepieceinarow.service';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  constructor(
    private gameElementService: GameElementsService,
    private isTreePeaceInaRowService: IsTreePieceInaRowService
  ) {}



  calculateNewMoveLastTree(
    tileColours: Map<number, Colour>,
    RED: Colour,
    totalBlueStones: number
  ) {
    const moveList = this.gameElementService.possibleTilesForMove();

    for (let i = 0; i < 24; i++) {
      if (tileColours.get(i) === RED) {
        let tempTileColours = new Map(tileColours);
        tempTileColours.set(i, Colour.WHITE);
        for (let tileRed of moveList[24]) {
          if (tileColours.get(tileRed) === Colour.WHITE && tileRed != i) {
            tempTileColours.set(tileRed, RED);
            if (
              this.isTreePeaceInaRowService.controlRow(
                tempTileColours,
                tileRed,
                this.isTreePeaceInaRowService.checkTile
              )
            ) {
              return [i, tileRed];
            }
          }
        }
      }
    }

    for (let i = 0; i < 24; i++) {
      if (tileColours.get(i) === Colour.BLUE) {
        let controlNumber = totalBlueStones === 3 ? 24 : i;
        for (let tileBlue of moveList[controlNumber]) {
          if (tileColours.get(tileBlue) === Colour.WHITE) {
            let tempTileColours = new Map(tileColours);
            tempTileColours.set(tileBlue, Colour.BLUE);
            tempTileColours.set(controlNumber, Colour.WHITE)
            if (
              this.isTreePeaceInaRowService.controlRow(
                tempTileColours,
                controlNumber,
                this.isTreePeaceInaRowService.checkTile
              )
            ) {
              for (let tileControl of moveList[tileBlue]) {
                if(tileColours.get(tileControl)===Colour.RED){
                  return [tileControl, tileBlue];
                }
              }
            }
          }
        }
      }
    }


    for (let i = 23; i > 0; i--) {
      if (tileColours.get(i) === RED) {
        for (let tileRed of moveList[24]) {
          if (tileColours.get(tileRed) === Colour.WHITE) {
            let tempTileColours = new Map(tileColours);
            tempTileColours.set(tileRed, Colour.RED);
            tempTileColours.set(i, Colour.WHITE);
            if (
              this.isTreePeaceInaRowService.controlRow(
                tempTileColours,
                tileRed,
                this.isTreePeaceInaRowService.checkTileForTwoInARow
              )
            ) {
              return ([i, tileRed]);
            }
          }
        }
      }
    }

    while (true) {
      const randomNumber = Math.floor(Math.random() * 24);
      if (tileColours.get(randomNumber) === Colour.RED) {
          for (let isStnRed of moveList[24]) {
            if (tileColours.get(isStnRed) === Colour.RED) {
              return [isStnRed, randomNumber];
            }
          }
      }
    }

  }




  calculateNewMove(
    tileColours: Map<number, Colour>,
    RED: Colour,
    totalBlueStones: number
  ) {
    let realRedTile: number;
    for (let i = 33; i < 42; i++) {
      if (tileColours.get(i) === Colour.RED) {
        realRedTile = i;
        break;
      }
    }
    const moveList = this.gameElementService.possibleTilesForMove();
    let maxTileBlue = 24;
    for (let i = 25; i < 33; i++) {
      if (tileColours.get(i) === Colour.BLUE) {
        maxTileBlue = 25;
      }
    }
    let maxTileRed = 24;
    for (let i = 33; i < 42; i++) {
      if (tileColours.get(i) === RED) {
        maxTileRed = 25;
      }
    }

    for (let i = maxTileRed - 1; i > 0; i--) {
      if (tileColours.get(i) === RED || i === 24) {
        for (let tileRed of moveList[i]) {
          if (tileColours.get(tileRed) === Colour.WHITE) {
            let tempTileColours = new Map(tileColours);
            tempTileColours.set(tileRed, RED);
            tempTileColours.set(i, Colour.WHITE);
            if (
              this.isTreePeaceInaRowService.controlRow(
                tempTileColours,
                tileRed,
                this.isTreePeaceInaRowService.checkTile
              )
            ) {
              if (i === 24) i = realRedTile;
              return [i, tileRed];
            }
          }
        }
      }
    }

    for (let i = 0; i < maxTileBlue; i++) {
      if (tileColours.get(i) === Colour.BLUE || i === 24) {
        let controlNumber = totalBlueStones === 3 ? 24 : i;
        for (let tileBlue of moveList[controlNumber]) {
          if (tileColours.get(tileBlue) === Colour.WHITE) {
            let tempTileColours = new Map(tileColours);
            tempTileColours.set(tileBlue, Colour.BLUE);
            tempTileColours.set(controlNumber, Colour.WHITE)
            if (
              this.isTreePeaceInaRowService.controlRow(
                tempTileColours,
                tileBlue,
                this.isTreePeaceInaRowService.checkTile
              )
            ) {
              for (let tileControl of moveList[tileBlue]) {
                if (maxTileRed === 25) {
                  return [realRedTile, tileBlue];
                }
                if (tileColours.get(tileControl) === Colour.RED) {
                  return [tileControl, tileBlue];
                }
              }
            }
          }
        }
      }
    }

    for (let i = maxTileRed - 1; i > 0; i--) {
      if (tileColours.get(i) === RED || i === 24) {
        for (let tileRed of moveList[i]) {
          if (tileColours.get(tileRed) === Colour.WHITE) {
            let tempTileColours = new Map(tileColours);
            tempTileColours.set(tileRed, Colour.RED);
            tempTileColours.set(i, Colour.WHITE);

            if (
              this.isTreePeaceInaRowService.controlRow(
                tempTileColours,
                tileRed,
                this.isTreePeaceInaRowService.checkTileForTwoInARow
              )
            ) {
              if (i === 24) i = realRedTile;
              return [i, tileRed];
            }
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
          for (let isStnRed of moveList[randomNumber]) {
            if (tileColours.get(isStnRed) === Colour.RED) {
              console.log(isStnRed, randomNumber);
              return [isStnRed, randomNumber];
            }
          }
        }
      }
    }
  }
}
