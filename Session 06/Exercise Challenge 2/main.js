function towerOfHanoi(n, source, auxiliary, destination) {
    if (n <= 0) {
        console.log("Number of disks must be at least 1.");
        return;
    }
  
    if (n === 1) {
        console.log(`Move disk 1 from ${source} to ${destination}`);
        return;
    }
  
    towerOfHanoi(n - 1, source, destination, auxiliary);
  
    console.log(`Move disk ${n} from ${source} to ${destination}`);

    towerOfHanoi(n - 1, auxiliary, source, destination);
}

// input example:
towerOfHanoi(5, 'A', 'B', 'C');

//  output:
//  Move disk 1 from A to C
//  Move disk 2 from A to B
//  Move disk 1 from C to B
//  Move disk 3 from A to C
//  Move disk 1 from B to A
//  Move disk 2 from B to C
//  Move disk 1 from A to C
//  Move disk 4 from A to B
//  Move disk 1 from C to B
//  Move disk 2 from C to A
//  Move disk 1 from B to A
//  Move disk 3 from C to B
//  Move disk 1 from A to C
//  Move disk 2 from A to B
//  Move disk 1 from C to B
//  Move disk 5 from A to C
//  Move disk 1 from B to A
//  Move disk 2 from B to C
//  Move disk 1 from A to C
//  Move disk 3 from B to A
//  Move disk 1 from C to B
//  Move disk 2 from C to A
//  Move disk 1 from B to A
//  Move disk 4 from B to C
//  Move disk 1 from A to C
//  Move disk 2 from A to B
//  Move disk 1 from C to B
//  Move disk 3 from A to C
//  Move disk 1 from B to A
//  Move disk 2 from B to C
//  Move disk 1 from A to C