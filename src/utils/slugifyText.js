import slugify from "slugify";

function slugifyText(str) {
  return slugify(str || "", {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: true,
    locale: "vi",
    trim: true,
  });
}
export default slugifyText;
