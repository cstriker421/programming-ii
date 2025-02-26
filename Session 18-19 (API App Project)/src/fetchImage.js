import fetch from "node-fetch";
import open from "open";
import chalk from "chalk";

const CAT_IMAGE_URL = "https://api.thecatapi.com/v1/images/search";
const DOG_IMAGE_URL = "https://random.dog/woof.json";
const FOX_IMAGE_URL = "https://randomfox.ca/floof/";

/**
 * Fetches a random image for the specified animal.
 * @param {string} animal - "cat", "dog", or "fox"
 * @param {string} type - "static" (default) or "animated"
 */
export async function fetchImage(animal, type = "static") {
    const url = animal === "cat" ? CAT_IMAGE_URL :
                animal === "dog" ? DOG_IMAGE_URL :
                FOX_IMAGE_URL; // Default to fox if no match

    const emoji = animal === "cat" ? "🐱" :
                  animal === "dog" ? "🐶" :
                  "🦊"; // Assigns correct emoji for each animal

    try {
        if (animal === "fox" && type === "animated") {
            console.warn(chalk.yellow(`⚠️  No animated images available for foxes. Fetching a static fox image instead.\n`));
            type = "static"; // Override to fetch a static image
        }

        while (true) { // Keeps requesting until a valid file type is found
            const response = await fetch(url);
            const data = await response.json();

            let imageURL = animal === "cat" ? data[0]?.url :
                           animal === "dog" ? data.url :
                           data.image; // Fox API returns { "image": "url" }

            // Allowed file extensions
            const staticExtensions = [".JPG", ".jpg", ".jpeg", ".png"];
            const animatedExtensions = [".gif", ".mp4", ".webm"];

            // Condition for if only static images are allowed (`--image`)
            if (type === "static" && staticExtensions.some(ext => imageURL.endsWith(ext))) {
                console.log(chalk.blue(`${emoji} Opening a ${animal} image: ${imageURL}`));
                await open(imageURL);
                return;
            }

            // Condition if both both static & animated are allowed (`--anim`)
            if (type === "animated" && (staticExtensions.some(ext => imageURL.endsWith(ext)) ||
                                        animatedExtensions.some(ext => imageURL.endsWith(ext)))) {
                const isAnimated = animatedExtensions.some(ext => imageURL.endsWith(ext));
                console.log(chalk.blue(`${emoji} Opening a ${animal} ${isAnimated ? "animated image" : "image"}: ${imageURL}`));
                await open(imageURL);
                return;
            }

            // Console warning if the file type is incorrect, that then tries fetching a new image
            console.warn(chalk.yellow(`⚠️  Unexpected file format: ${imageURL}. Fetching another...`));
        }
    } catch (error) {
        console.error(chalk.red(`❌  Error fetching ${animal} image:`, error.message));
    }
}