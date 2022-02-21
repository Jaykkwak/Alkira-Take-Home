import React from 'react'
import useEffect from 'react'

const SidePanel = (props) => {

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
                        <span>{props.games.total_count}</span>
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
                        <span>Date</span>
                        <span>Date</span>
                        <span>Date</span>
                        <span>Date</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SidePanel
