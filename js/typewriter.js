// Typewriter effect for the terminal-style hero section.
// Types out each line of text character by character, then moves to
// the next line once the current one is finished.

export class TypewriterEffect {
  constructor(targetElement, lines, { charDelay = 45, lineDelay = 700 } = {}) {
    this.targetElement = targetElement;
    this.lines = lines;
    this.charDelay = charDelay;
    this.lineDelay = lineDelay;
  }

  async start() {
    for (const line of this.lines) {
      const lineElement = document.createElement("div");
      lineElement.classList.add("terminal__line");
      this.targetElement.appendChild(lineElement);

      await this.#typeLine(lineElement, line);
      await this.#wait(this.lineDelay);
    }
  }

  #typeLine(lineElement, text) {
    return new Promise((resolve) => {
      let index = 0;
      const tick = () => {
        if (index <= text.length) {
          lineElement.textContent = text.slice(0, index);
          index += 1;
          setTimeout(tick, this.charDelay);
        } else {
          resolve();
        }
      };
      tick();
    });
  }

  #wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}