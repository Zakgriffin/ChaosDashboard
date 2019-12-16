import * as React from 'react'
import {Rnd} from 'react-rnd'

export default function Draggable(props: any) {
    let [editable, setEditable] = React.useState(true)

    return (
        React.Children.map(props.children, (child) => {
            let {x = 0, y = 0, width = 40, height = 40} = child.props
            return <Rnd
                default={{x, y, width, height}}
                dragGrid={[20, 20]}
                resizeGrid={[20, 20]}
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
                >
                {child}
            </Rnd>
        })
    )
}