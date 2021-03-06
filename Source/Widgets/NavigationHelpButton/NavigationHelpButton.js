/*global define*/
define([
        '../../Core/buildModuleUrl',
        '../../Core/defineProperties',
        '../../Core/defined',
        '../../Core/destroyObject',
        '../../Core/DeveloperError',
        '../getElement',
        './NavigationHelpButtonViewModel',
        '../../ThirdParty/knockout'
], function (
        buildModuleUrl,
        defineProperties,
        defined,
        destroyObject,
        DeveloperError,
        getElement,
        NavigationHelpButtonViewModel,
        knockout) {
    "use strict";

    /**
     * <p>The NavigationHelpButton is a single button widget for displaying instructions for
     * navigating the globe with the mouse.</p><p style="clear: both;"></p><br/>
     *
     * @alias NavigationHelpButton
     * @constructor
     *
     * @param {Element|String} description.container The DOM element or ID that will contain the widget.
     * @param {Boolean} [description.instructionsInitiallyVisible=false] True if the navigation instructions should initially be visible; otherwise, false.
     *
     * @exception {DeveloperError} Element with id "container" does not exist in the document.
     *
     * @example
     * // In HTML head, include a link to the NavigationHelpButton.css stylesheet,
     * // and in the body, include: &lt;div id="navigationHelpButtonContainer"&gt;&lt;/div&gt;
     *
     * var navigationHelpButton = new Cesium.NavigationHelpButton({
     *     container : 'navigationHelpButtonContainer'
     * });
     */
    var NavigationHelpButton = function (description) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(description) || !defined(description.container)) {
            throw new DeveloperError('description.container is required.');
        }
        //>>includeEnd('debug');

        var container = getElement(description.container);

        var viewModel = new NavigationHelpButtonViewModel();

        if (description.instructionsInitiallyVisible) {
            viewModel.showInstructions = true;
        }

        viewModel._svgPath = 'M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466z M17.328,24.371h-2.707v-2.596h2.707V24.371zM17.328,19.003v0.858h-2.707v-1.057c0-3.19,3.63-3.696,3.63-5.963c0-1.034-0.924-1.826-2.134-1.826c-1.254,0-2.354,0.924-2.354,0.924l-1.541-1.915c0,0,1.519-1.584,4.137-1.584c2.487,0,4.796,1.54,4.796,4.136C21.156,16.208,17.328,16.627,17.328,19.003z';

        var wrapper = document.createElement('span');
        wrapper.className = 'cesium-navigationHelpButton-wrapper';
        container.appendChild(wrapper);

        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'cesium-button cesium-toolbar-button cesium-navigation-help-button';
        button.setAttribute('data-bind', '\
attr: { title: tooltip },\
click: command,\
cesiumSvgPath: { path: _svgPath, width: 32, height: 32 }');
        wrapper.appendChild(button);

        var instructions = document.createElement('div');
        instructions.className = 'cesium-navigation-help';
        instructions.setAttribute('data-bind', 'css: { "cesium-navigation-help-visible" : showInstructions }');
        instructions.innerHTML = '\
            <table>\
                <tr>\
                    <td><img src="' + buildModuleUrl('Widgets/Images/NavigationHelp/MouseLeft.svg') + '" width="48" height="48" /></td>\
                    <td>\
                        <div class="cesium-navigation-help-pan">Pan view</div>\
                        <div class="cesium-navigation-help-details">Left click + drag</div>\
                    </td>\
                </tr>\
                <tr>\
                    <td><img src="' + buildModuleUrl('Widgets/Images/NavigationHelp/MouseRight.svg') + '" width="48" height="48" /></td>\
                    <td>\
                        <div class="cesium-navigation-help-zoom">Zoom view</div>\
                        <div class="cesium-navigation-help-details">Right click + drag, or</div>\
                        <div class="cesium-navigation-help-details">Mouse wheel scroll</div>\
                    </td>\
                </tr>\
                <tr>\
                    <td><img src="' + buildModuleUrl('Widgets/Images/NavigationHelp/MouseMiddle.svg') + '" width="48" height="48" /></td>\
                    <td>\
                        <div class="cesium-navigation-help-rotate">Rotate view</div>\
                        <div class="cesium-navigation-help-details">Middle click + drag, or</div>\
                        <div class="cesium-navigation-help-details">CTRL + Left click + drag</div>\
                    </td>\
                </tr>\
            </table>';

        wrapper.appendChild(instructions);

        knockout.applyBindings(viewModel, wrapper);

        this._container = container;
        this._viewModel = viewModel;
        this._wrapper = wrapper;

        this._closeInstructions = function (e) {
            if (!wrapper.contains(e.target)) {
                viewModel.showInstructions = false;
            }
        };

        document.addEventListener('mousedown', this._closeInstructions, true);
        document.addEventListener('touchstart', this._closeInstructions, true);
    };

    defineProperties(NavigationHelpButton.prototype, {
        /**
         * Gets the parent container.
         * @memberof SceneModePicker.prototype
         *
         * @type {Element}
         */
        container: {
            get: function () {
                return this._container;
            }
        },

        /**
         * Gets the view model.
         * @memberof SceneModePicker.prototype
         *
         * @type {SceneModePickerViewModel}
         */
        viewModel: {
            get: function () {
                return this._viewModel;
            }
        }
    });

    /**
     * @memberof NavigationHelpButton
     * @returns {Boolean} true if the object has been destroyed, false otherwise.
     */
    NavigationHelpButton.prototype.isDestroyed = function () {
        return false;
    };

    /**
     * Destroys the widget.  Should be called if permanently
     * removing the widget from layout.
     * @memberof NavigationHelpButton
     */
    NavigationHelpButton.prototype.destroy = function () {
        document.removeEventListener('mousedown', this._closeInstructions, true);
        document.removeEventListener('touchstart', this._closeInstructions, true);

        knockout.cleanNode(this._wrapper);
        this._container.removeChild(this._wrapper);

        return destroyObject(this);
    };

    return NavigationHelpButton;
});