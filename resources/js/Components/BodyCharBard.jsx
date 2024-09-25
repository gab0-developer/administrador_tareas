import React from 'react'

import { Box } from '@mui/material';
// import chartjs
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BodyCharBard({titiledashboard,subtitledata,labeldata,datas,indexAxis}) {
  

    let options = {
        indexAxis: indexAxis,
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
            // mostrar tootips correspondiente a cada celda donde estan las barras
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context) {
                        if (indexAxis === "x") {
                            return `Value: ${context.parsed.y}`;
                            
                        }else{
                            return `Value: ${context.parsed.x}`;

                        }
                    },
                    title: function (tooltipItem) {
                        return labeldata[tooltipItem[0].index];
                    },
                },
            },
        },
        scales:{
            x:{
                ticks: {color: 'rgba(0, 0, 0, 0.5)'}
            }
        }
    };
      
    let data = {
            labels: labeldata,
            datasets: [
                {
                    label: subtitledata,
                    data: datas,
                    // backgroundColor: 'rgba(255, 234, 99, 0.5)',
                    backgroundColor : [
                        '#ffc0cb',
                        '#87ceeb',
                        '#f3e5ab',
                        '#98fb98',
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
                    ]
                }
            ],
        };
  return (
    <>
        {/* <button onClick={consola}>concola</button> */}
        <Box sx={{width:'100%',my:'0.5rem',borderRadius:'7px',boxShadow:'0 8px  25px rgba(0,0,0,0.20)'}}>
            <Bar data={data} options={options} />
        </Box>
    </>
  )
}

export default BodyCharBard
