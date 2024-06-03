def notify_call(f):
    def wrapper(*args, **kwargs):
        print(f'{f.__name__} was called')
        return f(*args, **kwargs)
    return wrapper

class mynum:
    def __init__(self, value):
        self.value = value

    @notify_call
    def __mul__(self, other):
        if isinstance(other, mynum):
            return mynum(self.value * other.value)
        
        return NotImplemented

    def __repr__(self):
        return f'mynum({self.value})'

if __name__ == '__main__':
    x = mynum(3) 
    y = mynum(2) 
    h = x * y 
    print(h)
