import React, { Component } from 'react'
import axios from 'axios'
import Update from './Update'
import {Container,Card,Row,Button} from 'react-bootstrap'
class Favorite extends Component {
    constructor(props){
        super(props);
        this.state={
            favorite:[],
            id:'',
            title:'',
            description:'',
            ingredients:'',
            img:''
        };
    }

    componentDidMount=async()=>{
        const url=`${process.env.REACT_APP_BACKEND_URL}/fav-list`;
        const data=await axios.get(url);
        this.setState({
            favorite:data.data
        });
    }

    getTitle=async(e)=>{
        await this.setState({
            title:e.target.value
        });
    }

    getIngredients=async(e)=>{
        await this.setState({
            ingredients:e.target.value
        });
    }

    updateCoffee=async(e,id)=>{
        e.preventDefualt();
        const reqBody={
            title:this.state.title,
            description:this.state.description,
            ingredients:this.state.ingredients,
            img:this.state.img
        }
        const url=`${process.env.REACT_APP_BACKEND_URL}/update/${id}`;
        const data=await axios.put(url,reqBody);
        this.setState({
            favorite:data.data
        })
    }
    deleteCoffe=async(id)=>{
        const url=`${process.env.REACT_APP_BACKEND_URL}/delete/${id}`;
        const data= await axios.delete(url);
        this.setState({
            favorite:data.data
        });
    }
    render() {
        return (
            <>
                <Container className="coffee-container">
                    <Row className="coffee-row">
                        {
                            this.state.favorite.map((el,idx)=>{
                                return(
                                    <Card key={idx} className="card-coffee">
                                        <Card.Img 
                                            className="card-coffee-img"
                                            variant="top"
                                            src={el.img}
                                            alt={el.title}
                                        />
                                        <Card.Title className="card-coffe-title">
                                            <span className="card-coffe-title-span">{el.title}</span>
                                            <hr></hr>
                                            <span className="card-coffe-title-span">{el.ingredients}</span>
                                        </Card.Title>
                                        <Card.Text>
                                            <p>{el.description}</p>
                                        </Card.Text>
                                        <Card.Footer className="card-coffe-footer">
                                          <Update
                                            key={idx}
                                            title={el.title}
                                            id={el.id}
                                            ingredients={el.ingredients}
                                            updateCoffee={this.updateCoffee}
                                            getTitle={this.getTitle}
                                            getIngredients={this.getIngredients}
                                          />

                                            <Button
                                                variant="danger"
                                                className="card-coffee-favbtn fav--btn"
                                                onClick={()=>this.deleteCoffe(el.id)}
                                            >
                                                Delete
                                            </Button>

                                            
                                        </Card.Footer>

                                    </Card>
                                )
                            })
                        }
                    </Row>
                </Container>
            </>
        )
    }
}

export default Favorite
