import React from 'react'
import fs from 'fs'

// import ChaosLogo from './2458/Logo'

export interface ITeamInfo {
    number: number
    color: string
    name: string
    logo: () => JSX.Element
}

const defaultTeamInfo: ITeamInfo = {
    number: -1,
    color: 'white',
    name: 'None',
    logo: () => <svg viewBox='0 0 100 100'>
        <circle cx={50} cy={50} r={50} fill='white'/>
    </svg>
}

const allTeamInfo: {[teamNumber: string]: ITeamInfo} = {}
let dir = fs.readdirSync('./src/teamInfo')
for(let teamNumber of dir) {
    if(teamNumber.includes('.')) continue

    let srcTeamPath = `./src/teamInfo/${teamNumber}`

    let teamInfoPath = srcTeamPath + '/info.json'
    if(fs.existsSync(teamInfoPath)) {
        let teamInfoRaw = fs.readFileSync(teamInfoPath)
        let teamInfo = JSON.parse(teamInfoRaw.toString())
        allTeamInfo[teamNumber] = teamInfo
    } else {
        allTeamInfo[teamNumber] = defaultTeamInfo
        console.error(`You are missing a teamInfo.json for team ${teamNumber}`)
    }

    let teamLogoPath = srcTeamPath + '/logo.jsx'
    if(fs.existsSync(teamLogoPath)) {
        import(`./${teamNumber}/logo.jsx`).then(teamLogo => {
            allTeamInfo[teamNumber].logo = teamLogo.default
        })
    } else {
        allTeamInfo[teamNumber].logo = defaultTeamInfo.logo
        console.error(`You are missing a logo for team ${teamNumber}`)
    }
}

export function getTeamInfo(teamNumber: number): ITeamInfo {
    return allTeamInfo[teamNumber] || defaultTeamInfo
}