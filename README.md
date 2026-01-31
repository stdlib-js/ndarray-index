<!--

@license Apache-2.0

Copyright (c) 2024 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# ndindex

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> [ndarray][@stdlib/ndarray/ctor] index constructor.

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

In JavaScript, only strings and symbols are valid property names. When providing values for property names which are not strings or symbols, the values are serialized to strings **prior to** attempting to access property values. For example, the following

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

// Create an ndarray:
var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

// Define a list of indices for elements we want to retrieve from `x`:
var y = [ 0, 2 ];

// Attempt to retrieve the desired elements:
var v = x[ y ]; // => desired: <ndarray>[ 1, 3 ]
// returns undefined
```

is equivalent to

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );
var y = [ 0, 2 ];

var v = x[ y.toString() ];
// returns undefined

// ...which is equivalent to:
v = x[ '0,2' ];
// returns undefined
```

Accordingly, in order to circumvent built-in property access behavior and support non-traditional access patterns, one can leverage [`Proxy`][@stdlib/proxy/ctor] objects which allow one to intercept property access and to perform transformations before attempting to access elements in a target object.

To support the access pattern shown in the example above, one can leverage built-in string serialization behavior to reconstruct the original property value provided prior to serialization. The `ndindex` constructor described below provides one such mechanism.

Specifically, instantiated `ndindex` objects are assigned a unique identifier and stored in a local cache. When provided as property values to `ndindex` consumers, instantiated objects serialize to a string containing their unique identifier. `ndindex` consumers can then parse the serialized string to obtain the unique identifier and subsequently recover the original [ndarray][@stdlib/ndarray/ctor] from the local cache.

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->



<section class="usage">

## Usage

To use in Observable,

