import React, { Component } from 'react'
import axios from 'axios'
import {Card,Button,Container,Row} from 'react-bootstrap'
import '../style/Home.css'
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            coffeeData:[]
        }
    }

    componentDidMount=async()=>{
        const url=`${process.env.REACT_APP_BACKEND_URL}/retreive`;
        const data=await axios.get(url);
        this.setState({
            coffeeData:data.data
        });
        console.log(data.data);
    }
    addToFav=async(element)=>{
        const reqBody={
            id:element.id,
            title:element.title,
            description:element.description,
            img:element.img
        }
        const url=`${process.env.REACT_APP_BACKEND_URL}/create`;
        await axios.post(url,reqBody);
    }
    render() {
        return (
            <>
                <Container className="coffee-container">
                    <Row className="coffee-row">
                        {
                            this.state.coffeeData.map((el,idx)=>{
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
                                            <Button
                                                variant="warning"
                                                className="card-coffee-favbtn"
                                                onClick={()=>this.addToFav(el)}
                                            >
                                                Add To Favorite
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

export default Home
