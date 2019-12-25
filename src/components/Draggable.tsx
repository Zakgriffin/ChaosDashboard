import React, {useState} from 'react'
import {Rnd} from 'react-rnd'
import './Draggable.css'
const gridScale = 20


export default function WidgetContainer(props: any) {
    let [editable/*, setEditable*/] = useState(true)

    return <>
        {
            React.Children.map(props.children, (child) => {
                return <Widget child={child} editable={editable}/>
            })
        }
    </>
}

function Widget(props: any) {
    let {child, editable} = props
    let {x = 0, y = 0, width = 2, height = 2} = child.props
    x *= gridScale
    y *=  gridScale
    width *= gridScale
    height *= gridScale
    let [menuSelected, setMenuSelected] = useState(false)
    let menu = menuSelected ? <div className='widgetMenu'>AHHH</div> : null
    return (
        <>
            <Rnd className='draggable'
                default={{x, y, width, height}}
                dragGrid={[gridScale, gridScale]}
                resizeGrid={[gridScale, gridScale]}
                minHeight={height}
                minWidth={width}
                bounds='window'
                disableDragging={!editable}
                enableResizing={{
                    bottom: editable,
                    bottomLeft: editable,
                    bottomRight: editable,
                    left: editable,
                    right: editable,
                    top: editable,
                    topLeft: editable,
                    topRight: editable
                }}
                onDoubleClick={() => setMenuSelected(!menuSelected)}
            >
                {child}
            </Rnd>
            {menu}
        </>
    )
}