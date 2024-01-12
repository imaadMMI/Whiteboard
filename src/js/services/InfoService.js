import ConfigService from "./ConfigService.js";

class InfoService {
  #infoAreDisplayed = false;
  get infoAreDisplayed() {
    return this.#infoAreDisplayed;
  }

  #nbConnectedUsers = -1;
  get nbConnectedUsers() {
    return this.#nbConnectedUsers;
  }

  #smallestScreenResolution = undefined;
  get smallestScreenResolution() {
    return this.#smallestScreenResolution;
  }

  #nbMessagesSent = 0;
  get nbMessagesSent() {
    return this.#nbMessagesSent;
  }

  #nbMessagesReceived = 0;
  get nbMessagesReceived() {
    return this.#nbMessagesReceived;
  }

  #refreshInfoIntervalId = undefined;
  get refreshInfoIntervalId() {
    return this.#refreshInfoIntervalId;
  }

  updateInfoFromServer({ nbConnectedUsers, smallestScreenResolution = undefined }) {
    if (this.#nbConnectedUsers !== nbConnectedUsers) {
      ConfigService.refreshUserCountDependant(nbConnectedUsers);
    }
    this.#nbConnectedUsers = nbConnectedUsers;
    if (smallestScreenResolution) {
      this.#smallestScreenResolution = smallestScreenResolution;
    }
  }

  incrementNbMessagesReceived() {
    this.#nbMessagesReceived++;
  }

  incrementNbMessagesSent() {
    this.#nbMessagesSent++;
  }

  refreshDisplayedInfo() {
    const {
      nbMessagesReceived,
      nbMessagesSent,
      nbConnectedUsers,
      smallestScreenResolution: ssr,
    } = this;
    $("#messageReceivedCount")[0].innerText = String(nbMessagesReceived);
    $("#messageSentCount")[0].innerText = String(nbMessagesSent);
    $("#connectedUsersCount")[0].innerText = String(nbConnectedUsers);
    $("#smallestScreenResolution")[0].innerText = ssr ? `(${ssr.w}, ${ssr.h})` : "Unknown";
  }

  displayInfo() {
    $("#whiteboardInfoContainer").toggleClass("displayNone", false);
    $("#displayWhiteboardInfoBtn").toggleClass("active", true);
    this.#infoAreDisplayed = true;

    this.refreshDisplayedInfo();
    this.#refreshInfoIntervalId = setInterval(() => {
      this.refreshDisplayedInfo();
    }, ConfigService.refreshInfoInterval);
  }

  hideInfo() {
    $("#whiteboardInfoContainer").toggleClass("displayNone", true);
    $("#displayWhiteboardInfoBtn").toggleClass("active", false);
    this.#infoAreDisplayed = false;
    const { refreshInfoIntervalId } = this;
    if (refreshInfoIntervalId) {
      clearInterval(refreshInfoIntervalId);
      this.#refreshInfoIntervalId = undefined;
    }
  }
  toggleDisplayInfo() {
    const { infoAreDisplayed } = this;
    if (infoAreDisplayed) {
      this.hideInfo();
    } else {
      this.displayInfo();
    }
  }
}

export default new InfoService();
