import React, { Component } from 'react'
import {Table} from 'react-bootstrap'
import axios from 'axios'

export class Personlist extends Component {
    state = {
        teams: [],
       };

    componentDidMount(){
        axios.get(`https://www.balldontlie.io/api/v1/teams`)
        .then(res => {
            this.setState({ teams: res.data.data});
        });
    }

    render() {
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Team Name</th>
                        <th>City</th>
                        <th>Abbreviation</th>
                        <th>Conference</th>
                        <th>Division</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.teams.map(team => 
                        <tr key={team.id}>
                        <td>{team.name}</td>
                        <td>{team.city}</td>
                        <td>{team.abbreviation}</td>
                        <td>{team.conference}</td>
                        <td>{team.division}</td>
                        </tr>
                        )}
                    </tbody>
                 </Table>
            </div>
        )
    }
}

export default Personlist
