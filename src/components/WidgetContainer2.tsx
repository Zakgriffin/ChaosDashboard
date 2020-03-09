import React, {useState} from 'react'
import Draggable from 'react-draggable'


const GRID_SCALE = 1280 / 16

interface IWidgetContainerProps {
    children: JSX.Element[]
}

interface IWidget {
    props: {
        x: number
        y: number
        width: number
        height: number
        fixed?: boolean
    }
}

interface IWidgetWrapperProps {
    child: IWidget
    editable: boolean
}

export default function WidgetContainer(props: IWidgetContainerProps) {
    let [editable] = useState(true)

    return <> {
        React.Children.map(props.children, (child) => {
            return <Widget child={child} editable={editable}/>
        })
    } </>
}

function Widget(props: IWidgetWrapperProps) {
    let {child, editable} = props
    let {x = 0, y = 0, width = 2, height = 2} = child.props
    
    x *= GRID_SCALE
    y *= GRID_SCALE
    width *= GRID_SCALE
    height *= GRID_SCALE

    return <Draggable
        defaultPosition={{x, y}}
        grid={[GRID_SCALE, GRID_SCALE]}
    >  
        <div style={{
            width: `${width}px`,
            height: `${height}px`,
            background: '#2e2e2e',
            //border: editable ? '3px dashed #ffffff66' : ''
        }}>
            {props.child}
        </div>
    </Draggable>
}