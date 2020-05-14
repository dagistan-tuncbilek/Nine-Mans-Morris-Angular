import { Injectable } from '@angular/core';
import { Colour } from './colour.enum';

@Injectable({
  providedIn: 'root'
})
export class IsTreePieceInaRowService {

  isTreePieceInaRow (tileColours:Map<number, Colour>, tile: number): boolean {

		switch (tile) {
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
  checkTile (tileColours: Map<number, Colour> , i: number, j: number, k: number): boolean  {
		const colour = tileColours.get(i);
		if (tileColours.get(j) === colour && tileColours.get(k) === colour) return true;
		return false;
  }

}
