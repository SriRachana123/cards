import React from 'react';
import './cards.css';
import Data from './data.json';
class Cards extends React.Component{
    
    constructor() {
        super();
        this.state = {
            dataState: Data.cardData,
            splicedata: [],
            count: 0,
            
          };
      }
      
      shuffleFun(){
 
        let j, x, i;
        let shuffData = [...this.state.dataState];
    for (i = shuffData.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = shuffData[i];
        shuffData[i] = shuffData[j];
        shuffData[j] = x;
    } 
    this.setState((state) =>({
        dataState: shuffData,
        count: state.count,
      splicedata: state.splicedata
    }))

      }
      inputValChange(event) {
        this.setState((state)=>({
            
          dataState: state.dataState,
          count: event.target.value,
         splicedata: state.splicedata
       
        }))

      }
      drawFun(){
        const jsondata = [...this.state.dataState];
        let splicedata = jsondata.splice(jsondata.length - this.state.count, this.state.count);
        splicedata = [...splicedata, ...this.state.splicedata];
        this.setState((state) => ({
          dataState: jsondata,
          count: state.count,
          splicedata: splicedata,
        }
       
       ));
   
      } 
      resetFun(){
        this.setState(() => ({
          dataState: Data.cardData,
          count: 0,
          splicedata: []
        }));
      }
      saveFun(){
        window.localStorage.setItem('saveData',JSON.stringify(this.state));
        alert('Card data is Stored ')
      }
      sortFun(){
        const dataSort = [...this.state.splicedata]
        dataSort.sort(function(a, b) {
          return (a.cardName - b.cardName);
      }).sort(function(a, b) {
          return (a.priority - b.priority);
       
      });
      this.setState((state) => ({
        dataState: state.dataState,
        count: state.count,
        splicedata: dataSort
      }));
      }
        render(){
            return(
        <div>
           
            <h4 className="head"> iX Cards Test</h4>
            <div className="container">
                <h5 className="key">Deck</h5>
                <h5 className="key">Controls</h5>
                <h5 className="key">Hands</h5>
            </div>
            <div className="container">
                <button className="key" onClick={(e) => this.shuffleFun()}>Shuffle</button>
              
                <p className="key">Save Game</p>
                
                <button className="key" onClick={(e)=>{this.sortFun()}}> Sort</button>
            
               

            </div>
            <div className="container">
            
                <div className="controls">
                <button className="key" onClick={(e) =>this.saveFun()}>Save</button>
                
                <button className="key" onClick={(e)=>this.resetFun()}>Reset</button>
                </div>
                
                <p className="key"> </p>
            </div>
            <div className="container">
                <p className="key">.</p>
                <div>
                <p className="key">Draw Cards</p>
                <input type="number" valueChange={this.state.count} onChange={(e)=>this.inputValChange(e)}></input>
                <button className="key" onClick={(e) => this.drawFun()}>Draw</button>
                </div>
                <p className="key">.</p>
                <div>
                   {this.state.splicedata.map(ele => {
                    return <div key={ele.id}>
                        <span>{ele.cardName} of {ele.cardType}</span>
                    </div>
                })}
                </div>
            </div>
            <div>
                {this.state.dataState.map(elem => {
            return <div key={elem.id}>{elem.cardName} in {elem.cardType}</div>
        })}
        </div>
        </div>
            )}
}
export default Cards;