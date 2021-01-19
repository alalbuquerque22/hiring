
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Line} from 'react-chartjs-2'

function ChartApp() {

    useEffect(()=>{ 
      getStock()
      // console.log(index,value);
    },[])
  
    const [index,setIndex] = useState([]);
    const [value,setValue] = useState([]);
    const [dailyValue,setDailyValue] = useState()
    const [day,setDay] = useState()
  
    const getStock = async ()=>{
      const api_key ='EEMGDDQZF11EGT91'
      const stockSymbol = 'IBM'
      const urlQuery =`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stockSymbol}&apikey=${api_key}`
      const valueX = []
      const valueY= []
  
  
      let res = await axios.get(urlQuery)
      
    
        // console.log(res.data);  
  
        for (const key in res.data['Time Series (Daily)']) {
     
          valueX.push(key);
          valueY.push(res.data['Time Series (Daily)'][key]['4. close']);
          
          // console.log(key);
          // console.log(res.data['Time Series (Daily)'][key]['4. close']);
          
        }
        
        
        const firstElement = valueY.shift();
        console.log(firstElement, 'aqui');
  
  
        setDailyValue(firstElement)
        setIndex(valueX);
        setValue(valueY)
  
        
  
    }
  
    const [chartData,setChartData] = useState({})
    
    const chart = () =>{
      setChartData({
          labels:index,
        
          datasets:[
            {
              label:'Historico de fechamento por data',
              data:value,
              fill:false,
              borderColor:'rgba(192,168,10,1)',
              borderWidth:0.5,
              backgroundColor:'rgba(192,168,10,0.2)'
            
            }
          ],
  
          options: {
            scales: {
                yAxes: [{
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }]
            }
        },
        
      }
      
      
      )
    }
  
    useEffect(()=>{
      chart()
  
    },[index,value])
  
    
    return (
      <>
  
         <div className="container">
            <h1 style={{textAlign:'center',alignContent:'center',alignItems:'center'}}>Historico</h1>

                <div className="chart" style={{width:'800px',height:'350px'}}>
                  
                  <Line 
                  data={chartData}
              
                />
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
            <h2> Valor de hoje: {dailyValue}</h2>

        </div>
    </>
   
    );
  }


export default ChartApp;
