import { pgTable, serial, text, varchar, json } from "drizzle-orm/pg-core";
export const StoryData = pgTable("storyData", {
  id: serial("id").primaryKey(),
  storySubject: text("storySubject"),
  storyType: varchar("storyType"),
  ageGroup: varchar("ageGroup"),
  imageStyle: varchar("imageStyle"),
  output: json("output"),
  coverImage: varchar("coverImage"),
});
