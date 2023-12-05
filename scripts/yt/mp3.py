from pytube import YouTube

def main():
    url = input('URL: ')
    out = 'downloads'

    yt = YouTube(url)
    stream = yt.streams.filter(only_audio=True).first()

    print('Title:', yt.title)
    print('Author:', yt.author)
    print('Duration:', yt.length, 'seconds')
    print('Audio Codec:', stream.audio_codec)
    print('File size:', round(stream.filesize / (1024 * 1024), 2), "MB")
    
    stream.download(out, yt.title + '.mp3')

    print('Download completed successfully!')


if __name__ == '__main__':
    main()
