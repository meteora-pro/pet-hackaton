import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DictionaryService } from '../pet-filters/services/dictionary.service';
import { merge, Observable, of } from 'rxjs';
import { BaseDictionary } from '@pet-hackaton/types';
import { map, shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'pet-hackaton-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetCardComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(),
    kind: new FormControl(),
    sex: new FormControl(),
    breed: new FormControl(),
    color: new FormControl(),
    size: new FormControl(),
    arrivedAt: new FormControl(),
  });

  isSmallForm = true;
  colors$: Observable<BaseDictionary[]>;
  allColors$: Observable<BaseDictionary[]> = this.dictionaryService.getDict('colors').pipe(shareReplay());
  image =
    'https://cdn.dev.meteora.pro/meteora-dev/hackaton/1.%20%D0%B3.%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%97%D0%B5%D0%BB%D0%B5%D0%BD%D0%BE%D0%B3%D1%80%D0%B0%D0%B4%2C%20%D0%A4%D0%B8%D1%80%D1%81%D0%B0%D0%BD%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B5%20%D1%88.%2C%20%D0%B2%D0%BB.5%D0%90/1617%D0%B7-20.jpg';
  breeds$: Observable<BaseDictionary[]>;
  allBreeds$: Observable<BaseDictionary[]> = this.dictionaryService.getDict('breeds').pipe(shareReplay());
  constructor(private dictionaryService: DictionaryService) {}

  ngOnInit(): void {
    const kindChanges$ = merge(this.form.get('kind').valueChanges, of(null));
    this.colors$ = kindChanges$.pipe(
      switchMap((kind) =>
        this.allColors$.pipe(
          map((colors) => {
            if (kind) {
              return colors.filter((color) => color.type === kind);
            }
            return colors;
          })
        )
      )
    );
    this.breeds$ = kindChanges$.pipe(
      switchMap((kind) =>
        this.allBreeds$.pipe(
          map((breeds) => {
            if (kind) {
              return breeds.filter((breed) => breed.type === kind);
            }
            return breeds;
          })
        )
      )
    );
  }

  savePet() {}

  showMore() {
    this.isSmallForm = false;
  }
}
