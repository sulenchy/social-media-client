import getExampleData from "./mock.js";

const TEST_VALUE = 5;

// Create a mock function that will pretend to be the native fetch function

const mockFetchSuccess = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue([
    { id: 1, title: "Example 1" },
    { id: 2, title: "Example 2" },
    { id: 3, title: "Example 3" },
    { id: 4, title: "Example 4" },
    { id: 5, title: "Example 5" },
  ])
});
describe("getExampleData success", () => {
    beforeEach(() => {
        // Assign this to the global fetch function
        global.fetch = mockFetchSuccess;
      })
  it("returns the correct maximum of items", async () => {
    const data = await getExampleData(TEST_VALUE);
    expect(data.length).toBeLessThanOrEqual(TEST_VALUE);
  })
})

const mockFetchFailure = jest.fn().mockResolvedValue({
    ok: false,
  });

describe("getExampleData", () => {
    beforeEach(() => {
        // Assign this to the global fetch function
        global.fetch = mockFetchFailure;
      })
    it("throws an error when the request fails", async () => {
      await expect(getExampleData(3)).rejects.toThrow("Unable to fetch data");
    })
  })