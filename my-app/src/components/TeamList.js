import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BootStrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'
import {Modal, Button, Row, Col } from 'react-bootstrap'
import Moment from 'moment'

const TeamList = () => {
    const[teams, setTeams] = useState([]);
    const[gameInfo, setGameInfo] = useState([]);
    const[home_team, setHome_team] = useState([]);
    const[visitor_team, setVisitor_team] = useState([]);
    const[games, setGames] = useState([]);
    const[modalInfo, setModalInfo] = useState([]);
    const[showModal, setShowModal] = useState(false);

    const[show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const getGameData = async(row) =>{
        try{
            const data = await axios.get("https://www.balldontlie.io/api/v1/games", {
                params: {
                    seasons : [2021],
                    team_ids : [row.id]
                },
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000/"
                    }
            });
            setModalInfo(row)
            setGameInfo(data.data.data[0]);
            setHome_team(data.data.data[0].home_team)
            setVisitor_team(data.data.data[0].visitor_team);
            setGames(data.data.meta);
        } catch(err){
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

    const toggleTrueFalse= () => {
        setShowModal(handleShow);
    }

    const rowEvents = {
        onClick: (e, row) => {
            console.log(row);
            getGameData(row);
            toggleTrueFalse();
        },
    }

    console.log(gameInfo);

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
                        {games.total_count}
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} md={8}>
                        Random Game Details:
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} md={8}>
                        Date:
                    </Col>
                    <Col xs={8} md={4}>
                        {Moment(gameInfo.date).format("YYYY-MM-DD")}
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} md={8}>
                        Home Team:
                    </Col>
                    <Col xs={8} md={4}>
                         {home_team.name}
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} md={8}>
                        Home Team Score:
                    </Col>
                    <Col xs={8} md={4}>
                        {gameInfo.home_team_score}
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} md={8}>
                        Visitor Team:
                    </Col>
                    <Col xs={8} md={4}>
                         {visitor_team.name} 
                    </Col>
                </Row>
                <Row>
                    <Col xs={10} md={8}>
                        Visitor Team Score:
                    </Col>
                    <Col xs={8} md={4}>
                        {gameInfo.visitor_team_score}
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