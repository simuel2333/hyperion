import React, { Component } from 'react'
import Web3 from 'web3';
import Token from '../../../abis/Token.json'
import dBank from '../../../abis/dBank.json'
import { Tabs } from 'antd';

const { TabPane } = Tabs;



export class loan extends Component {

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    if (typeof window.ethereum !== 'undifined') {
      try {
        await window.ethereum.enable();
      } catch (error) {
        alert('用户不授权')
      }
      const web3 = new Web3(window.ethereum)
      //assign to values to variables: web3, netId, accounts
      const netId = await web3.eth.net.getId()
      const accoutns = await web3.eth.getAccounts()
      if (typeof accoutns[0] !== 'undefined') {
        const balance = await web3.eth.getBalance(accoutns[0])
        //check if account is detected, then load balance&setStates, elsepush alert
        this.setState({ account: accoutns[0], balance: balance, web3: web3 })
      } else {
        window.alert('请登录MetaMask')
      }
      //in try block load contracts
      try {
        const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address)
        const dbank = new web3.eth.Contract(dBank.abi, dBank.networks[netId].address)
        const dBankAddress = dBank.networks[netId].address
        const tokenBalance = await token.methods.balanceOf(this.state.account).call()
        this.setState({ token: token, dbank: dbank, dBankAddress: dBankAddress, tokenBalance: web3.utils.fromWei(tokenBalance) })
      } catch (e) {
        console.log("Error", e)
        window.alert('Contracts not deployed to the current network')
      }

    } else {
      window.alert('请安装MetaMask')
    }
  }
  async exchange(amount) {
    //check if this.state.dbank is ok
    //in try block call dBank deposit();
    if (this.state.dbank !== 'undefined') {
      console.log("dbank contract:", this.state.dbank)
      try {
        await this.state.dbank.methods.exchange().send({ value: amount.toString(), from: this.state.account })
      } catch (error) {
        console.error('Error, echange:', error)
      }
    }

  }
  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      token: null,
      dbank: null,
      balance: 0,
      dBankAddress: null,
      tokenBalance: 0
    }
  }
  render() {
    return (

      <div className='text-monospace'>
        <div className="container-fluid mt-5 text-center">
          <br></br>
          <h1>钱庄兑换处</h1>
          <h2>当前账户地址：{this.state.account}</h2>
          <br></br>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <Tabs defaultActiveKey="1">
                  <TabPane key="1" tab="数字人民币">
                    <div>
                      目前拥有：
                      {this.state.tokenBalance}RMB
                    </div>
                  </TabPane>
                  <TabPane key="2" tab="兑换">
                    <div>
                      <br></br>
                      想兑换多少RMB？(1ETH=13,613RMB)
                      <br></br>
                      <form onSubmit={(e) => {
                        e.preventDefault()
                        let amount = this.exchangeAmount.value
                        amount = amount * 10 ** 18
                        this.exchange(amount)
                      }}>
                        <div className='form-group mr-sm-2'>
                          <br></br>
                          <input
                            id="exchangeAmount"
                            step="0.01"
                            type="number"
                            className="form-control form-control-md"
                            placeholder="amount..."
                            required
                            ref={(input) => { this.exchangeAmount = input }}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">兑换</button>
                      </form>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }
}


export default loan
