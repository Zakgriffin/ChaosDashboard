import React from 'react'
import fs from 'fs'

export interface ITeamInfo {
    number: number
    color: string
    name: string
    logo: JSX.Element
}

const defaultTeamInfo = loadTeamInfo('default')

const allTeamInfo: {[teamNumber: string]: ITeamInfo} = {}
let teamDirs = fs.readdirSync('./src/teamInfo')
for(let teamNumber of teamDirs) {
    if(!fs.lstatSync('./src/teamInfo/' + teamNumber).isDirectory()) continue

    let teamInfo = loadTeamInfo(teamNumber)
    allTeamInfo[teamNumber] = teamInfo
    //teamInfo = Object.assign(defaultTeamInfo, teamInfo)
}

function loadTeamInfo(teamNumber: string | number): ITeamInfo {
    let teamInfo = {} as ITeamInfo
    let srcTeamPath = `./src/teamInfo/${teamNumber}`

    let teamInfoPath = srcTeamPath + '/info.json'
    if(fs.existsSync(teamInfoPath)) {
        let teamInfoRaw = fs.readFileSync(teamInfoPath)
        teamInfo = JSON.parse(teamInfoRaw.toString())
    } else {
        console.error(`You are missing a teamInfo.json for team ${teamNumber}`)
    }

    let teamLogoPath = srcTeamPath + '/logo.svg'
    if(teamNumber === 'default') return teamInfo // TEMP
    if(fs.existsSync(teamLogoPath)) {
        import(`./${teamNumber}/logo.svg`).then(teamLogo => {
            teamInfo.logo = <img src={teamLogo.default}/>
        })
    } else {
        console.error(`You are missing a logo for team ${teamNumber}`)
    }
    return teamInfo
}

export function getTeamInfo(teamNumber: number): ITeamInfo {
    return allTeamInfo[teamNumber] || defaultTeamInfo
}

// TEMP
defaultTeamInfo.logo = <svg viewBox='0 0 100 100'>
    <circle cx='50' cy='50' r='50' fill='#111'/>
    <text x='50' y='50' fill='white' alignmentBaseline='central' textAnchor='middle' fontSize='75'>?</text>
</svg>