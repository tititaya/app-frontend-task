import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import "../../App.css";

export default function FormDialogo(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.name || "",
    description: props.description || "",
    priorite: props.priorite || "",
    statut: props.statut || "",
  });

  const handleEditValues = async () => {
    // Vérification des champs requis
    if (!editValues.id || !editValues.statut) {
      alert("Veuillez sélectionner un statut valide avant de sauvegarder.");
      console.error("Données invalides :", editValues);
      return;
    }

    try {
      const response = await axios.put("http://localhost:3001/edit", {
        id: editValues.id,
        name: editValues.name, // Inclure ces champs pour éviter les erreurs backend
        description: editValues.description,
        priorite: editValues.priorite,
        statut: editValues.statut,
      });

      if (response.status === 200) {
        alert("Statut mis à jour avec succès !");
        handleClose();
        window.location.reload(); // Recharger pour actualiser l'interface
      } else {
        alert("Erreur lors de la mise à jour du statut. Réponse inattendue.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);

      // Gestion des erreurs spécifiques
      let errorMessage = "Une erreur est survenue lors de la mise à jour.";
      if (error.response) {
        errorMessage = `Erreur serveur : ${error.response.data?.message || JSON.stringify(error.response.data)}`;
        console.error("Détails de l'erreur serveur :", error.response.data);
      } else if (error.request) {
        errorMessage = "Aucune réponse du serveur. Vérifiez votre connexion.";
        console.error("Aucune réponse reçue :", error.request);
      } else {
        errorMessage = `Erreur inattendue : ${error.message}`;
      }

      alert(errorMessage);
    }
  };

  const handleChangeValues = (event) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [event.target.id]: event.target.value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Changer le statut de la tâche</DialogTitle>
        <DialogContent>
          {/* Champ pour sélectionner un nouveau statut */}
          <label htmlFor="statut" style={{ display: "block", marginBottom: "8px" }}>
            Statut :
          </label>
          <select
            id="statut"
            className="rounded-2xl w-full p-2 border"
            value={editValues.statut}
            onChange={handleChangeValues}
          >
            <option value="" disabled>
              Choisissez
            </option>
            <option value="Valide">Valider</option>
            <option value="Close">Fermer</option>
            <option value="En Cours">En cours</option>
          </select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleEditValues} color="primary">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
