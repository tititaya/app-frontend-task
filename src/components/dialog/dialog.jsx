import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.name || "",
    description: props.description || "",
    priorite: props.priorite || "",
    statut: props.statut || "",
  });

  const handleEditValues = async () => {
    if (!editValues.statut) {
      alert("Veuillez sélectionner un statut avant de sauvegarder.");
      return;
    }

    try {
      const response = await axios.put("http://localhost:3001/edit", {
        id: editValues.id,
        name: editValues.name || null, // Permet de laisser vide si non défini
        description: editValues.description || null,
        priorite: editValues.priorite || null,
        statut: editValues.statut,
      });

      if (response.status === 200) {
        alert("Tâche mise à jour avec succès !");
        handleClose();
        window.location.reload();
      } else {
        alert("Erreur lors de la mise à jour de la tâche. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Erreur serveur : " + (error.response?.data || "Une erreur est survenue."));
    }
  };

  const handleDeleteGame = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      try {
        const response = await axios.delete(`http://localhost:3001/delete/${editValues.id}`);
        if (response.status === 200) {
          alert("Tâche supprimée avec succès !");
          window.location.reload();
        } else {
          alert("Erreur lors de la suppression de la tâche.");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        alert("Erreur serveur : " + (error.response?.data || "Une erreur est survenue."));
      }
    }
  };

  const handleChangeValues = (event) => {
    const { id, value } = event.target;
    setEditValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Éditer la Tâche</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Titre"
            value={editValues.name}
            onChange={handleChangeValues}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            value={editValues.description}
            onChange={handleChangeValues}
            fullWidth
            variant="standard"
          />
          <label htmlFor="priorite" style={{ marginTop: "1rem", display: "block" }}>
            Priorité :
          </label>
          <select
            id="priorite"
            value={editValues.priorite}
            onChange={handleChangeValues}
            className="rounded-2xl w-full p-2 mt-2 border"
          >
            <option value="" disabled>
              Choisissez une priorité
            </option>
            <option value="Haute">Haute</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <label htmlFor="statut" style={{ marginTop: "1rem", display: "block" }}>
            Statut :
          </label>
          <select
            id="statut"
            value={editValues.statut}
            onChange={handleChangeValues}
            className="rounded-2xl w-full p-2 mt-2 border"
          >
            <option value="" disabled>
              Choisissez un statut
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
          <Button onClick={handleDeleteGame} color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
