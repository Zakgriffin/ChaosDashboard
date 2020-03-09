import React from 'react'


const GRID_SCALE = window.innerWidth / 16

interface IWidgetContainerProps {
    children: Widget[]
}

interface Widget {
    props: IWidgetProps
}

interface IWidgetProps {
    x?: number
    y?: number
    width?: number
    height?: number
    backColor?: boolean
    children: any
}

export function Widget(props: IWidgetProps) {
    return <></>
}

export function WidgetContainer(props: IWidgetContainerProps) {
    const pad = 10

    return <> {
        React.Children.map(props.children, (widget) => {
            let {
                x = 0,
                y = 0,
                width = 2,
                height = 2,
                backColor = true
            } = widget.props
            
            x *= GRID_SCALE
            y *= GRID_SCALE
            width *= GRID_SCALE
            height *= GRID_SCALE

            return <div style={{
                position: 'fixed',
                width,
                height,
                transform: `translate(${x}px, ${y}px)`
            }}>
                <div style={{
                    backgroundColor: backColor ? '#2e2e2e' : 'none',
                    width: width - pad,
                    height: height - pad,
                    transform: `translate(${pad / 2}px, ${pad / 2}px)`,
                    borderRadius: 6
                }}>
                    {widget.props.children}
                </div>
            </div>
        })
    } </>
}