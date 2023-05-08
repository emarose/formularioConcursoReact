import React from "react";
import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const Breadcrumb = () => {
  return (
    <Container>
      <Breadcrumbs
        sx={{ fontSize: 14 }}
        aria-label="breadcrumb"
        style={{ margin: "2em 0 1em 0" }}
      >
        <Link underline="hover" color="inherit" href="/">
          Inicio
        </Link>
        <Link underline="hover" color="inherit">
          Concursos
        </Link>
        <Typography color={deepPurple[500]} fontWeight={400}>
          Nuevo Concurso
        </Typography>
      </Breadcrumbs>
    </Container>
  );
};

export default Breadcrumb;
