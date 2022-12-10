import { readFileSync, writeFileSync } from "fs";

export class Employe {
  nom: string;
  prenom: string;
  password: string;

  constructor(nom: string, prenom: string, password: string) {
    this.nom = nom;
    this.prenom = prenom;
    this.password = password;
  }
}

export class Materiel {
  nom: string;
  version: string;
  reference: string;
  photo: string;
  telelphone: string;

  constructor(nom: string, version: string, reference: string, photo: string, telelphone: string) {
    this.nom = nom;
    this.version = version;
    this.reference = reference;
    this.photo = photo;
    this.telelphone = telelphone;
  }
}

export class Location {
  employe: Employe;
  materiel: Materiel;
  dateDebut: Date;
  dateFin: Date | null;

  constructor(employe: Employe, materiel: Materiel, dateDebut: Date, dateFin: Date | null = null) {
    this.employe = employe;
    this.materiel = materiel;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
  }
}

export class Company {
  private employes: Array<Employe>;
  private materiels: Array<Materiel>;
  private locations: Array<Location>;

  constructor() {
    this.employes = [];
    this.materiels = [];
    this.locations = [];
  }

  getEmployes(): ReadonlyArray<Employe> {
    return this.employes;
  }

  addEmploye(employe: Employe) {
    this.employes.push(employe);
  }

  #removeEmployeCascade(employe: Employe) {
    throw new Error("Function not implemented");
  }

  removeEmploye(employe: Employe, cascade: boolean = false) {
    if (cascade) {
      this.#removeEmployeCascade(employe);
    } else if (this.locations.find((location) => location.employe == employe)) {
      // Can't remove employee with a dangling reference whithin locations.
      throw "Can't delete the employe while a location is active";
    }

    this.employes = this.employes.filter(e => e != employe);
  }

  getMateriels(): ReadonlyArray<Materiel> {
    return this.materiels;
  }

  addMateriels(materiel: Materiel) {
    this.materiels.push(materiel);
  }

  #removeMaterielCascade(materiel: Materiel) {
    this.locations = this.locations.filter(location => location.materiel == materiel);
  }

  removeMateriel(materiel: Materiel, cascade: boolean = false) {
    if (cascade) {
      this.#removeMaterielCascade(materiel);
    } else if (this.locations.find((location) => location.materiel == materiel)) {
      // Can't remove employee with a dangling reference whithin locations.
      throw "Can't delete the materiel while a location is active";
    }

    this.materiels = this.materiels.filter(m => m != materiel);
  }

  getLocations(): ReadonlyArray<Location> {
    return this.locations;
  }

  addLocation(location: Location) {
    if (!this.employes.find(e => location.employe == e)) {
      throw "Employee doesn't exist in database";
    }

    if (!this.materiels.find(m => location.materiel == m)) {
      throw "Materiel doesn't exist in database";
    }

    this.locations.push(location);
  }

  removeLocation(location: Location) {
    this.locations = this.locations.filter(l => l == location);
  }
}

export class Database {
  readonly company: Company;

  constructor(company: Company) {
    this.company = company;
  }

  static load(path: string = "db.json") {
    try {
      let content = readFileSync(path);
      let company: Company = JSON.parse(content.toString());

      return new Database(Object.assign(new Company(), company));
    } catch (error) {
      console.log(`Can't load database: ${error}, use an empty database instead.`);

      return new Database(new Company());
    }
  }

  save(path: string = "db.json") {
    let json = JSON.stringify(this.company);
    writeFileSync(path, json);
  }
}
