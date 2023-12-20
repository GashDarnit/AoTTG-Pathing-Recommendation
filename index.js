function getDistance(a, b) {
    distanceA = Math.abs(a[0] - b[0]);
    distanceB = Math.abs(a[1] - b[1]);

    distance = Math.pow(distanceA, 2) + Math.pow(distanceB, 2);
    return Math.sqrt(distance);
}

function getSequence(start, pos, quadrants, adjacentQuadrants) {
    const visited = new Set();
    var current = start;
    var currentQuadrant = '.';
    var lowestVal = 100000;
    var lowestKey = '.';
    var entry = false;
    
    var sequence = []
    
    for(const node in pos) {
        const value = getDistance(current, pos[node]);
        
        if(value < lowestVal) {
            lowestVal = value;
            lowestKey = node;
        }
    }
    
    sequence.push(lowestKey);
    current = pos[lowestKey];
    
    while(Object.keys(quadrants).length > 1) {
        currentQuadrant = getQuadrant(lowestKey, quadrants);
        
        let remaining = quadrants[currentQuadrant];
        if(!entry) {
            remaining.splice(remaining.indexOf(lowestKey), 1);
            entry = true;
        }
        
        
        //get furthest node in the quadrant
        let highest = -1;
        let highestKey = '.';
        for(const node in remaining) {
            const value = getDistance(current, pos[remaining[node]]);
            
            if(value > highest) {
                highest = value;
                highestKey = remaining[node];
            }
        }
        
        sequence.push(highestKey);
        current = pos[highestKey];
        remaining.splice(remaining.indexOf(highestKey), 1);
        
        
        while(remaining.length > 0) {
            let lowest = 1000000000;
            let lowestKey = '.';
            
            for(const node in remaining) {
                const value = getDistance(current, pos[remaining[node]]);
                
                if(value < lowest) {
                    lowest = value;
                    lowestKey = remaining[node];
                }
            }
            
            sequence.push(lowestKey);
            current = pos[lowestKey];
            remaining.splice(remaining.indexOf(lowestKey), 1);
        }
        
        delete quadrants[currentQuadrant];
        for(const quadrant in adjacentQuadrants) {
            if(adjacentQuadrants[quadrant].includes('Q1')) {
                adjacentQuadrants[quadrant].splice(adjacentQuadrants[quadrant].indexOf(currentQuadrant), 1);
            }
        }
        
        
        let adjacents = adjacentQuadrants[currentQuadrant];
        let determineKey = '.';
        let determineVal = 10000000;
        for(const quadrant in adjacents) {
            let nodes = quadrants[adjacents[quadrant]];
            for(const node in nodes) {
                const val = getDistance(current, pos[nodes[node]]);
                
                if(val < determineVal) {
                    determineVal = val;
                    determineKey = nodes[node];
                }
            }
        }
        lowestKey = determineKey;
    }
    
    for(const quadrant in quadrants) {
        currentQuadrant = quadrant;
        let remaining = quadrants[quadrant];
        
        while(remaining.length > 0) {
            let lowest = 1000000000;
            lowestKey = '.';
            
            for(const node in remaining) {
                const value = getDistance(current, pos[remaining[node]]);
                
                if(value < lowest) {
                    lowest = value;
                    lowestKey = remaining[node];
                }
            }
            
            sequence.push(lowestKey);
            current = pos[lowestKey];
            remaining.splice(remaining.indexOf(lowestKey), 1);
        }
    }
    
    return sequence;
}

function getQuadrant(node, quadrants) {
    var currentQuadrant = ".";
    
    for(const quadrant in quadrants) {
        if(quadrants[quadrant].includes(node)) {
            currentQuadrant = quadrant;
        }
    }
    
    return currentQuadrant;
}

function generateQuadrant(coords, startingPos) {
    const quadrants = {
      'Q1': [],
      'Q2': [],
      'Q3': [],
      'Q4': [],
    };

    for (const node in coords) {
      const [x, y] = coords[node];

      const quadrant =
        x <= startingPos[0] && y <= startingPos[1] ? 'Q1' :
        x > startingPos[0] && y <= startingPos[1] ? 'Q2' :
        x <= startingPos[0] && y > startingPos[1] ? 'Q3' :
        'Q4';

      quadrants[quadrant].push(node);
    }
    
    return quadrants;
}

function test() {
    const startingPos = [3, 4];
    const coords = {};
    
    coords['A'] = [0, 0];
    coords['B'] = [2, 3];
    coords['C'] = [1, 8];
    coords['D'] = [5, 5];
    coords['E'] = [1, 3];
    coords['F'] = [7, 1];
    coords['G'] = [8, 1];
    coords['H'] = [6, 7];
    coords['I'] = [7, 8];
    
    const adjacentQuadrants = {
      'Q1': ['Q2', 'Q3'],
      'Q2': ['Q1', 'Q4'],
      'Q3': ['Q1', 'Q4'],
      'Q4': ['Q2', 'Q3'],
    };

    quadrants = generateQuadrant(coords, startingPos);
    let sequence = getSequence(startingPos, coords, quadrants, adjacentQuadrants);
    
    var printOut = "";
    for(const node in sequence) {
        printOut += sequence[node] + " -> "
    }
    
    console.log(printOut.slice(0, -3));
    
}

test();

