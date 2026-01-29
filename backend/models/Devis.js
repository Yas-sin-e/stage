const mongoose = require("mongoose");

const devisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    // Changement : On lie au modèle Service (optionnel pour permettre le texte libre)
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    serviceLabel: { type: String, required: true }, // Pour stocker le nom (ex: "Accident Face Avant")
    amount: { type: Number, required: true },
    estimatedTime: { type: String, required: true },
    dateDebut: { type: Date, required: true },
    dateFin: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    description: String,
    // Très important pour les accidents :
    items: [
      {
        name: String, // ex: "Pare-choc", "Main d'oeuvre peinture"
        quantity: Number,
        price: Number, // Prix unitaire
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Devis", devisSchema);
