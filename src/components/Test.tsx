import React, {useState, useContext} from 'react'
import {ThemeContext} from '../contexts/ThemeContext'

export default function Test() {

    return <svg viewBox={'0 0 100 100'}>
        <rect width='20' height='20' fill='red'/>
        <text x='30' y='20' fill='white'>{0}</text>
    </svg>
}