function Countdown(seconds, endText, onlySeconds, hideWhenZero, callback) {
	var _self = this;
	var paused = false;
	var running = true;
	var startTime = now();
	var seconds = seconds;
	var $countdown= $('<ib />').addClass('countdown');
	var $d = $("<ib/>").addClass('days');
	var $h = $("<ib/>").addClass('hours');
	var $m = $("<ib/>").addClass('minutes');
	var $s = $("<ib/>").addClass('seconds');
	var $splitD = $('<ib />').addClass('countdown-split-days').html('&nbsp;days&nbsp;');
	var $splitH = $('<ib />').addClass('countdown-split-hours').text(':');
	var $splitM = $('<ib />').addClass('countdown-split-minutes').text(':');
	var $splitS = $('<ib />').addClass('countdown-split-seconds').text('').hide();
	if ( onlySeconds === 'highest') {
		$splitD.html('d');
		$splitH.html('h');
		$splitM.html('m');
		$splitS.html('s');
	}
	if ( onlySeconds === true ) {
		$countdown.append($s);
	} else {
		$countdown.append(
			$d, 
			$splitD,
			$h,
			$splitH,
			$m,
			$splitM,
			$s,
			$splitS
			);
	}
	update();
	_self.addSeconds = function(secs) {
		seconds += secs;
	};
	_self.setSeconds = function(secs) {
		seconds = secs;
	};
	_self.resetSeconds = function(secs) {
		if (secs) seconds = secs;
		startTime = now();
	};
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
	_self.setSplitterHtml = function(dd,hh,mm,ss) {
		if(typeof dd !== 'undefined') $splitD.html(dd);
		if(typeof hh !== 'undefined') $splitH.html(hh);
		if(typeof mm !== 'undefined') $splitM.html(mm);
		if(typeof ss !== 'undefined') $splitS.html(ss);
	};
	function now() {
		return new Date().getTime() / 1000;
	}
	function update() {
		if (!running || paused) {
			return;
		}
		var time = new Date().getTime() / 1000;
		var showSeconds = seconds - parseInt((time - startTime));
		if (showSeconds <= 0) {
			if (endText) $countdown.html(endText);
			if( callback ) callback(_self);
			return;
		}
		style(showSeconds);
		setTimeout(update, 1000);
	}
	function style (showSeconds) {
		if (onlySeconds === 'highest') {
			var s = showSeconds % 60;
			var m = (showSeconds - s) / 60 % 60;
			var h = (showSeconds - s - (m * 60)) / 3600 % 24;
			var d = (showSeconds - s - (m * 60) - (h * 3600)) / 86400;
			$d.hide();
			$h.hide();
			$m.hide();
			$s.hide();
			$splitD.hide();
			$splitH.hide();
			$splitM.hide();
			$splitS.hide();
			if ( d > 0 ) {
				$d.html(d).show();
				$splitD.show();
			} else if ( h > 0 ) {
				$h.html(h).show();
				$splitH.show();
			} else if ( m > 0 ) {
				$h.html(m).show();
				$splitM.show();
			} else if ( s > 0 ) {
				$h.html(s).show();
				$splitS.show();
			}
		} else if (onlySeconds) {
			return $s.html('' + showSeconds);
		} else {
			var s = showSeconds % 60;
			var m = (showSeconds - s) / 60 % 60;
			var h = (showSeconds - s - (m * 60)) / 3600 % 24;
			var d = (showSeconds - s - (m * 60) - (h * 3600)) / 86400;
			$s.html(moreDigits(s,2));
			$m.html(moreDigits(m,2));
			$h.html(moreDigits(h,2));
			$d.html(d + '');
			if (hideWhenZero) {
				if (m <= 0 ) $m.hide().next().hide();
				if (h <= 0 ) $h.hide().next().hide();
				if (d <= 0 ) $d.hide().next().hide();
			}
		}
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
