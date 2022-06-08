import { select } from "./utils";

// An example function to test where a function calls our previously tested db-utils
export const fetchAllItems = async function () {
  try {
    return select('items')
  } catch (err) {
    throw err
  }
}

export const fetchItemNames = async function () {
  try {
    const items = await select('items')
    return items.rows.map(({ name }) => name.toUpperCase())
  } catch (err) {
    throw err
  }
}