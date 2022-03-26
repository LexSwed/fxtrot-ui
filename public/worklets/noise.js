if (typeof registerPaint !== 'undefined') {
  class Noise {
    static get inputProperties() {
      return ['--noise-cell-size', '--noise-hue', '--noise-saturation', '--noise-lightness'];
    }

    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    paint(ctx, size, properties) {
      const CELL_SIZE = parseInt(properties.get('--noise-cell-size'));
      const HUE = properties.get('--noise-hue').toString();
      const SATURATION = properties.get('--noise-saturation').toString();
      const LIGHTNESS = properties.get('--noise-lightness').toString();
      const HUE_RANGE = HUE.split(' ')
        .filter((v) => v.trim() !== '')
        .map((v) => parseInt(v, 10));
      const getHue = HUE_RANGE.length > 1 ? () => this.getRandom(HUE_RANGE[0], HUE_RANGE[1]) : () => HUE_RANGE[0];
      const SATURATION_RANGE = SATURATION.split(' ')
        .filter((v) => v.trim() !== '')
        .map((v) => parseInt(v, 10));
      const getSaturation =
        SATURATION_RANGE.length > 1
          ? () => this.getRandom(SATURATION_RANGE[0], SATURATION_RANGE[1])
          : () => SATURATION_RANGE[0];
      const LIGHTNESS_RANGE = LIGHTNESS.split(' ')
        .filter((v) => v.trim() !== '')
        .map((v) => parseInt(v, 10));
      const getLightness =
        LIGHTNESS_RANGE.length > 1
          ? () => this.getRandom(LIGHTNESS_RANGE[0], LIGHTNESS_RANGE[1])
          : () => LIGHTNESS_RANGE[0];

      for (var p = 0; p < size.height * size.width; p++) {
        const x = p % size.width;
        const y = Math.floor(p / size.width);

        if (x % CELL_SIZE === 0 && y % CELL_SIZE === 0) {
          const H = getHue();
          const S = getSaturation();
          const L = getLightness();
          ctx.fillStyle = 'hsl(' + H + ', ' + S + '%, ' + L + '%)';
          ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
        }
      }
    }
  }

  // eslint-disable-next-line no-undef
  registerPaint('noise', Noise);
}
