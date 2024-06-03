'''
Module for the fold function which applies a binary operation incrementally over a list.

Functions:
    fold(op: Callable[[int, int], int], seq: List[int]) -> int
        Applies the binary operation op incrementally over the list seq.
'''

from functools import reduce
from typing import Callable, List
import doctest

def fold(op: Callable[[int, int], int], seq: List[int]) -> int:
    '''
    Apply a binary operation incrementally over a sequence of integers.

    Args:
        op (Callable[[int, int], int]): A binary operation.
        seq (List[int]): A list of integers to apply the operation on.

    Returns:
        int: The result of applying the operation over the list.

    Examples:
        >>> fold(lambda x, y: x + y, [3, 5, 7])
        15
        >>> fold(lambda x, y: x * y, [3, 5, 7])
        105
        >>> fold(lambda x, y: x + y, [3, 5, '7'])  # doctest: +IGNORE_EXCEPTION_DETAIL
        Traceback (most recent call last):
        ...
        TypeError: unsupported operand type(s) for +: 'int' and 'str'
        >>> fold(lambda x, y: x + y, [3, 5, None])  # doctest: +IGNORE_EXCEPTION_DETAIL
        Traceback (most recent call last):
        ...
        TypeError: unsupported operand type(s) for +: 'int' and 'NoneType'
    '''
    return reduce(op, seq)

if __name__ == '__main__':
    doctest.testmod()
    print(fold(lambda x, y: x + y, [3, 5, 7]))
    print(fold(lambda x, y: x * y, [3, 5, 7]))
