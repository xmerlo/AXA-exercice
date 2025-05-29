import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { baseURL } from "../../api/baseUrl";
import {
  Box,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Link,
  TablePagination,
} from "@mui/material";
import Table from "../layout/Table";
import TableSortLabel from "../layout/TableSortLabel";
import FullPageLoader from "../layout/FullPageLoader";
import PageTitle from "../layout/PageTitle";
import pdfSvg from "../../assets/pdf.svg";
import wordSvg from "../../assets/word.svg";

function SuiviDevis() {
  const { sendRequest, data, loading, error } = useAxios();

  const [filteredDevis, setFilteredDevis] = useState([]);
  const [filters, setFilters] = useState({
    nom_client: "",
    numero_devis: "",
  });
  const [sortConfig, setSortConfig] = useState({
    key: "numero_devis",
    direction: "asc",
  });

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    sendRequest({
      method: "GET",
      url: baseURL + "/devis/",
    });
  }, [sendRequest]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortData = (dataToSort) => {
    if (!sortConfig.key) return dataToSort;
    return [...dataToSort].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.key === "date_simulation") {
        return (
          (new Date(aValue) - new Date(bValue)) *
          (sortConfig.direction === "asc" ? 1 : -1)
        );
      }

      if (sortConfig.key === "cout_ouvrage") {
        return (aValue - bValue) * (sortConfig.direction === "asc" ? 1 : -1);
      }

      return (
        aValue
          .toString()
          .localeCompare(bValue.toString(), "fr", { sensitivity: "base" }) *
        (sortConfig.direction === "asc" ? 1 : -1)
      );
    });
  };

  useEffect(() => {
    const filtered =
      data?.filter((d) => {
        const matchNom = d.nom_client
          .toLowerCase()
          .includes(filters.nom_client.toLowerCase());
        const matchNumero = d.numero_devis
          .toLowerCase()
          .includes(filters.numero_devis.toLowerCase());
        return matchNom && matchNumero;
      }) || [];

    const sorted = sortData(filtered);
    const paginated = sorted.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    setFilteredDevis(paginated);
    // eslint-disable-next-line
  }, [filters, data, page, rowsPerPage, sortConfig]);

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <FullPageLoader isLoading={loading} />
      <PageTitle>Liste des devis</PageTitle>

      {error && <p style={{ color: "red" }}>Erreur : {error.message}</p>}

      <Box display="flex" gap={2} mb={2}>
        <TextField
          label="Nom du client"
          name="nom_client"
          value={filters.nom_client}
          onChange={handleFilterChange}
        />
        <TextField
          label="Numéro de devis"
          name="numero_devis"
          value={filters.numero_devis}
          onChange={handleFilterChange}
        />
      </Box>

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{ borderRadius: 2, overflow: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "numero_devis"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("numero_devis")}
                >
                  Numéro de devis
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "nom_client"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("nom_client")}
                >
                  Nom Client
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "cout_ouvrage"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("cout_ouvrage")}
                >
                  Tarif (€)
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === "date_simulation"}
                  direction={sortConfig.direction}
                  onClick={() => handleSort("date_simulation")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Attestation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDevis.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.numero_devis}</TableCell>
                <TableCell>{d.nom_client}</TableCell>
                <TableCell>
                  {Number(d.cout_ouvrage).toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </TableCell>
                <TableCell>
                  {new Date(d.date_simulation).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {d.fichier_pdf && (
                    <Link
                      href={`${baseURL}/devis/${d.id}/attestation/pdf/`}
                      target="_blank"
                      rel="noopener"
                    >
                      <Box
                        component="img"
                        src={pdfSvg}
                        alt="PDF"
                        sx={{ height: 34, width: 34, marginRight: 2 }}
                      />
                    </Link>
                  )}
                  {d.fichier_word && (
                    <Link
                      href={`${baseURL}/devis/${d.id}/attestation/word/`}
                      target="_blank"
                      rel="noopener"
                    >
                      <Box
                        component="img"
                        src={wordSvg}
                        alt="DOCX"
                        sx={{ height: 34, width: 34 }}
                      />
                    </Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredDevis.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Aucun devis trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[1, 3, 5, 10, 25]}
        component="div"
        count={
          data?.filter(
            (d) =>
              d.nom_client
                .toLowerCase()
                .includes(filters.nom_client.toLowerCase()) &&
              d.numero_devis
                .toLowerCase()
                .includes(filters.numero_devis.toLowerCase())
          ).length || 0
        }
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

export default SuiviDevis;
