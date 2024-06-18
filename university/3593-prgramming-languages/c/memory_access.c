#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int *) malloc(sizeof(int));
    if (ptr == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    *ptr = 123;
    printf("Value of ptr: %d\n", *ptr);

    free(ptr);
    printf("Value of ptr after free: %d\n", *ptr);

    int offsets[] = { 0, 10, 100, 1000 };
    for (int i = 0; i < sizeof(offsets); i++) {
        int offset = offsets[i];
        printf("Value of ptr + %d: %d\n", offset, *(ptr + offset));
    }

    return 0;
}