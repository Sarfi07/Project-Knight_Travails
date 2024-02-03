// a node representing all eight possible moves for the kinght;
function Node(data, path=[[data]]) {
    return {
        data,
        path
    }
}


// a tree representing all the possible move
function isVisited(node, array) {
    array.forEach(element => {
        if (element[0] === node.data[0] && element[1] === node.data[1]) return true;
    })

    array.push([node.x, node.y]);
    return false;
}

// searching the fastest route

function knightMoves(start, end, queue = [Node(start)], visitedNodes = [[start]]) {
    // possible moves
    const possibleMoves = [
        [1, 2], [1, -2],
        [2, 1], [2, -1],
        [-1, 2], [-1, -2],
        [-2, 1], [-2, -1]
    ]

    // base case
    if (start[0] === end[0] && start[1] === end[1]) return queue.shift();

    // check for empty queue
    if (!queue.length) return;

    while (queue.length) {
        const currentPos = queue.shift();

        for (const move of possibleMoves) {
            const newX = move[0] + currentPos.data[0];
            const newY = move[1] + currentPos.data[1];

            if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                const newPos = Node([newX, newY]);
                newPos.path = currentPos.path.concat(newPos.path);


                if (end[0] === newX && end[1] === newY) return printMoves(start, newPos);

                if (!isVisited(newPos, visitedNodes)) {
                    visitedNodes.push(newPos);
                    queue.push(newPos);
                }
            }
        }
    }
}

function printMoves(start, node) {
    const movesPath = node.path;
    let resultStr = `You made it in ${movesPath.length - 1}! Here's your path:\n`;

    movesPath.forEach(move => {
        const l = `[${move}]\n`;
        resultStr = resultStr + l;
    })
    return resultStr;
}


console.log(knightMoves([0, 0], [4, 5]));
