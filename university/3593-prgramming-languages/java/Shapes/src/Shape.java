/**
 * The Shape interface represents a geometric shape.
 * It provides methods to calculate the area of the shape and
 * to convert the shape to a string representation.
 */
public interface Shape {
    /**
     * Calculates the area of the shape.
     *
     * @return the area of the shape
     */
    double calculateArea();

    /**
     * Converts the shape to a string representation.
     *
     * @return a string representation of the shape
     */
    String toString();
}
