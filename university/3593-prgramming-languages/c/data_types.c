#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

union DoubleUnion {
    double d;
    uint64_t u;
};

void convertDouble(double num, int* bitRep) {
    union DoubleUnion du;
    du.d = num;
    uint64_t mask = 1ULL << 63;
    for (int i = 0; i < 64; i++) {
        bitRep[i] = (du.u & mask) ? 1 : 0;
        mask >>= 1;
    }
}

void printBitRep(double num) {
    int bitRep[64];
    convertDouble(num, bitRep);
    printf("The Double % .15g in binary is: ", num);
    for (int i = 0; i < 64; ++i) {
        printf("%d", bitRep[i]);
    }
    printf("\n");
}

int main() {
    double numbers[] = { 0.0, 0.1, 1.0, 100.0, 1e+9, -0.0, -10.0, -4.4e-30 };
    int count = sizeof(numbers) / sizeof(numbers[0]);
    for (int i = 0; i < count; ++i) {
        printBitRep(numbers[i]);
    }
    return 0;
}