import { Box, Button, Grid, InputLabel, MenuItem, Paper, Table, Modal, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from "@mui/material";
import React from "react";
import ReactToPrint from "react-to-print";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { getAgreementsAllApi, getRefererApi, getNationAllApi, editDetailApi2 , getMatchEditValueExamApi,  getExaminationApi, getModelsApi ,getHeadquartersAllApi, getAppointmentsApi, reportExamMonthly } from "../../api";
import { Link, useParams } from 'react-router-dom';
import { Contenido } from "../Home";
import moment from 'moment';
import Swal from 'sweetalert2';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import * as XLSX from 'xlsx';

export default function ModelSettingEdit() {
    type Order = 'asc' | 'desc';
    const { idmodelo, id, idexam} = useParams();
    const [rows, setRows] = React.useState<any[]>([]);
    const [rows2, setRows2] = React.useState<any[]>([]);
    const [rows3, setRows3] = React.useState<any[]>([]);
    const [rows4, setRows4] = React.useState<any[]>([]);
    const [setexame, setExam] = React.useState<any[]>([]);

    const [fecha, setFecha] = React.useState<any>("");
    const [fechaCreacion, setFechaCreacion] = React.useState<any>('');

    const [filtros, setFiltros] = React.useState<any>('');
    const [filtros2, setFiltros2] = React.useState<any>('');
    const [textfiltro, setTextFiltro] = React.useState<any>('');
    const [textfiltro2, setTextFiltro2] = React.useState<any>('');
    const [nuevatabla, setNuevaTabla] = React.useState<any>(false);
    const [valueEx, setValueEx] = React.useState<any[]>([]);
    const [sedeList, setSedeList] = React.useState<any[]>([]);
    const [pruebaList, setPruebaList] = React.useState<any[]>([]);
    const [referenciaList, setReferenciaList] = React.useState<any[]>([]);
    const [rowsExamenes, setRowsExamenes] = React.useState<any[]>([]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(20);

    const initialTasks = [
      {
        id: "1",
        text: "React.js",
      },
      {
        id: "2",
        text: "HTML/CSS",
      },
      {
        id: "3",
        text: "AWS",
      },
      {
        id: "4",
        text: "JavaScript",
      },
    ];

    const [tasks, setTasks] = React.useState(initialTasks);


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
        getModelsApi(ruta).then((x: any) => {
          setRows4(x.data)
        })
        getExaminationApi(idexam).then((x: any) => {
          setExam(x.data.name)
        })

        getMatchEditValueExamApi(idexam).then((x: any) => {
          let mapeado: any = []
          x.data?.forEach((d: any) => {
            mapeado.push({
               namevaluexamen: d.namevalue,
               idvalueexam: d.idvalueexam,
               idapilismatchdata:d.idapilismatchdata,
               priority: d.priority,
            })
           });
          setValueEx(mapeado)
        })


    }, [])

    const ruta = idmodelo;
    let dateNow = moment().format('YYYY-MM-DD');
    let HourNow = moment().format('H-m-s');

   console.log(setexame)
   console.log(valueEx)
   
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

    const reorder = (list: any, startIndex: any, endIndex: any) => {
      const result = [...list];
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
    
      return result;
    };

    const handleChangeFechaCreacion = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFechaCreacion(event.target.value);
    };
    const handleChangFecha = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFecha(event.target.value);
    };
    const handleFiltros = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltros(event.target.value);
    };

    const changevalue=()=>{
      setValueEx(valueEx)
      console.log(valueEx)
    }
 



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
    console.log(pruebaList)
    const modelito = [rows4]

    return (
        <div className='tabla-componente card-table-examfinish'>
        <Contenido>
                <Grid container xs={200}>
                    <Grid item xs={200}>
                      <div style={{ borderRadius: '5px', width: "1000px", maxWidth: "100%" }}>
                      <div style={{ marginInline: "50px", marginBlock: "1px"}}>
                      <div style={{ width: "1150px" }} className="nav-tabla">
                        <Grid item xs={15}>
                        {modelito.map((row: any, index: any) => {
                        return ( 
                        <Link to={"/apps/apilis/configure/modelo/"+ idmodelo + "/marca/"+ id +"/setting"}>
                            <div style={{ display: "flex", alignItems: "center" }} >
                            <KeyboardBackspaceRoundedIcon style={{ color: "white", fontSize: "1.3rem", cursor: "pointer" }}></KeyboardBackspaceRoundedIcon>
                                <InputLabel style={{ color: "white", fontFamily: "Quicksand", fontWeight: "400", fontSize: "1.6rem", cursor: "pointer"}} >APILIS/ CONFIGURACION / MARCA / MODELO {row.nameModel} / SETTINGS DATA / {setexame}</InputLabel >
                            </div>
                        </Link>
                        )
                        })}
                        </Grid>
                      </div>
                        </div>
                       </div>
                    </Grid>
                </Grid>
            <br></br>
            <br></br>
            <div style={{justifyContent:"center"}}>
            <Grid container sx={{ placeContent: "center", mb: 50}} className="contenedor-tabla-apilis">
            <Box sx={{ width: '50%',  placeContent: "center"}} className="card-table-examfinish contenedor-tabla-apilis">
            
               <DragDropContext
      onDragEnd={(result) => {
        const { source, destination } = result;
        if (!destination) {
          return;
        }
        if (
          source.index === destination.index &&
          source.droppableId === destination.droppableId
        ) {
          return;
        }
        const newOrder = reorder(valueEx, source.index, destination.index);
        const newValues = newOrder.map((item, index) => ({ ...item, priority: index }));
        setValueEx(newValues);
        
        // Actualizar los valores en la base de datos
        newValues.forEach((item) => {
          editDetailApi2(item.priority, item.idvalueexam);
        });


      }}
    >
      <div>
        <Droppable droppableId="tasks">
          {(droppableProvided) => (
            <ul
              {...droppableProvided.droppableProps}
              ref={droppableProvided.innerRef}
              className="task-container"
            >
              {valueEx.map((task, index) => (
                <Draggable key={task.idvalueexam} draggableId={task.priority.toString()} index={index}>
                  {(draggableProvided) => (
                    <li
                      {...draggableProvided.draggableProps}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.dragHandleProps}
                      className="task-item"
                      
                    >
                      {task.namevaluexamen}
                    </li>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext> 
    
            </Box >
        </Grid>
            </div>

        </Contenido>
    </div>
    );
}


