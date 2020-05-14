import { Injectable } from '@angular/core';
import { Colour } from './colour.enum';
import { IsTreePieceInaRowService } from './istreepieceinarow.service';

@Injectable({ providedIn: 'root' })
export class GameElementsService {

  constructor(private isTreePeaceInaRowService: IsTreePieceInaRowService) { }

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
}
