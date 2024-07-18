elim([], []).

elim([X, X | T], L) :-
    elim([X | T], L).

elim([X, Y | T], [X | L]) :-
    X \= Y,
    elim([Y | T], L).

elim([X], [X]).
