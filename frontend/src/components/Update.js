import React, { Component } from 'react'
import {Modal,Button} from 'react-bootstrap'

class Update extends Component {
    constructor(props){
        super(props);
        this.state={
            show:false,
            title:this.props.title,
            ingredients:this.props.ingredients
        }
    }

    handleModal(){
        this.setState({
            show:!this.state.show
        });
    }


    render() {
        return (
            <>
                <Button
                    variant="warning"
                    className="card-coffee-favbtn fav--btn"
                    onClick={()=>this.handleModal()} 
                >
                    Update
                </Button>
                
                <Modal show={this.state.show} onHide={()=>this.handleModal()}>
                    <Modal.Header closeButton>
                        {this.props.title}
                    </Modal.Header>
                    <Modal.Body>
                        <form className="update-from"
                            onSubmit={(e)=>this.props.updateCoffee(e,this.props.id)}
                        >
                            <lable>Title:</lable>
                            <input type="text" defaultValue={this.props.title} onChange={(e)=>this.props.getTitle(e)}/>
                            <br></br>
                            <lable>Ingredients:</lable>
                            <input type="text" defaultValue={this.props.ingredients} onChange={(e)=>this.props.getIngredients(e)}/>
                            <br></br>
                            <button type="submit" onClick={()=>{this.handleModal()}}>
                                Update !
                            </button>

                        </form>
                    </Modal.Body>

                </Modal>
            </>
        )
    }
}

export default Update
