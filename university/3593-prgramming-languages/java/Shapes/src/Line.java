/**
 * Represents a line in a two-dimensional space.
 */
public class Line implements Shape {
    private Point start;
    private Point end;

    /**
     * Constructs a line with the specified start and end points.
     *
     * @param start the starting point of the line
     * @param end the ending point of the line
     */
    public Line(Point start, Point end) {
        this.start = start;
        this.end = end;
    }

    /**
     * Calculates the area of the line.
     * Since a line has no area, this method always returns 0.
     *
     * @return the area of the line (always 0)
     */
    @Override
    public double calculateArea() {
        return 0;
    }

    /**
     * Returns a string representation of the line.
     *
     * @return a string representation of the line
     */
    @Override
    public String toString() {
        return "Line: " + start.toString() + " to " + end.toString();
    }
}