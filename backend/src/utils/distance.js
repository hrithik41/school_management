/**
 * Calculates the great-circle distance between two points on the Earth's surface
 * using the Haversine formula.
 * 
 * @param {number} lat1 - Latitude of origin (user)
 * @param {number} lon1 - Longitude of origin (user)
 * @param {number} lat2 - Latitude of destination (school)
 * @param {number} lon2 - Longitude of destination (school)
 * @returns {number} - Distance in kilometers
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degree) => (degree * Math.PI) / 180;

    const R = 6371; // Earth's mean radius in kilometers

    // Convert all degrees to radians
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Return distance in kilometers
    return R * c;
}
