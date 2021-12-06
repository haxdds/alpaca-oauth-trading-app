
import './Home.scss';
import alpaca from './alpaca.png'
import React from 'react';
import dotenv from 'dotenv';

dotenv.config();

class Home extends React.Component {
 
  handleChange =(event)=> {
    this.setState({value: event.target.value});
  }

handleSubmit = async (event) => {
  const alpaca_oauth = `https://app.alpaca.markets/oauth/authorize` + 
                    `?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=account:write%20trading%20data`;
  document.location.href = alpaca_oauth;
  }

  render() {
    return (
      <div className="home-container">
        <div className="content">
        <h1 className="content-title"> My OAuth Trading App</h1>
        <div className="content-container"> 
 
            <button 
            onClick={this.handleSubmit}>
              <input className="button-width" type="submit" value="Sign in with Alpaca" />
            </button>
            
       
          </div>
          <div className="content-footer">
          <label className="content-label"> Powered by </label>
            <img src={alpaca} alt='' />
            </div>
        </div>
      </div>
    );
  }
}

export default Home;
