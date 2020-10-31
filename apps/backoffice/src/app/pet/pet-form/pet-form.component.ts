import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DictionaryService } from '../pet-filters/services/dictionary.service';
import { merge, Observable, of } from 'rxjs';
import { BaseDictionary, Role, User } from '@pet-hackaton/types';
import { map, shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'pet-hackaton-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetFormComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl(),
    kind: new FormControl(),
    sex: new FormControl(),
    breed: new FormControl(),
    color: new FormControl(),
    size: new FormControl(),
    isSocializated: new FormControl(),
    arrivedAt: new FormControl(),
    character: new FormControl(),
    signs: new FormControl(),
    labelId: new FormControl(),
    sterilizationAt: new FormControl(), //дата стерилизации
    sterilizationPlace: new FormControl(), // место стерилизации
    veterinarian: new FormControl(), // место стерилизации
    catchInformation: new FormGroup({
      captureActId: new FormControl(), // акт отлова №
      orderId: new FormControl(), // заказ-наряд / акт о поступлении животного №
      createAt: new FormControl(), // Дата заказ-наряда, от
      captureAt: new FormControl(), // заказ-наряд дата/ акт о поступлении животного, дата
      district: new FormControl(), // административный округ
      catchingAddress: new FormControl(), // адрес места отлова
      videoUrl: new FormControl(), // Видеофиксация отлова
    }),
    organization: new FormGroup({
      name: new FormControl(), // эксплуатирующая организация
      address: new FormControl(), // адрес приюта
    }), // юридическое лицо
    trustee: new FormGroup({
      alias: new FormControl(),
      contactData: new FormControl(),
    }), // ф.и.о. опекунов
    physical: new FormGroup({
      alias: new FormControl(),
      passport: new FormGroup({
        number: new FormControl(),
        date: new FormControl(),
        registrationAddress: new FormControl(),
      }),
      contacts: new FormControl(),
    }), // физическое лицо ф.и.о.
  });

  isSmallForm = true;
  colors$: Observable<BaseDictionary[]>;
  allColors$: Observable<BaseDictionary[]> = this.dictionaryService.getDict('colors').pipe(shareReplay());
  image =
    'https://cdn.dev.meteora.pro/meteora-dev/hackaton/1.%20%D0%B3.%D0%9C%D0%BE%D1%81%D0%BA%D0%B2%D0%B0%2C%20%D0%97%D0%B5%D0%BB%D0%B5%D0%BD%D0%BE%D0%B3%D1%80%D0%B0%D0%B4%2C%20%D0%A4%D0%B8%D1%80%D1%81%D0%B0%D0%BD%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B5%20%D1%88.%2C%20%D0%B2%D0%BB.5%D0%90/1617%D0%B7-20.jpg';
  breeds$: Observable<BaseDictionary[]>;
  allBreeds$: Observable<BaseDictionary[]> = this.dictionaryService.getDict('breeds').pipe(shareReplay());
  veterinarians$: Observable<User[]> = this.dictionaryService.getUsersByRole(Role.MEDICAL_USER);
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

  savePet() {
    console.log('[LOG] value', this.form.value);
  }

  toggleFields() {
    this.isSmallForm = !this.isSmallForm;
  }

  scrollTo(element: HTMLElement) {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
