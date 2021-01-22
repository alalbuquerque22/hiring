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
        
           
    
          setDailyValue(firstElement)
          setIndex(valueX.reverse());
          setValue(valueY.reverse())
    
          
    
      }
      
      getStock()

    
      // console.log(index,value);
    },[optionsState])
    


    const [secondIndex,setSecondIndex] = useState([]);
    const [secondValue,setSecondValue] = useState([]);
    const [secondDailyValue,setSecondDailyValue] = useState()
    const [secondOptionsState,setSecondOptionsState] = useState('IBM')
   

    useEffect(()=>{ 
      const getComparation = async ()=>{
        const api_key ='process.env.REACT_APP_ALPHA_KEY';
        
        const urlQuery =`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${secondOptionsState}&apikey=${api_key}`
        const valueX = []
        const valueY= []
    
    
        let res = await axios.get(urlQuery)
        
      
          
    
          for (const key in res.data['Time Series (Daily)']) {
       
            valueX.push(key);
            valueY.push(res.data['Time Series (Daily)'][key]['4. close']);
         
            
          }
          
          
          const firstElement = valueY.shift();
        
    
    
          setSecondDailyValue(firstElement)
          setSecondIndex(valueX.reverse());
          setSecondValue(valueY.reverse())
    
          
    
      }
      
      getComparation()
      // console.log(index,value);
    },[secondOptionsState])
  
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

    const handleSecondChange = (event) => {
      setSecondOptionsState(event.target.value);
    };

    function handleTimestamp (){

        const linhas = index.map(()=>{
          return(
        
            
            <tr>
                <td>{index}</td>
                <td>U$ {value}</td>
                <td>U$ {secondValue}</td>
                <td>{ ((value / secondValue -1 )* 100).toFixed(2)}%</td>
            </tr>
            

          )

      })
          
      
      

    }
  



   

  
     
    return (
        <div className="main">
        
                    <div className="card">
                      <div className="container">
                          <h1 >Histórico</h1>

                        <div className="selection">
                          <h2>Histórico da equity: {optionsState} </h2>
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
                          

                        <div className="selectionBox">
                            <div className="selection">
                              <h2>Equity de : {optionsState} </h2>
                              <h2> Valor de hoje: U$ {dailyValue}</h2>
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
                              <h2>Equity de : {secondOptionsState} </h2>
                              <h2> Valor de hoje: U$ {secondDailyValue}</h2>

                                  <select 
                                  onChange={handleSecondChange}
                                  value={secondOptionsState}>
                                    {/* <option selected Value="0">Selecione a Ação:</option> */}
                                    <option value="IBM">IBM</option>
                                    <option value="FB">FACEBOOK</option>
                                    <option value="WORK">SLACK TECNOLOGIES</option>
                                    <option value="TSLA">TESLA</option>
                                  </select>
                            </div>

                        </div>

                      <h2>Diferança entre preço da Ação {optionsState} e {secondOptionsState} é de U$ {dailyValue - secondDailyValue}</h2>
                      <h2>  A Variação de porcentagem é: { ((dailyValue / secondDailyValue -1 )* 100).toFixed(2)}%</h2> Formula : (({dailyValue} / {secondDailyValue}) -1) *100 


                        <div className="tabela">
                        <table style={{  border: "1px solid black"}}>
                            <tr>
                                <th>&nbsp;</th>
                                <th>{optionsState}</th>
                                <th>{secondOptionsState}</th>
                                <th>Variação de porcentagem</th>
                            </tr>
                            <tr>
                                <td>{index.shift()}</td>
                                <td>U$ {dailyValue}</td>
                                <td>U$ {secondDailyValue}</td>
                                <td> { ((dailyValue / secondDailyValue -1 )* 100).toFixed(2)}%</td>
                            </tr>
                           
                        </table>
                        </div>

                     </div>
                  </div>
        
        </div>      

        
    )
  }


export default ChartApp;
