import os

def main():
    year = input('Year:')
    month = input('Month:')
    day = input('Day:')
    event = input('Event:')
    i = 1
    for file in os.listdir('images'):
        if file.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp')):
            os.rename(os.path.join('images', file), os.path.join('images', f'{year}-{month}-{day}-{event}-{str(i).zfill(3)}.{file.split('.')[-1]}'))
            i += 1


if __name__ == '__main__':
    main()
