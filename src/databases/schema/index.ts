import { appSchema } from "@nozbe/watermelondb";
import { CarSchema } from "./carSchema";

import { userSchema } from "./userSchema";

const schemas = appSchema({
  version: 2,
  tables: [userSchema, CarSchema],
});

export { schemas };
