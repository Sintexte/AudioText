import React from 'react'
import AudioList from './AudioList'
import { Accordion } from 'react-bootstrap'

class Historique extends React.Component{
    state = {
        error:false,
        data:null,
    }

    async componentDidMount(){
        await fetch('/api/audiostranscript', {
            headers:{
                'Accept': 'application/json, text/plain, */*'
            },
            method: 'POST'
            })
            .then(rs=>rs.text())
            .then(data=>{
                let js_data = JSON.parse(data)
                this.setState({data:js_data}) 
            }).catch(error=>{
                this.setState({error:true})
        })
    }

    render(){
        return(
            <> 
                {console.log(this.state.data)}
                {(this.state.data)?<AudioList data={this.state.data} />:"Loading ..."}
            </> 
        )
    }
}
export default Historique;    