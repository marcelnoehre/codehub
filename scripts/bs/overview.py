import requests

def load_api_key(file_path="api.key"):
    try:
        with open(file_path, "r") as file:
            return file.read().strip()
    except FileNotFoundError:
        print("Error: API key file not found!")
        exit(1)

URL = f"https://api.brawlstars.com/v1/players/%232QPU0PV9C"
HEADERS = {
    "Authorization": f"Bearer {load_api_key()}",
    "Accept": "application/json"
}

def get_brawlers():
    response = requests.get(URL, headers=HEADERS)
    if response.status_code == 200:
        data = response.json()
        return data.get("brawlers", [])
    else:
        print(f"Error {response.status_code}: {response.text}")
        return None

def get_color(trohies):
    if trohies < 80:
        return "\x1b[38;5;215m"
    elif trohies < 180:
        return "\x1b[38;5;15m"
    elif trohies < 280:
        return "\x1b[38;5;220m"
    elif trohies < 380:
        return "\x1b[38;5;45m"
    elif trohies < 480:
        return "\x1b[38;5;213m"
    elif trohies < 580:
        return "\x1b[38;5;77m"
    elif trohies < 680:
        return "\x1b[38;5;9m"
    elif trohies < 780:
        return "\x1b[38;5;98m"
    elif trohies < 880:
        return "\x1b[38;5;159m"	
    elif trohies < 1000:
        return "\x1b[38;5;219m"
    else:
        return "\x1b[4;38;5;201m"

def print_brawler(brawler):
    trophies = brawler.get("trophies", 0)
    color = "\x1b[0m\x1b[37m"
    print(f"{get_color(trophies)}{brawler.get("name", "")}{color} {trophies}{color}")
    
if __name__ == "__main__":
    for brawler in sorted(get_brawlers(), key=lambda x: x.get("trophies", 0), reverse=True):
        print_brawler(brawler)
