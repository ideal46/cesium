/*global define*/
define(['./defaultValue'], function(defaultValue) {
    "use strict";

    /**
     * Attributes, which make up a geometry's vertices.  Each property in this object corresponds to a
     * {@link GeometryAttribute} containing the attribute's data.
     * <p>
     * Attributes are always stored non-interleaved in a Geometry.  When geometry is prepared for rendering
     * with {@link Context#createVertexArrayFromGeometry}, attributes are generally written interleaved
     * into the vertex buffer for better rendering performance.
     * </p>
     *
     * @alias GeometryAttributes
     * @constructor
     */
    var GeometryAttributes = function(options) {
        options = defaultValue(options, defaultValue.EMPTY_OBJECT);

        /**
         * The 3D position attribute.
         * <p>
         * 64-bit floating-point (for precision).  3 components per attribute.
         * </p>
         *
         * @type GeometryAttribute
         *
         * @default undefined
         */
        this.position = options.position;

        /**
         * The normal attribute (normalized), which is commonly used for lighting.
         * <p>
         * 32-bit floating-point.  3 components per attribute.
         * </p>
         *
         * @type GeometryAttribute
         *
         * @default undefined
         */
        this.normal = options.normal;

        /**
         * The 2D texture coordinate attribute.
         * <p>
         * 32-bit floating-point.  2 components per attribute
         * </p>
         *
         * @type GeometryAttribute
         *
         * @default undefined
         */
        this.st = options.st;

        /**
         * The binormal attribute (normalized), which is used for tangent-space effects like bump mapping.
         * <p>
         * 32-bit floating-point.  3 components per attribute.
         * </p>
         *
         * @type GeometryAttribute
         *
         * @default undefined
         */
        this.binormal = options.binormal;

        /**
         * The tangent attribute (normalized), which is used for tangent-space effects like bump mapping.
         * <p>
         * 32-bit floating-point.  3 components per attribute.
         * </p>
         *
         * @type GeometryAttribute
         *
         * @default undefined
         */
        this.tangent = options.tangent;

        /**
         * The color attribute.
         * <p>
         * 8-bit unsigned integer. 4 components per attribute.
         * </p>
         *
         * @type GeometryAttribute
         *
         * @default undefined
         */
        this.color = options.color;
    };

    return GeometryAttributes;
});