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

            food_1.Add(new Food() { Id = 100, Name = "FastFood_1", Price = 10 } );
            food_1.Add(new Food() { Id = 101, Name = "FastFood_2", Price = 20 } );
            food_1.Add(new Food() { Id = 102, Name = "FastFood_3", Price = 30 } );
            food_1.Add(new Food() { Id = 103, Name = "FastFood_4", Price = 40 } );
            food_1.Add(new Food() { Id = 104, Name = "FastFood_5", Price = 50 } );

            food_2.Add(new Food() { Id = 100, Name = "Classic_1", Price = 10 });
            food_2.Add(new Food() { Id = 101, Name = "Classic_2", Price = 20 });
            food_2.Add(new Food() { Id = 102, Name = "Classic_3", Price = 30 });
            food_2.Add(new Food() { Id = 103, Name = "Classic_4", Price = 40 });
            food_2.Add(new Food() { Id = 104, Name = "Classic_5", Price = 50 });

            food_3.Add(new Food() { Id = 100, Name = "Drink_1", Price = 10 });
            food_3.Add(new Food() { Id = 101, Name = "Drink_2", Price = 20 });
            food_3.Add(new Food() { Id = 102, Name = "Drink_3", Price = 30 });
            food_3.Add(new Food() { Id = 103, Name = "Drink_4", Price = 40 });
            food_3.Add(new Food() { Id = 104, Name = "Drink_5", Price = 50 });

            FoodCatagory fCatagory = new FoodCatagory(food_1) { Id = 1, Name = "FastFood"};
            FoodCatagory fCatagory_1 = new FoodCatagory(food_2) { Id = 2, Name = "Classic",};
            FoodCatagory fCatagory_2 = new FoodCatagory(food_3) { Id = 3, Name = "Drink", };

            foodList.Add(fCatagory);
            foodList.Add(fCatagory_1);
            foodList.Add(fCatagory_2);

            return foodList;

        }
    }
}
