/**
 * Represents a storage class.
 *
 * Offers a simple API for storing Javascript objects in
 * HTML5 web storage using distinct namespaces
 *
 * @module Storage
 * @version v5.0.0
 *
 * @author Andy Gutsche
 */

import {Veams} from 'app';

// Variables
const Helpers = Veams.helpers;

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

		_options.set(this, Helpers.extend(options, opts || {}));
		this::initialize();
	}

	/**
	 * Get module information
	 */
	static get info() {
		return {
			version: '5.0.0',
			vc: true,
			mod: false
		};
	}

	/**
	 * Get item count for current namespace
	 *
	 * @public
	 *
	 * @return {Number} - item count
	 */
	get length() {

		if (!_storage.get(this)) {
			return 0;
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
			return null;
		}

		let wrapperObj = this::getWrapperObj();

		return wrapperObj[name];
	}

	/**
	 * Get all items
	 *
	 * @public
	 *
	 * @return {Object} - object containing all items
	 */
	getAllItems() {

		if (!_storage.get(this)) {
			return null;
		}

		return this::getWrapperObj();
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