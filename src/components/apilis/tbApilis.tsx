import { Box, Button, Grid, InputLabel, MenuItem, Paper, Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import React from "react";
import ReactToPrint from "react-to-print";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { getAgreementsAllApi, getRefererApi, getMonitorAllApi, getHeadquartersAllApi, getAppointmentsApi, reportExamMonthly } from "../../api";
import { Link } from 'react-router-dom';
import BackupRoundedIcon from '@mui/icons-material/BackupRounded';
import LocalPrintshopRoundedIcon from '@mui/icons-material/LocalPrintshopRounded';
import TablePagination from '@mui/material/TablePagination';
import MediationIcon from '@mui/icons-material/Mediation';
import { Contenido } from "../Home";
import moment from 'moment';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';

export default function TbApilis() {
    type Order = 'asc' | 'desc';
    const ExcelJS = require("exceljs");
    const [rowstotal, setVSumTotal] = React.useState(0);
    const [rows, setRows] = React.useState<any[]>([]);
    const [rows2, setRows2] = React.useState<any[]>([]);
    const [rows3, setRows3] = React.useState<any[]>([]);
    const [monitor, setMonitor] = React.useState<any[]>([]);

    const [fecha, setFecha] = React.useState<any>("");
    const [fechaCreacion, setFechaCreacion] = React.useState<any>('');
    const [bloqueaboton, setBloquearBoton] = React.useState<any>(true);

    const [filtros, setFiltros] = React.useState<any>('');
    const [filtros2, setFiltros2] = React.useState<any>('');
    const [textfiltro, setTextFiltro] = React.useState<any>('');
    const [textfiltro2, setTextFiltro2] = React.useState<any>('');
    const [nuevatabla, setNuevaTabla] = React.useState<any>(false);
    const [dia, setDia] = React.useState<any>('');
    const [mes, setMes] = React.useState<any>('');
    const [anio, setAnio] = React.useState<any>('');
    const [convenioList, setConvenioList] = React.useState<any[]>([]);
    const [convenio, setConvenio] = React.useState<any>('');
    const [sedeList, setSedeList] = React.useState<any[]>([]);
    const [referenciaList, setReferenciaList] = React.useState<any[]>([]);
    const [sede, setSede] = React.useState<any>('');
    const [docTitle, setDocTitle] = React.useState<any>("");
    const [rowsExamenes, setRowsExamenes] = React.useState<any[]>([]);

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>("");
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);


    const style2 = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'white',
        border: '1px solid #white',
        borderRadius: "15px",
        boxShadow: 24,
        p: 4,
    };

    const handleCloseNuevaTabla = () => {
        setNuevaTabla(false);
      }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
        const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
        stabilizedThis.sort((a, b) => {
          const order = comparator(a[0], b[0]);
          if (order !== 0) {
            return order;
          }
          return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
      }


    function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
      }

    function getComparator<Key extends keyof any>(
        order: Order,
        orderBy: Key,
      ): (
          a: { [key in Key]: number | string },
          b: { [key in Key]: number | string },
        ) => number {
        return order === 'desc'
          ? (a, b) => descendingComparator(a, b, orderBy)
          : (a, b) => -descendingComparator(a, b, orderBy);
      }


    React.useEffect(() => {
        getHeadquartersAllApi().then((ag: any) => {
            setSedeList(ag.data);
        });
        getMonitorAllApi().then((ag: any) => {
          let mapeado: any = []
          ag.data.forEach((d: any) => {
            mapeado.push({
              namecli: d.nameclie,
              clilastnamep: d.clilastnamep,
              clilastnamem: d.clilastnamem,
              nameex:d.nameex,
              idmonitor: d.idmonitor,
              fechaprocess:moment(d.fechaprocess).format('YYYY-MM-DD'),
              field01: d.status,
              codeapi: d.codeapi,
              val01:d.val01,
              val02:d.val02,
              val03:d.val03,
              val04:d.val04,
              val05:d.val05,
              val06:d.val06,
              val07:d.val07,
              val08:d.val08,
              val09:d.val09,
              val10:d.val10,
              val11:d.val11,
              val12:d.val12,
              val13:d.val13,
              val14:d.val14,
              val15:d.val15,
              val16:d.val16,
              val17:d.val17,
              val18:d.val18,
              val19:d.val19,
              val20:d.val20,
              val21:d.val21,
              val22:d.val22,
              val23:d.val23,
              val24:d.val24,
              val25:d.val25,
              val26:d.val26,
              val27:d.val27,
              val28:d.val28,
              val29:d.val29,
              val30:d.val30,
              val31:d.val31,
              val32:d.val32,
              val33:d.val33,
              val34:d.val34,
              val35:d.val35,
              val36:d.val36,
              val37:d.val37,
              val38:d.val38,
              val39:d.val39,
              val40:d.vale40
              ,
            })
          });
            setMonitor(mapeado)
        });
        getRefererApi().then((ag: any) => {
            setReferenciaList(ag.data);
        });
        getAgreementsAllApi().then((ag: any) => {
            setConvenioList(ag.data);
        });
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
            setRows2(mapeado)
            
           });
          });

    }, [])

   

    console.log(monitor)

   

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

    const fechasecond=()=>{
        Swal.fire({
            title: 'Ingrese la fecha secundaria por favor',
            icon: 'warning',
          })
    }

    const datetotal=()=>{
      Swal.fire({
          title: 'Ingresa las dos fechas',
          icon: 'warning',
        })
  }

    const busca = monitor.filter(
      (n: any) => ( n.fechaprocess <= fecha && n.fechaprocess >= fechaCreacion)
    )  

    const filt = () => {
      if (fechaCreacion  == "") {
        fechainitial()
      }
      if (fecha == "") {
        fechasecond()
      }
      if (fechaCreacion == "" && fecha == "") {
        datetotal()
      }
      if(fecha != "" && fechaCreacion!= ""){
        setMonitor(busca);
      }
    }

    const clean = () => {
      getMonitorAllApi().then((ag: any) => {
        let mapeado: any = []
        ag.data.forEach((d: any) => {
          mapeado.push({
            namecli: d.nameclie,
            clilastnamep: d.clilastnamep,
            clilastnamem: d.clilastnamem,
            nameex:d.nameex,
            idmonitor: d.idmonitor,
            fechaprocess:moment(d.fechaprocess).format('YYYY-MM-DD'),
            field01: d.status,
            codeapi: d.codeapi,
            val01:d.val01,
            val02:d.val02,
            val03:d.val03,
            val04:d.val04,
            val05:d.val05,
            val06:d.val06,
            val07:d.val07,
            val08:d.val08,
            val09:d.val09,
            val10:d.val10,
            val11:d.val11,
            val12:d.val12,
            val13:d.val13,
            val14:d.val14,
            val15:d.val15,
            val16:d.val16,
            val17:d.val17,
            val18:d.val18,
            val19:d.val19,
            val20:d.val20,
            val21:d.val21,
            val22:d.val22,
            val23:d.val23,
            val24:d.val24,
            val25:d.val25,
            val26:d.val26,
            val27:d.val27,
            val28:d.val28,
            val29:d.val29,
            val30:d.val30,
            val31:d.val31,
            val32:d.val32,
            val33:d.val33,
            val34:d.val34,
            val35:d.val35,
            val36:d.val36,
            val37:d.val37,
            val38:d.val38,
            val39:d.val39,
            val40:d.vale40
            ,
          })
        });
          setMonitor(mapeado)
      });
      setFecha("");
      setFechaCreacion("");
    }
    console.log(rowstotal)

    
    const handleChangeFechaCreacion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFechaCreacion(event.target.value);
    };
    const handleChangFecha = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFecha(event.target.value);
    };
    const handleFiltros = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltros(event.target.value);
    };

    

    const handleFiltros2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltros2(event.target.value);
    };

    const handleTextFiltros = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextFiltro(event.target.value);
    };

    const handleTextFiltros2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextFiltro2(event.target.value);
    };

    let componente: any;


    return (
        <div className='tabla-componente card-table-examfinish'>
        <Contenido>
                <Grid container xs={200}>
                    <Grid item xs={300}>
                      <div style={{ borderRadius: '5px', width: "950px", maxWidth: "100%" }}>
                      <div style={{ marginInline: "50px", marginBlock: "1px"}}>
                      <div style={{ width: "1150px" }} className="nav-tabla">
                        <Grid item xs={4}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                                <MediationIcon style={{ color: "white", fontSize: "35px" }}></MediationIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.6rem"}} >APILIS</InputLabel >
                            </div>
                        </Grid>
                      </div>

                        <Grid container item className='contenedor-tabla-apilis'>
                        <Grid xs={5.3} mt={1}>
                        <Grid container item xs={1} mt={1}></Grid>
                        <Grid container item xs={30} mt={1} className='contenedor-tabla-apilis'>

                        <Grid container item xs={1.5} mt={1}>                          
                           
                        </Grid>



                        <Grid container item xs={4.5} mt={1}>                          
                           <Grid container item xs={15}>                          
                            <TextField InputProps={{
                                style: {
                                    backgroundColor: "white",
                                    color: "black",
                                    cursor: "pointer",
                                    borderStyle: "revert",
                                    borderColor: "#039be5",
                                    borderWidth: "0.1px",
                                    maxWidth: "520px"
                                },     
                            }} type="date" value={fechaCreacion} onChange={handleChangeFechaCreacion}focused id="outlined-basic" variant="outlined" /> 
                           </Grid>
                        </Grid>

                       
                        <Grid container item xs={4.5} mt={1}>                          
                           <Grid container item xs={15}>                          
                           <TextField InputProps={{
                                style: {
                                    backgroundColor: "white",
                                    color: "black",
                                    cursor: "pointer",
                                    borderStyle: "revert",
                                    borderColor: "#039be5",
                                    borderWidth: "0.1px",
                                    maxWidth: "520px"
                                },     
                            }} type="date" value={fecha} onChange={handleChangFecha} focused id="outlined-basic"  variant="outlined" />      
                           </Grid>
                        </Grid>

                        
                        
                        </Grid>


                        </Grid>

    
                        <Grid>
                        <Grid container item className='contenedor-tabla-apilis contenedor-tabla-apilis2'>

                        <Grid item xs={4} mt={0.1}>
                                <Tooltip title="Limpiar" followCursor>
                                    <Button onClick={clean} fullWidth variant="contained" style={{ width: '15.5ch', height: '3.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.10rem" }}>
                                      Limpiar
                                    </Button>
                                </Tooltip>
                        </Grid>

                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        
                        <Grid item xs={4} mt={0.1}>
                                <Grid item xs={6} >
                                <Link to={'/apps/apilis/configure'}>
                                    <Tooltip title="Configurar" followCursor>
                                       <Button  variant="contained"  style={{ width: '15.5ch', height: '3.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.10rem" }}>Configurar</Button> 
                                    </Tooltip>
                                </Link>
                                 </Grid>
                                
                        </Grid>

                        </Grid>
                        
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                     
                       
                        
                        <Grid container item>

                        <Grid item xs={5} mt={0.1}>
                                <Tooltip title="Buscar" followCursor>
                                    <Button onClick={filt} fullWidth variant="contained" style={{ width: '15.5ch', height: '3.4ch', backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1.10rem" }}>
                                      Buscar
                                    </Button>
                                </Tooltip>
                        </Grid>

                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        <Grid item xs={0.5} mt={2.5}></Grid>
                        
                        </Grid>


                        </Grid>
                        </Grid>
                    


                        </div>
                       </div>
                    </Grid>
                </Grid>
            <br></br>
            <div>
            <Grid container>
            <Box sx={{ width: '100%' }} className="card-table-examfinish contenedor-tabla-apilis1">
                <Paper sx={{ width: '100%', borderRadius: "12px", overflowY: "scroll", maxHeight: "30000px", maxWidth: "1500px", mb: 50}} className="contenedor-tabla-apilis1  card-table-general" >
                                    <TableContainer id={"sheetjs"} sx={{width: '100%'}}>
                                        <Table sx={{ width: '100%'}}
                                            aria-labelledby="tableTitle"
                                            size={'medium'}>
                                            <TableHead style={{backgroundColor: "rgb(244 241 241)"}}>
                                                <TableRow>
                                                    <TableCell sx={{minWidth: 50}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Codigo
                                                    </TableCell>
                                                    <TableCell sx={{minWidth: 50}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Cod.Apilis
                                                    </TableCell>
                                                    <TableCell sx={{minWidth: 70}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Paciente
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 150}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Examen
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 122}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Fecha Proceso
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Estado
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 01
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 02
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 03
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 04
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 05
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 06
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 07
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 08
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 09
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 10
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 11
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 12
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 13
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 14
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 15
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 16
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 17
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 18
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 19
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 20
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 21
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 22
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 23
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 24
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 25
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 26
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 27
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 28
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 29
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 30
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 31
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 32
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 33
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 34
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 35
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 36
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 37
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 38
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 39
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 190}}
                                                        align="center"
                                                        style={{ color: "grey", fontFamily: "Quicksand", fontWeight: "bold", fontSize: "1.1rem" }}>
                                                        Valor 40
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                               {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                                                  rows.slice().sort(getComparator(order, orderBy)) */}
                                               {stableSort(monitor, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                 .map((row: any, index: any) => {
                                                   const labelId = `enhanced-table-checkbox-${index}`;
                                                  return (
                                                    <TableRow
                                                      hover
                                                      tabIndex={-1}
                                                      key={index}
                                                    >
                                                        <TableCell
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        > 
                                                          {row.idmonitor}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                          {row.codeapi}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                          {row.namecli}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.nameex}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.fechaprocess}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{
                                                            backgroundColor: row.field01 === 'A' ? 'lightgreen' : 'transparent',  // Cambia el color de fondo dependiendo del estado
                                                            color: "black", 
                                                            fontFamily: "Quicksand", 
                                                            fontWeight: "400", 
                                                            fontSize: "1.1rem" ,
                                                            cursor: "pointer"
                                                          }}
                                                          title={row.codeapi ? "Todo salio bien":"Error"}
                                                        >
                                                             {row.field01 === 'A' ? 'Procesado' : row.field01 === 'error' ? 'Error' : row.field01}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val01}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val02}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val03}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val04}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val05}
                                                        </TableCell>

                                                        <TableCell
                                                         align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val06}
                                                        </TableCell>

                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val07}
                                                        </TableCell>

                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val08}
                                                        </TableCell>

                                                        <TableCell
                                                          align="center" 
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val09}
                                                        </TableCell>

                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val10}
                                                        </TableCell>

                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val11}
                                                        </TableCell>

                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val12}
                                                        </TableCell>

                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val13}
                                                        </TableCell>

                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val14}
                                                        </TableCell>

                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val15}
                                                        </TableCell>

                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val16}
                                                        </TableCell>

                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val17}
                                                        </TableCell>

                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val18}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val19}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val20}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val21}
                                                        </TableCell>
                                                        <TableCell
                                                         align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val22}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val23}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val24}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val25}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val26}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val27}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val28}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val29}
                                                        </TableCell>
                                                        <TableCell
                                                           align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val30}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val31}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val32}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val33}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val34}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val35}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val36}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val37}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val38}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val39}
                                                        </TableCell>
                                                        <TableCell
                                                          align="center"
                                                          style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                        {row.val40}
                                                        </TableCell>

                      
                                                    </TableRow>
                                                );
                                            })}
                                            {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                   height: (53) * emptyRows,
                                                }}
                                            >
                                            <TableCell colSpan={6} />
                                            </TableRow>

                                            )}
                                            {
                                              monitor.length == 0 ? <TableRow >
                                            <TableCell colSpan={8} >
                                              No tiene Procesos
                                            </TableCell>
                                            </TableRow> : ""
                                            }
                               </TableBody>
                                        
                            </Table>
                         </TableContainer>
                    <TablePagination
                       rowsPerPageOptions={[20, 100, 200]}
                       component="div"
                       count={monitor.length}
                       rowsPerPage={rowsPerPage}
                       page={page}
                       labelRowsPerPage={"Filas por Pagina: "}
                       labelDisplayedRows={
                       ({ from, to, count }) => {
                       return '' + from + '-' + to + ' de ' + count
                       }
                    }
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper >


                <div>
                  <Modal
                    keepMounted
                    open={nuevatabla}
                    onClose={handleCloseNuevaTabla}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                   >
                        <Box sx={style2}>
                        <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.5rem" }} >Filtro por fecha</InputLabel >
                        <Grid container >
                        <Box sx={{ width: '100%' }}>
                            <Grid container mt={2.5} sx={{ placeContent: "center" }}>
                                <InputLabel style={{ color: "black", fontFamily: "Quicksand", fontWeight: "600", fontSize: "1.8rem" }} >REPORTE DE EXAMENES REALIZADOS - RedLab Perú</InputLabel >
                            </Grid>
                            <Grid container mt={2.5}>
                                <Grid item xs={0.5} mt={2.5}></Grid>
                                <Grid item xs={11} mt={2.5}>
                                    <TableContainer id={"sheetjs2"}>
                                        <Table sx={{ minWidth: 750}}
                                            aria-labelledby="tableTitle"
                                            size={'medium'}>
                                            <TableHead>
                                                <TableRow>
                                                <TableCell 
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        CODIGO CITA
                                                    </TableCell>
                                                    <TableCell 
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        FECHA CITA
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        SEDE
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 200 }}
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1rem" }}>
                                                        CONVENIO
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        DOCTOR
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        APELLIDO PATERNO PACIENTE
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        APELLIDO MATERNO PACIENTE
                                                    </TableCell>
                                                    <TableCell
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        NOMBRES PACIENTE
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        CODIGO PACIENTE
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ minWidth: 200 }}
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        NRO_DOCUMENTO
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        GENERO
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        EDAD
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ minWidth: 200 }}
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        NACIONALIDAD
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        PRECIO
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        DESCUENTO
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        PRECIO FINAL
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        CODIGO REFERIDO
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ minWidth: 250 }}
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        NOTAS DOCTOR
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        TELEFONO
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        CELULAR
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        FECHA NACIMIENTO
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 200 }}
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        DISTRITO
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 200 }}
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        PROVINCIA
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{ minWidth: 200 }}
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        DEPARTAMENTO
                                                    </TableCell>
                                                    <TableCell
                                                        align="center"
                                                        style={{ color: "black", fontFamily: "Quicksand", fontWeight: "500", fontSize: "1.1rem" }}>
                                                        DIRECCION
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody >
                                                {rows.map((row: any, index: any) =>
                                                    <TableRow
                                                        key={index}
                                                    >
                                                        <TableCell
                                                            align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.codigo}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.codeApi}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.codeApi}
                                                        </TableCell>
                                                        <TableCell sx={{ minWidth: 200 }} align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.convenio}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.medico}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.apP}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.apM}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.pac2}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.idclient}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.dni}
                                                        </TableCell>
                                                        
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.sexo}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.edad}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.nationality}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.citaprice}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.citadescuento}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.citafinalprice}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.referercode}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.doctornotes}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.tlfclient}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.phoneclient}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.birthclient}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.distrito}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.provincia}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.departamento}
                                                        </TableCell>
                                                        <TableCell align="center" component="th" scope="row"
                                                            style={{ color: "black", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.1rem" }}
                                                        >
                                                            {row.direcclient}
                                                        </TableCell>

                                                    </TableRow>
                                                )}
                                            </TableBody>
                                            
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={0.5} mt={2.5}></Grid>
                                <Grid container item xs mt={2.5}>
                               <Grid item xs={8} ></Grid>
                            <Grid container item xs={4} spacing={2}>
                              <Grid item xs={20} >
                                <Button onClick={handleCloseNuevaTabla} variant="contained" style={{ backgroundColor: "rgb(0 85 169)", color: "white", fontFamily: "Quicksand", fontWeight: "900", fontSize: "1rem" }}>Cancelar</Button>
                            </Grid>
                
              </Grid>
            </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                        </Box>
                    </Modal>
                </div>


























               
            </Box >
        </Grid>
            </div>

        </Contenido>
    </div>
    );
}


