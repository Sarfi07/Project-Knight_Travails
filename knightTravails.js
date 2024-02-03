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

function knightMoves(start, end, queue = [new Node(start)], visitedNodes = [[start]]) {
    // possible moves
    const possibleMoves = [
        [1, 2], [1, -2],
        [2, 1], [2, -1],
        [-1, 2], [-1, -2],
        [-2, 1], [-2, -1]
    ]

    // base case
    if (start[0] === end[0] && start[1] === end[1]) return printMoves(start, queue.shift());

    if (!queue.length) return;

    const currentPosition = queue.shift();

    possibleMoves.forEach(move => {
        const newX = move[0] + currentPosition.data[0];
        const newY = move[1] + currentPosition.data[1];

        // check if newPosition is out of bound
        if (newX < 0 || newX > 7 && newY < 0 || newY > 7) return;

        // make new position node
        const newPosition = Node([newX, newY]);

        if (!isVisited(newPosition, visitedNodes)) {
            queue.push(newPosition);
            
            newPosition.path = currentPosition.path.concat(newPosition.path);
        }
    })

    return knightMoves(queue[0].data, end, queue, visitedNodes)
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


console.log(knightMoves([0, 0], [3, 3]));
