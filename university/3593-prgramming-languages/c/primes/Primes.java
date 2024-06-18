public class Primes {
    public static boolean isPrime(int n) {
        if (n <= 1 || (n % 2 == 0 && n != 2)) return false;
        for (int i = 3; i * i <= n; i += 2) {
            if (n % i == 0) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        for (int c = 0, n = 2; c < 10000; n++) {
            if (isPrime(n)) {
                c++;
            }
        }
    }
}