import { Injectable } from '@angular/core';
import { Colour } from '../shared/colour.enum';
import { ControlRows } from './istreepieceinarow.service';
import { GameElementsService } from './game-elements.service';

@Injectable({
  providedIn: 'root',
})
export class DeleteTileColorService {
  constructor(
    private isTreePeaceInaRowService: ControlRows,
    private gameElementService: GameElementsService
  ) {}

  getTileForDelete(tileColours: Map<number, Colour>, BLUE: Colour): number {
    const moveList = this.gameElementService.possibleTilesForMove();
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

    for (let i = 0; i < maxTileBlue; i++) {
      if (tileColours.get(i) === Colour.BLUE || i === 24) {
        for (let tileBlue of moveList[i]) {
          if (tileColours.get(tileBlue) === Colour.WHITE) {
            let tempTileColours = new Map(tileColours);
            tempTileColours.set(tileBlue, Colour.BLUE);
            tempTileColours.set(i, Colour.WHITE);
            if (
              this.isTreePeaceInaRowService.controlRow(
                tempTileColours,
                tileBlue,
                this.isTreePeaceInaRowService.isTreeInARow
              )
            ) {
              for (let selectStoneToDelete of moveList[tileBlue]) {
                if (
                  tileColours.get(selectStoneToDelete) === Colour.BLUE &&
                  this.isTreePeaceInaRowService.controlRow(
                    tempTileColours,
                    selectStoneToDelete,
                    this.isTreePeaceInaRowService.isTreeInARow
                  )
                ) {
                  return selectStoneToDelete;
                }
              }
            }
          }
        }
      }
    }

    while (true) {
      const randomNumber = Math.floor(Math.random() * 24);
      if (
        tileColours.get(randomNumber) === BLUE &&
        !this.isTreePeaceInaRowService.controlRow(
          tileColours,
          randomNumber,
          this.isTreePeaceInaRowService.isTreeInARow
        )
      ) {
        return randomNumber;
      }
    }
  }
}
