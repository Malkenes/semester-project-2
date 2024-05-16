/**
 * Retrieves the count of tags from a list of listings.
 * This function takes a list of listings and counts the occurrences of each tag,
 * returning an array of tag objects sorted by their count in descending order.
 * @param {Array<Object>} listings - The list of listings containing tags.
 * @returns {Array<Object>} An array of tag objects with their count and associated media.
 */
export function getTagCount(listings) {
    const tagCount = {};
    listings.forEach((listing) => {
      listing.tags.forEach((tag) => {
        const tagTrimmed = tag.trim().toLowerCase();
        if (tagTrimmed.length > 1) {
            if (!tagCount[tagTrimmed]) {
                tagCount[tagTrimmed] = {
                    count: 0,
                    media: []
                };
            };
            tagCount[tagTrimmed].count++;
            tagCount[tagTrimmed].media.push(...listing.media);
        };
      });
    });
    
    Object.keys(tagCount).forEach((tag) => {
      if (tagCount[tag].count === 1) {
        delete tagCount[tag];
      }
    });
    const tagArray = Object.keys(tagCount).map((tag) => ({
      tag,
      count: tagCount[tag].count,
      media: tagCount[tag].media
    }));

    tagArray.sort((a, b) => b.count - a.count);
  
    return tagArray;
  }
  