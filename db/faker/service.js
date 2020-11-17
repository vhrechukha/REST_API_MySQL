const faker = require('faker');
const chalk = require('chalk');
const mySql = require('../../src/config/connection').getInstance();
const { format: formatSql } = require('mysql');

/**
 * @method generatePeoples
 * @param {any}
 * @returns {any}
 */
function generatePeoples() {
    let users = [];

    for (let i = 0; i <= 10; i += 1) {
        let firstname = faker.name.firstName();
        let lastname = faker.name.lastName();
        let email = faker.internet.email();
        let password = faker.internet.password();
        let verify = faker.random.arrayElement([0, 1]);

        users.push({
            firstname,
            lastname,
            email,
            password,
            verify
        });
    }

    return users;
}

/**
 * @method addPeoplesInDB
 * @param {any}
 * @returns {any}
 */
function addPeoplesInDB(users) {
    console.log(addPeoplesInDB);
    let queryParams = [];
    const queryStringsArr = [];
    const queryTemplate = ' (?, ?, ?, ?, ?)';

    users.forEach(({
        firstname, lastname, email, password, verify
    }) => {
        queryStringsArr.push(queryTemplate);
        queryParams = [...queryParams, firstname, lastname, email, password, verify];
    });

    const queryString = queryStringsArr.join(',');
    const values = formatSql(queryString, queryParams);
    const query = `INSERT INTO ${faker.random.arrayElement(['sellers', 'customers'])} (firstname, lastname, email, password, verify) VALUES ${values};`;

    mySql.query(query);
}

/**
 * @method generateProducts
 * @param {any}
 * @returns {any}
 */
function generateProducts() {
    let products = [];

    for (let i = 0; i <= 5000; i += 1) {
        let name = faker.commerce.productName();
        let price = faker.commerce.price();
        let seller_id = faker.random.number({
            min: 1,
            max: 500
        });
        let category_id = faker.random.number({
            min: 1,
            max: 45
        });

        products.push({
            name,
            price,
            seller_id,
            category_id
        });
    }
    return products;
}

/**
 * @method addProductsInDB
 * @param {any}
 * @returns {any}
 */
async function addProductsInDB(products) {
    let queryParams = [];
    const queryStringsArr = [];
    const queryTemplate = ' (?, ?)';

    await products.forEach(({
        name, price, seller_id, category_id
    }) => {
        queryStringsArr.push(queryTemplate);
        queryParams = [...queryParams, name, price, seller_id, category_id];
    });

    const queryString = queryStringsArr.join(',');
    const values = formatSql(queryString, queryParams);
    const query = `INSERT INTO products (name, price, seller_id, category_id) VALUES ${values};`;

    mySql.query(query);
}

/**
 * @method generateCategories
 * @param {any}
 * @returns {any}
 */
function generateCategories() {
    let products = [];

    for (let i = 0; i <= 45; i += 1) {
        let name = faker.commerce.productMaterial();

        products.push({
            name
        });
    }

    return products;
}

/**
 * @method addCategoriesInDB
 * @param {any}
 * @returns {any}
 */
function addCategoriesInDB(categories) {
    let queryParams = [];
    const queryStringsArr = [];
    const queryTemplate = ' (?)';

    categories.forEach(({
        name
    }) => {
        queryStringsArr.push(queryTemplate);
        queryParams = [...queryParams, name];
    });

    const queryString = queryStringsArr.join(',');
    const values = formatSql(queryString, queryParams);
    const query = `INSERT INTO categories (name) VALUES ${values};`;

    mySql.query(query);
}

/**
 * @method generateTags
 * @param {any}
 * @returns {any}
 */
function generateTags() {
    let products = [];

    for (let i = 0; i <= 45; i += 1) {
        let name = faker.commerce.productAdjective();

        products.push({
            name
        });
    }

    return products;
}

/**
 * @method addTagsInDB
 * @param {any}
 * @returns {any}
 */
function addTagsInDB(categories) {
    let queryParams = [];
    const queryStringsArr = [];
    const queryTemplate = ' (?)';

    categories.forEach(({
        name
    }) => {
        queryStringsArr.push(queryTemplate);
        queryParams = [...queryParams, name];
    });

    const queryString = queryStringsArr.join(',');
    const values = formatSql(queryString, queryParams);
    const query = `INSERT INTO tags (name) VALUES ${values};`;

    mySql.query(query);
}

/**
 * @method generateIntegrationsProductsTags
 * @param {any}
 * @returns {any}
 */
function generateIntegrationsProductsTags() {
    let products = [];

    for (let i = 0; i <= 45; i += 1) {
        let product_id = faker.random.number({
            min: 1,
            max: 45
        });

        let tag_id = faker.random.number({
            min: 1,
            max: 45
        });

        products.push({
            product_id,
            tag_id
        });
    }

    return products;
}

/**
 * @method addIntegrationsProductsTagsInDB
 * @param {any}
 * @returns {any}
 */
function addIntegrationsProductsTagsInDB(categories) {
    let queryParams = [];
    const queryStringsArr = [];
    const queryTemplate = ' (?, ?)';

    categories.forEach(({
        product_id,
        tag_id
    }) => {
        queryStringsArr.push(queryTemplate);
        queryParams = [...queryParams, product_id, tag_id];
    });

    const queryString = queryStringsArr.join(',');
    const values = formatSql(queryString, queryParams);
    const query = `INSERT INTO products_tags (product_id, tag_id) VALUES ${values};`;

    mySql.query(query);
}

module.exports = {
    generatePeoples,
    addPeoplesInDB,
    generateProducts,
    addProductsInDB,
    generateCategories,
    addCategoriesInDB,
    generateTags,
    addTagsInDB,
    generateIntegrationsProductsTags,
    addIntegrationsProductsTagsInDB
};
