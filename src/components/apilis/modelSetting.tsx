import { Box, Button, Grid, InputLabel, MenuItem, Paper, Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import React from "react";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { getAgreementsAllApi, getRefererApi, getHeadquartersAllApi, deleteMatchDataDetailApi, deleteMatchDataApi, getModelsApi, getModelApi, getAppointmentsApi, reportExamMonthly } from "../../api";
import { Link, useParams  } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Contenido } from "../Home";
import moment from 'moment';
import Swal from 'sweetalert2';

export default function ModelSetting() {
    const { idmodelo, id } = useParams();
    const [rows2, setRows2] = React.useState<any[]>([]);
    const [rows3, setRows3] = React.useState<any[]>([]);
    const [rowsExamenes, setRowsExamenes] = React.useState<any[]>([]);
    const [examodel, setExamModel] = React.useState<any[]>([]);
    const [codbaja, setCodBaja] = React.useState<any>("");

    React.useEffect(() => {
        getAppointmentsApi(0, 1000, "E", "").then((ag: any) => {
            let mapeado: any = []
            let mapeado2: any = []
            ag.data?.forEach((d: any) => {
              mapeado.push({
                id: d.id,
                codigo: d.code,
                fecha: d.dateAppointmentEU,
                fechaCreada:moment(d.createdAt).format('YYYY-MM-DD'),
                fechaFiltro:d.dateAppointment,
                hora: d.time12h,
                codigoRef: d.Referer.id,
                referencia: d.Referer.name,
                tipoDocumento: d.client.dni,
                pac2:d.client.name,
                apP:d.client.lastNameP,
                apM:d.client.lastNameM,
                paciente: d.client.lastNameP + " " + d.client.lastNameM + "," + d.client.name,
                precio: d.totalPrice == null ? "" : "S/. " + d.totalPrice,
                descuento: d.discount == null ? "" : "S/. " + d.discount,
                precioFinal: d.finalPrice == null ? "" : "S/. " + d.finalPrice,
    
                nombreCompleto: d.client.name + " " + d.client.lastNameP + " " + d.client.lastNameM,
                edad: d.client.years + " años",
                dni: d.client.dni,
                idclient: d.client.id,
                sexo: d.client.genderStr,
                medico: d.Doctor.name,
                sede: d.headquarter.name,
                sedecode: d.HeadquarterId,

                citaprice:d.totalPrice,
                citadescuento:d.discount,
                citafinalprice:d.finalPrice,
                referercode:d.refererCode,
                doctornotes:d.doctorNotes,
                tlfclient:d.client.tlfNumber,
                phoneclient:d.client.phoneNumber,
                birthclient:d.client.birthDate,
                direcclient:d.client.address,
                nationality:d.client.nationality,
                distrito:d.District.name,
                provincia:d.Provinces.name,
                departamento:d.Region.name,
                convenio:d.Convenio.name,
                examen1: d.Exam.exam.length == 0 ? [0] : d.Exam.exam,
              })
              
            setRows3(mapeado2)
            setRowsExamenes(mapeado)
            
           });
          });

          getModelsApi(ruta).then((x: any) => {
            setRows2(x.data)
            setExamModel(x.data.modelos)

            x.data.modelos.forEach((d: any) => {
              setCodBaja(d.status)
            
            });
          })



    }, [])

    const ruta = idmodelo;
    console.log(codbaja)
    console.log(rows2)
    console.log(examodel)

    const BorrExamModel=()=>{
      Swal.fire({
          title: 'El examen fue eliminado del modelo correctamente!!!',
          icon: 'success',
        })
    }

    let aux = examodel
    const handleDelete = async (id2: any, nombre: any, id3: any) => {
      console.log(id2);
      var DeleteExamModel=()=>{
      Swal
      .fire({
          title: "Desea eliminar el examen "+nombre+" dentro del modelo?",
          showCancelButton: true,
          cancelButtonColor: '#0C3DA7',
          confirmButtonColor: '#FB0909',
          confirmButtonText: "Sí",
          cancelButtonText: "No",
      })
      .then(resultado => {
          if (resultado.value) {
              // Hicieron click en "Sí"
              try {
                setExamModel([])
                //await sleep(50)
                 
                setExamModel(aux)
  
                deleteMatchDataApi(id2).then((x: any) => {
                  
                  //setId(x.data.name)
                });
                
                deleteMatchDataDetailApi(id3).then((x: any) => {
                  
                  //setId(x.data.name)
                });

                setExamModel(aux.filter((row: any) => row.idex !== id2));
          
              } catch(error) {
                 console.error(error)
                 
              }
              //window.location.href = "/apps/apilis/configure/modelo/"+ idmodelo +"/marca/"+ id+"/setting"
              BorrExamModel();
          } else {
              // Dijeron que no
              console.log("*NO se elimina el convenio");
          }
      });
    }
     
    DeleteExamModel()
  
    };





    const fechatotal=()=>{
        Swal.fire({
            title: 'Por favor, ingrese un filtro',
            icon: 'warning',
          })
    }

    const otrosfilt=()=>{
        Swal.fire({
            title: 'Por favor, ingrese uno de los filtros',
            icon: 'warning',
          })
    }

    const fechainitial=()=>{
        Swal.fire({
            title: 'Ingrese la fecha inicial por favor',
            icon: 'warning',
          })
    }

    let componente: any;
    const modelito = [rows2]
    return (
        <div className='tabla-componente card-table-examfinish'>
        <Contenido>
                <Grid container xs={200} sx={{mb: 50}}>
                    <Grid item xs={300} sx={{ placeContent: "center" }}>
                      <div style={{ borderRadius: '5px', width: "950px", maxWidth: "100%" }}>
                      <div style={{ marginInline: "50px", marginBlock: "1px"}}>
                      <div style={{ display: "flex", width: "1150px" }} className="nav-tabla">
                        <Grid item xs={50}>
                        {modelito.map((row: any, index: any) => {
                        return (  
                        <Link to={`/apps/apilis/configure/marca/${id}/modelos`}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                            <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.6rem", cursor: "pointer"}} >APILIS/ CONFIGURACION / MARCA / MODELO {row.nameModel} / SETTINGS DATA</InputLabel >
                            </div>
                        </Link>
                        )
                        })}
                        <br></br>
                            
        
                        </Grid>
                      </div>

                        <br></br>
                        <br></br>
                        <br></br>
                        <Grid xs={1000} mt={1} sx={{ placeContent: "center" }}>

                        <Grid container sx={{ placeContent: "center" }} xs={1000} mt={1} className='contenedor-tabla-apilis'>
                        {examodel.map((row: any, index: any) => {
                        return (                                       
                        <MenuItem>
                        <Box
                            className="card-container"
                            sx={{
                              width: 200,
                              height: 200,
                              backgroundColor: row.color,
                              boxShadow: '0px 0px 15px -5px',
                              transition: '0.3s',
                              animation:'ease-in',
                              overflow: 'hidden',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                          <Link to={`/apps/apilis/configure/modelo/${idmodelo}/marca/${id}/setting/exam/${row.ide}/edit`}>  
                          <Grid container item xs={15} sx={{ placeContent: "center" }} style = {{fontWeight: "bold", fontSize: "1.1rem"}}>
                            <br></br>
                            {row.nameex}
                          </Grid>
                          </Link>
                          <br></br>
                          <br></br>
                          <br></br>
                          <DeleteIcon onClick={() => handleDelete(row.idex, row.nameex, row.idmatch)}  style={{ color: "white", fontSize: "2.5rem", cursor: "pointer" }}></DeleteIcon>
                          </Box>
                        </MenuItem>
                       
                          )
                         })}
                        <Link to={`/apps/apilis/configure/modelo/${idmodelo}/marca/${id}/setting/new`}>
                        <MenuItem>
                        <Box
                            className="card-container"
                            sx={{
                            width: 150,
                            height: 150,
                            backgroundColor: 'primary.dark',
                            boxShadow: '0px 0px 15px -5px',
                            transition: '0.3s',
                            animation:'ease-in',
                            }}
                          >
                          <Grid container item xs={15} sx={{ placeContent: "center" }} style = {{fontWeight: "bold", fontSize: "1.2rem"}}>
                            <AddCircleOutlineIcon style={{ color: "white", fontSize: "10.5rem", cursor: "pointer" }}></AddCircleOutlineIcon>
                          </Grid>
                          </Box>
                        </MenuItem>
                        </Link>
                        </Grid>


                        </Grid>

    
                        <Grid>
                        
                        </Grid>
                        
                    


                        </div>
                       </div>
                    </Grid>
                </Grid>
            <br></br>
            <div>
            
            </div>

        </Contenido>
    </div>
    );
}


