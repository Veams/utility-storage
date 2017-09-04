<p align='right'>
    <a href="https://badge.fury.io/js/veams-utility-storage"><img src="https://badge.fury.io/js/veams-utility-storage.svg" alt="npm version" height="18"></a>
    <a href='https://gitter.im/Sebastian-Fitzner/Veams?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge'><img src='https://badges.gitter.im/Sebastian-Fitzner/Veams.svg' alt='Gitter Chat' /></a>
</p>

# Storage

## Description

This utility offers a simple API for storing Javascript objects in HTML5 web storage
using distinct namespaces

-----------

## Requirements
- `Veams >= v5.0.0` - [Veams Framework](https://github.com/Veams/veams)
- [babel-preset-stage-0](https://github.com/babel/babel/tree/master/packages/babel-preset-stage-0) - Babel preset for stage 0 plugins.

-----------

## Installation

### Installation with Veams

`veams install vu storage`

-----------

## Usage (API)

Just initialize on demand like this:

``` js
let myStorage = new Storage({
	type: 'permanent', // or 'session'
	name: 'someName' // custom namespace (e.g. from module)
});
```

### Constructor

#### Storage(opts: StorageOptions)
	/**
	 * Constructor
	 *
	 * @param {Object} opts - options which will be passed as object
	 * @param {String} opts.type - storage type ('permanent' || 'session')
	 * @param {String} opts.name - namespace in which items will be saved
	 */
	 
	 
### Properties
- length {`Number`} - item count

### Methods

#### setItem(name:String, obj:Object)
	/**
	 * Set item
	 *
	 * @param {String} name - item name
	 * @param {Object} obj - object to save
	 */

#### getItem (name:String)
	/**
	 * Get item by name
	 *
	 * @param {String} name - item name
	 * @return {Object} - object retrieved by item name
	 */

#### getAllItems ()
	/**
	 * Get all items
	 *
	 * @public
	 *
	 * @return {Object} - object containing all items
	 */

#### removeItem (name:String)
	/**
	 * Remove item by name
	 *
	 * @param {String} name - item name
	 */

#### clear ()
	/**
	 * Clear all items
	 */