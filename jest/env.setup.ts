// set up jest-created test environment before the test framework is installed
// (e.g., altering with the global object or adding, editing some method, setting env var, etc.)
// (can't set up jest configuration or modify jest object at this stage yet)

import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;
