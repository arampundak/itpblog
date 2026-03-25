started in the command line
```
mkdir -p ~/code
cd ~/code
python3 -m venv lerobot-env
source lerobot-env/bin/activate
python -m pip install --upgrade pip
git clone https://github.com/huggingface/lerobot.git
cd lerobot
pip install -e ".[feetech]"
```

got many new folders from hugging face

coulnt find the port, so i ran a check:
```
ls /dev/tty.* /dev/cu.* | grep -E 'usb|modem|serial|wch|usbserial'
```

and got
```
modem|serial|wch|usbserial'

/dev/cu.**usbmodem**2101

/dev/tty.**usbmodem**2101
```

so my port is `/dev/tty.usbmodem2101`

==Your arm is probably still **fully daisy-chained**==

``` bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/tty.usbmodem2101 \
  --robot.id=my_arm
```

my computer and board are talking, but the board is not detecting the motors attached to it.
I need to **configure the motors first**.



