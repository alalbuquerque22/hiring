import axios from 'axios'

const api = axios.create({
    

    baseUrl: 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&outputsize=full&apikey=EEMGDDQZF11EGT91'

    
})




export default api;