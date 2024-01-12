import Point from "../classes/Point.js";
import { getCurrentTimeMs } from "../utils.js";
import ConfigService from "./ConfigService.js";

class ThrottlingService {
  #lastSuccessTime = 0;
  get lastSuccessTime() {
    return this.#lastSuccessTime;
  }

  #lastPointPosition = new Point(0, 0);
  get lastPointPosition() {
    return this.#lastPointPosition;
  }
  throttle(newPosition, onSuccess) {
    const newTime = getCurrentTimeMs();
    const { lastPointPosition, lastSuccessTime } = this;
    if (newTime - lastSuccessTime > ConfigService.pointerEventsThrottling.minTimeDelta) {
      if (
        lastPointPosition.distTo(newPosition) > ConfigService.pointerEventsThrottling.minDistDelta
      ) {
        onSuccess();
        this.#lastPointPosition = newPosition;
        this.#lastSuccessTime = newTime;
      }
    }
  }
}

export default new ThrottlingService();
