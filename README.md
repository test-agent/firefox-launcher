# Test Agent Firefox Launcher

The intent is this module is never used directly as it is very low level
guts for launching firefox with a clean profile each time...

This should be used in conjunction with (test-agent)[https://github.com/test-agent/test-agent]

## Usage

(there is no node interface)

```sh
# if you installed with npm install -g
EXEC=test-agent-firefox-launcher
# if you installed with npm install
EXEC=./node_modules/.bin/test-aget-firefox-launcher

$EXEC --exec /path/to/firefox/folder $URL
```
