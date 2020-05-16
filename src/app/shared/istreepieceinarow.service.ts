import { Injectable } from '@angular/core';
import { Colour } from './colour.enum';

@Injectable({
  providedIn: 'root'
})
export class ControlRows {

  controlRow (tileColours:Map<number, Colour>, tile: number, method: Function ) {

		switch (tile) {
      case 0:
        if (method(tileColours, 0 , 1 , 2)) return true;
        if (method(tileColours, 0 , 9 , 21)) return true;
        break;
      case 1:
        if (method(tileColours, 0 , 1 , 2)) return true;
        if (method(tileColours, 1 , 4 , 7)) return true;
        break;
      case 2:
        if (method(tileColours,0 , 1 , 2)) return true;
        if (method(tileColours, 2 , 14 , 23)) return true;
        break;
      case 3:
        if (method(tileColours, 3 , 4 , 5)) return true;
        if (method(tileColours, 3 , 10 , 18)) return true;
        break;
      case 4:
        if (method(tileColours, 3 , 4 , 5)) return true;
        if (method(tileColours, 4 , 1 , 7)) return true;
        break;
      case 5:
        if (method(tileColours, 3 , 4 , 5)) return true;
        if (method(tileColours, 5 , 13 , 20)) return true;
        break;
      case 6:
        if (method(tileColours, 6 , 7 , 8)) return true;
        if (method(tileColours, 6 , 11 , 15)) return true;
        break;
      case 7:
        if (method(tileColours, 6 , 7 , 8)) return true;
        if (method(tileColours, 7 , 4 , 1)) return true;
        break;
      case 8:
        if (method(tileColours, 6 , 7 , 8)) return true;
        if (method(tileColours, 8 , 12 , 17)) return true;
        break;
      case 9:
        if (method(tileColours, 9 , 0 , 21)) return true;
        if (method(tileColours, 9 , 10 , 11)) return true;
        break;
      case 10:
        if (method(tileColours, 10 , 3 , 18)) return true;
        if (method(tileColours, 9 , 10 , 11)) return true;
        break;
      case 11:
        if (method(tileColours, 11 , 6 , 15)) return true;
        if (method(tileColours, 9 , 10 , 11)) return true;
        break;
      case 12:
        if (method(tileColours, 12 , 13 , 14)) return true;
        if (method(tileColours, 12 , 8 , 17)) return true;
        break;
      case 13:
        if (method(tileColours, 12 , 13 , 14)) return true;
        if (method(tileColours, 13 , 5 , 20)) return true;
        break;
      case 14:
        if (method(tileColours, 12 , 13 , 14)) return true;
        if (method(tileColours, 14 , 2 , 23)) return true;
        break;
      case 15:
        if (method(tileColours, 15 , 16 , 17)) return true;
        if (method(tileColours, 15 , 11, 6)) return true;
        break;
      case 16:
        if (method(tileColours, 15 , 16 , 17)) return true;
        if (method(tileColours, 16 , 19 , 22)) return true;
        break;
      case 17:
        if (method(tileColours, 15 , 16 , 17)) return true;
        if (method(tileColours, 17 , 12 , 8)) return true;
        break;
      case 18:
        if (method(tileColours, 18 , 19 , 20)) return true;
        if (method(tileColours, 18 , 10 , 3)) return true;
        break;
      case 19:
        if (method(tileColours, 18 , 19 , 20)) return true;
        if (method(tileColours, 19 , 16 , 22)) return true;
        break;
      case 20:
        if (method(tileColours, 18 , 19 , 20)) return true;
        if (method(tileColours, 20 , 13 , 5)) return true;
        break;
      case 21:
        if (method(tileColours, 21 , 22 , 23)) return true;
        if (method(tileColours, 21 , 9 , 0)) return true;
        break;
      case 22:
        if (method(tileColours, 21 , 22 , 23)) return true;
        if (method(tileColours, 22 , 19 , 16)) return true;
        break;
      case 23:
        if (method(tileColours, 21 , 22 , 23)) return true;
        if (method(tileColours, 23 , 14 , 2)) return true;
        break;

      default:
        break;
		}
		return false;
  }

  isTreeInARow (tileColours: Map<number, Colour> , i: number, j: number, k: number): boolean  {
		const colour = tileColours.get(i);
		if (tileColours.get(j) === colour && tileColours.get(k) === colour) return true;
		return false;
  }

  isTwoInARow (tileColours: Map<number, Colour> , i: number, j: number, k: number): boolean{

    if (tileColours.get(i) === Colour.WHITE && tileColours.get(k) === tileColours.get(j)) return true;
    if (tileColours.get(j) === Colour.WHITE && tileColours.get(k) === tileColours.get(i)) return true;
    if (tileColours.get(k) === Colour.WHITE && tileColours.get(i) === tileColours.get(j)) return true;
		return false;
  }

}
