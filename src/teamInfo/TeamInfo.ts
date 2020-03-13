import fs from 'fs'

export interface ITeamInfo {
    number: number
    color: string
    name: string
}

const defaultTeamInfo: ITeamInfo = {
    number: -1,
    color: 'white',
    name: 'None'
}

const allTeamInfo: {[teamNumber: string]: ITeamInfo} = {}
let dir = fs.readdirSync('./src/teamInfo')
for(let teamNumber of dir) {
    if(teamNumber.includes('.')) continue
    try {
        let teamInfoRaw = fs.readFileSync(`./src/teamInfo/${teamNumber}/teamInfo.json`)
        let teamInfo = JSON.parse(teamInfoRaw.toString())
        allTeamInfo[teamNumber] = teamInfo
    } catch {
        console.error(`You are missing a teamInfo.json for team ${teamNumber}`)
    }
}

export function getTeamInfo(teamNumber: number): ITeamInfo {
    return allTeamInfo[teamNumber] || defaultTeamInfo
}