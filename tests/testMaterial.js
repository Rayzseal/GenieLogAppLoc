// noinspection JSCheckFunctionSignatures

const { Company }  = require("../lib/Company");
const { Material } = require("../lib/Material");
const { Database } = require("../lib/Database");
const assert       = require("assert").strict;

describe("Material", () => {
	describe("Object creation", () => {
		describe("Id tests", () => {
			// Missing value problem
			it("Should create the material whithout an id specified", (done) => {
				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AN001"
				});

				assert.equal(typeof mat1.getId(), "string", "The id must be a String (no value given)");

				done();
			});
		});

		describe("Title tests", () => {
			// Missing value problem
			it("Should not create the material with a missing title", (done) => {
				assert.throws(() => {
					new Material({
						version: "v24587",
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whithout a title");

				done();
			});

			// Wrong value problem
			it("Should not create the material with a wrong title value", (done) => {
				assert.throws(() => {
					new Material({
						title: "Samsung_10",
						version: "v24587",
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created with a non alphanumerical character in the title");

				assert.throws(() => {
					new Material({
						title: 48,
						version: "v24587",
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created with a non string title");

				assert.throws(() => {
					new Material({
						title: "",
						version: "v24587",
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created with an empty title");

				assert.throws(() => {
					new Material({
						title: " ",
						version: "v24587",
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created with an empty title (it contains just a space character)");

				done();
			});

			// Size problem
			it("Should not create the material with a wrong size title", (done) => {
				assert.throws(() => {
					new Material({
						title: "azeazeazeazeazeazeazeazeazeazeaze",
						version: "v24587",
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created with a too long title");

				done();
			});

			// Standard creation
			it("Should create the material with specified titles", (done) => {
				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "IOS157",
					reference: "AP150",
					picture: "https://i.ytimg.com/vi/9XgYGNSXkLk/maxresdefault.png",
					phoneNumber: "0685557844"
				});

				const mat2 = new Material({
					title: "IPhone3",
					version: "IOS157",
					reference: "AP150",
					picture: "https://i.ytimg.com/vi/9XgYGNSXkLk/maxresdefault.png",
					phoneNumber: "0685557844"
				});

				assert.equal(mat1.getTitle(), "Samsung galaxy s7", "The title should be defined (contains spaces)");
				assert.equal(mat2.getTitle(), "IPhone3", "The title should be defined (no spaces, letters and number)");

				done();
			});
		});

		describe("Version tests", () => {
			// Missing value problem
			it("Should not create the material with a missing version", (done) => {
				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whithout a version");

				done();
			});

			// Wrong value problem
			it("Should not create the material with a wrong version value", (done) => {
				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v245-87",
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith a version field containing non alphanumerical character");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: 158,
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith a non string version");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "",
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith an empty version field");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: " ",
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith an empty version field (just a space)");

				done();
			});

			// Size problem
			it("Should not create the material with a wrong size version", (done) => {
				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "1",
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith an version field too short");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "1 ",
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith an version field too short (the spaces musn't be counted)");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "1234567891234567",
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith an version field too long");

				done();
			});

			// Standard creation
			it("Should create the material with specified versions", (done) => {
				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "V 10",
					reference: "AP150",
					picture: "https://i.ytimg.com/vi/9XgYGNSXkLk/maxresdefault.png",
					phoneNumber: "0685557844"
				});

				const mat2 = new Material({
					title: "Samsung galaxy s7",
					version: "IOS157",
					reference: "AP150",
					picture: "https://i.ytimg.com/vi/9XgYGNSXkLk/maxresdefault.png",
					phoneNumber: "0685557844"
				});

				assert.equal(mat1.getVersion(), "V 10", "The version should be defined (contains a space)");
				assert.equal(mat2.getVersion(), "IOS157", "The version should be defined (no spaces, letters and numbers)");

				done();
			});
		});

		describe("Reference tests", () => {
			// Missing value problem
			it("Should not create the material with a missing reference", (done) => {
				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whithout a reference");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith an empty reference field");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: " ",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith an empty reference field (just a space)");

				done();
			});

			// Wrong value problem
			it("Should not create the material with a wrong reference value", (done) => {
				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: 158,
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith a non string reference");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "RT",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith a reference not containing any number");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "15715",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith a reference not containing any letter");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "RTT15",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith a reference containing too much letters at the begenning (more than 2)");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "RT1585",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith a reference containing too much numbers at the end (more than 3)");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "ap101",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith a reference containing lowercase characters that should be uppercased");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "AP-15",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith a non alphanumerical character in the reference");

				done();
			});

			// Size problem
			it("Should not create the material with a wrong size reference", (done) => {
				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "AP1505",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whith a too long reference");

				done();
			});

			// Standard creation
			it("Should create the material with specified references", (done) => {
				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AP150",
					picture: "https://i.ytimg.com/vi/9XgYGNSXkLk/maxresdefault.png",
					phoneNumber: "0685557844"
				});

				assert.equal(mat1.getReference(), "AP150", "The reference should be defined (this is a two letters, 3 numbers format reference)");

				done();
			});
		});

		describe("Picture tests", () => {
			// Missing value problem
			it("Should create the material whith a missing picture", (done) => {
				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AP150",
					phoneNumber: "0685557844"
				});

				assert.equal(mat1.getPicture(), undefined, "The picture should be undefined (no value given)");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "AP150",
						picture: "",
						phoneNumber: "0685557844"
					});

					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "AP150",
						picture: " ",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created with an empty string picture link");

				done();
			});

			// Wrong value problem
			it("Should not create the material with a wrong extension picture", (done) => {
				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "AP150",
						picture: 158,
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created with a non string picture");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "AP150",
						picture: "https://i.ytimg.com/vi/9XgYGNSXkLk/maxresdefault.svg",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created with a non png/jpg picture");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "AP150",
						picture: "https://i.ytimg.com/vi/9XgYGNSXkLk/maxresdefault",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created with a non extension picture");

				done();
			});

			// Standard creation
			it("Should create the material with specified pictures", (done) => {
				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AP150",
					picture: "https://i.ytimg.com/vi/9XgYGNSXkLk/maxresdefault.png",
					phoneNumber: "0685557844"
				});

				const mat2 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AP150",
					picture: "https://i.ytimg.com/vi/9XgYGNSXkLk/maxresdefault.jpg",
					phoneNumber: "0685557844"
				});

				assert.equal(mat1.getPicture(), "https://i.ytimg.com/vi/9XgYGNSXkLk/maxresdefault.png", "The picture should be defined (this is a .png picture)");
				assert.equal(mat2.getPicture(), "https://i.ytimg.com/vi/9XgYGNSXkLk/maxresdefault.jpg", "The picture should be defined (this is a .jpg picture)");

				done();
			});
		});

		describe("Phone number tests", () => {
			// Missing value problem
			it("Should create the material whithout a phone number", (done) => {
				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AN001"
				});
				assert.equal(mat1.getPhoneNumber(), undefined, "The phone number should be undefined (no value given)");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "AN001",
						phoneNumber: ""
					});

					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "AN001",
						phoneNumber: " "
					});
				}, Error, "The material is being created with an empty phone number field");

				done();
			});

			// Size problem
			it("Should not create the material with a wrong size phone number", (done) => {
				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "AN001",
						phoneNumber: "068555784414"
					});
				}, Error, "The material is being created with a too long phone number");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "AN001",
						phoneNumber: "068555"
					});
				}, Error, "The material is being created with a too short phone number");
				done();
			});

			// Wrong value problem
			it("Should not create the material with a wrong phone number value", (done) => {
				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "AN001",
						phoneNumber: "azeazeazee"
					});

					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "AN001",
						phoneNumber: "06855-7844"
					});
				}, Error, "The material is being created with a phone number containing non numerical characters");

				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						version: "v24587",
						reference: "AN001",
						phoneNumber: 1587485
					});
				}, Error, "The material is being created with a non string phone number");

				done();
			});

			// Standard creation
			it("Should create the material with the specified phone numbers", (done) => {
				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AN001",
					phoneNumber: "0685557844"
				});

				assert.equal(mat1.getPhoneNumber(), "0685557844", "The phone number should be defined");

				done();
			});
		});
	});

	describe("Database insertion", () => {
		const testMaterial = new Material({
			title: "Samsung Galaxy fold",
			version: "v24587",
			reference: "AN001",
			phoneNumber: "0685557844"
		});
		const database     = new Database(new Company()); // Retrieve the saved datas

		// Add a material in the company
		before(() => database.company.addMaterial(testMaterial));

		describe("Retrieve tests", () => {
			// Cannot retrieve the added material
			it("Should return the material added", (done) => {
				const retrievedMaterial = database.company.getMaterial(testMaterial.getId());

				assert.equal(retrievedMaterial, testMaterial, "An added material is not returned by the getter");

				done();
			});
		});

		describe("Unicity tests", () => {
			// Strict copy added
			it("Should not add a material already in the database", (done) => {
				// Exact same object (same id)
				assert.throws(() => {
					database.company.addMaterial(testMaterial);
				}, Error, "A same material is being added several times in the database");

				// Same reference but different id
				assert.throws(() => {
					const sameReferenceDifferentId = new Material(testMaterial);
					database.company.addMaterial(sameReferenceDifferentId);
				}, Error, "A material is being added in the database with an already added material id");

				assert.throws(() => {
					const referenceCopy = new Material({
						title: "Samsung Galaxy fold",
						version: "v24587",
						reference: testMaterial.getReference(),
						phoneNumber: "0685557844"
					});
					database.company.addMaterial(referenceCopy);
				}, Error, "A material with an already used reference is being added to the company");

				done();
			});
		});
	});

	describe("Database deletion", () => {
		const testMaterial = new Material({
			title: "Samsung Galaxy fold",
			version: "v24587",
			reference: "AN001",
			phoneNumber: "0685557844"
		});
		const database     = new Database(new Company()); // Retrieve the saved datas

		// Add a material in the company
		before(() => database.company.addMaterial(testMaterial));

		describe("Retrieve tests", () => {
			// Can retrieve the deleted material
			it("Should not return the deleted material", (done) => {
				database.company.removeMaterial(testMaterial);

				assert.equal(database.company.getMaterial(testMaterial.getId()), undefined, "The material is not removed from the database when called for being deleted.");
				done();
			});
		});
	});
});