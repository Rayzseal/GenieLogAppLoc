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
			const material   = database.company.getMaterial(materialId);

			if (!material)
				return res.redirect("/materials");

			res.render("material/editMaterial.ejs", {
				material: material
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
				let toEditMaterial            = database.company.getMaterial(materialId);
				const alreadyExistingMaterial = database.company.getMaterialByReference(req.body.reference);
				if (alreadyExistingMaterial && alreadyExistingMaterial.getId() !== toEditMaterial.getId())
					return res.send(JSON.stringify({
						success: false,
						message: `Cette référence est déjà utilisé par un matériel (#${alreadyExistingMaterial.getId()})`
					}));

				toEditMaterial.setTitle(req.body.title);
				toEditMaterial.setVersion(req.body.version);
				toEditMaterial.setReference(req.body.reference);
				toEditMaterial.setPicture(req.body.picture);
				toEditMaterial.setPhoneNumber(req.body.phoneNumber);

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
			const materialId = req.params.id;

			try {
				database.company.removeMaterial(database.company.getMaterial(materialId), req.body.force);

				database.saveToFile();
			} catch (e) {
				return res.send(JSON.stringify({
					success: false,
					message: e.message
				}));
			}

			res.send(JSON.stringify({
				success: true
			}));
		}
	}
};

