function getPermutations(str, prefix = "") {
    if (str.length === 0) {
        console.log(prefix);
        return;
    }

    for (let i = 0; i < str.length; i++) {
        let remaining = str.slice(0, i) + str.slice(i + 1); // removes current character
        getPermutations(remaining, prefix + str[i]);        // recurs with new string
    }
}

getPermutations("abc");

/*
  Output:
  abc
  acb
  bac
  bca
  cab
  cba
*/