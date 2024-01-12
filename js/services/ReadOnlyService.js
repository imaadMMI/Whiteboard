import ConfigService from "./ConfigService.js";

class ReadOnlyService {
  #readOnlyActive = true;
  get readOnlyActive() {
    return this.#readOnlyActive;
  }

  #previousToolHtmlElem = null;
  get previousToolHtmlElem() {
    return this.#previousToolHtmlElem;
  }

  activateReadOnlyMode() {
    this.#readOnlyActive = true;

    this.#previousToolHtmlElem = $(".whiteboard-tool.active");

    $(".whiteboard-tool[tool=mouse]").click();
    $(".whiteboard-tool").prop("disabled", true);
    $(".whiteboard-edit-group > button").prop("disabled", true);
    $(".whiteboard-edit-group").addClass("group-disabled");
    $("#whiteboardUnlockBtn").hide();
    $("#whiteboardLockBtn").show();
  }

  deactivateReadOnlyMode() {
    if (ConfigService.isReadOnly) return;

    this.#readOnlyActive = false;

    $(".whiteboard-tool").prop("disabled", false);
    $(".whiteboard-edit-group > button").prop("disabled", false);
    $(".whiteboard-edit-group").removeClass("group-disabled");
    $("#whiteboardUnlockBtn").show();
    $("#whiteboardLockBtn").hide();

    const { previousToolHtmlElem } = this;
    if (previousToolHtmlElem) previousToolHtmlElem.click();
  }
}

export default new ReadOnlyService();
