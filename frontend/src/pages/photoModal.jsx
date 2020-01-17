import React, { Component } from 'react';
import { Modal, Button, Label } from 'semantic-ui-react'
import ipfs from '../services/ipfs'
import ipfsUrl from '../services/ipfsUrl'
import { CircleLoader } from 'react-spinners';

// photo cropping tool...
import PhotoCropper from './photoCropper'

// Index component
class Photo extends Component {

  state = {
    modalOpen: false,
    isLoading: false,
    uploadedHash: '',    // ipfs hash
    failResources: false
  }

  constructor(props) {
    super(props)
    this.finalizePhoto = this.finalizePhoto.bind(this)
  }

  launchModal = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = (e) => {
    if(e) e.preventDefault()
    this.setState({ modalOpen: false, uploadedHash: '' })
  }

  resetUploadedHash = (e) => {
    if(e) e.preventDefault()    // prevent default event (if provided)
    this.setState({ uploadedHash: '' })
  }

  finalizePhoto = (photo) => {
    this.setState({ isLoading: true })
    
    ipfs(photo, (err, file) => {
      // only update hash once.
      console.log("calling........")
      if(!this.state.uploadedHash && this.state.modalOpen)
        this.setState({
          uploadedHash: file.hash,
          isLoading: false
        },() => {
          // confim photo (with scatter)
          this.confirmPhoto()
        })
    })

  }

  confirmPhoto = () => {
    let { account, authorization, contract } = this.props
    let { uploadedHash } = this.state // ipfs hash of photo..

    contract.set({
      account: account.name,
      photo_hash: uploadedHash
    },{authorization}).then((res) => {
      console.log("res is")
      console.log(res)

      if(res.broadcast === true) {
        // successful broadcast
        console.log("good bcast")
        // reset hash, close modal, and show toast.
        this.resetUploadedHash();
        this.closeModal();
        this.props.setPhoto(uploadedHash);   // set photo from props.
      } else {
        // something went wrong.
        console.log("bad bcast")
        alert("Unable to contact the VEX network, please try again later.")
      }
    })
    .catch((e) => {
      // not enough resources
      this.setState({failResources: true})
    })

  }

  whatToRender = () => {
    let { isLoading, uploadedHash, failResources } = this.state
    let { account } = this.props
    // render one of the following:
    // loading bar
    // confirmation screen (for scatter)
    // image uploader/cropper

    // loader
    
    if(isLoading) return (<div><h3>Storing on multiple IPFS nodes...</h3>
      <br /><br /><br />
      <center>
      <CircleLoader
          sizeUnit={"px"}
          size={250}
          color={'#024359'}
          loading={true}
      />
      </center>
      <div className={'spacer'} />
    </div>)

    // confirmation
    if(uploadedHash) return (<div><h3>Confirm with VexWallet</h3>
        We've opened VexWallet for you, please confirm your new account photo.
        <br /><br />
        {failResources && <div>
          <Label basic color='red' pointing='below'>
          PHOTO NOT SET!
          Your account may not have enough CPU or RAM to complete this action.
          </Label>
  
          <br /><br />
        </div>}
        <Button onClick={this.confirmPhoto} color='green' fluid>Re-Launch VexWallet</Button>
        <img src={ipfsUrl(uploadedHash)} alt={'pre-cache user'} style={{display:'none'}} /> 
        </div>)


    // image upload + crop
    return (<PhotoCropper 
      finalizePhoto={this.finalizePhoto} 
      closeModal={this.closeModal}
      account={account} 
      />)
  }

  render() {
    return (
      <span>
        <Modal size={'mini'} 
          open={this.state.modalOpen} 
          onClose={this.closeModal} 
          closeOnDimmerClick={false}>
          <Modal.Content>
            <div>
              {this.whatToRender()}
              <div className='spacer' />
              <div className='center spacer'>
               <a href="./" onClick={this.closeModal}>Cancel</a>
              </div>
            </div>
          </Modal.Content>
        </Modal>
        <Button onClick={this.launchModal} color='green'>Change Photo</Button>
      </span>
    );
  }

}

export default Photo;
