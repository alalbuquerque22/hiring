import axios from 'axios'
import { useEffect, useState } from 'react'
import { Line} from 'react-chartjs-2'
// import Api from '../../services/api'
import './index.css'
function ChartApp() {
  
    const [index,setIndex] = useState([]);
    const [value,setValue] = useState([]);
    const [dailyValue,setDailyValue] = useState()
    const [optionsState,setOptionsState] = useState('IBM')
    const [pricesTime,setPricesTime] = useState([])
    const [secondIndex,setSecondIndex] = useState([]);
    const [secondValue,setSecondValue] = useState([]);
    const [secondDailyValue,setSecondDailyValue] = useState()
    const [secondOptionsState,setSecondOptionsState] = useState('FB')
    const [secondPricesTime,setSecondPricesTime] = useState([])


    useEffect(()=>{ 
      const getStock = async () => {

        const api_key ='process.env.REACT_APP_ALPHA_KEY';
        const urlQuery =`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${optionsState}&apikey=${api_key}`
        const valueX = []
        const valueY= []
        const pricesTimeAux = []
    
        let res = await axios.get(urlQuery) 

        for (const key in res.data['Time Series (Daily)']) {
         
          valueX.push(key)
          valueY.push(res.data['Time Series (Daily)'][key]['4. close'])
          pricesTimeAux.push({"preco":res.data['Time Series (Daily)'][key]['4. close'], "data":key})
        
        }       

        const firstElement = valueY.shift()
        
        setPricesTime(pricesTimeAux)
        setDailyValue(firstElement)
        setIndex(valueX.reverse())
        setValue(valueY.reverse())
    
      }
      
      getStock()

    
      // console.log(index,value);
    },[optionsState])

   
    useEffect(()=>{ 
      const getComparation = async ()=>{
        const api_key ='process.env.REACT_APP_ALPHA_KEY';  
        const urlQuery =`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${secondOptionsState}&apikey=${api_key}`
        const valueX = []
        const valueY= []
        const secondPricesTimeAux = []
    
        let res = await axios.get(urlQuery)
        
        for (const key in res.data['Time Series (Daily)']) {
      
          valueX.push(key);
          valueY.push(res.data['Time Series (Daily)'][key]['4. close']);
          secondPricesTimeAux.push({"preco":res.data['Time Series (Daily)'][key]['4. close'], "data":key})
          
        }
        
        const firstElement = valueY.shift();
      
        setSecondPricesTime(secondPricesTimeAux)
        setSecondDailyValue(firstElement)
        setSecondIndex(valueX.reverse());
        setSecondValue(valueY.reverse())
      
      }
      
      getComparation()
   
    },[secondOptionsState])
  
    const [chartData,setChartData] = useState({})
    useEffect(()=>{
      chart()
  
    },[index,value])
  
    const chart = ()=>{
        setChartData({
          labels:index,
        
          datasets:[
            {
              label:'Historico de fechamento por data',
              data:value,
              fill:false,
              borderColor:'rgba(23, 0, 241,1)',
              borderWidth:0.5,
              backgroundColor:'rgba(23, 0, 241, 0.2)'
            
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
  
 
    const handleChange = (event) => {
      setOptionsState(event.target.value);
    };

    const handleSecondChange = (event) => {
      setSecondOptionsState(event.target.value);
    };

    
    return (
        <div className="main">
        
                    <div className="card">
                      <div className="container">
                          <h1 >Histórico</h1>

                        <div className="selectionBoxItem">
                          <h2>Histórico da equity: {optionsState} </h2>
                              <div className="selection">
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


                              <div className="chart" >
                                
                                <Line  data={chartData}/>
                              </div>
                        
                      </div>
                    </div>  
                      
                  <div className="projection">
                    <div className="compare">
                          <h1>Projeções</h1>
                          

                        <div className="selectionBox">
                            <div className="selectionBoxItem">
                              <h2 style={{fontSize:23}}>Equity de : {optionsState} </h2>
                              <h2 style={{fontSize:23}}> Valor de hoje: U$ {dailyValue}</h2>
                              <div className="selection">
                                  <select 
                                  onChange={handleChange}
                                  value={optionsState}>
                                    {/* <option selected Value="0">Selecione a Ação:</option> */}
                                    <option value="IBM">IBM</option>
                                    <option value="FB">FACEBOOK</option>
                                    <option value="WORK">SLACK TECNOLOGIES</option>
                                    <option value="TSLA">TESLA</option>
                                  </select>
                            </div></div>


                            <div className="selectionBoxItem">
                              <h2 style={{fontSize:23}}>Equity de : {secondOptionsState} </h2>
                              <h2 style={{fontSize:23}}> Valor de hoje: U$ {secondDailyValue}</h2>
                                  <div className="selection">
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
                        </div>
                      <div className="text">
                        <h2>Legendas:</h2>
                        <h2 > * Diferança entre preço da Ação {optionsState} e {secondOptionsState} é de U$ {dailyValue - secondDailyValue}</h2>
                        <h2 > * A Variação de porcentagem é: { ((dailyValue / secondDailyValue -1 )* 100).toFixed(2)}%</h2>
                        <h2 > * Formula : (({dailyValue} / {secondDailyValue}) -1) *100 </h2>
                      </div>

                        <div className="tabela">
                        <table >
                            <tr>
                                <th>Data</th>
                                <th>{optionsState}</th>
                             
                              
                            </tr>
                            {pricesTime && pricesTime.map((item,index)=> {
                              return(
                                  <tr key={index}>
                                    <td>{item.data}</td>
                                    <td>U$ {item.preco}</td> 
                                  </tr>
                              );
                             })}
                        </table>
                        <table >
                            <tr>
                                <th>{secondOptionsState}</th>
                                <th>Variação de porcentagem</th>
                                <th>Diferença entre valores</th>
                            </tr>
                            {(secondPricesTime && pricesTime) && secondPricesTime.map((item,index)=> {
                              return(
                                  <tr key={index}>
                                    <td>U$ {item.preco}</td>{/* data */}
                                    
                                    <td>{((pricesTime[index].preco / item.preco -1)*100).toFixed(2)}%</td> 
                                    <td>{(pricesTime[index].preco - item.preco).toFixed(2)}</td> 
                                  </tr>
                              );
                             })}
                        </table>
                        </div>
                      </div>
                  </div>
        
        </div>      

        
    )
  }


export default ChartApp;
