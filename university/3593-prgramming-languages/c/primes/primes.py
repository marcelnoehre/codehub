def is_prime(n):
    if n <= 1 or (n % 2 == 0 and n != 2):
        return False
    for i in range(3, int(n ** 0.5) + 1, 2):
        if n % i == 0:
            return False
    return True

c, n = 0, 2
while c < 10000:
    if is_prime(n):
        c += 1
    n += 1    
    