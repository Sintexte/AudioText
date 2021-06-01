import React from 'react'
import { Accordion,Card, Button } from 'react-bootstrap';

class AudioList extends React.Component{
    state = {
        data:this.props.data,
        tmp:1,
        tmpdata:{},
    }
    constructor(props){
        super(props)
        this.state.tmpdata = this.props.data.slice(1,5)
    }
    componentDidUpdate(){
        this.state.tmp = 1;
    }

    render(){
        {/*
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item active">
            <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
            </li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
        */}
        return(
            <>
                <Accordion className="softshadow AudioList">
                    {this.props.data.map((data,index)=>(
                        <Card key={data._id} className="card_color"> 
                        <Card.Header>
                          <Accordion.Toggle as={Button} className="cardlink_color" variant="link" eventKey={index === 0 ? '0' : index}>
                            {data.name} 
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={index === 0 ? '0' : index}>
                          <Card.Body>
                            <code style={{height: '200px',overflow:'auto'}} className="form-control transc-code" >
                                {
                                data.transcript.results.map(ob=>{
                                    console.log(ob.alternatives[0].confidence);
                                    console.log('rgb('+((ob.alternatives[0].confidence+1)*255-255).toString()+','+(-(ob.alternatives[0].confidence)*255+255)+',150)');
                                    return(<span key={ob.alternatives[0].confidence.toString()} style={{backgroundColor:'rgb('+(-(ob.alternatives[0].confidence)*400+400).toString()+','+((ob.alternatives[0].confidence+1)*255-255).toString()+',0)'}}>
                                        {ob.alternatives[0].transcript}
                                    </span>)
                                })}
                            </code>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    ))}
                </Accordion>
                {/*
                <nav aria-label="...">
                    <ul className="pagination">
                        <li className="page-item disabled">
                            <a className="page-link" href="#" tabIndex="-1">Previous</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                            {
                                Array(Math.floor(this.props.data.length/5)).fill(0).map((_,i)=>(
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                ))
                            }
                        <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>*/}
            </>
        );
    }
}
export default AudioList;