/**
 * Represents a rectangle shape.
 */
class Rectangle implements Shape {
    private Point topLeft;
    private int width;
    private int height;

    /**
     * Constructs a rectangle with the specified top left point, width, and height.
     *
     * @param topLeft the top left point of the rectangle
     * @param width   the width of the rectangle
     * @param height  the height of the rectangle
     * @throws IllegalArgumentException if the width or height is negative
     */
    public Rectangle(Point topLeft, int width, int height) {
        if (width < 0) {
            throw new IllegalArgumentException("Width must be positive!");
        }
        if (height < 0) {
            throw new IllegalArgumentException("Height must be positive!");
        }
        this.topLeft = topLeft;
        this.width = width;
        this.height = height;
    }

    /**
     * Calculates the area of the rectangle.
     *
     * @return the area of the rectangle
     */
    @Override
    public double calculateArea() {
        return width * height;
    }

    /**
     * Returns a string representation of the rectangle.
     *
     * @return a string representation of the rectangle
     */
    @Override
    public String toString() {
        return "Rectangle: TopLeft " + topLeft.toString() + ", Width: " + width + ", Height: " + height;
    }
}
