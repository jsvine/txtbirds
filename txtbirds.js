(function () {
	var root = this;
	var g = root.document.getElementById("gyre");

	var Falcon = function (gyre) {
		this.flaps = [ '------', '/‾\\/‾\\', '‾‾\\/‾‾' ];
		this.flap_i = 0;
		this.flap_rate = 230;
		this.veer_rate = 500;
		this.veer_coefficient_vertical = 75;
		this.veer_coefficient_horizontal = 50;
		this.lifespan = 15 * 1000;
		this.timers = [];
		this.gyre = gyre;
	};

	Falcon.prototype = {
		hatch: function () {
			var _this = this;
			this.el = root.document.createElement("span");
			this.el.className = "falcon";
			[ "top", "left" ].forEach(function (s) { 
				_this.el.style[s] = (50 + (root.Math.random() < 0.5 ? -1 : 1) * root.Math.random() * 80) + "%"; 
			});
			this.gyre.appendChild(this.el);
			return this;
		},
		flap: function () { 
			this.el.innerHTML = this.flaps[this.flap_i++ % this.flaps.length];
		},
		veer: function () {
			this.el.style.marginTop = root.Math.random() * this.veer_coefficient_vertical / root.Math.log(this.flap_i + 1) + "px";
			this.el.style.marginLeft = root.Math.random() * this.veer_coefficient_horizontal / root.Math.log(this.flap_i + 1) + "px";
		},
		fly: function () {
			var _this = this;
			root.setTimeout(function () { _this.el.className += " flying"; }, 10);
			this.timers.push(root.setInterval(function () { _this.flap.call(_this); }, this.flap_rate));
			this.timers.push(root.setInterval(function () { _this.veer.call(_this); }, this.veer_rate));
			root.setTimeout(function () { _this.vanish.call(_this); }, this.lifespan);
			return this;
		},
		vanish: function () {
			this.timers.forEach(function (t) { root.clearInterval(t); });
			this.gyre.removeChild(this.el);
			return this;
		}
	};

	var launch = function () {
		return (new Falcon(g)).hatch().fly();
	};

	root.setInterval(launch, 730);

}).call(this);
