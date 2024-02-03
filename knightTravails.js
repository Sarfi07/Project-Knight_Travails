// a node representing all eight possible moves for the kinght;
function Node(data, path=[[data]]) {
    return {
        data,
        path
    }
}


// searching the fastest route

function knightMoves(start, end, queue = [Node(start)], visitedNodes = {}) {
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

        // used for of because using forEach was not terminating the while correctly
        for (const move of possibleMoves) {
            const newX = move[0] + currentPos.data[0];
            const newY = move[1] + currentPos.data[1];

            if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                const newPos = Node([newX, newY]);
                newPos.path = currentPos.path.concat(newPos.path);

                const posKey = `${newX},${newY}`;

                if (posKey === `${end[0]},${end[1]}`) return printMoves(start, newPos);

                // using hash for constant time complexity in checking visited Nodes;
                if (!visitedNodes[posKey]) {
                    visitedNodes.posKey = true;
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


console.log(knightMoves([0, 0], [7, 7]));
