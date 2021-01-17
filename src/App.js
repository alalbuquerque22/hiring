
import { useEffect, useState } from 'react';
import {Bar} from 'react-chartjs-2'



function App() {
  const [chartData,setChartData] = useState({})

  const chart = () =>{
    setChartData({
      labels:['segunda','terça','quarta','quimta','sexta'],
      datasets:[
        {
          label:' Valor da tabela',
          data:[1.3,1.8,5,6,4.3],
          backgroundColor:[
            'rgba(75,192,192,0.6)',
            'rgba(75,192,192,0.6)',
            'rgba(75,192,192,0.6)',
            'rgba(192,168,10,0.6)',
            'rgba(75,192,192,0.6)',
          ],
          borderWidth:4
        }
      ]
    })
  }

  useEffect(()=>{
    chart()

  },[])
  return (
    <>

    <h1 style={{textAlign:'center',alignContent:'center',alignItems:'center'}}>Tabelas
    </h1>
    <div className="chart" style={{width:'800px',height:'3500px'}}>
      
      <Bar 
      data={chartData}
     />
    </div>
  </>
 
  );
}

export default App;
