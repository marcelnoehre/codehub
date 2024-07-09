len([], 0).
len([_|L], N) :- len(L, M), N is M + 1.

len([1, 2, 3, 4, 5], N).
# N = 5