import { Page } from "@playwright/test";
import { closeModalIfPresent } from "../helpers/helpers";

export async function startModalWatchdog(page: Page, intervalMs = 3000) {
  let running = true;

  page.on("close", () => {
    running = false;
  });

  const loop = async () => {
    while (running) {
      if (page.isClosed()) break;

      try {
        await closeModalIfPresent(page);
      } catch (err) {
        if (page.isClosed()) break;
        console.warn("[Watchdog] Error:", err);
      }

      await new Promise((r) => setTimeout(r, intervalMs));
    }
  };

  loop();

  return () => {
    running = false;
  };
}
