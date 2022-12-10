package database;

import java.io.Serializable;
import java.time.LocalDate;

public class Location implements Serializable {
  private Employe employe;
  private Materiel materiel;

  private LocalDate dateDebut;
  private LocalDate dateFin;

  public Location(Employe employe, Materiel materiel, LocalDate dateDebut, LocalDate dateFin) {
    this.employe = employe;
    this.materiel = materiel;
    this.dateDebut = dateDebut;
    this.dateFin = dateFin;
  }

  public Location(Employe employe, Materiel materiel, LocalDate dateDebut) {
    this(employe, materiel, dateDebut, null);
  }

  public Employe getEmploye() {
    return employe;
  }

  public void setEmploye(Employe employe) {
    this.employe = employe;
  }

  public Materiel getMateriel() {
    return materiel;
  }

  public void setMateriel(Materiel materiel) {
    this.materiel = materiel;
  }

  public LocalDate getDateDebut() {
    return dateDebut;
  }

  public void setDateDebut(LocalDate dateDebut) {
    this.dateDebut = dateDebut;
  }

  public LocalDate getDateFin() {
    return dateFin;
  }

  public void setDateFin(LocalDate dateFin) {
    this.dateFin = dateFin;
  }
}
