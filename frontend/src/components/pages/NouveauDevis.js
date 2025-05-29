import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
} from "@mui/material";
import { baseURL } from "../../api/baseUrl";
import useAxios from "../../hooks/useAxios";
import FullPageLoader from "../layout/FullPageLoader";
import PageTitle from "../layout/PageTitle";
import PageSubTitle from "../layout/PageSubTitle";
import { useNavigate } from "react-router-dom";

const NouveauDevis = () => {
  const { sendRequest, loading, error } = useAxios();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    numero_devis: "",
    nom_client: "",
    type_garantie: "DO",
    destination_ouvrage: "HAB",
    type_travaux: "RLE",
    cout_ouvrage: "",
    presence_existant: false,
    client_vip: false,
    rcmo: false,
    taux_trc: "",
    taux_do: "",
    description_ouvrage: "",
    adresse_chantier: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest({
        method: "POST",
        url: baseURL + "/devis/",
        data: formData,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 800,
        mx: "auto",
        p: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <FullPageLoader isLoading={loading} />
      <PageTitle>Créer un devis</PageTitle>

      {error && <p style={{ color: "red" }}>Erreur : {error.message}</p>}

      <PageSubTitle>Informations devis</PageSubTitle>

      <Box sx={{ display: "flex", gap: "inherit" }}>
        <TextField
          label="Numéro d'opportunité'"
          name="numero_devis"
          value={formData.numero_devis}
          onChange={handleChange}
          required
          sx={{ width: "50%" }}
        />

        <TextField
          label="Nom du client"
          name="nom_client"
          value={formData.nom_client}
          onChange={handleChange}
          required
          sx={{ width: "50%" }}
        />
      </Box>

      <TextField
        label="Description de l'ouvrage"
        name="description_ouvrage"
        multiline
        rows={4}
        value={formData.description_ouvrage}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Adresse du chantier"
        name="adresse_chantier"
        multiline
        rows={1}
        value={formData.adresse_chantier}
        onChange={handleChange}
        fullWidth
      />
      <PageSubTitle>Données techniques</PageSubTitle>

      <Box sx={{ display: "flex", gap: "inherit" }}>
        <FormControlLabel
          control={
            <Checkbox
              name="presence_existant"
              checked={formData.presence_existant}
              onChange={handleChange}
            />
          }
          label="Présence d'existant"
          sx={{ width: "33%", justifyContent: "center" }}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="client_vip"
              checked={formData.client_vip}
              onChange={handleChange}
            />
          }
          label="Client VIP"
          sx={{ width: "33%", justifyContent: "center" }}
        />

        <FormControlLabel
          control={
            <Checkbox
              name="rcmo"
              checked={formData.rcmo}
              onChange={handleChange}
            />
          }
          label="RCMO"
          sx={{ width: "33%", justifyContent: "center" }}
        />
      </Box>

      <Divider sx={{ marginBottom: 2 }} />

      <Box sx={{ display: "flex", gap: "inherit" }}>
        <FormControl sx={{ width: "33%" }}>
          <InputLabel>Type de garantie</InputLabel>
          <Select
            name="type_garantie"
            value={formData.type_garantie}
            onChange={handleChange}
            label="Type de garantie"
          >
            <MenuItem value="DO">DO seule</MenuItem>
            <MenuItem value="TRC">TRC seule</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ width: "33%" }}>
          <InputLabel>Destination de l'ouvrage</InputLabel>
          <Select
            name="destination_ouvrage"
            value={formData.destination_ouvrage}
            onChange={handleChange}
            label="Destination de l'ouvrage"
          >
            <MenuItem value="HAB">Habitation</MenuItem>
            <MenuItem value="HHAB">Hors habitation</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ width: "33%" }}>
          <InputLabel>Destination de l'ouvrage</InputLabel>
          <Select
            name="type_travaux"
            value={formData.type_travaux}
            onChange={handleChange}
            label="Destination de l'ouvrage"
          >
            <MenuItem value="RLE">Rénovation légère</MenuItem>
            <MenuItem value="RLO">Rénovation lourde</MenuItem>
            <MenuItem value="ON">Ouvrage neuf</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <PageSubTitle>Calculatrice</PageSubTitle>

      <TextField
        label="Coût de l'ouvrage (€)"
        name="cout_ouvrage"
        type="number"
        value={formData.cout_ouvrage}
        onChange={handleChange}
        required
        fullWidth
      />

      <Box sx={{ display: "flex", alignItems: "center", gap: "inherit" }}>
        <TextField
          label="Taux TRC (%)"
          name="taux_trc"
          type="number"
          step="0.01"
          value={formData.taux_trc}
          onChange={handleChange}
          required
        />
        Prime TRC :{" "}
        {formData.taux_trc !== "" && formData.cout_ouvrage !== ""
          ? `${formData.taux_trc * formData.cout_ouvrage} €`
          : "N/A "}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "inherit" }}>
        <TextField
          label="Taux DO (%)"
          name="taux_do"
          type="number"
          step="0.01"
          value={formData.taux_do}
          onChange={handleChange}
          required
        />
        Prime DO :{" "}
        {formData.taux_do !== "" && formData.cout_ouvrage !== ""
          ? `${formData.taux_do * formData.cout_ouvrage} €`
          : "N/A "}
      </Box>
      <Divider />

      <Box sx={{ textAlign: "left" }}>
        Prime DUO :{" "}
        {formData.taux_do !== "" &&
        formData.taux_trc !== "" &&
        formData.cout_ouvrage !== ""
          ? `${formData.taux_do * formData.taux_trc * formData.cout_ouvrage} €`
          : "N/A "}
      </Box>

      <Button variant="contained" color="primary" type="submit">
        Enregistrer le devis
      </Button>
    </Box>
  );
};

export default NouveauDevis;
