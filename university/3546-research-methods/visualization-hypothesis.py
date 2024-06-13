import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import ttest_ind

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

plt.figure(figsize=(12, 6))

plt.subplot(1, 2, 1)
plt.hist(g1, bins=10, color='blue', alpha=0.7, rwidth=0.85)
plt.title('Histogram for group 1')
plt.xlabel('Memorized Words')
plt.ylabel('Amount of patients')

plt.subplot(1, 2, 2)
plt.hist(g2, bins=10, color='green', alpha=0.7, rwidth=0.85)
plt.title('Histogram for group 2')
plt.xlabel('Memorized Words')
plt.ylabel('Amount of patients')

plt.tight_layout()
plt.show()

plt.figure(figsize=(10, 6))
plt.boxplot([g1, g2], tick_labels=['Group 1', 'Group 2'], whis=1.5)

plt.title('Boxplots')
plt.ylabel('Memorized Words')
plt.grid(True, linestyle='--', alpha=0.7)

plt.show()

Q1 = np.percentile(g1, 25)
Q3 = np.percentile(g1, 75)
IQR = Q3 - Q1
lower_whisker = Q1 - 1.5 * IQR
upper_whisker = Q3 + 1.5 * IQR
outliers = g1[(g1 < lower_whisker) | (g1 > upper_whisker)]

print(f"Q1: {Q1}")
print(f"Q3: {Q3}")
print(f"IQR: {IQR}")
print(f"Lower Whisker: {lower_whisker}")
print(f"Upper Whisker: {upper_whisker}")
print(f"Outliers: {outliers}")

t_stat, p_value = ttest_ind(g1, g2)
print(f"T-Statistic: {t_stat:.4f}")
print(f"P-Value: {p_value:.4f}")
alpha = 0.05
if p_value > alpha:
    print("The null hypothesis can be accepted: There is no significant difference between the groups.")
else:
    print("The null hypothesis is rejected: There is a significant difference between the groups.")