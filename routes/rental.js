const { Rental } = require("../lib/Rental");

module.exports = {
	post: {
		/**
		 * Create a new rental for a specific material
		 */
		create: (req, res) => {
			let createdRental;
			try {
				const startingDate = new Date(req.body.startingDate);
				const endingDate   = new Date(req.body.endingDate);

				if (startingDate < new Date())
					return res.send(JSON.stringify({
						success: false,
						message: "You cannot create a rental starting in the past"
					}));

				if (endingDate < new Date())
					return res.send(JSON.stringify({
						success: false,
						message: "You cannot create a rental ending in the past"
					}));

				createdRental = new Rental({
					employee: database.company.getEmployee(req.body.employeeId),
					material: database.company.getMaterial(req.body.materialId),
					startingDate: startingDate,
					endingDate: endingDate
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
		},
		/**
		 * Remove a rental from the databse.
		 */
		remove: (req, res) => {
			database.company.removeRentalById(req.body.rentalId);
			database.saveToFile();

			res.send(JSON.stringify({
				success: true
			}));
		}
	}
};