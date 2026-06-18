export function getIconGeometry(shapeIndex) {
    const lines = [];
    const arcs = [];
    const circles = [];
    const dots = [];

    const addRect = (x, y, w, h) => {
        lines.push({x1: x, y1: y, x2: x+w, y2: y});
        lines.push({x1: x+w, y1: y, x2: x+w, y2: y+h});
        lines.push({x1: x+w, y1: y+h, x2: x, y2: y+h});
        lines.push({x1: x, y1: y+h, x2: x, y2: y});
    };

    if (shapeIndex === 0) {
        circles.push({cx: 12, cy: 11, r: 3});
        arcs.push({cx: 12, cy: 20, r: 5, start: Math.PI, end: 2 * Math.PI}); 
        circles.push({cx: 5.5, cy: 13, r: 2.2});
        arcs.push({cx: 5.5, cy: 20, r: 4, start: Math.PI, end: 1.7 * Math.PI});
        circles.push({cx: 18.5, cy: 13, r: 2.2});
        arcs.push({cx: 18.5, cy: 20, r: 4, start: 1.3 * Math.PI, end: 2 * Math.PI});
    } else if (shapeIndex === 1) {
        arcs.push({cx: 9.5, cy: 10.5, r: 5.5, start: 0.8 * Math.PI, end: 2.5 * Math.PI});
        lines.push({x1: 9.5 + 5.5 * Math.cos(0.8 * Math.PI), y1: 10.5 + 5.5 * Math.sin(0.8 * Math.PI), x2: 6, y2: 17});
        lines.push({x1: 6, y1: 17, x2: 9.5 + 5.5 * Math.cos(0.5 * Math.PI), y2: 10.5 + 5.5 * Math.sin(0.5 * Math.PI)});
        
        dots.push({cx: 6.5, cy: 10.5, r: 0.8});
        dots.push({cx: 9.5, cy: 10.5, r: 0.8});
        dots.push({cx: 12.5, cy: 10.5, r: 0.8});

        arcs.push({cx: 15.5, cy: 14, r: 4.5, start: -0.4 * Math.PI, end: 0.4 * Math.PI});
        lines.push({x1: 15.5 + 4.5 * Math.cos(0.4 * Math.PI), y1: 14 + 4.5 * Math.sin(0.4 * Math.PI), x2: 19, y2: 20});
        lines.push({x1: 19, y1: 20, x2: 15.5 + 4.5 * Math.cos(0.1 * Math.PI), y2: 14 + 4.5 * Math.sin(0.1 * Math.PI)});
    } else if (shapeIndex === 2) {
        addRect(4, 14, 3, 7);
        addRect(9, 7, 3, 14);
        
        lines.push({x1: 14, y1: 15, x2: 14, y2: 5});
        lines.push({x1: 14, y1: 5, x2: 17, y2: 5});
        lines.push({x1: 17, y1: 5, x2: 17, y2: 14});

        circles.push({cx: 17, cy: 18, r: 3.5});
        lines.push({x1: 19.5, y1: 20.5, x2: 22, y2: 23});
    }

    return { lines, arcs, circles, dots };
}
