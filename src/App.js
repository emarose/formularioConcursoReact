import { useEffect, useState } from "react";
import "./App.css";

/* Icons */
import { Share, Save, Add } from "@mui/icons-material";
import SafetyDividerOutlinedIcon from "@mui/icons-material/SafetyDividerOutlined";

/* Theme */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import deepPurple from "@mui/material/colors/deepPurple";

/* DatePicker - Date Functions */
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import setDefaultOptions from "date-fns/setDefaultOptions";
import { es } from "date-fns/locale";
/* React Hook Form */
import { Controller, useForm } from "react-hook-form";
/* Components (@MUI/LAB) */
import LoadingButton from "@mui/lab/LoadingButton";

/* Components (@MUI/MATERIAL) */
import {
  Autocomplete,
  Breadcrumbs,
  capitalize,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControlLabel,
  Link,
  Stack,
  TextareaAutosize,
  TextField,
  MenuItem,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  RadioGroup,
  Radio,
} from "@mui/material";

/* Custom Components */
import FieldTooltip from "./components/FieldTooltip/FieldTooltip";

/* Sweet Alert */
import Swal from "sweetalert2";

/* Horizontal Scroll */
import ScrollContainer from "react-indiana-drag-scroll";
import SimpleInput from "./components/SimpleInput/SimpleInput";
import axios from "axios";

/* set Timezone */
setDefaultOptions({ locale: es });

