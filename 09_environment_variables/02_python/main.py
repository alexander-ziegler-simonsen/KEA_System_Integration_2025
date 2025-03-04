from dotenv import load_dotenv
from dotenv import dotenv_values

import os
load_dotenv()
print(os.getenv("MY_SECRET"))

config = dotenv_values(".env")
print(config["MY_SECRET"])