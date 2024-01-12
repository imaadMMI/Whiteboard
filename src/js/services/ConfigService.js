import { getThrottling } from "./ConfigService.utils.js";

class ConfigService {
  #configFromServer = {};
  get configFromServer() {
    return this.#configFromServer;
  }

  #correspondingReadOnlyWid = "";
  get correspondingReadOnlyWid() {
    return this.#correspondingReadOnlyWid;
  }

  #isReadOnly = true;
  get isReadOnly() {
    return this.#isReadOnly;
  }

  #onWhiteboardLoad = { setReadOnly: false, displayInfo: false };
  get readOnlyOnWhiteboardLoad() {
    return this.#onWhiteboardLoad.setReadOnly;
  }
  get displayInfoOnWhiteboardLoad() {
    return this.#onWhiteboardLoad.displayInfo;
  }

  #showSmallestScreenIndicator = true;
  get showSmallestScreenIndicator() {
    return this.#showSmallestScreenIndicator;
  }

  #imageDownloadFormat = "png";
  get imageDownloadFormat() {
    return this.#imageDownloadFormat;
  }

  #drawBackgroundGrid = false;
  get drawBackgroundGrid() {
    return this.#drawBackgroundGrid;
  }

  #backgroundGridImage = "bg_grid.png";
  get backgroundGridImage() {
    return this.#backgroundGridImage;
  }

  #pointerEventsThrottling = { minDistDelta: 0, minTimeDelta: 0 };
  get pointerEventsThrottling() {
    return this.#pointerEventsThrottling;
  }

  #refreshInfoInterval = 1000;
  get refreshInfoInterval() {
    return this.#refreshInfoInterval;
  }

  initFromServer(configFromServer) {
    this.#configFromServer = configFromServer;

    const { common } = configFromServer;
    const {
      onWhiteboardLoad,
      showSmallestScreenIndicator,
      imageDownloadFormat,
      drawBackgroundGrid,
      backgroundGridImage,
      performance,
    } = common;

    this.#onWhiteboardLoad = onWhiteboardLoad;
    this.#showSmallestScreenIndicator = showSmallestScreenIndicator;
    this.#imageDownloadFormat = imageDownloadFormat;
    this.#drawBackgroundGrid = drawBackgroundGrid;
    this.#backgroundGridImage = backgroundGridImage;
    this.#refreshInfoInterval = 1000 / performance.refreshInfoFreq;

    const { whiteboardSpecific } = configFromServer;
    const { correspondingReadOnlyWid, isReadOnly } = whiteboardSpecific;

    this.#correspondingReadOnlyWid = correspondingReadOnlyWid;
    this.#isReadOnly = isReadOnly;

    console.log("Whiteboard config from server:", configFromServer, "parsed:", this);
  }

  refreshUserCountDependant(userCount) {
    const { configFromServer } = this;
    const { common } = configFromServer;
    const { performance } = common;
    const { pointerEventsThrottling } = performance;

    this.#pointerEventsThrottling = getThrottling(pointerEventsThrottling, userCount);
  }
}

export default new ConfigService();
