import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	setupFilesAfterEnv: ["./src/__tests_mockTypeorm-config.ts"],
};

export default config;
