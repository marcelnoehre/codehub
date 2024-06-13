#include <stdio.h>
#include <stdlib.h>

bool is_prime(int n) {
    if (n <= 1 || (n % 2 == 0 && n != 2)) return false;
    for (int i = 3; i * i <= n; i += 2) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    for (int c = 0, n = 2; c < 10000; n++) {
        if (is_prime(n)) {
            printf("%d\n", n);
            c++;
        }
    }
}