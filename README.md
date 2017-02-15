<p align='right'>
    <a href='https://badge.fury.io/bo/veams-utility-storage'><img src='https://badge.fury.io/bo/veams-utility-storage.svg' alt='Bower version' height='20'></a>
    <a href='https://gitter.im/Sebastian-Fitzner/Veams?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge'><img src='https://badges.gitter.im/Sebastian-Fitzner/Veams.svg' alt='Gitter Chat' /></a>
</p>

# Storage

## Description

This utility offers a simple API for storing Javascript objects in HTML5 web storage

-----------

## Requirements
- `Veams-JS >= v4.0.0` - Basic JavaScript library.
- [babel-preset-stage-0](https://github.com/babel/babel/tree/master/packages/babel-preset-stage-0) - Babel preset for stage 0 plugins.

-----------

## Installation

### Installation with Veams

`veams install vu storage`

### Installation with Bower

`bower install veams-utility-storage --save`

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
- length {`Number`} - length of storage (item count)

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