function Countdown(seconds, endText, onlySeconds, hideWhenZero, callback) {
	var _self = this;
	var paused = false;
	var running = true;
	var startTime = now();
	var $countdown= $('<ib />').addClass('countdown');
	var $d = $("<ib/>").addClass('days');
	var $h = $("<ib/>").addClass('hours');
	var $m = $("<ib/>").addClass('minutes');
	var $s = $("<ib/>").addClass('seconds');
	if( onlySeconds ) {
		$countdown.append($s);
	} else {
		$countdown.append(
			$d, 
			$('<ib />').addClass('countdown-split-days').html('&nbsp;days&nbsp;'), 
			$h,
			$('<ib />').addClass('countdown-split-hours').text(':'), 
			$m,
			$('<ib />').addClass('countdown-split-minutes').text(':'), 
			$s
			);
	}
	update();
	_self.stop = function() {
		running = false;
	};
	_self.pause = function() {
		paused = true;
	};
	_self.start = function() {
		if( !running ) {
			startTime = now();
		}
		running = true;
		paused = false;
		update();
	};
	_self.getJQ = function() {
		return $countdown;
	};
	function now() {
		return new Date().getTime() / 1000;
	}
	function update() {
		if( !running || paused ) {
			return;
		}
		var time = new Date().getTime() / 1000;
		var showSeconds = seconds - parseInt((time - startTime));
		if( showSeconds <= 0 ) {
			$countdown.html('' + endText);
			if( callback ) callback();
			return;
		}
		if( onlySeconds ) {
			$s.html('' + showSeconds);
		} else {
			var s = showSeconds % 60;
			var m = (showSeconds - s) / 60 % 60;
			var h = (showSeconds - s - (m * 60)) / 3600 % 24;
			var d = (showSeconds - s - (m * 60) - (h * 3600)) / 86400;
			$s.html(moreDigits(s,2));
			$m.html(moreDigits(m,2));
			$h.html(moreDigits(h,2));
			$d.html(d + '');
			if( hideWhenZero ) {
				if(m <= 0 ) $m.hide().next().hide();
				if(h <= 0 ) $h.hide().next().hide();
				if(d <= 0 ) $d.hide().next().hide();
			}
		}
		setTimeout(update, 1000);
	}
	function moreDigits(num,digits){
		digits = digits || 2;
		num = ""+num;
		while(num.length < digits)
		{
			num = "0"+num;
		}
		return num;
	}
	return _self;
	
}
