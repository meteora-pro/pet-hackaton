export class ChangeViewType {
  public static type = '[PETS] ChangeViewType';
}

export class ApplyFilters {
  public static type = '[PETS] ApplyFilters';
  constructor(public filters: string) {}
}

export class LoadPets {
  public static type = '[PETS] LoadPets';
  constructor() {}
}

export class ChangePage {
  public static type = '[PETS] ChangePage';
  constructor(public page: number, public perPage: number = 10) {}
}
