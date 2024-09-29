import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { Box, Collapse } from '@mui/material'
import BodyCharBard from '@/Components/BodyCharBard'

function ChartTask({datas}) {
  const [TaskPedientes,setTaskPedientes] = useState([]);
  const [TaskCompletadas,setTaskCompletadas] = useState([]);

  useEffect(() => {
    setTaskPedientes(datas.filter((item) => item.estatu_id == '1'))
    setTaskCompletadas(datas.filter((item) => item.estatu_id == '2'))
  }, [datas])

  // obtener data
  // const labelData_Task_Pendientes = 
  // const labelData_Task_Completadas = 
  const ListTask = [TaskPedientes.length,TaskCompletadas.length]
  const LabelData = [ "Tareas pendientes","tarea completadas"]

  return (
    <>
      <Box component='div' sx={{width:'80%',margin:'auto'}}>
        <Box component='div' sx={{width:'100%'}}>
          <BodyCharBard
            titiledashboard='TU PROGRESO'
            subtitledata={['Cantidad']}
            labeldata={LabelData}
            datas={ListTask} 
            indexAxis="x"
          />
        </Box>
        {/* <Box component='div' sx={{width:'50%'}}>
          <BodyCharBard
            titiledashboard='TOTAL TAREAS COMPLETADAS'
            subtitledata='Cantidad:'
            labeldata={[ "Tareas completadas"]}
            datas={[ labelData_Task_Completadas ]} 
            indexAxis="x"
          />
        </Box> */}
      </Box>
    </>
  )
}

export default ChartTask
