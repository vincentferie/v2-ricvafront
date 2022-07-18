import { Injectable } from '@angular/core';
import { assign, cloneDeep } from 'lodash-es';
import { FuseMockApiService } from 'projects/ricva-cajou/src/@fuse/lib/mock-api/mock-api.service';
import {
  brands as brandsData,
  categories as categoriesData,
  products as productsData,
  tags as tagsData,
  vendors as vendorsData,
} from './data';
import { FuseMockApiUtils } from 'projects/ricva-cajou/src/@fuse/lib/mock-api/mock-api.utils';

@Injectable({
  providedIn: 'root',
})
export class ECommerceInventoryMockApi {
  private _categories: any[] = categoriesData;
  private _brands: any[] = brandsData;
  private _products: any[] = productsData;
  private _tags: any[] = tagsData;
  private _vendors: any[] = vendorsData;
  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ Categories - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/apps/ecommerce/inventory/categories')
      .reply(() => [200, cloneDeep(this._categories)]);

    // -----------------------------------------------------------------------------------------------------
    // @ Brands - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/apps/ecommerce/inventory/brands')
      .reply(() => [200, cloneDeep(this._brands)]);

    // -----------------------------------------------------------------------------------------------------
    // @ Products - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/apps/ecommerce/inventory/products', 300)
      .reply(({ request }) => {
        // Get available queries
        const query = request.params.get('query');
        const sort = request.params.get('sort') || 'name';
        const order = request.params.get('order') || 'asc';
        const offset = parseInt(request.params.get('offset') ?? '1', 10);
        const take = parseInt(request.params.get('take') ?? '10', 10);

        // Clone the products
        let products: any[] | null = cloneDeep(this._products);

        // Sort the products
        if (sort === 'sku' || sort === 'name' || sort === 'active') {
          products.sort((a, b) => {
            const fieldA = a[sort].toString().toUpperCase();
            const fieldB = b[sort].toString().toUpperCase();
            return order === 'asc'
              ? fieldA.localeCompare(fieldB)
              : fieldB.localeCompare(fieldA);
          });
        } else {
          products.sort((a, b) =>
            order === 'asc' ? a[sort] - b[sort] : b[sort] - a[sort]
          );
        }

        // If query exists...
        if (query) {
          // Filter the products
          products = products.filter(
            (contact) =>
              contact.name &&
              contact.name.toLowerCase().includes(query.toLowerCase())
          );
        }

        // Paginate - Start
        const productsLength = products.length;

        // Calculate pagination details
        const begin = offset * take;
        const end = Math.min(take * (offset + 1), productsLength);
        const lastPage = Math.max(Math.ceil(productsLength / take), 1);

        // Prepare the pagination object
        let pagination = {};

        // If the requested offset number is bigger than
        // the last possible offset number, return null for
        // products but also send the last possible offset so
        // the app can navigate to there
        if (offset > lastPage) {
          products = null;
          pagination = {
            lastPage,
          };
        } else {
          // Paginate the results by take
          products = products.slice(begin, end);

          // Prepare the pagination mock-api
          pagination = {
            length: productsLength,
            take: take,
            offset: offset,
            lastPage: lastPage,
            startIndex: begin,
            endIndex: end - 1,
          };
        }

        // Return the response
        return [
          200,
          {
            products,
            pagination,
          },
        ];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Product - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/apps/ecommerce/inventory/product')
      .reply(({ request }) => {
        // Get the id from the params
        const id = request.params.get('id');

        // Clone the products
        const products = cloneDeep(this._products);

        // Find the product
        const product = products.find((item) => item.id === id);

        // Return the response
        return [200, product];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Product - POST
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onPost('api/apps/ecommerce/inventory/product')
      .reply(() => {
        // Generate a new product
        const newProduct: any = {
          id: FuseMockApiUtils.guid(),
          category: '',
          name: 'A New Product',
          description: '',
          tags: [],
          sku: '',
          barcode: '',
          brand: '',
          vendor: '',
          stock: '',
          reserved: '',
          cost: '',
          basePrice: '',
          taxPercent: '',
          price: '',
          weight: '',
          thumbnail: '',
          images: [],
          active: false,
        };

        // Unshift the new product
        this._products.unshift(newProduct);

        // Return the response
        return [200, newProduct];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Product - PATCH
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onPatch('api/apps/ecommerce/inventory/product')
      .reply(({ request }) => {
        // Get the id and product
        const id = request.body.id;
        const product = cloneDeep(request.body.product);

        // Prepare the updated product
        let updatedProduct = null;

        // Find the product and update it
        this._products.forEach((item, index, products) => {
          if (item.id === id) {
            // Update the product
            products[index] = assign({}, products[index], product);

            // Store the updated product
            updatedProduct = products[index];
          }
        });

        // Return the response
        return [200, updatedProduct];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Product - DELETE
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onDelete('api/apps/ecommerce/inventory/product')
      .reply(({ request }) => {
        // Get the id
        const id = request.params.get('id');

        // Find the product and delete it
        this._products.forEach((item, index) => {
          if (item.id === id) {
            this._products.splice(index, 1);
          }
        });

        // Return the response
        return [200, true];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Tags - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/apps/ecommerce/inventory/tags')
      .reply(() => [200, cloneDeep(this._tags)]);

    // -----------------------------------------------------------------------------------------------------
    // @ Tags - POST
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onPost('api/apps/ecommerce/inventory/tag')
      .reply(({ request }) => {
        // Get the tag
        const newTag = cloneDeep(request.body.tag);

        // Generate a new GUID
        newTag.id = FuseMockApiUtils.guid();

        // Unshift the new tag
        this._tags.unshift(newTag);

        // Return the response
        return [200, newTag];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Tags - PATCH
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onPatch('api/apps/ecommerce/inventory/tag')
      .reply(({ request }) => {
        // Get the id and tag
        const id = request.body.id;
        const tag = cloneDeep(request.body.tag);

        // Prepare the updated tag
        let updatedTag = null;

        // Find the tag and update it
        this._tags.forEach((item, index, tags) => {
          if (item.id === id) {
            // Update the tag
            tags[index] = assign({}, tags[index], tag);

            // Store the updated tag
            updatedTag = tags[index];
          }
        });

        // Return the response
        return [200, updatedTag];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Tag - DELETE
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onDelete('api/apps/ecommerce/inventory/tag')
      .reply(({ request }) => {
        // Get the id
        const id = request.params.get('id');

        // Find the tag and delete it
        this._tags.forEach((item, index) => {
          if (item.id === id) {
            this._tags.splice(index, 1);
          }
        });

        // Get the products that have the tag
        const productsWithTag = this._products.filter(
          (product) => product.tags.indexOf(id) > -1
        );

        // Iterate through them and delete the tag
        productsWithTag.forEach((product) => {
          product.tags.splice(product.tags.indexOf(id), 1);
        });

        // Return the response
        return [200, true];
      });

    // -----------------------------------------------------------------------------------------------------
    // @ Vendors - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService
      .onGet('api/apps/ecommerce/inventory/vendors')
      .reply(() => [200, cloneDeep(this._vendors)]);
  }
}
