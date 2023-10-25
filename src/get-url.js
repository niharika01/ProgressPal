import { urls } from "./constant"

// Append passed-in url to base url and return
//
/**
 * Append passed-in url to base url and return
 * @param {string} endpoint 
 * @param {Object} params Ex: {"userID": "id123", ...} or undefined
 * @returns string, fully constructed URL 
 */
export const getUrl = (endpoint, params) => {
  if (params != undefined) {
    const query = Object.entries(params).map(([k,v]) => `${k}=${v}`)
    return `${urls.base}${endpoint}?${query}`
  }  
  return urls.base + endpoint;
}