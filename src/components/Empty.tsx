import React from 'react'

interface IProps {
    temp?: string
}

export default function Empty(props: IProps) {
    return <div>{props.temp}</div>
}