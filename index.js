function getDistance(a, b) {
    distanceA = Math.abs(a[0] - b[0]);
    distanceB = Math.abs(a[1] - b[1]);

    distance = Math.pow(distanceA, 2) + Math.pow(distanceB, 2);
    return Math.sqrt(distance);
}

function getSequence(start, pos) {
    var current = start;
    var remaining = {};
    var lowest = 10000;
    var lowestKey = '.';
    
    var sequence = [];
    
    for(const node in pos) {
        remaining[node] = getDistance(current, pos[node]);
    }
    
    
    while(Object.keys(remaining).length > 0) {
        for(const node in remaining) {
            remaining[node] = getDistance(current, pos[node]);
            
            const value = remaining[node];
            if(value < lowest) {
                lowest = value;
                lowestKey = node;
            }
        }
        
        sequence.push(lowestKey);
        current = pos[lowestKey];
        lowest = 10000000;
        delete remaining[lowestKey];
        
    }
    return sequence;
}

function test() {
    var coords = {};
    const startingPos = [3, 4];

    coords['A'] = [0, 0];
    coords['B'] = [2, 3];
    coords['C'] = [1, 8];
    coords['D'] = [5, 5];
    coords['E'] = [1, 3];
    coords['F'] = [7, 1];
    coords['G'] = [8, 1];
    coords['H'] = [6, 7];
    coords['I'] = [7, 8];
    
    let sequence = getSequence(startingPos, coords);
    var printOut = "";
    for(const node in sequence) {
        printOut += sequence[node] + " -> "
    }
    
    console.log(printOut);
}

test();

