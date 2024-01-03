# MWave Chocolate Chrome Extension Video Loop Controller

This Chrome extension allow to manage Loop Video in supported pages.

This code is part of the original *MWave extension* to which several improvements have been added.

- Extension Popup bug fixed
- Graphical improvements
- More webs supported


It is developed for native use with **MWave Chocolate** controller setted in Video Mode. In this mode, controller emits multimedia keys.

```
- Button 1 -> <LEFT_ARROW>  : 37
- Button 2 -> <RIGHT_ARROW> : 39
- Button 3 -> <SPACE>       : 32 
- Button 4 -> <F13>         : 124
```

Buttons 1 - 3 are natively managed by browser player.
For create player loops this extension needs to be installed.

## Installation

Clone this repository and under Chrome:
1. Go to url : `chrome://extensions/`
2. Enable **Developer Mode**
3. Load Unpacked
4. Select cloned repository folder.

## Usage
Under supported pages:

- www.youtube.com
- www.bilibili.com
- www.domestika.org
- www.udemy.com

> Make PR to request other pages player support.

Pressing button 4 on **Chocolate** controller
1. The first press set Loop Start
2. The second press set Loop End
3. The third press set Loop Clear
