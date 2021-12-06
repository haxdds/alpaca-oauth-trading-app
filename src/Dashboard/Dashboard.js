import React from 'react';
import './Dashboard.scss';
import CandleStickChart from './Chart/Chart';
import axios from 'axios';
import Utils from '../Utils'
import initialData from './Chart/initial-data.json'

class Dashboard extends React.Component {
   
     
    state = {
        symbol: 'SPY',
        data:  initialData
    }


    handleChange = (e) => {
        this.setState({symbol: e.target.value});
    }

    getBars = async(_symbol, _auth_token) =>{

      var start = new Date();
      start.setFullYear(start.getFullYear() - 5);
      const end = new Date();
      end.setDate(end.getDate() - 1)
      
      
      const response = await axios.get(`https://data.alpaca.markets/v2/stocks/${_symbol}/bars`, {
        'headers': {
          'Authorization': `Bearer ${_auth_token}`
        },
        'params':{
            'start': start.toISOString(),
            'end': end.toISOString(),
            'timeframe': '1Day',
            'adjustment': 'all'
        }
      })
      
      if (response.data.bars === null) {
        return
      }

      const parsedData = Utils.parseResponse(response)

      this.setState({data: parsedData})
  }

    

    handleSubmit = async (e) => {
        e.preventDefault();
        
        if (window.localStorage.getItem('auth-token') === null){
          var oauth_code = new URLSearchParams(window.location.search).get('code');
          const auth_token = await Utils.getAuthToken(oauth_code)
          window.localStorage.setItem('auth-token', auth_token)
        }
                    

        const symbol = this.state.symbol
        this.getBars(symbol, window.localStorage.getItem("auth-token") )
    }
    

    render() {
        const { symbol } = this.state
      return (
        <div className="dashboard-container">
            

            <div className="chart">
                <label className="chart-symbol">Current Symbol: <b> {symbol.toUpperCase()} </b> </label>
                <CandleStickChart data={this.state.data}  />
            </div>
            

            <div className="form">
                <form onSubmit={this.handleSubmit}>
                <label>Symbol: 
                    <input 
                    type="text" 
                    onChange={this.handleChange}
                    />
                </label>
                <input type="submit" />
                </form>
            </div>



      </div> 
      )
    }
  }
  
  export default Dashboard
  