package database;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

// TODO: Problèmes synchronisation ?

public class Company implements Serializable {
  private List<Employe> employes;
  private List<Materiel> materiels;
  private List<Location> locations;

  public Company() {
    employes = new ArrayList<>();
    materiels = new ArrayList<>();
    locations = new ArrayList<>();
  }

  public Stream<Employe> getEmployes() {
    return employes.stream();
  }

  public void addEmploye(Employe employe) {
    employes.add(employe);
  }

  public void removeEmploye(Employe employe, boolean cascade) throws Exception {
    if (cascade) {
      removeEmployeCascade(employe);
    } else {
      // Can't remove employee with a dangling reference whithin locations.
      if (locations.stream().anyMatch(location -> location.getEmploye() == employe)) {
        throw new Exception("Can't delete the employe while a location is active.");
      }
    }

    if (!employes.remove(employe)) {
      throw new Exception("Employee doesn't exist in database");
    }
  }

  private void removeEmployeCascade(Employe employe) {
    // Remove all location.
    locations.removeIf(location -> location.getEmploye() == employe);
  }

  public Stream<Materiel> getMateriels() {
    return materiels.stream();
  }

  public void addMateriel(Materiel materiel) {
    materiels.add(materiel);
  }

  public void removeMateriel(Materiel materiel, boolean cascade) throws Exception {
    if (cascade) {
      removeMaterielCascade(materiel);
    } else {
      // Can't remove employee with a dangling reference whithin locations.
      if (locations.stream().anyMatch(location -> location.getMateriel() == materiel)) {
        throw new Exception("Can't delete the materiel while a location is active.");
      }
    }

    if (!materiels.remove(materiel)) {
      throw new Exception("Materiel doesn't exist in database");
    }
  }

  private void removeMaterielCascade(Materiel materiel) {
    // Remove all location.
    locations.removeIf(location -> location.getMateriel() == materiel);
  }

  public Stream<Location> getLocations() {
    return locations.stream();
  }

  public void addLocation(Location location) throws Exception {
    if (!employes.contains(location.getEmploye())) {
      throw new Exception("Employee doesn't exist in database.");
    }

    if (!materiels.contains(location.getMateriel())) {
      throw new Exception("Materiel doesn't exist in database");
    }

    locations.add(location);
  }

  public void removeLocation(Location location) throws Exception {
    if (!locations.remove(location)) {
      throw new Exception("Location doesn't exist in database");
    }
  }
}
