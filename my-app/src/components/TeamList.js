import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BootStrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import {Modal, Button } from 'react-bootstrap'

const TeamList = () => {
    const[teams, setTeams] = useState([]);
    const getTeamsData = async() => {
        try {
            const data = await axios.get("https://www.balldontlie.io/api/v1/teams");
            setTeams(data.data.data)
        } catch (err) {
         console.log(err);
        }
    };

    useEffect(() => {
        getTeamsData();
    }, []);
    
    const columns = [
        {dataField: "name", text:"Team Name"},
        {dataField: "city", text:"City"},
        {dataField: "abbreviation", text:"Abbreviation"},
        {dataField: "conference", text:"Conference"},
        {dataField: "division", text:"Division"}
    ];

    return (
        <div>
            <BootStrapTable 
            keyField="id"
            data={teams}
            columns={columns}
            pagination={paginationFactory({ sizePerPage: 8, hideSizePerPage: true })}
            />
        </div>
    );
}

export default TeamList