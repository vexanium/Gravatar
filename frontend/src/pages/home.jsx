import React, { Component } from 'react';
import { Card, Image, Icon, Button } from 'semantic-ui-react'
import scatter from '../services/scatter'
import ipfsUrl from '../services/ipfsUrl'
import PhotoModal from './photoModal'
import config from "../config/default";
import Eos from "vexaniumjs";

// Index component
class Index extends Component {

  state = {
    account: {},
    eos: '',
    authorization: '',
    contract: '',
    photo: ipfsUrl(),
  }

  constructor(props) {
    super(props);
    this.setPhoto = this.setPhoto.bind(this)

    this.linkScatter()    // link scatter onload
  }

  linkScatter = () => {
    scatter.connect((eos, account, authorization) => {
      // save scatter helpers
      this.setState({ eos, account, authorization })
      // also get/save contract.
      eos.contract(config.network.contract)
        .then((contract) => {
          this.setState({ contract }, () => {
            this.setPhoto()
          })

        });      
    });
  }

  forgetScatter = () => {
    this.setState({ account: {}, eos: '', authorization: '', contract: '', photo: ipfsUrl() })
    scatter.forget()
  }

  componentWillUnmount() {
    this.forgetScatter()
  }

  setPhoto = (hash) => {
    // get photo from ipfs
    let { eos, account } = this.state
    let { network } = config

    if (hash) {
      // hash provided just use that one.
      this.setState({ photo: ipfsUrl(hash) })
    } else {
      // check vex network for profile hash.
      let encodedName = Eos.modules.format.encodeName(account.name,false).toString()
      console.log("en",encodedName)
      eos.getTableRows({
        json: true,
        code: network.contract,
        scope: network.contract,
        table: "photo",
        lower_bound: encodedName,
      })
        .then((res) => {
          let photo = res.rows[0]
          // load in hash from ipfs if correct account name was loaded
          if(photo.account_name === encodedName) {
            console.log("accountphoto found")
            this.setState({ photo: ipfsUrl(photo.photo_hash) })
          } else {
            console.log("no accountphoto found, fallback")
            this.setState({ photo: ipfsUrl() })
          }
        });
    }

  }

  renderMain() {
    let { account, eos, authorization, contract } = this.state

    // scatter already linked
    if (contract)
      return (
        <div>
          <Card.Header><h1>{account.name}</h1></Card.Header>
          <div className={'spacer'} />
          <Button onClick={this.forgetScatter}>Logout</Button>
          <PhotoModal
            account={account}
            eos={eos}
            authorization={authorization}
            contract={contract}
            setPhoto={this.setPhoto}
          />
        </div>
      )


    // need to link scatter
    return (
      <div>
        Personalize your VEX Photo.
        <div className={'spacer'} />
        <Button onClick={this.linkScatter} color='blue'>Login with VexWallet</Button>
      </div>
    )

  }

  /* <Dropzone onDrop={this.onDrop}>hello</Dropzone> */
  render() {
    let { photo } = this.state
    return (
      <div className={'center'}>
        <Card style={{ width: '100%', padding: '1.5em' }} color='grey'>
          <Image src={photo} />
          <Card.Content>
            <Card.Description>
              {this.renderMain()}
            </Card.Description>
          </Card.Content>
        </Card>
      </div>
    );
  }

}

export default Index;
