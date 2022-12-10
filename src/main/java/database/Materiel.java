package database;

import java.io.Serializable;
import java.net.URI;

public class Materiel implements Serializable {
  private String nom;
  private String version;
  private String reference;
  private URI photo;
  private String telelphone;

  public Materiel(String nom, String version, String reference, URI photo, String telelphone) {
    this.nom = nom;
    this.version = version;
    this.reference = reference;
    this.photo = photo;
    this.telelphone = telelphone;
  }

  public String getNom() {
    return nom;
  }

  public void setNom(String nom) {
    this.nom = nom;
  }

  public String getVersion() {
    return version;
  }

  public void setVersion(String version) {
    this.version = version;
  }

  public String getReference() {
    return reference;
  }

  public void setReference(String reference) {
    this.reference = reference;
  }

  public URI getPhoto() {
    return photo;
  }

  public void setPhoto(URI photo) {
    this.photo = photo;
  }

  public String getTelelphone() {
    return telelphone;
  }

  public void setTelelphone(String telelphone) {
    this.telelphone = telelphone;
  }  
}
