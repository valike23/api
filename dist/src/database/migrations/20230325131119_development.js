"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    await knex.schema.createTable("products", (table) => {
        table.increments("id").primary();
        table.string("name");
        table.string("slug").unique();
        table.string("short_desc");
        table.float("price");
        table.float("sale_price");
        table.integer("review");
        table.float("ratings");
        table.string("until");
        table.integer("stock");
        table.boolean("top");
        table.boolean("featured");
        table.boolean("new");
        table.string("author");
        table.integer("sold");
    });
    await knex.schema.createTable("categories", (table) => {
        table.increments("id").primary();
        table.string("name");
        table.string("slug").unique();
    });
    await knex.schema.createTable("brands", (table) => {
        table.increments("id").primary();
        table.string("name");
        table.string("slug").unique();
    });
    await knex.schema.createTable("media", (table) => {
        table.increments("id").primary();
        table.integer("width");
        table.integer("height");
        table.string("url");
    });
    await knex.schema.createTable("variants", (table) => {
        table.increments("id").primary();
        table.string("color");
        table.string("color_name");
        table.float("price");
        table.integer("product_id").unsigned().references("products.id");
    });
    await knex.schema.createTable("sizes", (table) => {
        table.increments("id").primary();
        table.string("name");
        table.integer("variant_id").unsigned().references("variants.id");
    });
    await knex.schema.createTable("admins", (table) => {
        table.increments("id").primary();
        table.string("email").unique();
        table.string("password");
        table.string("name");
    });
    await knex.schema.createTable("users", (table) => {
        table.increments("id").primary();
        table.string("email").unique();
        table.string("password");
        table.string("name");
    });
    await knex.schema.createTable("product_category", (table) => {
        table.integer("product_id").unsigned().references("products.id");
        table.integer("category_id").unsigned().references("categories.id");
        table.primary(["product_id", "category_id"]);
    });
    await knex.schema.createTable("product_brand", (table) => {
        table.integer("product_id").unsigned().references("products.id");
        table.integer("brand_id").unsigned().references("brands.id");
        table.primary(["product_id", "brand_id"]);
    });
    await knex.schema.createTable("product_media", (table) => {
        table.integer("product_id").unsigned().references("products.id");
        table.integer("media_id").unsigned().references("media.id");
        table.primary(["product_id", "media_id"]);
    });
}
exports.up = up;
async function down(knex) {
    await knex.schema.dropTableIfExists("product_category");
    await knex.schema.dropTableIfExists("product_brand");
    await knex.schema.dropTableIfExists("product_media");
    await knex.schema.dropTableIfExists("sizes");
    await knex.schema.dropTableIfExists("variants");
    await knex.schema.dropTableIfExists("media");
    await knex.schema.dropTableIfExists("categories");
    await knex.schema.dropTableIfExists("brands");
    await knex.schema.dropTableIfExists("products");
    await knex.schema.dropTableIfExists("admins");
    await knex.schema.dropTableIfExists("users");
}
exports.down = down;
//# sourceMappingURL=20230325131119_development.js.map