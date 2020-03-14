import { useEffect, useRef } from 'react'

//https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
export function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number, pie: boolean){
    function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
        var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0
      
        return {
          x: centerX + (radius * Math.cos(angleInRadians)),
          y: centerY + (radius * Math.sin(angleInRadians))
        }
    }

    var start = polarToCartesian(x, y, radius, endAngle)
    var end = polarToCartesian(x, y, radius, startAngle)

    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

    var d = pie ? [
        'M', x, y,
        'L', start.x, start.y, 
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        'L', x, y
    ].join(' ') : [
        'M', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ')

    return d       
}

export function mod(n1: number, n2: number) {
    return ((n1%n2)+n2)%n2
}

export function useInterval(callback: () => any, delay: number) {
    const savedCallback = useRef(callback)

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}