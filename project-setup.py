from os import strerror
import subprocess
#quit if stderr
cmd= subprocess.getstatusoutput("yarn -v")
if cmd[0] != 0:
    print("Yarn Is Not Installed")
    quit(1)
status=subprocess.call(["yarn", "ee"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
if status != 0:
    print("Yarn Error")
    quit(1)
print("setup.project.status.sucess")
