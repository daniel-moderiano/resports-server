import { select } from "./utils";

// An example function to test where a function calls our previously tested db-utils
export const fetchAllItems = async function () {
  try {
    return select('items')
  } catch (err) {
    throw err
  }
}