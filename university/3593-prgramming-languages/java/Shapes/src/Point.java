/**
 * Represents a point in a two-dimensional space.
 * Implements the Shape interface.
 */
public class Point implements Shape {
    private int x;
    private int y;

    /**
     * Constructs a Point object with the specified x and y coordinates.
     *
     * @param x the x coordinate of the point
     * @param y the y coordinate of the point
     */
    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Calculates the area of the point.
     * Since a point has no area, it always returns 0.
     *
     * @return the area of the point (always 0)
     */
    @Override
    public double calculateArea() {
        return 0;
    }

    /**
     * Returns a string representation of the point.
     *
     * @return a string representation of the point in the format "Point: (x, y)"
     */
    @Override
    public String toString() {
        return "Point: (" + x + ", " + y + ")";
    }
}
