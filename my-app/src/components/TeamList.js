import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BootStrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import {Modal, Button, Row, Col } from 'react-bootstrap'

const TeamList = () => {
    const[teams, setTeams] = useState([]);
    const[games, setGames] = useState([]);
    const[modalInfo, setModalInfo] = useState([]);
    const[showModal, setShowModal] = useState(false);

    const[show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getTeamsData = async() => {
        try {
            const data = await axios.get("https://www.balldontlie.io/api/v1/teams");
            setTeams(data.data.data);
        } catch (err) {
         console.log(err);
        }
    };

    const getGameData = async() =>{
        try{
            const data = await axios.get("http://balldontlie.io/api/v1/games?seasons[]=2021");
            setGames(data.data.data);
        } catch(err){
            console.log(err);
        }
    };

    useEffect(() => {
        getTeamsData();
        getGameData();
    }, []);
    
    const columns = [
        {dataField: "name", text:"Team Name"},
        {dataField: "city", text:"City"},
        {dataField: "abbreviation", text:"Abbreviation"},
        {dataField: "conference", text:"Conference"},
        {dataField: "division", text:"Division"}
    ];

    const rowEvents = {
        onClick: (e, row) => {
            console.log(row);
            setModalInfo(row);
            toggleTrueFalse();
        },
    }

    const toggleTrueFalse= () => {
        setShowModal(handleShow);
    }

    let countGame = games.filter((game) => {
        return game.home_team.id === 1 || game.visitor_team === 1
    })

    console.log(countGame)

    const ModalContent = () => {
        return(
            <Modal show={show} onHide ={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {modalInfo.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-grid">
                <Row>
                    <Col xs={10} md={8}>
                    Team Full name 
                    </Col>
                    <Col xs={8} md={4}>
                    {modalInfo.full_name}
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} md={8}>
                    Total Games in 2021
                    </Col>
                    <Col xs={8} md={4}>
                        
                    </Col>
                </Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button vriant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <div>
            <BootStrapTable 
            keyField="id"
            data={teams}
            columns={columns}
            pagination={paginationFactory({ sizePerPage: 8, hideSizePerPage: true })}
            rowEvents={rowEvents}
            />
            {show ? <ModalContent /> : null}
        </div>
    );

}

export default TeamList