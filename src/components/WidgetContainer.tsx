import React, {useState} from 'react'


const GRID_SCALE = window.innerWidth / 16

interface IWidgetContainerProps {
    children: JSX.Element[]
}

export default function WidgetContainer(props: IWidgetContainerProps) {
    let [editable] = useState(true)

    const pad = 10

    return <> {
        React.Children.map(props.children, (child) => {
            let {x = 0, y = 0, width = 2, height = 2} = child.props
            
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
                    backgroundColor: '#2e2e2e',
                    width: width - pad,
                    height: height - pad,
                    transform: `translate(${pad / 2}px, ${pad / 2}px)`
                }}>
                    {child}
                </div>
            </div>
        })
    } </>
}