```javascript
ndindex = require( 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-index@umd/browser.js' )
```
The previous example will load the latest bundled code from the umd branch. Alternatively, you may load a specific version by loading the file from one of the [tagged bundles](https://github.com/stdlib-js/ndarray-index/tags). For example,

```javascript
ndindex = require( 'https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-index@v0.1.0-umd/browser.js' )
```

To vendor stdlib functionality and avoid installing dependency trees for Node.js, you can use the UMD server build:

```javascript
var ndindex = require( 'path/to/vendor/umd/ndarray-index/index.js' )
```

To include the bundle in a webpage,

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-index@umd/browser.js"></script>
```

If no recognized module system is present, access bundle contents via the global scope:

```html
<script type="text/javascript">
(function () {
    window.ndindex;
})();
</script>
```

<a name="main"></a>

#### ndindex( x\[, options] )

Wraps a provided [ndarray][@stdlib/ndarray/ctor] as an index object.

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

var idx = new ndindex( x );
// returns <ndindex>
```

The constructor accepts the following arguments:

-   **x**: input [ndarray][@stdlib/ndarray/ctor].
-   **options**: function options.

The constructor accepts the following options:

-   **kind**: specifies whether a provided [ndarray][@stdlib/ndarray/ctor] is a specialized kind of integer input [ndarray][@stdlib/ndarray/ctor]. This option is only applicable when `x` is an integer [ndarray][@stdlib/ndarray/ctor]. Must be one of the following:

    -   **cartesian**: an [ndarray][@stdlib/ndarray/ctor] containing Cartesian indices.
    -   **linear**: an [ndarray][@stdlib/ndarray/ctor] containing indices representing locations in linear memory.

    Default: `''`.

-   **persist**: boolean indicating whether to continue persisting an index object after first usage. Default: `false`.

By default, an `ndindex` is invalidated and removed from an internal cache immediately after a consumer resolves the underlying data associated with an `ndindex` instance using the [`ndindex.get()`](#static-method-get) static method. Immediate invalidation and cache removal ensures that references to the underlying [ndarray][@stdlib/ndarray/ctor] data are not the source of memory leaks.

One may, however, want to reuse an `ndindex` instance to avoid additional memory allocation. In order to persist an `ndindex` and prevent automatic cache invalidation, set the `persist` option to `true`.

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

var idx = new ndindex( x, {
    'persist': true
});
// returns <ndindex>

// ...

var o = ndindex.get( idx.id );
// returns {...}

// ...

o = ndindex.get( idx.id );
// returns {...}

// ...

// Explicitly free the index object:
ndindex.free( idx.id );
```

In order to **prevent** memory leaks when working with persisted `ndindex` instances, one **must** remember to manually free persisted instances using the [`ndindex.free()`](#static-method-free) method.

* * *

### Properties

<a name="static-prop-name"></a>

#### ndindex.name

String value of the `ndindex` constructor name.

```javascript
var str = ndindex.name;
// returns 'ndindex'
```

<a name="prop-data"></a>

#### ndindex.prototype.data

**Read-only** property returning an [ndarray][@stdlib/ndarray/ctor] view of the underlying [ndarray][@stdlib/ndarray/ctor] data associated with an `ndindex` instance.

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

var idx = new ndindex( x );
// returns <ndindex>

var v = idx.data;
// returns <ndarray>
```

<a name="prop-dtype"></a>

#### ndindex.prototype.dtype

**Read-only** property returning the [data type][@stdlib/ndarray/dtypes] of the underlying [ndarray][@stdlib/ndarray/ctor] associated with an `ndindex` instance.

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

var idx = new ndindex( x );
// returns <ndindex>

var dt = idx.dtype;
// returns 'int32'
```

<a name="prop-id"></a>

#### ndindex.prototype.id

**Read-only** property returning the unique identifier associated with an `ndindex` instance.

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

var idx = new ndindex( x );
// returns <ndindex>

var id = idx.id;
// returns <string>
```

The identifier should be used by `ndindex` consumers to resolve the underlying data associated with an `ndindex` instance.

<a name="prop-is-cached"></a>

#### ndindex.prototype.isCached

**Read-only** property returning a boolean indicating whether an `ndindex` instance is actively cached.

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

var idx = new ndindex( x );
// returns <ndindex>

var out = idx.isCached;
// returns true
```

<a name="prop-kind"></a>

#### ndindex.prototype.kind

**Read-only** property returning the [ndarray][@stdlib/ndarray/ctor] index kind.

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

var idx = new ndindex( x, {
    'kind': 'linear'
});
// returns <ndindex>

var v = idx.kind;
// returns 'linear'
```

The following [ndarray][@stdlib/ndarray/ctor] index kinds are supported:

-   **cartesian**: an ndarray index object containing Cartesian indices.
-   **linear**: an ndarray index object for indices representing locations in linear memory.

<a name="prop-type"></a>

#### ndindex.prototype.type

**Read-only** property returning the [ndarray][@stdlib/ndarray/ctor] index type.

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

var idx = new ndindex( x );
// returns <ndindex>

var t = idx.type;
// returns 'int'
```

The following [ndarray][@stdlib/ndarray/ctor] index types are supported:

-   **mask**: mask [ndarray][@stdlib/ndarray/ctor], in which a value of zero indicates to include a respective element and a value of one indicates to exclude a respective element. A mask [ndarray][@stdlib/ndarray/ctor] is the complement of a boolean [ndarray][@stdlib/ndarray/ctor].
-   **bool**: boolean [ndarray][@stdlib/ndarray/ctor], in which a value of `true` indicates to include a respective element and a value of `false` indicates to exclude a respective element. A boolean [ndarray][@stdlib/ndarray/ctor] is the complement of a mask [ndarray][@stdlib/ndarray/ctor].
-   **int**: integer [ndarray][@stdlib/ndarray/ctor], in which each element is an index indicating the position of an element to include. Elements are **not** required to be unique (i.e., more than element may resolve to the same position).

* * *

### Methods

<a name="static-method-free"></a>

#### ndindex.free( id )

Frees the `ndindex` associated with a provided identifier.

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

var idx = new ndindex( x, {
    'persist': true
});
// returns <ndindex>

// ...

var out = ndindex.free( idx.id );
// returns true
```

Once an `ndindex` is freed, the instance is invalid and can no longer be used. Any subsequent `ndindex` operations (i.e., property and method access) will raise an exception.

<a name="static-method-get"></a>

#### ndindex.get( id )

Returns the [ndarray][@stdlib/ndarray/ctor] associated with the `ndindex` having a provided identifier.

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

var idx = new ndindex( x, {
    'persist': true
});
// returns <ndindex>

// ...

var o = ndindex.get( idx.id );
// returns {...}

var d = o.data;
// returns <ndarray>

var t = o.type;
// returns 'int'

var dt = o.dtype;
// returns 'int32'
```

The returned object has the following properties:

-   **data**: the underlying "base" [ndarray][@stdlib/ndarray/base/ctor] view associated with the `ndindex` identified by the provided `id`.
-   **type**: the type of [ndarray][@stdlib/ndarray/ctor] index. One of the following: `'int'`, `'bool'`, or `'mask'`.
-   **kind**: the [ndarray][@stdlib/ndarray/ctor] index "kind". One of the following: `''`, `'cartesian'`, or `'linear'`.
-   **dtype**: the data type of the underlying [ndarray][@stdlib/ndarray/ctor].

If the `ndindex` associated with a provided identifier was not explicitly persisted, calling this method will cause the `ndindex` to be invalidated and removed from an internal cache. Any subsequent instance operations (i.e., property and method access) will raise an exception.

<a name="static-method-cartesian-index"></a>

#### ndindex.cartesianIndex( x\[, options] )

Wraps a provided [ndarray][@stdlib/ndarray/ctor] as a Cartesian index object.

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

var x = array( new Int32Array( [ 1, 2, 3, 4 ] ), {
    'shape': [ 2, 2 ]
});

var idx = ndindex.cartesianIndex( x );
// returns <ndindex>
```

This method is a convenience method for creating an `ndindex` with the `kind` option set to `'cartesian'`. The function accepts the same arguments and options as `ndindex` above.

<a name="static-method-linear-index"></a>

#### ndindex.linearIndex( x\[, options] )

Wraps a provided [ndarray][@stdlib/ndarray/ctor] as a linear index object.

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

var idx = ndindex.linearIndex( x );
// returns <ndindex>
```

This method is a convenience method for creating an `ndindex` with the `kind` option set to `'linear'`. The function accepts the same arguments and options as `ndindex` above.

<a name="method-to-string"></a>

#### ndindex.prototype.toString()

Serializes an `ndindex` as a string.

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

var idx = new ndindex( x );
// returns <ndindex>

var str = idx.toString();
// e.g., 'ndindex<0>'
```

An `ndindex` is intended to be an opaque object used by objects supporting "fancy" indexing (e.g., [fancy ndarrays][@stdlib/ndarray/to-fancy]). As such, when serialized as a string, a serialized `ndindex` includes only the unique identifier associated with the respective instance.

<a name="method-to-json"></a>

#### ndindex.prototype.toJSON()

Serializes an `ndindex` as a [JSON][json] object.

```javascript
var array = require( '@stdlib/ndarray-array' );
var Int32Array = require( '@stdlib/array-int32' );

var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

var idx = new ndindex( x );
// returns <ndindex>

var o = idx.toJSON();
// returns { 'type': 'ndindex', 'kind': '', 'data': { ... } }
```

`JSON.stringify()` implicitly calls this method when stringifying an `ndindex` instance.

</section>

<!-- /.usage -->

<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

* * *

<section class="notes">

## Notes

-   `ndindex` instances have no explicit functionality; however, they are used by ["fancy" ndarrays][@stdlib/ndarray/to-fancy] and other packages for element retrieval and assignment.

-   Because `ndindex` instances leverage an internal cache implementing the **singleton pattern**, one **must** be sure to use the same `ndindex` constructor as `ndindex` consumers. If one uses a different `ndindex` constructor, the consumer will **not** be able to resolve an [ndarray][@stdlib/ndarray/base/ctor] view of the original [ndarray][@stdlib/ndarray/ctor], as the consumer will attempt to resolve an `ndindex` instance in the wrong internal cache.

-   Because non-persisted `ndindex` instances are freed after first use, in order to avoid holding onto memory and to allow garbage collection, one should avoid scenarios in which an `ndindex` is never used. For example,

    ```javascript
    var array = require( '@stdlib/ndarray-array' );
    var Int32Array = require( '@stdlib/array-int32' );

    var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

    var idx = new ndindex( x );

    var o;
    if ( x.get( 0 ) === 0 ) {
        // Do something with `idx`...
        o = ndindex.get( idx.id );

        // ...
    }
    ```

    will leak memory as `idx` is only consumed within an `if` block which never evaluates. In such scenarios, one should either refactor to avoid inadvertently holding onto memory or explicitly free the `ndindex`.

    ```javascript
    var array = require( '@stdlib/ndarray-array' );
    var Int32Array = require( '@stdlib/array-int32' );

    var x = array( new Int32Array( [ 1, 2, 3, 4 ] ) );

    var idx = new ndindex( x );

    var o;
    if ( x.get( 0 ) === 0 ) {
        // Do something with `idx`...
        o = ndindex.get( idx.id );

        // ...
    } else {
        ndindex.free( idx.id );
    }
    ```

</section>

<!-- /.notes -->

<!-- Package usage examples. -->

* * *

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```html
<!DOCTYPE html>
<html lang="en">
<body>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-empty@umd/browser.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/ndarray-index@umd/browser.js"></script>
<script type="text/javascript">
(function () {

var x = empty( [ 5 ], {
    'dtype': 'uint8'
});
var i = new ndindex( x );
// returns <ndindex>

var o = ndindex.get( i.id );
// returns {...}

console.log( 'Type: %s. Data type: %s.', o.type, o.dtype );

x = empty( [ 5 ], {
    'dtype': 'generic'
});
i = new ndindex( x );
// returns <ndindex>

o = ndindex.get( i.id );
// returns {...}

console.log( 'Type: %s. Data type: %s.', o.type, o.dtype );

x = empty( [ 5 ], {
    'dtype': 'bool'
});
i = new ndindex( x );
// returns <ndindex>

o = ndindex.get( i.id );
// returns {...}

console.log( 'Type: %s. Data type: %s.', o.type, o.dtype );

x = empty( [ 5 ], {
    'dtype': 'int32'
});
i = new ndindex( x );
// returns <ndindex>

o = ndindex.get( i.id );
// returns {...}

console.log( 'Type: %s. Data type: %s.', o.type, o.dtype );

})();
</script>
</body>
</html>
```

</section>

<!-- /.examples -->

<!-- Section to include cited references. If references are included, add a horizontal rule *before* the section. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="references">

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/ndarray-array`][@stdlib/ndarray/array]</span><span class="delimiter">: </span><span class="description">multidimensional arrays.</span>
-   <span class="package-name">[`@stdlib/ndarray-ctor`][@stdlib/ndarray/ctor]</span><span class="delimiter">: </span><span class="description">multidimensional array constructor.</span>
-   <span class="package-name">[`@stdlib/ndarray-fancy`][@stdlib/ndarray/fancy]</span><span class="delimiter">: </span><span class="description">fancy multidimensional array constructor.</span>
-   <span class="package-name">[`@stdlib/ndarray-slice`][@stdlib/ndarray/slice]</span><span class="delimiter">: </span><span class="description">return a read-only view of an input ndarray.</span>
-   <span class="package-name">[`@stdlib/ndarray-to-fancy`][@stdlib/ndarray/to-fancy]</span><span class="delimiter">: </span><span class="description">convert an ndarray to an object supporting fancy indexing.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2026. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/ndarray-index.svg
[npm-url]: https://npmjs.org/package/@stdlib/ndarray-index

[test-image]: https://github.com/stdlib-js/ndarray-index/actions/workflows/test.yml/badge.svg?branch=v0.1.0
[test-url]: https://github.com/stdlib-js/ndarray-index/actions/workflows/test.yml?query=branch:v0.1.0

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/ndarray-index/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/ndarray-index?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/ndarray-index.svg
[dependencies-url]: https://david-dm.org/stdlib-js/ndarray-index/main

-->

[chat-image]: https://img.shields.io/badge/zulip-join_chat-brightgreen.svg
[chat-url]: https://stdlib.zulipchat.com

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/ndarray-index/tree/deno
[deno-readme]: https://github.com/stdlib-js/ndarray-index/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/ndarray-index/tree/umd
[umd-readme]: https://github.com/stdlib-js/ndarray-index/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/ndarray-index/tree/esm
[esm-readme]: https://github.com/stdlib-js/ndarray-index/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/ndarray-index/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/ndarray-index/main/LICENSE

[json]: http://www.json.org/

[@stdlib/proxy/ctor]: https://github.com/stdlib-js/proxy-ctor/tree/umd

[@stdlib/ndarray/base/ctor]: https://github.com/stdlib-js/ndarray-base-ctor/tree/umd

[@stdlib/ndarray/ctor]: https://github.com/stdlib-js/ndarray-ctor/tree/umd

[@stdlib/ndarray/dtypes]: https://github.com/stdlib-js/ndarray-dtypes/tree/umd

[@stdlib/ndarray/to-fancy]: https://github.com/stdlib-js/ndarray-to-fancy/tree/umd

<!-- <related-links> -->

[@stdlib/ndarray/array]: https://github.com/stdlib-js/ndarray-array/tree/umd

[@stdlib/ndarray/fancy]: https://github.com/stdlib-js/ndarray-fancy/tree/umd

[@stdlib/ndarray/slice]: https://github.com/stdlib-js/ndarray-slice/tree/umd

<!-- </related-links> -->

</section>

<!-- /.links -->
