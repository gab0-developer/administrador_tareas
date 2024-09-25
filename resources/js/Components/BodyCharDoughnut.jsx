import React from 'react'
// material ui 
import { Box } from '@mui/material';

// import chartjs
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'; //tipo de grafica a mostrar
ChartJS.register(ArcElement, Tooltip, Legend);


function BodyCharDoughnut({titiledashboard,subtitledata,labeldata,datas}) {
  

    let options = {
        responsive: true,
        animation: true,
        plugins: {
            legend: {
                display: true,
            },
            
            title: {
                display: true,
                text: titiledashboard,
            },
        },
        // scales:{
        //     x:{
        //         ticks: {color: 'rgba(0, 0, 0, 0.5)'}
        //     }
        // }
    };
      
    let data = {
            labels: labeldata,
            datasets: [
                {
                    label: subtitledata,
                    data: datas,
                    // backgroundColor: 'rgba(255, 234, 99, 0.5)',
                    backgroundColor : [
                        '#98fb98',
                        '#f3e5ab',
                        '#ffdab9',
                        '#f3e5ab',
                        '#98eede',
                        '#d8bfd8',
                        '#a0d8ef',
                        '#ffd700',
                        '#c1e1c1',
                        '#ffdab9',
                        '#eaeaea',
                        '#ffdab9',
                        '#add8e6',
                        '#cdecb8',
                        '#e6e6fa',
                        '#b0e0e6',
                        '#ffef96',
                        '#ffb6c1',
                        '#d0f0c0',
                        '#afeeee',
                        '#fdd5b1',
                        '#ffdab9',
                        '#afeeee',
                        '#f08080',
                        '#d3d3d3',
                        '#f3e5ab',
                        'skyblue',
                        '#f0f8ff'
                        // '#ffc0cb',
                        // '#87ceeb',
                    ],
                    borderColor : [
                        '#98fb98',
                        '#f3e5ab',
                        '#ffdab9',
                        '#f3e5ab',
                        '#98eede',
                        '#d8bfd8',
                        '#a0d8ef',
                        '#ffd700',
                        '#c1e1c1',
                        '#ffdab9',
                        '#eaeaea',
                        '#ffdab9',
                        '#add8e6',
                        '#cdecb8',
                        '#e6e6fa',
                        '#b0e0e6',
                        '#ffef96',
                        '#ffb6c1',
                        '#d0f0c0',
                        '#afeeee',
                        '#fdd5b1',
                        '#ffdab9',
                        '#afeeee',
                        '#f08080',
                        '#d3d3d3',
                        '#f3e5ab',
                        'skyblue',
                        '#f0f8ff'
                        // '#ffc0cb',
                        // '#87ceeb',
                    ],
                    borderWidth: 1,
                }
            ],
        };
  return (
    <>
        {/* <button onClick={consola}>concola</button> */}
        <Box sx={{width:'100%',my:'0.5rem',borderRadius:'7px',boxShadow:'0 8px  25px rgba(0,0,0,0.20)'}}>
            <Doughnut data={data} options={options} />
        </Box>
    </>
  )
}

export default BodyCharDoughnut
