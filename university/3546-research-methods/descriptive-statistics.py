import numpy as np

g1 = np.array([
    7,  5,  5,
    3,  4,  7, 
    3,  6,  1, 
    2, 10,  9, 
    3, 10,  2, 
    8,  5,  5, 
    8,  1,  2, 
    5,  1, 12, 
    8,  4, 15, 
    5,  3,  4
])

g2 = np.array([
    5,  3,  4, 
    4,  2,  3, 
    4,  5,  2, 
    5,  4,  7, 
    5,  4,  6,
    7,  6,  2, 
    8,  7,  8, 
    8,  7,  9, 
    9,  5,  7,
    8,  6,  6
])

g1_mean = np.mean(g1, axis=0)
g1_median = np.median(g1, axis=0)
g1_std = np.std(g1, axis=0)
g1_quartiles = np.percentile(g1, [0, 25, 50, 75, 100], axis=0)

print("##### Group 1 #####")
print("Mean:", round(g1_mean, 2))
print("Median:", g1_median)
print("Standard Deviation:", round(g1_std, 2))
print("Quartiles (0%, 25%, 50%, 75%, 100%):", g1_quartiles.tolist())

g2_mean = np.mean(g2, axis=0)
g2_median = np.median(g2, axis=0)
g2_std = np.std(g2, axis=0)
g2_quartiles = np.percentile(g2, [0, 25, 50, 75, 100], axis=0)

print("\n##### Group 2 #####")
print("Mean:", round(g2_mean, 2))
print("Median:", g2_median)
print("Standard Deviation:", round(g2_std, 2))
print("Quartiles (0%, 25%, 50%, 75%, 100%):", g2_quartiles.tolist())