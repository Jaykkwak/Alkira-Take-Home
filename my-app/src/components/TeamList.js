import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SidePanel from './SidePanel'
import BootStrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

const {SearchBar} = Search

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
            <ToolkitProvider
            keyField="id"
            data={teams}
            columns={columns}
            search 
            > 
            {
                props => (
                    <div>
                        <div className='title'>NBA TEAMS</div>
                        <SearchBar {...props.searchProps} sr-only={"hello"}/>
                        <BootStrapTable 
                        {...props.baseProps}
                        rowEvents={rowEvents}
                        pagination={paginationFactory({ sizePerPage: 8, hideSizePerPage: true })}
                        />
                        {show ? <SidePanel modalInfo={modalInfo} handleClose={handleClose}/> : null}
                    </div>
                )
            }
            </ToolkitProvider>
        </div>
    );

}

export default TeamList