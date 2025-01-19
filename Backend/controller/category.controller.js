import { CategoryServices } from '../services/category.services.js';

export const createBulkCategory = async (request, response, next) => {
  try {
    let status = await CategoryServices.createBulk(request.body);
    if (status) {
      response.send('Data inserted');
    } else {
      response.send('Error while inserting');
    }
  } catch (err) {
    console.log(err);
  }
};

export const createCategory = async (request, response, next) => {
  try {
    let categoryName = request.body.categoryName;

    let category = CategoryServices.createCategory(categoryName, request.body);
    if (category) {
      response.send('Category created successfully');
    } else {
      response.send('Error while creating the category');
    }
  } catch (err) {
    console.log(err);
  }
};
export const updateCategory = async (request, response, next) => {
    try {
        let categoryId = request.body.categoryId;
    
        let category = CategoryServices.updateCategory(categoryId, request.body);
        if (category) {
          response.send('Category updated successfully');
        } else {
          response.send('Error while updating the category');
        }
      } catch (err) {
        console.log(err);
      }
};
export const deleteCategory = async (request, response, next) => {
    try {
        let categoryId = request.body.categoryId;
    
        let category = CategoryServices.deleteCategory(categoryId);
        if (category) {
          response.send('Category deleted successfully');
        } else {
          response.send('Error while deleting the category');
        }
      } catch (err) {
        console.log(err);
      }
};

export const getAllCategories = async (request, response, next) => {
    try {
    
        let category = CategoryServices.getAllCategories();
        if (category) {
          response.status(200).json({category});
        } else {
          response.send('Error while deleting the category');
        }
      } catch (err) {
        console.log(err);
      }
};

export const getAllCategoryByVendor = async (request, response, next) => {
    try {
        let vendor = request.body.vendor;
    
        let category = CategoryServices.getAllCategoriesByVendor(vendorId);
        if (category) {
          response.send('fetched all vendor Category  successfully');
        } else {
          response.send('Error while fetching vendor the category');
        }
      } catch (err) {
        console.log(err);
      }
};
export const getAllProductsByCategoryId = async (request, response, next) => {
    try {
         let categoryId = request.body.categoryId;
        let category = CategoryServices.getAllProductsOfCategoryById(categoryId);
        if (category) {
          response.send(' fectched products of category');
        } else {
          response.send('error while fectching products of category');
        }
      } catch (err) {
        console.log(err);
      }
};
