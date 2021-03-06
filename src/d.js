function autobind(target, name, descr) {
	var fn = descr.initializer ? descr.initializer() : descr.value;

	return {
		configurable: false,
		enumerable: descr.enumerable,

		get: function() {
			var bound = descr.value = fn.bind(this);

			for (var prop in fn) {
				if (fn.hasOwnProperty(prop)) {
					bound[prop] = fn[prop];
				}
			}

			if (bound.constructor != fn.constructor) {
				Object.defineProperty(bound, 'constructor', {
					configurable: true,
					writable: true,
					value: fn.constructor
				});
			}

			Object.defineProperty(this, name, descr);

			return this[name];
		}
	};
}

exports.autobind = autobind;
