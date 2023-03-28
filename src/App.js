import { useState } from "react";
import "./App.css";

function App() {
  const [mostrarFechaSustanciado, setMostrarFechaSustanciado] = useState();

  return (
    <>
      <div className="wrapper">
        <header>
          <ul className="breadcrumb">
            <li className="breadcrumb-item">Inicio</li>
            <li> - </li>
            <li className="breadcrumb-item">Formularios</li>
            <li> - </li>
            <li className="breadcrumb-item">Nuevo Formulario</li>
          </ul>
        </header>

        <main>
          <aside>
            <ul className="aside-navigation">
              <li>Inicio</li>
              <li>Nuevo Formulario</li>
              <li>Ver Formularios</li>
              <li>Editar Formulario</li>
            </ul>
          </aside>

          <form action="" method="POST">
            <h1 className="my-5">Nuevo Formulario</h1>
            <div>
              <div className="col-md-12">
                <div className="labelInput">
                  <label for="fechaPublicacion"> Fecha de Publicación: </label>
                  <input type="date" placeholder="" name="fechaPublicacion" />
                </div>
                <div className="row">
                  <div className="col">
                    <div
                      className="labelInput"
                      style="position: relative; z-index: 100"
                    >
                      <label for="departamento"> Departamento: </label>
                      <div className="position-relative">
                        <input
                          type="text"
                          id="departamento"
                          name="departamento"
                          placeholder="Ej: Departamento De Letras"
                        />

                        <ul
                          id="results"
                          style="
                          display: none;
                          position: absolute;
                          bottom: -276;
                          border: 2px solid darkgray;
                          padding: 10px;
                          left: 0;
                          transition: 0.4s all;

                          background-color: #e0dfdf;
                          text-align: left;
                          border-radius: 8px;
                          width: 100%;
                          min-width: 45ch;
                        "
                        ></ul>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <div className="labelInput">
                      <label for="area"> Area: </label>
                      <input
                        type="text"
                        placeholder="Ej: Ciencias Sociales"
                        name="area"
                      />
                    </div>
                  </div>
                </div>

                <div className="labelInput">
                  <label for="asignaturas"> Asignatura: </label>
                  <span className="d-flex flex-column">
                    <input
                      type="text"
                      placeholder="Ej: Teoría y Critica Literarias I"
                      name="asignaturas"
                      style="width:22.5ch"
                    />
                    <span className="d-flex align-items-center mt-2">
                      <div
                        style=" background-color: lightgrey;
                  color: var(--text);"
                        className="badge d-flex my-2 gap-4 align-items-center justify-items-between"
                      >
                        Extensión de funciones docentes en otra asignatura
                        <input type="checkbox" name="conExtension" />
                      </div>
                      <button
                        type="button"
                        className="btn text-white btn-sm mx-5"
                        style="background-color: var(--red)"
                      >
                        <i className="fas fa-plus px-1"> </i>
                        Agregar Asignatura
                      </button>
                    </span>
                  </span>
                </div>

                <div
                  style="
                  text-align: start;
                  border: 1px solid lightgray;              
                "
                  className="d-flex flex-column my-3 p-2 rounded gap-3"
                >
                  <div className="labelInput">
                    <label for="asignaturas"> Asignatura: </label>
                    <input
                      type="text"
                      placeholder="Ej: Teoría y Critica Literarias I"
                      name="asignaturas"
                    />
                  </div>

                  <div className="d-flex align-items-center justify-content-start my-2">
                    <div
                      style="
                      background-color: lightgrey;
                      color: var(--text);
                      padding: 0 1em;
                    "
                      className="badge d-flex my-2 gap-4 align-items-center justify-items-between"
                    >
                      Extensión de funciones docentes en otra asignatura
                      <input type="checkbox" name="conExtension" />
                    </div>

                    <button
                      type="button"
                      className="btn text-white btn-sm mx-5"
                      style="background-color: var(--red)"
                    >
                      <i className="fas fa-plus px-1"> </i>
                      Agregar Asignatura
                    </button>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2 mb-4">
                  <div className="asignatura">
                    <span className="d-flex justify-content-between gap-2 align-items-center px-3">
                      <p
                        className="p-0 m-0"
                        style="
                        text-align: start;
                        font-size: 0.9em;
                        white-space: nowrap;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      >
                        TEORÍA Y METODOLOGÍA DE LA INVESTIGACIÓN
                      </p>
                      <span className="d-flex gap-4">
                        <div
                          style="background-color: var(--red)"
                          className="badge d-flex align-items-center"
                        >
                          con extensión de funciones
                        </div>
                        <i className="fas fa-trash-alt px-3"></i>
                      </span>
                    </span>
                  </div>

                  <div className="asignatura">
                    <span className="d-flex justify-content-between gap-4 align-items-center px-3">
                      <p
                        className="text-nowrap p-0 m-0"
                        style="
                        text-align: start;
                        font-size: 0.9em;
                        white-space: nowrap;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      >
                        TEORÍA Y CRITICA LITERARIAS I
                      </p>

                      <i className="fas fa-trash-alt px-3"></i>
                    </span>
                  </div>

                  <div className="asignatura">
                    <span className="d-flex justify-content-between gap-4 align-items-center px-3">
                      <p
                        className="text-nowrap p-0 m-0"
                        style="
                        font-size: 0.9em;
                        text-align: start;
                        white-space: nowrap;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      >
                        TEORÍA Y CRITICA LITERARIAS II
                      </p>
                      <span
                        className="badge d-flex align-items-center"
                        style="background-color: var(--red)"
                      >
                        con extensión de funciones
                      </span>
                      <span className="">
                        <i className="fas fa-trash-alt px-3"></i>
                      </span>
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="labelInput">
                      <label for="expedienteLlamado">
                        Expediente Llamado Nº:
                      </label>
                      <input
                        type="text"
                        placeholder="Ej: 7-0756/16"
                        name="expedienteLlamado"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="labelInput">
                      <label for="nup"> NUP: </label>
                      <input type="text" placeholder="Ej: 1847/17" name="nup" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="labelInput">
                      <label for="cantidadCargos"> Cantidad de cargos: </label>
                      <input
                        type="number"
                        placeholder=""
                        name="cantidadCargos"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="labelInput">
                      <label for="cargo"> Cargo: </label>
                      <input type="text" placeholder="" name="cargo" />
                    </div>
                  </div>
                </div>

                <div className="labelInput">
                  <label for="investigacion"> Investigación: </label>
                  <textarea
                    rows="3"
                    cols="75"
                    placeholder=""
                    name="investigacion"
                  ></textarea>
                </div>

                <div className="labelInput">
                  <label for="dedicacion"> Dedicación: </label>
                  <input type="text" placeholder="" name="dedicacion" />
                </div>

                <div className="labelInput">
                  <label for="ordenPrelacion"> Orden de Prelación: </label>
                  <input
                    type="number"
                    placeholder="Ej: 1668"
                    name="ordenPrelacion"
                  />
                </div>

                <div className="row">
                  <div className="col">
                    <div className="labelInput">
                      <label for="oca"> Oca Nº: </label>
                      <input type="text" placeholder="Ej: 5041/17" name="oca" />
                    </div>
                  </div>
                  <div className="col">
                    <div className="labelInput">
                      <label for="OcaDesignacion"> OCA Designacion Nº: </label>
                      <input type="text" placeholder="Ej: 544/18" name="" />
                    </div>
                  </div>
                </div>

                <div className="labelInput">
                  <label for="fechaCierre"> Fecha de Cierre: </label>
                  <input type="date" placeholder="" name="fechaCierre" />
                </div>

                <div className="labelInput">
                  <label for="recusaciones"> Recusaciones: </label>
                  <input type="text" placeholder="" name="recusaciones" />
                </div>

                <div className="labelInput">
                  <label for="expedienteConcurso">
                    Expediente de Concurso Nº:
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: 7-2183/18"
                    name="expedienteConcurso"
                  />
                </div>
              </div>

              <div className="col-md-0">
                <div className="labelInput">
                  <label for="interino"> Interino: </label>
                  <input type="text" placeholder="" name="interino" />
                </div>

                <div className="checkboxRow">
                  <div className="labelInput">
                    <label for="departamento"> Postulantes: </label>
                    <div className="" style="display: flex; gap: 40px">
                      <input type="text" placeholder="" name="" />

                      <button
                        type="button"
                        className="btn text-white btn-sm mx-5"
                        style="background-color: var(--red)"
                      >
                        <i className="fas fa-plus px-1"> </i>
                        Agregar Postulante
                      </button>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2 mb-4">
                  <div className="asignatura">
                    <span className="d-flex justify-content-between gap-2 align-items-center px-3">
                      <p
                        className="p-0 m-0"
                        style="
                        text-align: start;
                        font-size: 0.9em;
                        white-space: nowrap;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      >
                        Silvana Gabriela Ferreyra
                      </p>

                      <i className="fas fa-trash-alt px-3"></i>
                    </span>
                  </div>

                  <div className="asignatura">
                    <span className="d-flex justify-content-between gap-4 align-items-center px-3">
                      <p
                        className="text-nowrap p-0 m-0"
                        style="
                        text-align: start;
                        font-size: 0.9em;
                        white-space: nowrap;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      >
                        Salas Oroño
                      </p>

                      <i className="fas fa-trash-alt px-3"></i>
                    </span>
                  </div>
                </div>

                <div className="labelInput">
                  <label for="seleccionados"> Seleccionados: </label>
                  <div className="" style="display: flex; gap: 40px">
                    <input type="text" placeholder="" name="seleccionados" />

                    <button
                      type="button"
                      className="btn text-white btn-sm mx-5"
                      style="background-color: var(--red)"
                    >
                      <i className="fas fa-plus px-1"> </i>
                      Agregar Seleccionado
                    </button>
                  </div>
                </div>
                <div className="d-flex flex-column gap-2 mb-4">
                  <div className="asignatura">
                    <span className="d-flex justify-content-between gap-4 align-items-center px-3">
                      <p
                        className="text-nowrap p-0 m-0"
                        style="
                        text-align: start;
                        font-size: 0.9em;
                        white-space: nowrap;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      >
                        Salas Oroño
                      </p>

                      <i className="fas fa-trash-alt px-3"></i>
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="labelInput">
                      <label for="sustanciado"> Sustanciado: </label>

                      <div
                        style="
                      background-color: lightgrey;
                      color: var(--text);
                      padding: 0 1em;
                      font-size: 15px;
                    "
                        className="badge d-flex my-2 gap-4 align-items-center justify-items-between"
                      >
                        SI
                        <input
                          type="checkbox"
                          name="sustanciado"
                          id="checkSustanciado"
                          value="si"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col text-start">
                    <div
                      className="labelInput py-4 "
                      id="boxFechaSustanciado"
                      style="display: none"
                    >
                      <label for="fechaSustanciado">
                        Fecha de sustanciación:
                      </label>
                      <input
                        type="date"
                        placeholder=""
                        name="fechaSustanciado"
                      />
                    </div>
                  </div>
                </div>

                <div className="labelInput">
                  <label for="comisionAsesora"> Comisión Asesora: </label>
                  <div className="" style="display: flex; gap: 40px">
                    <input type="text" placeholder="" name="" />
                    <button
                      type="button"
                      className="btn text-white btn-sm mx-5"
                      style="background-color: var(--red)"
                    >
                      <i className="fas fa-plus px-1"> </i>
                      Agregar Jurado
                    </button>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2 mb-4">
                  <div className="asignatura">
                    <span className="d-flex justify-content-between gap-4 align-items-center px-3">
                      <p
                        className="text-nowrap p-0 m-0"
                        style="
                        text-align: start;
                        font-size: 0.9em;
                        white-space: nowrap;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      >
                        Salvio Martin MENENDEZ
                      </p>

                      <i className="fas fa-trash-alt px-3"></i>
                    </span>
                  </div>
                  <div className="asignatura">
                    <span className="d-flex justify-content-between gap-4 align-items-center px-3">
                      <p
                        className="text-nowrap p-0 m-0"
                        style="
                        text-align: start;
                        font-size: 0.9em;
                        white-space: nowrap;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      >
                        Andrea Cecilia MENEGOTTO
                      </p>

                      <i className="fas fa-trash-alt px-3"></i>
                    </span>
                  </div>
                  <div className="asignatura">
                    <span className="d-flex justify-content-between gap-4 align-items-center px-3">
                      <p
                        className="text-nowrap p-0 m-0"
                        style="
                        text-align: start;
                        font-size: 0.9em;
                        white-space: nowrap;
                        width: 100%;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                      >
                        Graciela ALVAREZ
                      </p>

                      <i className="fas fa-trash-alt px-3"></i>
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="labelInput">
                      <label for="fechaDesignacion">
                        Fecha de designación:
                      </label>
                      <input
                        type="date"
                        placeholder=""
                        name="fechaDesignacion"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="labelInput">
                      <label for="fechaPaseArchivo">
                        Fecha de pase a Archivo:
                      </label>
                      <input
                        type="date"
                        placeholder=""
                        name="fechaPaseArchivo"
                      />
                    </div>
                  </div>
                </div>

                <div className="labelInput">
                  <label for="observaciones"> Observaciones: </label>
                  <textarea
                    rows="3"
                    cols="75"
                    placeholder=""
                    name="observaciones"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                style="margin-bottom: 50px; margin-top: 30px"
              >
                Finalizar Formulario
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default App;
