using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ProductApp.Application.DTOs;

namespace ProductApp.Application.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDto>> GetAllProductsAsync();
        Task<ProductDto> GetProductByIdAsync(Guid id);
        Task<ProductDto> CreateProductAsync(CreateProductDto createProductDto);
        Task UpdateProductAsync(Guid id, UpdateProductDto updateProductDto);
        Task DeleteProductAsync(Guid id);
    }
}
