import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SidePanel from './SidePanel'
import BootStrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'


const TeamList = () => {
    const[teams, setTeams] = useState([]);
    const[modalInfo, setModalInfo] = useState([]);

    const[show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const getTeamsData = async() => {
        try {
            const data = await axios.get("https://www.balldontlie.io/api/v1/teams", {
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000/"
                    }
            });
            setTeams(data.data.data);
        } catch (err) {
         console.log(err);
        }
    };

    useEffect(() => {
        getTeamsData();
    }, []);
    
    const columns = [
        {dataField: "name", text:"Team Name", sort:"true"},
        {dataField: "city", text:"City", sort:"true"},
        {dataField: "abbreviation", text:"Abbreviation"},
        {dataField: "conference", text:"Conference"},
        {dataField: "division", text:"Division"}
    ];

    const rowEvents = {
        onClick: (e, row) => {
            console.log(row);
            setModalInfo(row)
            setShow(true);
        },
    }

    return (
        <div>
            <BootStrapTable 
            keyField="id"
            classes="teamTable"
            data={teams}
            columns={columns}
            pagination={paginationFactory({ sizePerPage: 8, hideSizePerPage: true })}
            rowEvents={rowEvents}
            />
            {show ? <SidePanel modalInfo={modalInfo} handleClose={handleClose}/> : null}
        </div>
    );

}

export default TeamList