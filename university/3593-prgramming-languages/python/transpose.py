import numpy as np

def main():
    # Explicit iteration
    m = [[1,2,3],[4,5,6],[7,8,9]]
    for i in range(len(m)):
        for j in range(i, len(m)):
            m[i][j], m[j][i] = m[j][i], m[i][j]
    assert m == [[1,4,7],[2,5,8],[3,6,9]]
    
    # List Comprehension
    m = [[1,2,3],[4,5,6],[7,8,9]]
    m = [[m[j][i] for j in range(len(m))] for i in range(len(m[0]))]
    assert m == [[1,4,7],[2,5,8],[3,6,9]]

    # Zip
    m = [[1,2,3],[4,5,6],[7,8,9]]
    m = list(zip(*m))
    assert m == [(1,4,7),(2,5,8),(3,6,9)]

    # Numpy
    m = np.arange(1, 10).reshape(3, 3)
    assert np.array_equal(m.T, np.array([[1,4,7],[2,5,8],[3,6,9]]))


if __name__ == '__main__':
    main()
