console.log("sample_response");
// Request Configuration
const baseURL = "https://jservice.io/api";
const req = new XMLHttpRequest();
req.responseType = "json";
// Standard API Responses
const SUCCESS_RESPONSE = "Success";
const INVALID_RESPONSE = "Invalid API Response";
const RESPONSE_ERROR = "Error occurred while getting response";
const NETWORK_ERROR = "Network Error Occurred";
// API Endpoints
const CLUES = "/clues";
const CATEGORIES = "/categories";
// API Request Param Testing
const value = 200;
const categoryID = 735;
const count = 5;
// Param Inserters
const value_CLUES = (value) => (!!value ? `value=${value}` : "");
const categoryId_CLUES = (categoryID) =>
  !!categoryID ? `category=${categoryID}` : "";
// Prepared URLS
const clueURLPrep = (value, categoryID) =>
  `${baseURL}${CLUES}?${value_CLUES(value)}&${categoryId_CLUES(categoryID)}`;
const cateURL = `${baseURL}${CATEGORIES}?count=${100}`;

// to prepare Tile Table
const tableMaker = async () => {
  console.log("Table Making Process Initiated");
  const checkedCategoryIDs = [];
  const pool = [];
  const categories = await APICall(cateURL);
  if (categories?.success) {
    // Sorted the Categories in Descending order of clues of Categories
    const tempCategories = categories.data.sort(
      (a, b) => b.clues_count - a.clues_count
    );
    console.log(tempCategories);

        // LAST I WAS HERE
        // Now Iterate per category and find a question of each 5 values


  }
  console.log(categories, "categories");
  console.log("Table Prepared Successfully.");
};

// General Method to process a request
const APICall = async (url) => {
  return new Promise((resolve, reject) => {
    req.onload = () => {
      if (req?.status == 200) {
        const res = req?.response;
        if (res) {
          resolve({ data: res, success: true, message: SUCCESS_RESPONSE });
        } else {
          resolve({
            data: null,
            success: false,
            message: INVALID_RESPONSE,
          });
        }
      } else
        resolve({
          data: null,
          success: false,
          message: RESPONSE_ERROR,
        });
    };

    req.onerror = () =>
      resolve({
        data: null,
        success: false,
        message: NETWORK_ERROR,
      });

    req.open("GET", url);
    req.send();
  });
};

// PREPARE TABLE
tableMaker();
