// Projects real latitude / longitude onto the flat dotted map used on the Our Story page.
// The box covers India (lon 67-98, lat 11-33) and maps onto a MAP_W x MAP_H SVG viewBox.
export const MAP_W = 560;
export const MAP_H = 540;

const LON_MIN = 67;
const LON_SPAN = 31;
const LAT_MAX = 33;
const LAT_SPAN = 22;

export const projectX = (lon) => ((lon - LON_MIN) / LON_SPAN) * MAP_W;
export const projectY = (lat) => ((LAT_MAX - lat) / LAT_SPAN) * MAP_H;
