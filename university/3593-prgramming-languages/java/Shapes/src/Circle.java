/**
 * Represents a circle shape.
 */
public class Circle implements Shape {
    private Point center;
    private double radius;

    /**
     * Constructs a circle with the specified center and radius.
     *
     * @param center the center point of the circle
     * @param radius the radius of the circle
     * @throws IllegalArgumentException if the radius is negative
     */
    public Circle(Point center, double radius) {
        if (radius < 0) {
            throw new IllegalArgumentException("Radius must be positive!");
        }
        this.center = center;
        this.radius = radius;
    }

    /**
     * Calculates the area of the circle.
     *
     * @return the area of the circle
     */
    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }

    /**
     * Returns a string representation of the circle.
     *
     * @return a string representation of the circle
     */
    @Override
    public String toString() {
        return "Circle: Center " + center.toString() + ", Radius: " + radius;
    }
}