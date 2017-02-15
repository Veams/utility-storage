/**
 * Represents a storage class.
 *
 * Offers a simple API for storing Javascript objects in HTML5 web storage
 *
 * @module Storage
 * @version v2.1.0
 *
 * @author Andy Gutsche
 */

import App from '../../app';
import Helpers from '../../utils/helpers';

/**
 * ####################################################
 * PRIVATE PROPERTIES
 * ####################################################
 */

const _storage = new WeakMap();
const _options = new WeakMap();

/**
 * ####################################################
 * PRIVATE METHODS
 * ####################################################
 */

/**
 * Initialize
 *
 * @private
 */
function initialize() {
	App.registerModule && App.registerModule(Storage.info, this.el);

	if (!window.localStorage || !window.sessionStorage) {
		console.warn('Storage: HTML5 web storage not available');
	}
	else {
		if (_options.get(this).type === 'permanent') {

			_storage.set(this, 'localStorage');
		} else if (_options.get(this).type === 'session') {

			_storage.set(this, 'sessionStorage');
		}
		else {
			console.warn('Storage: unknown storage type - use "permanent" or "session"');
		}
	}
}

/**
 * Update wrapper object
 *
 * @private
 *
 * @param {Object} wrapperObj - wrapper object
 */
function updateWrapperObj(wrapperObj) {
	window[_storage.get(this)].setItem(_options.get(this).name, JSON.stringify(wrapperObj));
}

/**
 * Get wrapper object
 *
 * @private
 * @return {Object} - wrapper object
 */
function getWrapperObj() {
	return JSON.parse(window[_storage.get(this)].getItem(_options.get(this).name)) || {};
}

/**
 * ####################################################
 * CLASS
 * ####################################################
 */


class Storage {
	/**
	 * Constructor for our class
	 *
	 * @param {Object} opts - options which will be passed in as JSON object
	 * @param {String} opts.type - storage type ('permanent' || 'session')
	 * @param {String} opts.name - namespace in which items will be saved
	 */
	constructor(opts) {
		let options = {
			type: '',
			name: ''
		};

		_options.set(this, Helpers.defaults(opts || {}, options));
		this::initialize();
	}

	/**
	 * Get module information
	 */
	static get info() {
		return {
			name: 'Storage',
			version: '2.1.0',
			vc: true,
			mod: false
		};
	}

	/**
	 * Get length of wrapper object
	 *
	 * @public
	 *
	 * @return {Number} - length of wrapper object
	 */
	get length() {

		if (!_storage.get(this)) {
			return false;
		}

		let wrapperObj = this::getWrapperObj();

		return Object.keys(wrapperObj).length;
	}

	/**
	 * Set item
	 *
	 * @public
	 *
	 * @param {String} name - item name
	 * @param {Object} obj - object to save
	 */
	setItem(name, obj) {

		if (!_storage.get(this)) {
			return;
		}

		let wrapperObj = this::getWrapperObj();

		wrapperObj[name] = obj;
		this::updateWrapperObj(wrapperObj);
	}

	/**
	 * Get item by name
	 *
	 * @public
	 *
	 * @param {String} name - item name
	 * @return {Object} - object retrieved by item name
	 */
	getItem(name) {

		if (!_storage.get(this)) {
			return false;
		}

		let wrapperObj = this::getWrapperObj();

		return wrapperObj[name];
	}

	/**
	 * Remove item by name
	 *
	 * @public
	 *
	 * @param {String} name - item name
	 */
	removeItem(name) {

		if (!_storage.get(this)) {
			return;
		}

		let wrapperObj = this::getWrapperObj();

		delete wrapperObj[name];
		this::updateWrapperObj(wrapperObj);
	}

	/**
	 * Clear all items
	 *
	 * @public
	 */
	clear() {

		if (!_storage.get(this)) {
			return;
		}

		window[_storage.get(this)].removeItem(_options.get(this).name);
	}
}

/**
 * ####################################################
 * EXPORT MODULE
 * ####################################################
 */

export default Storage;