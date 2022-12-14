const { Material } = require("../lib/Material");
const assert       = require("assert").strict;

describe("Material", () => {
	describe("Creation", () => {
		describe("Title", () => {
			// Missing value problem
			it("Should not create the material with a missing title", (done) => {
				assert.throws(() => {
					new Material({
						version: "v24587",
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whithout a title");

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

		describe("Version", () => {
			// Missing value problem
			it("Should not create the material with a missing version", (done) => {
				assert.throws(() => {
					new Material({
						title: "Samsung galaxy s7",
						reference: "AN001",
						phoneNumber: "0685557844"
					});
				}, Error, "The material is being created whithout a version");

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

		describe("Reference", () => {
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

		describe("Picture", () => {
			// Missing value problem
			it("Should create the material whith a missing picture", (done) => {
				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AP150",
					phoneNumber: "0685557844"
				});

				const mat2 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AP150",
					picture: "",
					phoneNumber: "0685557844"
				});

				const mat3 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AP150",
					picture: " ",
					phoneNumber: "0685557844"
				});

				assert.equal(mat1.getPicture(), undefined, "The picture should be undefined (no value given)");
				assert.equal(mat2.getPicture(), undefined, "The picture should be undefined (empty string given)");
				assert.equal(mat3.getPicture(), undefined, "The picture should be undefined (string containing a space only given)");

				done();
			});

			// Picture extension problem
			it("Should not create the material with a wrong extension picture", (done) => {
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

		describe("Phone number", () => {
			// Missing value problem
			it("Should create the material whithout a phone number", (done) => {
				const mat1 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AN001"
				});

				const mat2 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AN001",
					phoneNumber: ""
				});

				const mat3 = new Material({
					title: "Samsung galaxy s7",
					version: "v24587",
					reference: "AN001",
					phoneNumber: " "
				});

				assert.equal(mat1.getPhoneNumber(), undefined, "The phone number should be undefined (no value given)");
				assert.equal(mat2.getPhoneNumber(), undefined, "The phone number should be undefined (empty string given)");
				assert.equal(mat3.getPhoneNumber(), undefined, "The phone number should be undefined (string containing a space only given)");

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
});