function App() {
  const theme = createTheme({
    palette: {
      primary: deepPurple,
    },
  });

  /* RHF functions */
  const {
    resetField,
    control,
    watch,
    handleSubmit,
    register,
    getValues,
    clearErrors,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const [mostrarFechaSustanciado, setMostrarFechaSustanciado] = useState(false);
  const [conExtension, setConExtension] = useState(false);
  const [dictamenDisidencia, setDictamenDisidencia] = useState(false);

  const dedicacionNoSimpleOptions = [
    { label: "Investigación", value: 1 },
    { label: "Gestión", value: 2 },
    { label: "Extensión", value: 3 },
  ];

  const mostrarInvestigacion = watch("dedicacion");
  const asignatura = watch("asignatura");
  const postulante = watch("postulante");
  const jurado = watch("comisionAsesora");
  const juradoDisidente = watch("juradoDisidente");
  const seleccionado = watch("seleccionados");
  const designado = watch("designados");
  const asignaturaPostulada = watch("asignaturaPostulada");
  const cantidadCargos = watch("cantidadCargos");

  const [fechaPublicacion, setFechaPublicacion] = useState();
  const [fechaCierre, setFechaCierre] = useState();
  const [fechaSustanciado, setFechaSustanciado] = useState();
  const [fechaDesignacion, setFechaDesignacion] = useState();
  const [fechaPaseArchivo, setFechaPaseArchivo] = useState();

  const [asignaturasAgregadas, setAsignaturasAgregadas] = useState([]);
  const [seleccionadosAgregados, setSeleccionadosAgregados] = useState([]);
  const [postulantesAgregados, setPostulantesAgregados] = useState([]);
  const [designadosAgregados, setDesignadosAgregados] = useState([]);
  const [juradosAgregados, setJuradosAgregados] = useState([]);

  const [posicionSeleccionado, setPosicionSeleccionado] = useState(1);
  const [posicionDesignado, setPosicionDesignado] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const pages = ["Nuevo Formulario", "Editar Formulario", "Ver Formulario"];

  const [anchorElNav, setAnchorElNav] = useState();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const departamentosData = [
    { label: "Departamento de Letras", id: "1" },
    { label: "Departamento de Historia", id: "2" },
    { label: "Departamento de Filosofía", id: "3" },
    { label: "Departamento de Geografía", id: "4" },
  ];

  const cargosData = [
    { label: "Titular", id: "1" },
    { label: "Titular/Asociado", id: "2" },
    { label: "Asociado", id: "3" },
    { label: "JTP", id: "4" },
    { label: "Ayudante graduado regular", id: "5" },
    { label: "Ayudante estudiante", id: "6" },
  ];

  const postulantesData = postulantesAgregados.map((el, i) => ({
    label: el.postulante,
    id: i + 1,
  }));

  const asignaturasData = asignaturasAgregadas.map((el, i) => ({
    label: el.asignatura,
    id: i + 1,
  }));

  const juradosData = juradosAgregados.map((el, i) => ({
    label: el.jurado,
    id: i + 1,
  }));

  /* Agregar una asignatura al array de Asignaturas */
  const handleAgregarAsignatura = () => {
    if (!asignatura)
      return Swal.fire({
        title: "Ingrese una Asignatura",
        icon: "error",
        confirmButtonText: "Volver",
      });

    if (
      asignaturasAgregadas &&
      asignaturasAgregadas.filter(
        (item) =>
          item.asignatura === asignatura && item.conExtension === conExtension
      ).length > 0
    ) {
      return Swal.fire({
        title: "Asignatura duplicada",
        text: "La asignatura ingresada ya se encuentra agregada.",
        icon: "error",
        confirmButtonText: "Volver",
      });
    }

    const draft = [
      ...asignaturasAgregadas,
      { asignatura: asignatura, conExtension: conExtension },
    ];

    setAsignaturasAgregadas(draft);

    localStorage.setItem("asignaturas", JSON.stringify(draft));

    resetField("asignatura");
    setConExtension(false);
  };

  /* Agregar una postulante al array de Postulantes */
  const handleAgregarPostulante = () => {
    if (!postulante || !asignaturaPostulada)
      return Swal.fire({
        title: "Ingrese un Postulante y una Asignatura a la cual se postula.",
        icon: "error",
        confirmButtonText: "Volver",
      });

    if (
      postulantesAgregados &&
      postulantesAgregados.filter((item) => item.postulante === postulante)
        .length > 0
    ) {
      return Swal.fire({
        title: "Postulante duplicado",
        text: "El postulante ya se encuentra agregado.",
        icon: "error",
        confirmButtonText: "Volver",
      });
    }

    let idAsignatura = asignaturaPostulada.split(" -")[0];
    let labelAsignatura = asignaturaPostulada.split("- ")[1];

    const draft = [
      ...postulantesAgregados,
      {
        postulante: postulante,
        asignaturaPostulada: {
          id: parseInt(idAsignatura),
          asignatura: labelAsignatura,
        },
      },
    ];

    setPostulantesAgregados(draft);
    resetField("postulante");

    localStorage.setItem("postulantes", JSON.stringify(draft));
  };

  /* Agregar una jurado al array de Jurados */
  const handleAgregarJurado = () => {
    if (!jurado)
      return Swal.fire({
        title: "Ingrese un Jurado",
        icon: "error",
        confirmButtonText: "Volver",
      });

    if (
      juradosAgregados &&
      juradosAgregados.filter((item) => item.jurado === jurado).length > 0
    ) {
      return Swal.fire({
        title: "Jurado duplicado",
        text: "El jurado ya se encuentra agregado.",
        icon: "error",
        confirmButtonText: "Volver",
      });
    }

    const draft = [...juradosAgregados, { jurado: jurado }];

    setJuradosAgregados(draft);

    localStorage.setItem("comisionAsesora", JSON.stringify(draft));
    resetField("comisionAsesora");
  };

  /* Agregar una asignatura al array de Selecionados */
  const handleAgregarSeleccionado = () => {
    if (!seleccionado)
      return Swal.fire({
        title: "Ingrese un Seleccionado",
        icon: "error",
        confirmButtonText: "Volver",
      });

    if (
      seleccionadosAgregados &&
      seleccionadosAgregados.filter(
        (item) => item.seleccionado === seleccionado
      ).length > 0
    ) {
      return Swal.fire({
        title: "Seleccionado duplicado",
        text: "El postulante ingresado ya se encuentra agregado.",
        icon: "error",
        confirmButtonText: "Volver",
      });
    }

    if (dictamenDisidencia && !juradoDisidente) {
      return Swal.fire({
        title: "Ingrese un jurado para el postulante",
        text: "Dictamen en disidencia",
        icon: "error",
        confirmButtonText: "Volver",
      });
    }

    const draft = [
      ...seleccionadosAgregados,
      {
        seleccionado: seleccionado,
        jurado: juradoDisidente || null,
        posicion: posicionSeleccionado,
      },
    ];
    setPosicionSeleccionado(posicionSeleccionado + 1);

    setSeleccionadosAgregados(draft);

    localStorage.setItem("seleccionados", JSON.stringify(draft));

    //resetField("seleccionados");
  };

  /* Agregar una asignatura al array de Designados */
  const handleAgregarDesignado = () => {
    if (!designado)
      return Swal.fire({
        title: "Ingrese un Designado",
        icon: "error",
        confirmButtonText: "Volver",
      });

    if (
      designadosAgregados &&
      designadosAgregados.filter((item) => item.designado === designado)
        .length > 0
    ) {
      return Swal.fire({
        title: "Designado duplicado",
        text: "El postulante ingresado ya se encuentra agregado.",
        icon: "error",
        confirmButtonText: "Volver",
      });
    }

    const draft = [
      ...designadosAgregados,
      {
        designado: designado,
        posicion: posicionDesignado,
      },
    ];
    setPosicionDesignado(posicionDesignado + 1);

    setDesignadosAgregados(draft);

    localStorage.setItem("designados", JSON.stringify(draft));
  };

  /* Eliminar una asignatura del array de Asignaturas */
  const handleDeleteAsignatura = (asignatura) => {
    const filter = asignaturasAgregadas.filter(
      (asignaturaAgregada) => asignaturaAgregada !== asignatura
    );
    setAsignaturasAgregadas(filter);
    localStorage.setItem("asignaturas", JSON.stringify(filter));
  };

  /* Eliminar un postulante del array de Postulantes */
  const handleDeletePostulante = (postulante) => {
    const filter = postulantesAgregados.filter(
      (postulanteAgregado) => postulanteAgregado !== postulante
    );

    setPostulantesAgregados(filter);
    localStorage.setItem("postulantes", JSON.stringify(filter));
  };

  /* Eliminar un jurado del array de Jurados */
  const handleDeleteJurado = (jurado) => {
    const filter = juradosAgregados.filter(
      (juradoAgregado) => juradoAgregado !== jurado
    );

    setJuradosAgregados(filter);
    localStorage.setItem("comisionAsesora", JSON.stringify(filter));
  };

  /* Eliminar un designado del array de Designados */
  const handleDeleteDesignado = (designado) => {
    const filter = designadosAgregados.filter(
      (designadoAgregado) => designadoAgregado !== designado
    );
    setPosicionDesignado(posicionDesignado - 1);

    setDesignadosAgregados(filter);
    localStorage.setItem("designados", JSON.stringify(filter));
  };

  /* Manejar el checkbox de dictamen en disidencia (Seleccionados) */
  const handleDictamenDisidencia = () => {
    const result = seleccionadosAgregados.find((item) => item.jurado === null);

    if (!result && seleccionadosAgregados.length > 0) {
      return Swal.fire({
        title: "Existen seleccionados con dictamen en disidencia",
        text: "Si desea continuar, se removerán todos los postulantes Seleccionados.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Continuar",
        cancelButtonText: "Volver",
      }).then((result) => {
        if (result.isConfirmed) {
          setSeleccionadosAgregados([]);
          setDictamenDisidencia(false);
          resetField("juradoDisidente");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.close();
        }
      });
    }

    if (result && seleccionadosAgregados.length > 0) {
      return Swal.fire({
        title: "Existen postulantes seleccionados",
        text: "Si desea continuar, se removerán todos los postulantes.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Continuar",
        cancelButtonText: "Volver",
      }).then((result) => {
        if (result.isConfirmed) {
          setSeleccionadosAgregados([]);
          setDictamenDisidencia(true);
          resetField("juradoDisidente");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.close();
        }
      });
    }
    setDictamenDisidencia(!dictamenDisidencia);
  };

  /* Eliminar un seleccionado del array de Seleccionados */
  const handleDeleteSeleccionado = ({ seleccionado }) => {
    const filter = seleccionadosAgregados.filter(
      (seleccionadoAgregado) =>
        seleccionadoAgregado.seleccionado !== seleccionado
    );

    setSeleccionadosAgregados(filter);
    setPosicionSeleccionado(posicionSeleccionado - 1);
    //localStorage.setItem("comisionAsesora", JSON.stringify(filter));
  };

  /* Finalizar Formulario */
  const handleFinalizarFormulario = async (data) => {
    setIsLoading(true);

    const draft = {
      ordenPrelacion: parseInt(data.ordenPrelacion),
      id_departamento: parseInt(data.departamento),
      area: data.area,
      id_cargo: parseInt(data.cargo),
      asignaturas: asignaturasAgregadas,
      cantidadCargos: parseInt(data.cantidadCargos),
      fechaPublicacion: new Date(data.fechaPublicacion).toLocaleDateString(),
      expedienteLlamado: data.expedienteLlamado,
      dedicacion: {
        id: parseInt(data.dedicacion),
        tipo:
          parseInt(data.dedicacion) === 1
            ? null
            : parseInt(data.dedicacionOption),
      },
      oca: data.oca,
      fechaCierre: new Date(data.fechaCierre).toLocaleDateString(),
      expedienteConcurso: data.expedienteConcurso,
      interino: data.interino,
      postulantes: postulantesAgregados.map((item) => item),
      comisionAsesora: juradosAgregados.map((item) => item.jurado),
      seleccionados: seleccionadosAgregados,
      sustanciado: mostrarFechaSustanciado,
      fechaSustanciado: mostrarFechaSustanciado
        ? new Date(data.fechaSustanciado).toLocaleDateString()
        : null,
      recusaciones: data.recusaciones,
      fechaPaseArchivo: new Date(data.fechaPaseArchivo).toLocaleDateString(),
      fechaDesignacion: new Date(data.fechaDesignacion).toLocaleDateString(),
      observaciones: data.observaciones,
      disidencia: dictamenDisidencia,
      designados: designadosAgregados,
    };
    console.log("draft data: ", draft);
    await axios
      .post("http://localhost/concursos/API/save_concurso.php", draft)
      .then((response) => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    /*  setTimeout(() => {
      localStorage.clear();
      setAsignaturasAgregadas([]);
      setConExtension(false);
      reset({ data });
     
    }, 1000); */
  };

  useEffect(() => {
    const items = { ...localStorage };
    if (!items) return;
    items.asignatura && setAsignaturasAgregadas(JSON.parse(items.asignaturas));
    items.postulantes && setPostulantesAgregados(JSON.parse(items.postulantes));
    items.comisionAsesora &&
      setJuradosAgregados(JSON.parse(items.comisionAsesora));
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: "none", md: "flex" },
                    fontWeight: 500,
                    letterSpacing: ".1rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  INICIO
                </Typography>

                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  INICIO
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
              </Toolbar>
            </Container>
          </AppBar>

          {/* BreadCrumbs */}
          <div className="container">
            <Breadcrumbs
              sx={{ fontSize: 14 }}
              aria-label="breadcrumb"
              style={{ margin: "2em 0 1em 0" }}
            >
              <Link underline="hover" color="inherit" href="/">
                Inicio
              </Link>
              <Link underline="hover" color="inherit">
                Formularios
              </Link>
              <Typography color={deepPurple[500]} fontWeight={400}>
                Nuevo Formulario
              </Typography>
            </Breadcrumbs>
          </div>

          <div
            className="container shadow-lg"
            style={{
              paddingBottom: "30px",
              marginBottom: "30px",
              borderRadius: 4,
            }}
          >
            <Typography variant="h3" sx={{ padding: "30px 0" }} align="center">
              Nuevo Formulario
            </Typography>

            <Card variant="outlined">
              <CardContent>
                <form
                  className="d-grid justify-content-center"
                  id="formulario"
                  onSubmit={handleSubmit(handleFinalizarFormulario)}
                >
                  <Stack gap={2}>
                    <div className="row d-flex justify-content-between gap-3 mt-3">
                      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 d-flex flex-column gap-3">
                        {/* Orden de Prelación */}
                        <SimpleInput
                          label="Orden de Prelación Nº "
                          placeholder="Ej: 1000"
                          type="number"
                          helperText={
                            errors.ordenPrelacion &&
                            "Ingrese el Orden de Prelación"
                          }
                          tooltip="Corresponde al Orden de Prelación indicado en el llamado, se ingresa únicamente el número. Ej: 1423"
                          error={Boolean(errors.ordenPrelacion)}
                          register={register}
                          name="ordenPrelacion"
                          required
                        />
                        {/* Departamento */}
                        <span className="d-flex align-items-top gap-3">
                          <Controller
                            control={control}
                            name="departamento"
                            defaultValue={departamentosData[0]}
                            render={({
                              field: { ref, onChange, ...field },
                            }) => (
                              <Autocomplete
                                disablePortal
                                defaultValue={null}
                                noOptionsText="Sin resultados"
                                options={departamentosData}
                                isOptionEqualToValue={(option, value) =>
                                  option.label === value.label
                                }
                                onChange={(_, data) =>
                                  data && onChange(`${data.id} - ${data.label}`)
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    {...field}
                                    inputRef={ref}
                                    required
                                    sx={{ minWidth: 300 }}
                                    error={Boolean(errors.departamento)}
                                    InputLabelProps={{ required: false }}
                                    variant="outlined"
                                    label="Departamento"
                                  />
                                )}
                              />
                            )}
                          />
                          <FieldTooltip title="Corresponde al Departamento al cual pertenece la asignatura del concurso. Ej: Departamento de Filosofía" />
                        </span>
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-5 d-flex flex-column gap-3 mb-3">
                        {/* Area */}
                        <SimpleInput
                          label="Área"
                          placeholder="Ej: Área II: Teoría Literaria"
                          helperText={errors.area && "Ingrese un Área"}
                          tooltip="Corresponde al Área a la cual pertenece la asignatura del concurso. Se debe ingresar como figura en el llamado. Ej: Área II: Teoría Literaria."
                          error={Boolean(errors.area)}
                          register={register}
                          name="area"
                          required
                        />

                        {/* Cargo */}
                        <span className="d-flex align-items-top gap-3">
                          <Controller
                            control={control}
                            name="cargo"
                            defaultValue={cargosData[0]}
                            render={({
                              field: { ref, onChange, ...field },
                            }) => (
                              <Autocomplete
                                disablePortal
                                defaultValue={null}
                                noOptionsText="Sin resultados"
                                options={cargosData}
                                sx={{ minWidth: 300 }}
                                isOptionEqualToValue={(option, value) =>
                                  option.label === value.label
                                }
                                onChange={(_, data) =>
                                  data && onChange(data.id)
                                }
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    {...field}
                                    inputRef={ref}
                                    error={Boolean(errors.cargo)}
                                    required
                                    InputLabelProps={{ required: false }}
                                    variant="outlined"
                                    label="Cargo"
                                  />
                                )}
                              />
                            )}
                          />
                          <FieldTooltip title="Corresponde al cargo docente requerido." />
                        </span>
                      </div>
                    </div>

                    {/* Asignatura */}
                    <Card
                      variant="elevation"
                      elevation={2}
                      sx={{ maxWidth: 1000 }}
                    >
                      <CardContent>
                        <div id="asignaturaForm">
                          <div
                            style={{
                              border: "1px solid" + deepPurple[400],
                              borderRadius: 4,
                              padding: "15px",
                              margin: 0,
                            }}
                          >
                            <SimpleInput
                              label="Asignatura"
                              placeholder="Ej: Literatura Y Cultura Latinoamericanas I"
                              tooltip="Corresponde a la asignatura indicada en el llamado. Se debe indicar el nombre completo. Ej: Literatura Y Cultura Latinoamericanas I"
                              register={register}
                              name="asignatura"
                            />

                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "start",
                                gap: "20px",
                                width: "100%",
                              }}
                            >
                              <div
                                className="col-md-5"
                                style={{
                                  backgroundColor: deepPurple[50],
                                  padding: "7.5px 10px",
                                  borderRadius: 4,
                                  margin: "8px 0",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  width: "fit-content",
                                }}
                              >
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      sx={{
                                        color: deepPurple[800],
                                        "&.Mui-checked": {
                                          color: deepPurple[600],
                                        },
                                      }}
                                      onChange={() =>
                                        setConExtension(!conExtension)
                                      }
                                      checked={conExtension}
                                    />
                                  }
                                  label={
                                    <>
                                      <span
                                        style={{
                                          display: "flex",
                                          gap: 15,
                                          fontSize: "14px",
                                          alignItems: "center",
                                        }}
                                      >
                                        Extensión de funciones docentes en otra
                                        asignatura
                                        <Share color="primary" />
                                      </span>
                                    </>
                                  }
                                />
                              </div>

                              <div className="col-md-4">
                                <Button
                                  sx={{
                                    whiteSpace: "nowrap",
                                  }}
                                  onClick={handleAgregarAsignatura}
                                  variant="outlined"
                                  type="button"
                                >
                                  <Add /> Agregar Asignatura
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Asignaturas agregadas */}
                        {asignaturasAgregadas &&
                          asignaturasAgregadas.length > 0 && (
                            <ScrollContainer
                              style={{
                                marginTop: 15,
                                padding: "10px 0",
                                borderRadius: 4,
                                border: `1px solid ${deepPurple[600]} `,
                              }}
                              className="scroll-container"
                            >
                              <Stack
                                spacing={2}
                                direction="row"
                                style={{ padding: "0 10px" }}
                              >
                                {asignaturasAgregadas.map((el, i) =>
                                  el.conExtension ? (
                                    <Chip
                                      key={i}
                                      label={
                                        <span
                                          style={{
                                            display: "flex",
                                            gap: 15,
                                            fontSize: "14px",
                                            alignItems: "center",
                                          }}
                                        >
                                          <Share color="primary" />
                                          {capitalize(el["asignatura"])}
                                        </span>
                                      }
                                      onDelete={() =>
                                        handleDeleteAsignatura(el)
                                      }
                                    />
                                  ) : (
                                    <Chip
                                      key={i}
                                      label={capitalize(el["asignatura"])}
                                      onDelete={() =>
                                        handleDeleteAsignatura(el)
                                      }
                                    />
                                  )
                                )}
                              </Stack>
                            </ScrollContainer>
                          )}
                      </CardContent>
                    </Card>

                    <div className="row d-flex justify-content-between gap-3 mt-3">
                      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 d-flex flex-column gap-3">
                        {/* Cantidad de cargos */}
                        <SimpleInput
                          label="Cantidad de Cargos"
                          placeholder="Máximo: 11"
                          helperText={
                            errors.cantidadCargos &&
                            "Cantidad de cargos mínimo: 1, máximo: 11"
                          }
                          tooltip="Se cargan la cantidad de cargos a concursar. Valor por defecto 1, máximo 11."
                          error={Boolean(errors.cantidadCargos)}
                          register={register}
                          name="cantidadCargos"
                          onChange={(e) => {
                            const inputValue = parseInt(e.target.value, 10);
                            const validNumbers = [
                              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                            ];
                            if (validNumbers.includes(inputValue)) {
                              setValue("cantidadCargos", inputValue.toString());
                              clearErrors("cantidadCargos");
                            } else {
                              setError("cantidadCargos", {
                                type: "manual",
                              });
                            }
                          }}
                          required
                        />

                        {/* Fecha de Publicación */}
                        <span className="d-flex align-items-top gap-3">
                          <Controller
                            name="fechaPublicacion"
                            defaultValue={fechaPublicacion}
                            control={control}
                            render={({ field: { onChange, ...restField } }) => (
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DesktopDatePicker
                                  sx={{ minWidth: 300 }}
                                  label="Fecha de Publicación"
                                  onChange={(event) => {
                                    onChange(event);
                                    setFechaPublicacion(event);
                                  }}
                                  {...restField}
                                />
                              </LocalizationProvider>
                            )}
                          />
                          <FieldTooltip title="Corresponde a la fecha en la que se publica el llamado." />
                        </span>

                        {/* Expediente Llamado */}
                        <SimpleInput
                          label="Expediente Llamado Nº"
                          placeholder="Ej: 7-0756/16"
                          helperText={
                            errors.expedienteLlamado &&
                            "Ingrese un N° de expediente"
                          }
                          tooltip="Corresponde al N° de expediente administrativo del llamado, se ingresa como figura en el expediente. Ej: 7-3664/14"
                          error={Boolean(errors.expedienteLlamado)}
                          register={register}
                          name="expedienteLlamado"
                          required
                        />

                        {/* Dedicación */}
                        <span className="d-flex align-items-top gap-3 ">
                          <TextField
                            select
                            sx={{ minWidth: 300 }}
                            label="Dedicación"
                            defaultValue=""
                            inputProps={register("dedicacion", {
                              required: "Ingrese una dedicación",
                            })}
                            error={Boolean(errors.dedicacion)}
                            helperText={errors.dedicacion?.message}
                          >
                            {[
                              { label: "Simple", id: "1" },
                              { label: "Exclusiva", id: "2" },
                              { label: "Completa", id: "3" },
                              { label: "Parcial", id: "4" },
                            ].map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                          <FieldTooltip title="Corresponde a la dedicación requerida." />
                        </span>

                        {/* Dedicacion simple - 3 opciones */}
                        {mostrarInvestigacion &&
                          mostrarInvestigacion !== "1" && (
                            <Controller
                              name="dedicacionOption"
                              control={control}
                              defaultValue={1}
                              rules={{ required: true }}
                              render={({ field }) => (
                                <RadioGroup
                                  {...field}
                                  style={{ marginLeft: 10 }}
                                >
                                  {dedicacionNoSimpleOptions.map((option) => (
                                    <FormControlLabel
                                      key={option.value}
                                      value={option.value}
                                      control={<Radio />}
                                      label={option.label}
                                    />
                                  ))}
                                </RadioGroup>
                              )}
                            />
                          )}
                      </div>

                      <div className="col-sm-12 col-md-6 col-lg-5 d-flex flex-column gap-3 mb-3">
                        {/* OCA Designacion */}
                        <SimpleInput
                          label="OCA Designacion Nº"
                          placeholder="Ej: 1544/18"
                          helperText={
                            errors.OcaDesignacion && "Ingrese un N° de OCA"
                          }
                          tooltip="Corresponde al N° de OCA de la designación, se ingresa como figura en la ordenanza. Ej: 2879/15"
                          error={Boolean(errors.OcaDesignacion)}
                          register={register}
                          name="oca"
                          required
                        />

                        {/* Fecha de Cierre */}
                        <span className="d-flex align-items-top gap-3">
                          <Controller
                            name="fechaCierre"
                            defaultValue={fechaCierre}
                            control={control}
                            render={({ field: { onChange, ...restField } }) => (
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DesktopDatePicker
                                  sx={{ minWidth: 300 }}
                                  label="Fecha de Cierre"
                                  onChange={(event) => {
                                    onChange(event);
                                    setFechaCierre(event);
                                  }}
                                  {...restField}
                                />
                              </LocalizationProvider>
                            )}
                          />
                          <FieldTooltip title="Corresponde a la fecha del cierre del concurso." />
                        </span>

                        {/* Expediente Concurso  */}
                        <SimpleInput
                          label="Expediente de Concurso Nº"
                          placeholder="Ej: 7-2183/18"
                          helperText={
                            errors.expedienteConcurso &&
                            "Ingrese un N° expediente"
                          }
                          tooltip="Corresponde al N° de expediente administrativo del concurso, se ingresa como figura en el expediente. Ej: 7-3664/14"
                          error={Boolean(errors.expedienteConcurso)}
                          register={register}
                          name="expedienteConcurso"
                        />

                        {/* Interino  */}
                        <SimpleInput
                          label="Interino"
                          tooltip="Corresponde completar cuado hay un interino."
                          error={Boolean(errors.interino)}
                          register={register}
                          name="interino"
                        />
                      </div>
                    </div>

                    {/* Postulantes */}
                    <Card
                      variant="elevation"
                      elevation={2}
                      sx={{ maxWidth: 1000 }}
                    >
                      <CardContent>
                        <div id="postulantesForm">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "start",
                              alignItems: "start",
                              gap: 50,
                              border: "1px solid" + deepPurple[400],
                              borderRadius: 4,
                              padding: "30px 15px",
                            }}
                          >
                            <div className="row gap-3 d-flex justify-content-between">
                              <div className="col-md-4">
                                <SimpleInput
                                  label="Postulante"
                                  tooltip="Corresponde a los postulantes inscriptos en el concurso. Ingresar Apellido Nombre(DNInúmerodedni);Ej : Perez Juan (DNI25333788)"
                                  register={register}
                                  name="postulante"
                                />
                              </div>
                              <div className="col-md-6 col-sm-12">
                                <Controller
                                  control={control}
                                  name="asignaturaPostulada"
                                  defaultValue={asignaturasData[0]}
                                  render={({
                                    field: { ref, onChange, ...field },
                                  }) => (
                                    <Autocomplete
                                      disablePortal
                                      defaultValue={null}
                                      noOptionsText="Sin resultados"
                                      options={asignaturasData}
                                      isOptionEqualToValue={(option, value) =>
                                        option.label === value.label
                                      }
                                      onChange={(_, data) =>
                                        data &&
                                        onChange(`${data.id} - ${data.label}`)
                                      }
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          {...field}
                                          inputRef={ref}
                                          sx={{
                                            textTransform: "capitalize",
                                            minWidth: 250,
                                          }}
                                          variant="outlined"
                                          name="aa"
                                          label="Asignatura"
                                        />
                                      )}
                                    />
                                  )}
                                />
                              </div>
                              <div className="col-md-2">
                                <Button
                                  sx={{
                                    whiteSpace: "nowrap",
                                  }}
                                  onClick={handleAgregarPostulante}
                                  variant="outlined"
                                  type="button"
                                >
                                  <Add /> Agregar Postulante
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Postulantes agregados */}
                        {postulantesAgregados &&
                          postulantesAgregados.length > 0 && (
                            <ScrollContainer
                              style={{
                                marginTop: 15,
                                padding: "10px 0",
                                borderRadius: 4,
                                border: `1px solid ${deepPurple[600]} `,
                              }}
                              className="scroll-container"
                            >
                              <Stack
                                spacing={2}
                                direction="row"
                                style={{ padding: "0 10px" }}
                              >
                                {postulantesAgregados.map((el, i) => (
                                  <Chip
                                    key={i}
                                    label={
                                      <>
                                        {capitalize(el["postulante"])} -{" "}
                                        {capitalize(
                                          el["asignaturaPostulada"].asignatura
                                        )}
                                      </>
                                    }
                                    onDelete={() => handleDeletePostulante(el)}
                                  />
                                ))}
                              </Stack>
                            </ScrollContainer>
                          )}
                      </CardContent>
                    </Card>

                    {/* Comision Asesora */}
                    <Card
                      variant="elevation"
                      elevation={2}
                      sx={{ maxWidth: 1000 }}
                    >
                      <CardContent>
                        <div id="comisionAsesoraForm">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 30,
                              border: "1px solid" + deepPurple[400],
                              borderRadius: 4,
                              padding: "30px 15px",
                            }}
                          >
                            <div className="row gap-3">
                              <div className="col-md-8">
                                <SimpleInput
                                  label="Comisión Asesora"
                                  /* helperText={
                                errors.asignatura &&
                                "Ingrese al menos una asignatura"
                              } */
                                  tooltip="Corresponde ingresar los jurados que participaron en el concurso."
                                  //error={Boolean(errors.asignatura)}
                                  register={register}
                                  name="comisionAsesora"
                                />
                              </div>
                              <div className="col-md-4">
                                <Button
                                  sx={{
                                    whiteSpace: "nowrap",
                                  }}
                                  onClick={handleAgregarJurado}
                                  variant="outlined"
                                  type="button"
                                >
                                  <Add /> Agregar Jurado
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Postulantes agregados */}
                        {juradosAgregados && juradosAgregados.length > 0 && (
                          <ScrollContainer
                            style={{
                              marginTop: 15,
                              padding: "10px 0",
                              borderRadius: 4,
                              border: `1px solid ${deepPurple[600]} `,
                            }}
                            className="scroll-container"
                          >
                            <Stack
                              spacing={2}
                              direction="row"
                              style={{ padding: "0 10px" }}
                            >
                              {juradosAgregados.map((el, i) => (
                                <Chip
                                  key={i}
                                  label={capitalize(el["jurado"])}
                                  onDelete={() => handleDeleteJurado(el)}
                                />
                              ))}
                            </Stack>
                          </ScrollContainer>
                        )}
                      </CardContent>
                    </Card>

                    {/* Seleccionados */}
                    <Card
                      variant="elevation"
                      elevation={2}
                      sx={{ maxWidth: 1000 }}
                    >
                      <CardContent>
                        <div id="asignaturaForm">
                          <div
                            style={{
                              border: "1px solid" + deepPurple[400],
                              borderRadius: 4,
                              padding: "15px",
                              margin: 0,
                            }}
                          >
                            <span className="d-flex gap-3">
                              <span className="d-flex align-items-top gap-3">
                                <Controller
                                  control={control}
                                  name="seleccionados"
                                  defaultValue={postulantesData[0]}
                                  render={({
                                    field: { ref, onChange, ...field },
                                  }) => (
                                    <Autocomplete
                                      disablePortal
                                      defaultValue={null}
                                      noOptionsText="Sin resultados"
                                      options={postulantesData}
                                      sx={{ width: 300 }}
                                      isOptionEqualToValue={(option, value) =>
                                        option.label === value.label
                                      }
                                      onChange={(_, data) =>
                                        data && onChange(data.label)
                                      }
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          {...field}
                                          inputRef={ref}
                                          required
                                          error={Boolean(errors.seleccionados)}
                                          InputLabelProps={{ required: false }}
                                          variant="outlined"
                                          label="Seleccionados"
                                          helperText={`Cargos a cubrir: ${
                                            cantidadCargos || ""
                                          }`}
                                        />
                                      )}
                                    />
                                  )}
                                />
                                <FieldTooltip title="Corresponde a los candidatos seleccionados. El orden de mérito debe respetarse en la lista, el primero corresponde al primer orden, el segundo al siguiente y así sucesivamente" />
                              </span>
                              <div className="d-flex flex-column align-items-center">
                                <small htmlFor="">Orden de mérito </small>
                                <p>Nº {posicionSeleccionado}</p>
                              </div>

                              {/* Si el dictamen esta en disidencia: */}
                              {dictamenDisidencia && (
                                <Controller
                                  control={control}
                                  name="juradoDisidente"
                                  defaultValue={juradosData[0]}
                                  render={({
                                    field: { ref, onChange, ...field },
                                  }) => (
                                    <Autocomplete
                                      disablePortal
                                      defaultValue={null}
                                      noOptionsText="Sin resultados"
                                      options={juradosData}
                                      sx={{ width: 300 }}
                                      isOptionEqualToValue={(option, value) =>
                                        option.label === value.label
                                      }
                                      onChange={(_, data) =>
                                        data && onChange(data.label)
                                      }
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          {...field}
                                          inputRef={ref}
                                          /* required
                                            error={Boolean(
                                              errors.seleccionados
                                            )}
                                            InputLabelProps={{
                                              required: false,
                                            }} */
                                          variant="outlined"
                                          label="Jurado"
                                        />
                                      )}
                                    />
                                  )}
                                />
                              )}
                            </span>
                            {/* Checkbox */}
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "start",
                                gap: "20px",
                                width: "100%",
                              }}
                            >
                              <div
                                className="col-md-5"
                                style={{
                                  backgroundColor: deepPurple[50],
                                  padding: "7.5px 10px",
                                  borderRadius: 4,
                                  width: 300,
                                  marginTop: 15,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                }}
                              >
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      sx={{
                                        color: deepPurple[800],
                                        "&.Mui-checked": {
                                          color: deepPurple[600],
                                        },
                                      }}
                                      onChange={handleDictamenDisidencia}
                                      checked={dictamenDisidencia}
                                    />
                                  }
                                  label={
                                    <>
                                      <span
                                        style={{
                                          display: "flex",
                                          gap: 15,
                                          fontSize: "14px",
                                          alignItems: "center",
                                        }}
                                      >
                                        Dictamen en disidencia
                                        <SafetyDividerOutlinedIcon color="primary" />
                                      </span>
                                    </>
                                  }
                                />
                              </div>

                              <div className="col-md-4">
                                <Button
                                  sx={{
                                    whiteSpace: "nowrap",
                                  }}
                                  onClick={handleAgregarSeleccionado}
                                  variant="outlined"
                                  type="button"
                                >
                                  <Add /> Agregar Seleccionado
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Seleccionados Agregados */}

                        {seleccionadosAgregados &&
                          seleccionadosAgregados.length > 0 && (
                            <ScrollContainer
                              style={{
                                marginTop: 15,
                                padding: "10px 0",
                                borderRadius: 4,
                                border: `1px solid ${deepPurple[600]} `,
                              }}
                              className="scroll-container"
                            >
                              <Stack
                                spacing={2}
                                direction={
                                  seleccionadosAgregados.find(
                                    (obj) => obj.jurado === null
                                  )
                                    ? "row"
                                    : "column"
                                }
                                style={{ padding: "0 10px" }}
                              >
                                {seleccionadosAgregados.map((el, i) =>
                                  el.jurado ? (
                                    <Chip
                                      key={i}
                                      label={
                                        <span
                                          style={{
                                            display: "flex",
                                            gap: 15,
                                            fontSize: "14px",
                                            alignItems: "center",
                                          }}
                                        >
                                          {el["posicion"]}º -{" "}
                                          {capitalize(el["seleccionado"])}
                                          <SafetyDividerOutlinedIcon color="primary" />
                                          {el["jurado"] &&
                                            capitalize(el["jurado"])}
                                        </span>
                                      }
                                      onDelete={() =>
                                        handleDeleteSeleccionado(el)
                                      }
                                    />
                                  ) : (
                                    <Chip
                                      key={i}
                                      label={
                                        <span>
                                          {el["posicion"]}º -{" "}
                                          {capitalize(el["seleccionado"])}
                                        </span>
                                      }
                                      onDelete={() =>
                                        handleDeleteSeleccionado(el)
                                      }
                                    />
                                  )
                                )}
                              </Stack>
                            </ScrollContainer>
                          )}
                      </CardContent>
                    </Card>

                    {/* Sustanciado - Fecha de Sustanciado */}
                    <Card
                      variant="elevation"
                      elevation={2}
                      sx={{ maxWidth: 1000 }}
                    >
                      <CardContent>
                        <div id="asignaturaForm">
                          <div
                            style={{
                              border: "1px solid" + deepPurple[400],
                              borderRadius: 4,
                              padding: "15px",
                              margin: 0,
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                alignItems: "center",
                                justifyContent: "start",
                                gap: 30,
                                width: "100%",
                              }}
                            >
                              <span className="d-flex align-items-top gap-3">
                                <div
                                  className="col-md-6"
                                  style={{
                                    backgroundColor: deepPurple[50],
                                    padding: "7.5px 10px",
                                    borderRadius: 4,
                                    minWidth: 300,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "fit-content",
                                  }}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        sx={{
                                          color: deepPurple[800],
                                          "&.Mui-checked": {
                                            color: deepPurple[600],
                                          },
                                        }}
                                        onChange={() =>
                                          setMostrarFechaSustanciado(
                                            !mostrarFechaSustanciado
                                          )
                                        }
                                        checked={mostrarFechaSustanciado}
                                      />
                                    }
                                    label={"Sustanciado"}
                                  />
                                </div>
                                <FieldTooltip title="Corresponde a la fecha en que se archiva expediente del concurso." />
                              </span>
                              {/* Fecha de Sustanciado */}
                              {mostrarFechaSustanciado && (
                                <div className="col-md-6">
                                  <span className="d-flex align-items-top gap-3">
                                    <Controller
                                      name="fechaSustanciado"
                                      control={control}
                                      render={({
                                        field: { onChange, ...restField },
                                      }) => (
                                        <LocalizationProvider
                                          dateAdapter={AdapterDateFns}
                                        >
                                          <DesktopDatePicker
                                            sx={{ minWidth: 300 }}
                                            label="Fecha de Sustanciado"
                                            onChange={(event) => {
                                              onChange(event);
                                              setFechaSustanciado(event);
                                            }}
                                            value={fechaSustanciado || ""}
                                            {...restField}
                                          />
                                        </LocalizationProvider>
                                      )}
                                    />
                                    <FieldTooltip title="Corresponde a la fecha en la que se sustanció el concurso." />
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="row d-flex justify-content-between gap-3 mt-3">
                      <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 d-flex flex-column gap-3">
                        {/* Recusaciones  */}
                        <SimpleInput
                          label="Recusaciones"
                          tooltip="Corresponde completar cuado hay recusaciones o exusaciones de jurados"
                          error={Boolean(errors.recusaciones)}
                          register={register}
                          name="recusaciones"
                        />
                        {/* Fecha de Pase a Archivo */}
                        <span className="d-flex align-items-top gap-3">
                          <Controller
                            name="fechaPaseArchivo"
                            control={control}
                            render={({ field: { onChange, ...restField } }) => (
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DesktopDatePicker
                                  sx={{ minWidth: 300 }}
                                  label="Fecha de Pase a Archivo"
                                  onChange={(event) => {
                                    onChange(event);
                                    setFechaPaseArchivo(event);
                                  }}
                                  value={fechaPaseArchivo || ""}
                                  {...restField}
                                />
                              </LocalizationProvider>
                            )}
                          />
                          <FieldTooltip title="Corresponde a la fecha en que se archiva expediente del concurso." />
                        </span>
                      </div>

                      <div className="col-sm-12 col-md-6 col-lg-5 d-flex flex-column gap-3 mb-3">
                        {/* Fecha de Designación */}
                        <span className="d-flex align-items-top gap-3">
                          <Controller
                            name="fechaDesignacion"
                            control={control}
                            render={({ field: { onChange, ...restField } }) => (
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DesktopDatePicker
                                  sx={{ minWidth: 300 }}
                                  label="Fecha de Designación"
                                  onChange={(event) => {
                                    onChange(event);
                                    setFechaDesignacion(event);
                                  }}
                                  value={fechaDesignacion || ""}
                                  {...restField}
                                />
                              </LocalizationProvider>
                            )}
                          />
                          <FieldTooltip title="Corresponde a la fecha de la designación del docente." />
                        </span>

                        {/* Observaciones */}
                        <span className="d-flex align-items-top gap-3">
                          <TextareaAutosize
                            className="textArea"
                            placeholder="Observaciones"
                            {...register("observaciones")}
                            name="observaciones"
                            style={{
                              minWidth: 300,
                              borderRadius: 4,
                              borderColor: "#c4c4c4",
                              padding: 15,
                            }}
                            minRows={3}
                          />
                          <FieldTooltip title="Corresponde a otros datos que se consideren necesarios." />
                        </span>
                      </div>
                    </div>

                    {/* Designados*/}
                    <Card
                      variant="elevation"
                      elevation={2}
                      sx={{ maxWidth: 1000 }}
                    >
                      <CardContent>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 30,
                            border: "1px solid" + deepPurple[400],
                            borderRadius: 4,
                            padding: "30px 15px",
                          }}
                        >
                          <div className="row gap-3">
                            <span className="d-flex">
                              <div className="col-md-6">
                                <Controller
                                  control={control}
                                  name="designados"
                                  defaultValue={postulantesData[0]}
                                  render={({
                                    field: { ref, onChange, ...field },
                                  }) => (
                                    <Autocomplete
                                      disablePortal
                                      defaultValue={null}
                                      noOptionsText="Sin resultados"
                                      options={postulantesData}
                                      sx={{ width: 300 }}
                                      isOptionEqualToValue={(option, value) =>
                                        option.label === value.label
                                      }
                                      onChange={(_, data) =>
                                        data && onChange(data.label)
                                      }
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          {...field}
                                          inputRef={ref}
                                          variant="outlined"
                                          label="Designados"
                                        />
                                      )}
                                    />
                                  )}
                                />
                              </div>
                              <div className="col-md-4">
                                <div className="d-flex flex-column align-items-center">
                                  <small htmlFor="">Orden de mérito </small>
                                  <p>Nº {posicionDesignado}</p>
                                </div>
                              </div>
                            </span>
                            <div className="row">
                              <div className="col-md-4">
                                <Button
                                  sx={{
                                    whiteSpace: "nowrap",
                                  }}
                                  onClick={handleAgregarDesignado}
                                  variant="outlined"
                                  type="button"
                                >
                                  <Add /> Agregar Designado
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Designados agregados */}
                        {designadosAgregados &&
                          designadosAgregados.length > 0 && (
                            <ScrollContainer
                              style={{
                                marginTop: 15,
                                padding: "10px 0",
                                borderRadius: 4,
                                border: `1px solid ${deepPurple[600]} `,
                              }}
                              className="scroll-container"
                            >
                              <Stack
                                spacing={2}
                                direction="row"
                                style={{ padding: "0 10px" }}
                              >
                                {designadosAgregados.map((el, i) => (
                                  <Chip
                                    key={i}
                                    label={`${el["posicion"]}º - ${capitalize(
                                      el["designado"]
                                    )} `}
                                    onDelete={() => handleDeleteDesignado(el)}
                                  />
                                ))}
                              </Stack>
                            </ScrollContainer>
                          )}
                      </CardContent>
                    </Card>

                    {/* Finalizar formulario */}
                    {!isLoading ? (
                      <Button
                        startIcon={<Save />}
                        variant="outlined"
                        size="large"
                        onClick={handleSubmit(handleFinalizarFormulario)}
                      >
                        Finalizar formulario
                      </Button>
                    ) : (
                      <LoadingButton
                        loading={isLoading}
                        loadingPosition="start"
                        startIcon={<Save />}
                        variant="outlined"
                        size="large"
                        sx={{ backgroundColor: deepPurple[50] }}
                      >
                        guardando...
                      </LoadingButton>
                    )}
                  </Stack>
                </form>
              </CardContent>
            </Card>
          </div>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
