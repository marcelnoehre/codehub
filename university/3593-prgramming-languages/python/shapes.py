import math


class InvalidShapeCreation(Exception):
    pass


class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def area(self):
        return 0

    def __str__(self):
        return f'Point: ({self.x}, {self.y})'


class Line:
    def __init__(self, start_point, end_point):
        self.start_point = start_point
        self.end_point = end_point

    def area(self):
        return 0

    def __str__(self):
        return f'Line: Start - {self.start_point}, End - {self.end_point}'


class Circle:
    def __init__(self, center, radius):
        if radius <= 0:
            raise InvalidShapeCreation('Circle radius must be a positive number.')
        self.center = center
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

    def __str__(self):
        return f'Circle: Center - {self.center}, Radius - {self.radius}'


class Rectangle:
    def __init__(self, top_left, width, height):
        if width <= 0 or height <= 0:
            raise InvalidShapeCreation('Rectangle width and height must be positive numbers.')
        self.top_left = top_left
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def __str__(self):
        return f'Rectangle: Top Left - {self.top_left}, Width - {self.width}, Height - {self.height}'


def sort_shapes_by_area(shapes):
    return sorted(shapes, key=lambda shape: shape.area(), reverse=True)


def sort_shapes_by_text_representation(shapes):
    return sorted(shapes, key=lambda shape: str(shape))


shapes = [Point(1, 1), Line(Point(0, 0), Point(3, 4)), Circle(Point(0, 0), 5), Rectangle(Point(2, 2), 4, 3)]

# Sort by area
shapes = sort_shapes_by_area(shapes)
print("Sorted by area (descending):")
for shape in shapes:
    print(shape, "\nArea:", round(shape.area(), 3), '\n')

# Sort by text representation
shapes = sort_shapes_by_text_representation(shapes)
print("Sorted by text representation (ascending):")
for shape in shapes:
    print(shape, "\nArea:", round(shape.area(), 3), '\n')

try:
    invalid_circle = Circle(Point(0, 0), -5)
except InvalidShapeCreation as e:
    print(f"Error: {e}")

try:
    invalid_rectangle = Rectangle(Point(2, 2), -4, 3)
except InvalidShapeCreation as e:
    print(f"Error: {e}")
