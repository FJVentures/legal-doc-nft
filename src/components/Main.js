import ReactTypingEffect from 'react-typing-effect';
import { buyLegalDoc } from '../store/interactions'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Identicon from 'identicon.js';
import Loading from './Loading'
import {
  contractSelector,
  metadataSelector,
  legalDocStateSelector,
  networkSelector,
  metadataLoadedSelector,
  legalDocStateLoadedSelector
} from '../store/selectors'

class Main extends Component {
  render() {
    if(this.props.dataLoaded) {
        return (
          <div className="Main">
            <div className="container-fluid mt-5" style={{ color: "#ffffff", "backgroundColor": "#707070" }}>
  
            <br></br>
            <div>
              <ReactTypingEffect
                text={[
                  "Welcome to the Legal Documents Marketplace",
                  "Legal documents for any situation",
                  'Click "Buy" to get a specific legal doc',
                  "These legal docs can suit any situation"
                ]}
                speed='40'
                eraseSpeed='10'
                eraseDelay='2000'
                cursorRenderer={cursor => <h1>{cursor}</h1>}
                displayTextRenderer={(text, i) => {
                  return (
                    <h1>
                      {text.split('').map((char, i) => {
                        const key = `${i}`;
                        return (
                          <span
                            key={key}
                            style={i%2 === 0 ? {} : {}}
                          >{char}</span>
                        );
                      })}
                    </h1>
                  );
                }}
              />
              </div>
              <br></br>&nbsp;
              <img src={'https://gateway.pinata.cloud/ipfs/QmRctamiB6GoQd9SRKfnoaoSe93DNo97iwyz3BaPB7EWYG'} style={{ width: '1000px', height: '300px' }} alt="adam"/>
              <div className="row">
                <main role="main" className="col-lg-12 d-flex text-center">
                  <div className="content mr-auto ml-auto">
                    <div className="row justify-content-around" style={{ width: '1000px', fontSize: '13px'}}>
  
                    {this.props.metadata.map((legalDoc, key) => {
                      return(
                        <div className="p-3" key={key}>
                        {this.props.legalDocState[legalDoc.id]
                          ? <a href={legalDoc.image} target="_blank" rel="noopener noreferrer">
                              <img src={`data:image/png;base64,${legalDoc.img}`} style={{ border: '1mm ridge #8B8B8B', width: '200px', height: '300px' }} alt="art"/>
                            </a>
                          : <a href={legalDoc.image} target="_blank" rel="noopener noreferrer">
                              <img
                                src={`data:image/png;base64,${legalDoc.img}`} style={{ border: '1mm ridge #0000ff', width: '200px', height: '300px' }} alt="art"
                              />
                            </a>
                        }
                          <p></p>
                          <table style={{ width: '200px' }}>
                            <thead>
                              <tr>
                                <th className="text-left" style={{color: "#8B8B8B"}}>ID: </th>
                                <th style={{color: "#FFFFFF"}}>{legalDoc.id}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th className="text-left" style={{color: "#8B8B8B"}}>URI: </th>
                                <td>
                                  <a href={legalDoc.uri} target="_blank" rel="noopener noreferrer" style={{color: "#0000ff"}}>
                                    link
                                  </a>
                                </td>
                              </tr>
                              {this.props.legalDocState[legalDoc.id]
                              ? <tr>
                                  <th className="text-left" style={{color: "#8B8B8B"}}>Owner:</th>
                                  <th>
                                    <img
                                      alt="id"
                                      className="ml-2 id border border-success"
                                      width="15"
                                      height="15"
                                      src={`data:image/png;base64,${new Identicon(this.props.legalDocState[legalDoc.id], 30).toString()}`}
                                    />{' '}
                                    <a
                                      href={`https://etherscan.io/address/` + this.props.legalDocState[legalDoc.id]}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{color: "#55FF55", "fontWeight": "normal"}}
                                    >
                                      {this.props.legalDocState[legalDoc.id].substring(0,8) + '...'}
                                    </a>
                                  </th>
                                </tr>
                              : <tr>
                                  <th className="text-left" style={{color: "#8B8B8B"}}>Price: </th>
                                  <th style={{color: "#FFFFFF"}}>{legalDoc.price/10**18} ETH</th>
                                </tr>
                              }
                            </tbody>
                          </table><p></p>
                            {this.props.legalDocState[legalDoc.id]
                              ? <button
                                  type="Success"
                                  className="btn btn-block"
                                  style={{border: '1px ridge #8B8B8B', color: "#8B8B8B", width: '200px'}}
                                  onClick={(e) => buyLegalDoc(this.props.dispatch, legalDoc.id, legalDoc.price)}
                                  disabled
                                >
                                  <b>S o l d</b>
                                </button>
                              : <button
                                  type="Success"
                                  className="btn btn-block btn-outline"
                                  style={{border: '1px ridge #55FF55', color: "#55FF55", width: '200px'}}
                                  onClick={(e) => buyLegalDoc(this.props.dispatch, legalDoc.id, legalDoc.price)}
                                >
                                  <b>B u y</b>
                                </button>
                            }&nbsp;
                          </div>
                      )
                    })}
  
                    </div>
                  </div>
                </main>
              </div>
            </div>
            <br></br>
            <footer>
            {this.props.contract
              ? <div style={{color: "#8B8B8B", fontSize: "14px"}}>
                  Legal Doc deployed at:&nbsp;
                  <a
                    href={`https://${this.props.network}.etherscan.io/address/` + this.props.contract._address}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{color: "#55FF55"}}
                  >
                  {this.props.contract._address}
                  </a>
                </div>
              : <div> Wrong network </div>
            }
            </footer>
          </div>
        )
      } else {
      return(
        <Loading />
      ) 
    }    
  }
}

function mapStateToProps(state) {
  const dataLoaded = metadataLoadedSelector(state) && legalDocStateLoadedSelector(state)
  return {
    metadata: metadataSelector(state),
    contract: contractSelector(state),
    legalDocState: legalDocStateSelector(state),
    network: networkSelector(state),
    dataLoaded
  }
}

export default connect(mapStateToProps)(Main)