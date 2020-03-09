import React from 'react'

interface IProps {
    x?: number
    y?: number
    width?: number
    height?: number

    temp?: string
}

export default function Empty(props: IProps) {
    return <div>{props.temp}</div>
}