/*
    Why is Fibonacci Recursive O(2^n)?

    Each Fibonacci number is calculated recursively as:
    F(n) = F(n-1) + F(n-2)
   
    This means each function call spawns two new recursive calls.
    F(5) calls F(4) and F(3)
    F(4) calls F(3) and F(2), etc.

    The recursion forms a binary tree of function calls.
    Each level of recursion approximately doubles the number of calls.
    The depth of the recursion tree is `n`.

    Total recursive calls
    The number of calls follows T(n) = T(n-1) + T(n-2)
    This grows exponentially, leading to O(2^n) complexity.

Example Call Tree for fib(5):

             fib(5)
            /      \
       fib(4)      fib(3)
      /     \      /    \
  fib(3)   fib(2) fib(2) fib(1)
 /    \      |

    Not how fib(2) and fib(1) are recomputed multiple times.

    The optimised approach is memoisation (store computed values).
    This is because it reduces time complexity to O(n).
*/