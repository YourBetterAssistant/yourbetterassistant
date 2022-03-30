from os import strerror
import subprocess
subprocess.call(["yarn", "-v"], stderr=quit(1), stdout=subprocess.DEVNULL)
subprocess.call(["yarn", "install"], stdout=subprocess.DEVNULL)
print("setup.project.status.sucess")
