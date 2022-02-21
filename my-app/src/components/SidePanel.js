import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Moment from 'moment'

const SidePanel = (props) => {
    const[gameInfo, setGameInfo] = useState([]);
    const[home_team, setHome_team] = useState([]);
    const[visitor_team, setVisitor_team] = useState([]);
    const[games, setGames] = useState([]);

    const getGameData = async(id) =>{
        try{
            const data = await axios.get("https://www.balldontlie.io/api/v1/games", {
                params: {
                    seasons : [2021],
                    team_ids : [id]
                },
                headers: {
                    "Access-Control-Allow-Origin": "http://localhost:3000/"
                    }
            });
            setGameInfo(data.data.data[0]);
            setHome_team(data.data.data[0].home_team)
            setVisitor_team(data.data.data[0].visitor_team);
            setGames(data.data.meta);
        } catch(err){
            console.log(err);
        }
    };

    useEffect(() => {
        getGameData(props.modalInfo.id);
    }, []);

    return (
        <div className="sidepanel-wrapper">
            <div className="sidepanel">
                <div className="sidepanel-title">
                    <div className="team-name">{props.modalInfo.name}</div>
                    <button className="close-btn" onClick={props.handleClose}>X</button>
                </div>
                <div className="sidepanel-teamInfo">
                    <div className="teamInfo-left">
                        <span>Team Full Name</span>
                        <span>Total Games in 2021</span>
                    </div>
                    <div className="teamInfo-right">
                        <span>{props.modalInfo.full_name}</span>
                        <span>{games.total_count}</span>
                    </div>
                </div>

                <div className="game-details-title"> Random Game Details </div>

                <div className="sidelpanel-body">
                    <div className="body-left">
                        <span>Date</span>
                        <span>Home Team</span>
                        <span>Home Team Score</span>
                        <span>Visitor Team</span>
                        <span>Visitor Team Score</span>
                    </div>
                    <div className="body-right">
                        <span>{Moment(gameInfo.date).format("YYYY-MM-DD")}</span>
                        <span>{home_team.name}</span>
                        <span>{gameInfo.home_team_score}</span>
                        <span>{visitor_team.name} </span>
                        <span>{gameInfo.visitor_team_score}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidePanel
