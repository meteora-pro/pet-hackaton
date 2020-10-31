import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DictionaryService } from '../pet-filters/services/dictionary.service';
import { merge, Observable, of, Subject } from 'rxjs';
import { BaseDictionary, OutReason, Role, User } from '@pet-hackaton/types';
import { debounceTime, filter, map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { SavePet } from '../store/pets.actions';
import { PetsSelectors } from '../store/pets.selectors';
import { PetFormMode } from '../store/pets.state.model';

@Component({
  selector: 'pet-hackaton-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetFormComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form = new FormGroup({
    name: new FormControl(),
    kind: new FormControl(),
    sex: new FormControl(),
    breed: new FormControl(),
    color: new FormControl(),
    size: new FormControl(),
    isSocializated: new FormControl(false),
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
    trustee: new FormArray([
      new FormGroup({
        alias: new FormControl(),
        contactData: new FormControl(),
      }),
    ]), // ф.и.о. опекунов
    physical: new FormGroup({
      alias: new FormControl(),
      passport: new FormGroup({
        number: new FormControl(),
        date: new FormControl(),
        registrationAddress: new FormControl(),
      }),
      contacts: new FormControl(),
    }), // физическое лицо ф.и.о.
    registrationHistory: new FormGroup({
      arrivedAt: new FormControl(), // дата поступления в приют
      arrivedAct: new FormControl(), // акт приема №
      outAt: new FormControl(), // дата выбытия из приюта
      outReason: new FormControl(), // причина выбытия
      outAct: new FormControl(), // № акта/договора выбытия
    }),
    parasiteTreatments: new FormArray([
      new FormGroup({
        date: new FormControl(), // дата
        medicineName: new FormControl(), // название препарата
        medicineDose: new FormControl(), // доза
      }),
    ]),
    vacinations: new FormArray([
      new FormGroup({
        date: new FormControl(), // дата
        vacineName: new FormControl(), // вид вакцины
        serialNumber: new FormControl(), // № серии
      }),
    ]),
    healthchecks: new FormArray([
      new FormGroup({
        date: new FormControl(), // дата
        anamnesis: new FormControl(), // Anamnesis
        weight: new FormControl(), // вес
      }),
    ]),
  });

  isSmallForm = true;
  readonly: boolean;
  mode: PetFormMode;

  colors$: Observable<BaseDictionary[]>;
  allColors$: Observable<BaseDictionary[]> = this.dictionaryService.getDict('colors').pipe(shareReplay());

  @Select(PetsSelectors.petPhoto)
  image$: Observable<string>;

  breeds$: Observable<BaseDictionary[]>;
  allBreeds$: Observable<BaseDictionary[]> = this.dictionaryService.getDict('breeds').pipe(shareReplay());
  veterinarians$: Observable<User[]> = this.dictionaryService.getUsersByRole(Role.MEDICAL_USER);
  outReasons$: Observable<BaseDictionary[]> = this.dictionaryService.getDict('out-reasons');

  @Select(PetsSelectors.isLoading)
  isLoading$: Observable<boolean>;

  @Select(PetsSelectors.isNew)
  isNew$: Observable<boolean>;

  @Select(PetsSelectors.isReadonly)
  isReadonly$: Observable<boolean>;
  compareById(a, b): boolean {
    return a?.id === b?.id;
  }

  constructor(private dictionaryService: DictionaryService, private store: Store) {}

  get parasiteTreatments() {
    return this.form.get('parasiteTreatments') as FormArray;
  }
  get vacinations() {
    return this.form.get('vacinations') as FormArray;
  }
  get healthchecks() {
    return this.form.get('healthchecks') as FormArray;
  }
  get trustee() {
    return this.form.get('trustee') as FormArray;
  }

  ngOnInit(): void {
    this.store
      .select(PetsSelectors.pet)
      .pipe(debounceTime(100), filter(Boolean), takeUntil(this.destroy$))
      .subscribe((pet) => {
        this.form.patchValue(pet);
      });

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
    this.store.dispatch(new SavePet(this.form.value));
  }

  toggleFields() {
    this.isSmallForm = !this.isSmallForm;
  }

  scrollTo(element: HTMLElement) {
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
