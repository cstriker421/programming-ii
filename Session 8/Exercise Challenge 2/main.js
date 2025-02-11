function lcsBasicDP(str1, str2) {       // basic DP table computation
    const m = str1.length, n = str2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}


function lcsOptimisedDP(str1, str2) {   // DP table computation with rolling array
    const m = str1.length, n = str2.length;
    let prev = Array(n + 1).fill(0);
    let curr = Array(n + 1).fill(0);

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                curr[j] = prev[j - 1] + 1;
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        [prev, curr] = [curr, prev];
    }

    return prev[n];
}

function lcsRecursiveMemo(str1, str2) { // recursive memoisation 
    const memo = new Map();

    function helper(i, j) {
        if (i === 0 || j === 0) return 0;
        const key = `${i},${j}`;
        if (memo.has(key)) return memo.get(key);

        let result;
        if (str1[i - 1] === str2[j - 1]) {
            result = 1 + helper(i - 1, j - 1);
        } else {
            result = Math.max(helper(i - 1, j), helper(i, j - 1));
        }

        memo.set(key, result);
        return result;
    }

    return helper(str1.length, str2.length);
}

// sample tests from Chat GPT
const testCases = [
    ["abcde", "ace"],
    ["abcdef", "acf"],
    ["AGGTAB", "GXTXAYB"],
    ["abcdefghij", "acegi"],
    ["", "abc"],
];

for (const [str1, str2] of testCases) {
    console.log("\nStrings:", str1, str2);

    console.time("Basic DP Time");
    console.log("Basic DP:", lcsBasicDP(str1, str2));
    console.timeEnd("Basic DP Time");

    console.time("Optimised DP Time");
    console.log("Optimised DP:", lcsOptimisedDP(str1, str2));
    console.timeEnd("Optimised DP Time");

    console.time("Recursive Memo Time");
    console.log("Recursive Memo:", lcsRecursiveMemo(str1, str2));
    console.timeEnd("Recursive Memo Time");
}

// sample outputs
// Strings: abcde ace
// Basic DP: 3
// Basic DP Time: 0.301ms
// Optimised DP: 3
// Optimised DP Time: 0.133ms
// Recursive Memo: 3
// Recursive Memo Time: 0.083ms

// Strings: abcdef acf
// Basic DP: 3
// Basic DP Time: 0.426ms
// Optimised DP: 3
// Optimised DP Time: 0.049ms
// Recursive Memo: 3
// Recursive Memo Time: 0.084ms

// Strings: AGGTAB GXTXAYB
// Basic DP: 4
// Basic DP Time: 0.029ms
// Optimised DP: 4
// Optimised DP Time: 0.035ms
// Recursive Memo: 4
// Recursive Memo Time: 0.079ms

// Strings: abcdefghij acegi
// Basic DP: 5
// Basic DP Time: 0.029ms
// Optimised DP: 5
// Optimised DP Time: 0.071ms
// Recursive Memo: 5
// Recursive Memo Time: 0.029ms

// Strings:  abc
// Basic DP: 0
// Basic DP Time: 0.015ms
// Optimised DP: 0
// Optimised DP Time: 0.015ms
// Recursive Memo: 0
// Recursive Memo Time: 0.015ms