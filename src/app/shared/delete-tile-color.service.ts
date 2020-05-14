import { Injectable } from '@angular/core';
import { Colour } from '../shared/colour.enum';
import { IsTreePieceInaRowService } from './istreepieceinarow.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteTileColorService {

  constructor(private isTreePeaceInaRowService: IsTreePieceInaRowService) { }

  getTileForDelete(tileColours: Map<number, Colour>, BLUE: Colour) : number {
    for (let i=0 ; i<24 ; i++ ){
      if (tileColours.get(i) === BLUE && !this.isTreePeaceInaRowService.isTreePieceInaRow(tileColours, i)) {
        return i;
      }
    }
    throw new Error("Deleted Blue Tile not founded.");
  }

}
