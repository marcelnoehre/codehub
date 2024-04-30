import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * The Main class represents the entry point of the program.
 * It demonstrates the usage of shapes and sorting them based on area and textual representation.
 */
public class Main {
    /**
     * The main method is the entry point of the program.
     * It creates various shapes, sorts them based on area and textual representation,
     * and prints the sorted shapes along with their areas.
     *
     * @param args The command line arguments.
     */
    public static void main(String[] args) {
        List<Shape> shapes = new ArrayList<>();

        createShape(shapes, () -> new Point(5, 5));
        createShape(shapes, () -> new Line(new Point(0, 0), new Point(10, 10)));
        createShape(shapes, () -> new Circle(new Point(0, 0), 5));
        createShape(shapes, () -> new Rectangle(new Point(0, 0), 10, 15));
        createShape(shapes, () -> new Circle(new Point(0, 0), -1));
        createShape(shapes, () -> new Rectangle(new Point(0, 0), -10, 15));

        // Sorting shapes: area (descending) | textual (ascending)
        shapes.sort((s1, s2) -> {
            double difference = s2.calculateArea() - s1.calculateArea();
            if (difference != 0) {
                return Double.compare(difference, 0);
            }
            return s1.toString().compareTo(s2.toString());
        });

        System.out.println("\n##### SHAPES #####\n");
        for (Shape shape : shapes) {
            System.out.println(shape.toString());
            System.out.println("Area: " + shape.calculateArea() + " square pixels\n");
        }
    }

    /**
     * Creates a shape using the provided shape factory and adds it to the list of shapes.
     * If an IllegalArgumentException is thrown during shape creation, it prints the error message.
     *
     * @param shapes  The list of shapes.
     * @param factory The shape factory.
     */
    private static void createShape(List<Shape> shapes, ShapeFactory factory) {
        try {
            shapes.add(factory.create());
        } catch (IllegalArgumentException e) {
            System.out.println("IllegalArgumentException caught: " + e.getMessage());
        }
    }
}
