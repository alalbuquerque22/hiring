import axios from 'axios'
import { useEffect, useState } from 'react';
import { Line} from 'react-chartjs-2'
// import Api from '../../services/api'
import './index.css'
function ChartApp() {

 
  
    const [index,setIndex] = useState([]);
    const [value,setValue] = useState([]);
    const [dailyValue,setDailyValue] = useState()
    const [optionsState,setOptionsState] = useState('IBM')
   

    useEffect(()=>{ 
      const getStock = async ()=>{
        const api_key ='process.env.REACT_APP_ALPHA_KEY';
        
        const urlQuery =`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${optionsState}&apikey=${api_key}`
        const valueX = []
        const valueY= []
    
    
        let res = await axios.get(urlQuery)
        
      
          
    
          for (const key in res.data['Time Series (Daily)']) {
       
            valueX.push(key);
            valueY.push(res.data['Time Series (Daily)'][key]['4. close']);
         
            
          }
          
          
          const firstElement = valueY.shift();
          console.log(firstElement, 'aqui');
    
    
          setDailyValue(firstElement)
          setIndex(valueX.reverse());
          setValue(valueY.reverse())
    
          
    
      }
      
      getStock()
      // console.log(index,value);
    },[optionsState])
    
    
  
    const [chartData,setChartData] = useState({})
    
    const chart = async() =>{
       await setChartData({
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
  
    const handleChange = (event) => {
      setOptionsState(event.target.value);
    };
    return (
        <div className="main">
        
                    <div className="card">
                      <div className="container">
                          <h1 >Histórico</h1>

                        <div className="selection">
                          <h2>Preço de: {optionsState} </h2>
                              <select 
                              onChange={handleChange}
                              value={optionsState}>
                                {/* <option selected Value="0">Selecione a Ação:</option> */}
                                <option value="IBM">IBM</option>
                                <option value="FB">FACEBOOK</option>
                                <option value="WORK">SLACK TECNOLOGIES</option>
                                <option value="TSLA">TESLA</option>
                              </select>
                        </div>


                              <div className="chart" >
                                
                                <Line  data={chartData}/>
                              </div>
                        
                      </div>
                    </div>  
                      
                  <div className="projection">
                    <div className="compare">
                          <h1>Projeções</h1>
                          <h2> Valor de hoje: {dailyValue}</h2>

                        <div className="selectionBox">
                            <div className="selection">
                              <h2>Valor de : {optionsState} </h2>
                                  <select 
                                  onChange={handleChange}
                                  value={optionsState}>
                                    {/* <option selected Value="0">Selecione a Ação:</option> */}
                                    <option value="IBM">IBM</option>
                                    <option value="FB">FACEBOOK</option>
                                    <option value="WORK">SLACK TECNOLOGIES</option>
                                    <option value="TSLA">TESLA</option>
                                  </select>
                            </div>


                            <div className="selection">
                              <h2>Valor de : {optionsState} </h2>
                                  <select 
                                  onChange={handleChange}
                                  value={optionsState}>
                                    {/* <option selected Value="0">Selecione a Ação:</option> */}
                                    <option value="IBM">IBM</option>
                                    <option value="FB">FACEBOOK</option>
                                    <option value="WORK">SLACK TECNOLOGIES</option>
                                    <option value="TSLA">TESLA</option>
                                  </select>
                            </div>

                        </div>

                     </div>
            </div>
        
        </div>      

        
    )
  }


export default ChartApp;
