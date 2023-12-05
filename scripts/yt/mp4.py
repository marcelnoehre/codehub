from pytube import YouTube

def main():
    url = input('URL: ')
    out = 'downloads'

    yt = YouTube(url)
    stream = yt.streams.get_highest_resolution()

    print('Title:', yt.title)
    print('Author:', yt.author)
    print('Duration:', yt.length, 'seconds')
    print('Resolution:', stream.resolution)
    print('File size:', round(stream.filesize / (1024 * 1024), 2), "MB")
    
    stream.download(out)

    print('Download completed successfully!')


if __name__ == '__main__':
    main()