const axios = require('axios');

module.exports = class HeightListener {

    constructor(params = {}) {
        this.app = null;
        this.intervalSec = params.intervalSec || 1;
        this.heightsHandler = params.heightsHandler || null;
        this.storage = null;

        this._lastHeight = null;
        this._next = this._next.bind(this);

        this.STORAGE_LAST_HEIGHT_KEY = '__lastHeight';
    }

    /**
     * @returns {Promise<void>}
     */
    async start() {
        const height = await this.storage.get(this.STORAGE_LAST_HEIGHT_KEY);
        if (height) {
            this._lastHeight = parseInt(height);
        }

        this.app.logger.info('HeightListener: Last height: ' + (height || 'none'));

        return this._next();
    }

    getHeight() {
        return this._lastHeight;
    }

    /**
     * @returns {Promise<void>}
     * @private
     */
    async _next() {
        const response = await axios.get(`${this.app.nodeUrl}/blocks/height`);
        const height = response.data.height;

        if (!this._lastHeight || this._lastHeight !== height) {
            this._lastHeight = height;
            this.storage.set(this.STORAGE_LAST_HEIGHT_KEY, this._lastHeight);

            this.heightsHandler && this.heightsHandler(height);
        }

        // Next tick
        setTimeout(this._next, this.intervalSec * 1000);
    }

};
