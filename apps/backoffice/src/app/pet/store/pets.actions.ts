export class GetPets {
  public static type = '[PETS] GetPets';
}
export class ChangeViewType {
  public static type = '[PETS] ChangeViewType';
}

export class ApplyFilters {
  public static type = '[PETS] ApplyFilters';
  constructor(public filters: string) {}
}
