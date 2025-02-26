import { exec } from "child_process";

/**
 * Tests main.js CLI commands.
 */
describe("Main CLI", () => {
  test("--animal cat --random", (done) => {
    exec("node main.js --animal cat --random", (error, stdout) => {
      expect(stdout).toMatch(/🐱/);
      done();
    });
  });

  test("--animal dog --count 3", (done) => {
    exec("node main.js --animal dog --count 3", (error, stdout) => {
      expect(stdout.split("\n").length).toBe(3);
      done();
    });
  });

  test("--animal fox --image", (done) => {
    exec("node main.js --animal fox --image", (error, stdout) => {
      expect(stdout).toMatch(/🦊/);
      done();
    });
  });

  test("invalid option handling", (done) => {
    exec("node main.js --animal elephant", (error, stdout) => {
      expect(stdout).toMatch(/❌/);
      done();
    });
  });
});