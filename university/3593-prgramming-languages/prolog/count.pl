count_elem([], 0).

count_elem([H | T], Count) :-
    length(H, L),
    count_elem(T, CountT),
    Count is L + CountT.
