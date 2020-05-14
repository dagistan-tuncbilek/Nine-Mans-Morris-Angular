import { Injectable } from '@angular/core';
import { Colour } from './colour.enum';
import { GameElementsService } from './game-elements.service';
import { IsTreePieceInaRowService } from './istreepieceinarow.service';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor(private gameElementService: GameElementsService, private isTreePeaceInaRowService: IsTreePieceInaRowService) { }

  calculateNewMove(tileColours: Map<number, Colour>, RED: Colour) {
    let realRedTile:number;
    for (let i=33 ; i<42 ; i++ ){
      if (tileColours.get(i) === Colour.RED) {
       realRedTile = i;
       break;
      }
    }
    const moveList = this.gameElementService.possibleTilesForMove();
    let maxTileBlue = 24;
    for (let i=25 ; i<33 ; i++){
      if (tileColours.get(i) === Colour.BLUE){
        maxTileBlue = 25;
      }
    }
    let maxTileRed = 24;
    for (let i=33 ; i<42 ; i++){
      if (tileColours.get(i) === RED){
        maxTileRed = 25;
      }
    }
    for (let i=maxTileRed-1 ; i>0 ; i-- ){
      if (tileColours.get(i) === RED || i === 24) {
        for (let tileRed of moveList[i]){
          if (tileColours.get(tileRed) === Colour.WHITE){
            let tempTileColours = new Map(tileColours);
            tempTileColours.set(tileRed, RED);
            tempTileColours.set(i, Colour.WHITE);
            if(this.isTreePeaceInaRowService.isTreePieceInaRow(tempTileColours, tileRed)){
              if (i === 24) i=realRedTile;
              return [i, tileRed];
              // return this.getTileCoordinate(i, tileRed);
            }
          }
        }
      }
    }
    for (let i=0 ; i<maxTileBlue ; i++ ){
      if (tileColours.get(i) === Colour.BLUE || i === 24) {
        for (let tileBlue of moveList[i]){
          if (tileColours.get(tileBlue) === Colour.WHITE){
            let tempTileColours = new Map(tileColours);
            tempTileColours.set(tileBlue, Colour.BLUE);
            if(this.isTreePeaceInaRowService.isTreePieceInaRow(tempTileColours, i)){
              for ( let tileControl of moveList[tileBlue] ){
                // console.log(maxTileBlue);
                if ( maxTileRed === 25 ) {
                  return [realRedTile, tileBlue];
                  // return this.getTileCoordinate (realRedTile, tileBlue);
                }
                if (tileColours.get(tileControl) === Colour.RED ){
                  return [tileControl, tileBlue];
                  // return this.getTileCoordinate(tileControl, tileBlue);
                }
              }
            }
          }
        }
      }
    }

    while (true){
      const randomNumber = Math.floor(Math.random() * 24)
      if (maxTileRed === 25) {
        if (tileColours.get(randomNumber) === Colour.WHITE) {
          return [realRedTile, randomNumber];
          // return this.getTileCoordinate(realRedTile, randomNumber);
        }
      } else {
        if (tileColours.get(randomNumber) === Colour.WHITE) {
            for (let isStnRed of moveList[randomNumber]){
              if (tileColours.get(isStnRed) === Colour.RED){
                console.log(isStnRed, randomNumber);
                return [isStnRed, randomNumber];
                // return this.getTileCoordinate(red, randomNumber);
              }
            }
        }
      }
    }
  }
}
