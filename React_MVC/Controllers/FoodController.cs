using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_MVC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FoodController : Controller
    {

        readonly List<FoodCatagory> foodList = new List<FoodCatagory>();

        [HttpGet]
        public List<FoodCatagory> Get()
        {
            List<Food> food_1 = new List<Food>();
            List<Food> food_2 = new List<Food>();
            List<Food> food_3 = new List<Food>();

            food_1.Add(new Food() { Id = 100, Catagory = "فست فود", Name = "FastFood_1", Price = 10000, Quantity = 0 });
            food_1.Add(new Food() { Id = 101, Catagory = "فست فود", Name = "FastFood_2", Price = 20000, Quantity = 0 });
            food_1.Add(new Food() { Id = 102, Catagory = "فست فود", Name = "FastFood_3", Price = 30000, Quantity = 0 });
            food_1.Add(new Food() { Id = 103, Catagory = "فست فود", Name = "FastFood_4", Price = 40000, Quantity = 0 });
            food_1.Add(new Food() { Id = 104, Catagory = "فست فود", Name = "FastFood_5", Price = 50000, Quantity = 0 });

            food_2.Add(new Food() { Id = 105, Catagory = "کلاسیک", Name = "Classic_1", Price = 10000, Quantity = 0 });
            food_2.Add(new Food() { Id = 106, Catagory = "کلاسیک", Name = "Classic_2", Price = 20000, Quantity = 0 });
            food_2.Add(new Food() { Id = 107, Catagory = "کلاسیک", Name = "Classic_3", Price = 30000, Quantity = 0 });
            food_2.Add(new Food() { Id = 108, Catagory = "کلاسیک", Name = "Classic_4", Price = 40000, Quantity = 0 });
            food_2.Add(new Food() { Id = 109, Catagory = "کلاسیک", Name = "Classic_5", Price = 50000, Quantity = 0 });

            food_3.Add(new Food() { Id = 110, Catagory = "نوشیدنی", Name = "Drink_1", Price = 10000, Quantity = 0 });
            food_3.Add(new Food() { Id = 111, Catagory = "نوشیدنی", Name = "Drink_2", Price = 20000, Quantity = 0 });
            food_3.Add(new Food() { Id = 112, Catagory = "نوشیدنی", Name = "Drink_3", Price = 30000, Quantity = 0 });
            food_3.Add(new Food() { Id = 113, Catagory = "نوشیدنی", Name = "Drink_4", Price = 40000, Quantity = 0 });
            food_3.Add(new Food() { Id = 114, Catagory = "نوشیدنی", Name = "Drink_5", Price = 50000, Quantity = 0 });

            FoodCatagory fCatagory = new FoodCatagory(food_1) { Id = 1, Type = "فست فود"};
            FoodCatagory fCatagory_1 = new FoodCatagory(food_2) { Id = 2, Type = "کلاسیک"};
            FoodCatagory fCatagory_2 = new FoodCatagory(food_3) { Id = 3, Type = "نوشیدنی"};

            foodList.Add(fCatagory);
            foodList.Add(fCatagory_1);
            foodList.Add(fCatagory_2);

            return foodList;

        }
    }
}
