const { Rental } = require("../lib/Rental");

module.exports = {
	post: {
		/**
		 * Create a new rental for a specific material
		 */
		create: (req, res) => {
			const materialId = req.params.id;
			let createdRental;
			try {
				createdRental = new Rental({
					employee: database.company.getEmployee(req.body.employeeId),
					material: database.company.getMaterial(materialId),
					startingDate: req.body.startingDate,
					endingDate: req.body.endingDate
				});

				database.company.addRental(createdRental);
				database.saveToFile();
			} catch (e) {
				return res.send(JSON.stringify({
					success: false,
					message: e.message
				}));
			}

			res.send(JSON.stringify({
				success: true,
				rental: createdRental
			}));
		}
	}
};