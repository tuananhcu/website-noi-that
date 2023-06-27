// import slugify from "slugify";

function slugifyText(str) {
  // return slugify(str || "", {
  //   replacement: "-",
  //   remove: undefined,
  //   lower: true,
  //   strict: true,
  //   locale: "vi",
  //   trim: true,
  // });
  const slug = str.replace(/\s/g, "-");
  return slug;
}
export default slugifyText;
