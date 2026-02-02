using AutoMapper;
using ProductApp.Application.DTOs;
using ProductApp.Domain.Entities;

namespace ProductApp.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<CreateProductDto, Product>();
            CreateMap<UpdateProductDto, Product>();
        }
    }
}
