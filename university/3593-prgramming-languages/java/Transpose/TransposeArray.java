import java.util.Arrays;

public class TransposeArray {

    public static void main(String[] args) {
        int[][] matrix = {{1,2,3},{4,5,6},{7,8,9}};
        print(matrix);
        print(transpose(matrix));
    }

    private static int[][] transpose(int[][] matrix) {
        int[][] transposedMatrix = new int[matrix.length][matrix[0].length];
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[i].length; j++) {
                transposedMatrix[j][i] = matrix[i][j];
            }
        }
        return transposedMatrix;
    }

    private static void print(int[][] matrix) {
        System.out.println(Arrays.deepToString(matrix));
    }

}