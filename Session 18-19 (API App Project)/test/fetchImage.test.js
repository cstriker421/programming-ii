import { fetchImage } from "../src/fetchImage.js";
import fetch from "node-fetch";
import open from "open";

jest.mock("node-fetch");
jest.mock("open");

/**
 * Tests fetchImage.js for image fetching and opening.
 */
    describe("fetchImage", () => {
    test("fetches and opens a cat image", async () => {
        fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue([{ url: "https://example.com/cat.jpg" }]) });
        await fetchImage("cat", "static");
        expect(open).toHaveBeenCalledWith("https://example.com/cat.jpg");
    });

    test("fetches and opens a dog image", async () => {
        fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ url: "https://example.com/dog.jpg" }) });
        await fetchImage("dog", "static");
        expect(open).toHaveBeenCalledWith("https://example.com/dog.jpg");
    });

    test("fetches and opens a fox image", async () => {
        fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ image: "https://example.com/fox.jpg" }) });
        await fetchImage("fox", "static");
        expect(open).toHaveBeenCalledWith("https://example.com/fox.jpg");
    });

    test("filters out incorrect file formats", async () => {
        fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ url: "https://example.com/dog.mp4" }) });
        fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValue({ url: "https://example.com/dog.jpg" }) });

        await fetchImage("dog", "static");
        expect(open).toHaveBeenCalledWith("https://example.com/dog.jpg");
    });
});