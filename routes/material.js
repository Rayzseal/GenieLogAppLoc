const { Material } = require("../lib/Material");

module.exports = {
	get: {
		/**
		 * Display the view to list all the app materials
		 */
		list: (req, res) => {
			res.render("material/viewMaterialList.ejs", {
				materialsList: database.company.getMaterials()
			});
		},

		/**
		 * Display the view to create a new material.
		 */
		create: (req, res) => {
			res.render("material/createMaterial.ejs");
		},

		/**
		 * Display the view showing the details about a specific material.
		 */
		view: (req, res) => {
			const materialId = req.params.id;
			const material   = database.company.getMaterial(materialId);
			if (!material)
				return res.redirect("/materials");

			res.render("material/viewMaterial.ejs", {
				material: material,
				rentals: database.company.getRentalsForMaterial(materialId),
				employees: database.company.getEmployees()
			});
		},

		/**
		 * Display the view to edit the material.
		 */
		edit: (req, res) => {
			const materialId = req.params.id;

			res.render("material/editMaterial.ejs", {
				material: database.company.getMaterial(materialId)
			});
		}
	},
	post: {
		/**
		 * Perform the material creation into the database.
		 */
		create: (req, res) => {
			let createdMaterial;
			try {
				createdMaterial = new Material({
					title: req.body.title,
					version: req.body.version,
					reference: req.body.reference,
					picture: req.body.picture,
					phoneNumber: req.body.phoneNumber
				});

				database.company.addMaterial(createdMaterial);
				database.saveToFile();
			} catch (e) {
				return res.send(JSON.stringify({
					success: false,
					message: e.message
				}));
			}

			res.send(JSON.stringify({
				success: true,
				materialId: createdMaterial.getId()
			}));
		},
		/**
		 * Perform the material edition into the database.
		 */
		edit: (req, res) => {
			const materialId = req.params.id;

			try {
				let editedMaterial = database.company.getMaterial(materialId);
				editedMaterial.setTitle(req.body.title);
				editedMaterial.setVersion(req.body.version);
				editedMaterial.setReference(req.body.reference);
				editedMaterial.setPicture(req.body.picture);
				editedMaterial.setPhoneNumber(req.body.phoneNumber);

				database.saveToFile();
			} catch (e) {
				return res.send(JSON.stringify({
					success: false,
					message: e.message
				}));
			}

			res.send(JSON.stringify({
				success: true,
				materialId: materialId
			}));
		},
		/**
		 * Perform the material supression into the database.
		 */
		remove: (req, res) => {
			// TODO
			res.send(JSON.stringify({
				success: false,
				message: "Pas encore dévelopé"
			}));
		}
	}
};

