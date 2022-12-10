package database;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

public class Database {
  /**
   * The path where to save the database.
   */
  // A CHANGER, aucune idée de comment mettre ça dans un dossier convenable
  final private static String DATABASE_PATH = "/var/tmp/tomcat10/work/Catalina/localhost/GenieLogAppLoc-1.0-SNAPSHOT/db.dat";

  /**
   * The wrapped company.
   */
  private Company company;

  /**
   * Create a new database.
   * 
   * @param company wrapped company
   */
  private Database(Company company) {
    this.company = company;
  }

  /**
   * Load a new database from default path.
   * 
   * @return The database loaded from default path or an empty database if the
   *         file cannot be found.
   * 
   * @throws IOException            any IO error that happens
   * @throws ClassNotFoundException if the database file has an unknown class
   */
  public static Database load() throws IOException, ClassNotFoundException {
    

    try (
        FileInputStream fis = new FileInputStream(DATABASE_PATH);
        BufferedInputStream bis = new BufferedInputStream(fis);
        ObjectInputStream ois = new ObjectInputStream(bis);) {
      Object obj = ois.readObject();

      if (!(obj instanceof Database))
        throw new IOException("Invalid class instance for " + DATABASE_PATH);

      return (Database) obj;
    } catch (FileNotFoundException e) {
      return new Database(new Company());
    }
  }

  /**
   * Commit the database file to disk.
   * 
   * @throws IOException
   */
  public void save() throws IOException {
    try (
        FileOutputStream fos = new FileOutputStream(DATABASE_PATH);
        BufferedOutputStream bos = new BufferedOutputStream(fos);
        ObjectOutputStream oos = new ObjectOutputStream(bos);) {
      oos.writeObject(this);
      oos.flush();
    }
  }

  public Company getCompany() {
    return company;
  }
}
