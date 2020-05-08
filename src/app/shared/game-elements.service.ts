import { Injectable } from '@angular/core';
import { Colour } from './colour.enum';

@Injectable({ providedIn: 'root' })
export class GameElementsService {

  calculateNewMove(tileColours: Map<number, Colour>, color: Colour) {
    let realRedTile:number;
    for (let i=33 ; i<42 ; i++ ){
      if (tileColours.get(i) === Colour.RED) {
       realRedTile = i;
       break;
      }
    }
    const moveList = this.possibleTilesForMove();
    let maxTileBlue = 24;
    for (let i=25 ; i<33 ; i++){
      if (tileColours.get(i) === color){
        maxTileBlue = 25;
      }
    }
    let maxTileRed = 24;
    for (let i=33 ; i<42 ; i++){
      if (tileColours.get(i) === color){
        maxTileRed = 25;
      }
    }
    for (let i=maxTileRed-1 ; i>0 ; i-- ){
      if (tileColours.get(i) === color || i === 24) {
        for (let tileRed of moveList[i]){
          if (tileColours.get(tileRed) === Colour.WHITE){
            let tempTileColours = new Map(tileColours);
            tempTileColours.set(tileRed, color);
            tempTileColours.set(i, Colour.WHITE);
            if(this.isTreePieceInaRow(tempTileColours, tileRed)){
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
            if(this.isTreePieceInaRow(tempTileColours, i)){
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
            for (let red of moveList[randomNumber]){
              if (tileColours.get(red) === Colour.RED){
                return [red, randomNumber];
                // return this.getTileCoordinate(red, randomNumber);
              }
            }
        }
      }
    }
  }

	checkTile (tileColours: Map<number, Colour> , i: number, j: number, k: number): boolean  {
		const colour = tileColours.get(i);
		if (tileColours.get(j) === colour && tileColours.get(k) === colour) return true;
		return false;
  }

	possibleTilesForMove()  {
    const moveList = [
      [1,9],[0,2,4],[1,14],[4,10],[1,3,5,7],[4,13],[7,11],[4,6,8],
      [7,12],[0,10,21],[3,9,11,18],[6,10,15],[8,13,17],[5,12,14,20],[2,13,23],[11,16],
      [15,17,19],[12,16],[10,19],[16,18,20,22],[13,19],[9,22],[19,21,23],[14,22],
      [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    ];
    return moveList;
	}

	getTileColours(): Map<number, Colour>  {

    let setStoneColours = new Map<number, Colour> ();

		for (let i = 0 ; i<24 ; i++) {
			setStoneColours.set(i, Colour.WHITE);
		}
		for (let i = 24 ; i<33 ; i++) {
			setStoneColours.set(i, Colour.BLUE);
		}
		for (let i = 33 ; i<42 ; i++) {
			setStoneColours.set(i, Colour.RED);
		}
		return setStoneColours;
  }

  isTreePieceInaRow (tileColours:Map<number, Colour>, droppedTitle: number): boolean {

		switch (droppedTitle) {
      case 0:
        if (this.checkTile(tileColours, 0 , 1 , 2)) return true;
        if (this.checkTile(tileColours, 0 , 9 , 21)) return true;
        break;
      case 1:
        if (this.checkTile(tileColours, 0 , 1 , 2)) return true;
        if (this.checkTile(tileColours, 1 , 4 , 7)) return true;
        break;
      case 2:
        if (this.checkTile(tileColours,0 , 1 , 2)) return true;
        if (this.checkTile(tileColours, 2 , 14 , 23)) return true;
        break;
      case 3:
        if (this.checkTile(tileColours, 3 , 4 , 5)) return true;
        if (this.checkTile(tileColours, 3 , 10 , 18)) return true;
        break;
      case 4:
        if (this.checkTile(tileColours, 3 , 4 , 5)) return true;
        if (this.checkTile(tileColours, 4 , 1 , 7)) return true;
        break;
      case 5:
        if (this.checkTile(tileColours, 3 , 4 , 5)) return true;
        if (this.checkTile(tileColours, 5 , 13 , 20)) return true;
        break;
      case 6:
        if (this.checkTile(tileColours, 6 , 7 , 8)) return true;
        if (this.checkTile(tileColours, 6 , 11 , 15)) return true;
        break;
      case 7:
        if (this.checkTile(tileColours, 6 , 7 , 8)) return true;
        if (this.checkTile(tileColours, 7 , 4 , 1)) return true;
        break;
      case 8:
        if (this.checkTile(tileColours, 6 , 7 , 8)) return true;
        if (this.checkTile(tileColours, 8 , 12 , 17)) return true;
        break;
      case 9:
        if (this.checkTile(tileColours, 9 , 0 , 21)) return true;
        if (this.checkTile(tileColours, 9 , 10 , 11)) return true;
        break;
      case 10:
        if (this.checkTile(tileColours, 10 , 3 , 18)) return true;
        if (this.checkTile(tileColours, 9 , 10 , 11)) return true;
        break;
      case 11:
        if (this.checkTile(tileColours, 11 , 6 , 15)) return true;
        if (this.checkTile(tileColours, 9 , 10 , 11)) return true;
        break;
      case 12:
        if (this.checkTile(tileColours, 12 , 13 , 14)) return true;
        if (this.checkTile(tileColours, 12 , 8 , 17)) return true;
        break;
      case 13:
        if (this.checkTile(tileColours, 12 , 13 , 14)) return true;
        if (this.checkTile(tileColours, 13 , 5 , 20)) return true;
        break;
      case 14:
        if (this.checkTile(tileColours, 12 , 13 , 14)) return true;
        if (this.checkTile(tileColours, 14 , 2 , 23)) return true;
        break;
      case 15:
        if (this.checkTile(tileColours, 15 , 16 , 17)) return true;
        if (this.checkTile(tileColours, 15 , 11, 6)) return true;
        break;
      case 16:
        if (this.checkTile(tileColours, 15 , 16 , 17)) return true;
        if (this.checkTile(tileColours, 16 , 19 , 22)) return true;
        break;
      case 17:
        if (this.checkTile(tileColours, 15 , 16 , 17)) return true;
        if (this.checkTile(tileColours, 17 , 12 , 8)) return true;
        break;
      case 18:
        if (this.checkTile(tileColours, 18 , 19 , 20)) return true;
        if (this.checkTile(tileColours, 18 , 10 , 3)) return true;
        break;
      case 19:
        if (this.checkTile(tileColours, 18 , 19 , 20)) return true;
        if (this.checkTile(tileColours, 19 , 16 , 22)) return true;
        break;
      case 20:
        if (this.checkTile(tileColours, 18 , 19 , 20)) return true;
        if (this.checkTile(tileColours, 20 , 13 , 5)) return true;
        break;
      case 21:
        if (this.checkTile(tileColours, 21 , 22 , 23)) return true;
        if (this.checkTile(tileColours, 21 , 9 , 0)) return true;
        break;
      case 22:
        if (this.checkTile(tileColours, 21 , 22 , 23)) return true;
        if (this.checkTile(tileColours, 22 , 19 , 16)) return true;
        break;
      case 23:
        if (this.checkTile(tileColours, 21 , 22 , 23)) return true;
        if (this.checkTile(tileColours, 23 , 14 , 2)) return true;
        break;

      default:
        break;
		}
		return false;
  }

  // getTileCoordinate (start:number, target:number){
  //   let startX:number, startY:number, targetX:number, targetY:number;
  //   switch(start){
  //     case 0: startX = 0; startY = 0; break;
  //     case 1: startX = 260; startY = 0; break;
  //     case 2: startX = 520; startY = 0; break;
  //     case 3: startX = 75; startY = 75; break;
  //     case 4: startX = 260; startY = 75; break;
  //     case 5: startX = 450; startY = 75; break;
  //     case 6: startX = 150; startY = 150; break;
  //     case 7: startX = 260; startY = 152; break;
  //     case 8: startX = 370; startY = 150; break;
  //     case 9: startX = 0; startY = 260; break;
  //     case 10: startX = 75; startY = 260; break;
  //     case 11: startX = 150; startY = 260; break;
  //     case 12: startX = 370; startY = 260; break;
  //     case 13: startX = 447; startY = 260; break;
  //     case 14: startX = 522; startY = 260; break;
  //     case 15: startX = 152; startY = 372; break;
  //     case 16: startX = 260; startY = 372; break;
  //     case 17: startX = 370; startY = 370; break;
  //     case 18: startX = 75; startY = 450; break;
  //     case 19: startX = 264; startY = 447; break;
  //     case 20: startX = 447; startY = 447; break;
  //     case 21: startX = 0; startY = 520; break;
  //     case 22: startX = 264; startY = 522; break;
  //     case 23: startX = 522; startY = 522; break;
  //     case 24: startX = 0; startY = 0; break;
  //     case 25: startX = 60; startY = 0; break;
  //     case 26: startX = 120; startY = 0; break;
  //     case 27: startX = 0; startY = 60; break;
  //     case 28: startX = 60; startY = 60; break;
  //     case 29: startX = 120; startY = 60; break;
  //     case 30: startX = 0; startY = 120; break;
  //     case 31: startX = 60; startY = 120; break;
  //     case 32: startX = 120; startY = 120; break;
  //     case 33: startX = 0; startY = 0; break;
  //     case 34: startX = 60; startY = 0; break;
  //     case 35: startX = 120; startY = 0; break;
  //     case 36: startX = 0; startY = 60; break;
  //     case 37: startX = 60; startY = 60; break;
  //     case 38: startX = 120; startY = 60; break;
  //     case 39: startX = 0; startY = 120; break;
  //     case 40: startX = 60; startY = 120; break;
  //     case 41: startX = 120; startY = 120; break;
  //   }
  //   switch(target){
  //     case 0: targetX = 0; targetY = 0; break;
  //     case 1: targetX = 260; targetY = 0; break;
  //     case 2: targetX = 520; targetY = 0; break;
  //     case 3: targetX = 75; targetY = 75; break;
  //     case 4: targetX = 260; targetY = 75; break;
  //     case 5: targetX = 450; targetY = 75; break;
  //     case 6: targetX = 150; targetY = 150; break;
  //     case 7: targetX = 260; targetY = 152; break;
  //     case 8: targetX = 370; targetY = 150; break;
  //     case 9: targetX = 0; targetY = 260; break;
  //     case 10: targetX = 75; targetY = 260; break;
  //     case 11: targetX = 150; targetY = 260; break;
  //     case 12: targetX = 370; targetY = 260; break;
  //     case 13: targetX = 447; targetY = 260; break;
  //     case 14: targetX = 522; targetY = 260; break;
  //     case 15: targetX = 152; targetY = 372; break;
  //     case 16: targetX = 260; targetY = 372; break;
  //     case 17: targetX = 370; targetY = 370; break;
  //     case 18: targetX = 75; targetY = 450; break;
  //     case 19: targetX = 264; targetY = 447; break;
  //     case 20: targetX = 447; targetY = 447; break;
  //     case 21: targetX = 0; targetY = 520; break;
  //     case 22: targetX = 264; targetY = 522; break;
  //     case 23: targetX = 522; targetY = 522; break;
  //     case 24: targetX = 0; targetY = 0; break;
  //     case 25: targetX = 60; targetY = 0; break;
  //     case 26: targetX = 120; targetY = 0; break;
  //     case 27: targetX = 0; targetY = 60; break;
  //     case 28: targetX = 60; targetY = 60; break;
  //     case 29: targetX = 120; targetY = 60; break;
  //     case 30: targetX = 0; targetY = 120; break;
  //     case 31: targetX = 60; targetY = 120; break;
  //     case 32: targetX = 120; targetY = 120; break;
  //     case 33: targetX = 0; targetY = 0; break;
  //     case 34: targetX = 60; targetY = 0; break;
  //     case 35: targetX = 120; targetY = 0; break;
  //     case 36: targetX = 0; targetY = 60; break;
  //     case 37: targetX = 60; targetY = 60; break;
  //     case 38: targetX = 120; targetY = 60; break;
  //     case 39: targetX = 0; targetY = 120; break;
  //     case 40: targetX = 60; targetY = 120; break;
  //     case 41: targetX = 120; startY = 120; break;
  //   }
  //   if (start < 24){
  //     startX += 375;
  //     startY += 25;
  //   } else {
  //     startX += 75;
  //     startY += 400;
  //   }
  //   targetX += 300;
  //   targetY += 10;
  //   return [startX, startY, targetX, targetY, start, target];
  // }

}
