Countdown.js
============

Simple countdown element - requires jquery

# Usage

```
/**
 * function CountDown(seconds, endText, onlySeconds, hideWhenZero, callback)
 * @param {number} seconds: is number of seconds
 * @param {string} endText: the text to be displayed when countdown reaches zero
 * @param {boolean} onlySeconds: dont show hours / minutes - just seconds
 * @param {boolean} hideWhenZero: hide days/hours/minutes, when each reach zero
 * @param {function} callback: function to call when countdown reaches zero
 */
var cd = new Countdown(10000, 'The end', false, true, function( cdobj ){ console.log('countdown is done')});
// add to element
$('body').append(cd.getJQ());
//
// other functions
cd.stop()
cd.pause()
cd.start()
```
