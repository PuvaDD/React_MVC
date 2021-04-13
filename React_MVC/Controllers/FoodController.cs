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

        [HttpGet]
        [Route("[action]")]
        public ActionResult GetFoodData()
        {
            List<Food> MainFoodList = new List<Food>();

            MainFoodList.Add(new Food() { Id = 100, CatagoryID = 1, Name = "FastFood_1", Price = 10000, Quantity = 0 });
            MainFoodList.Add(new Food() { Id = 101, CatagoryID = 1, Name = "FastFood_2", Price = 20000, Quantity = 0 });
            MainFoodList.Add(new Food() { Id = 102, CatagoryID = 1, Name = "FastFood_3", Price = 30000, Quantity = 0 });
            MainFoodList.Add(new Food() { Id = 103, CatagoryID = 1, Name = "FastFood_4", Price = 40000, Quantity = 0 });
            MainFoodList.Add(new Food() { Id = 104, CatagoryID = 1, Name = "FastFood_5", Price = 50000, Quantity = 0 });

            MainFoodList.Add(new Food() { Id = 105, CatagoryID = 2, Name = "Classic_1", Price = 10000, Quantity = 0 });
            MainFoodList.Add(new Food() { Id = 106, CatagoryID = 2, Name = "Classic_2", Price = 20000, Quantity = 0 });
            MainFoodList.Add(new Food() { Id = 107, CatagoryID = 2, Name = "Classic_3", Price = 30000, Quantity = 0 });
            MainFoodList.Add(new Food() { Id = 108, CatagoryID = 2, Name = "Classic_4", Price = 40000, Quantity = 0 });
            MainFoodList.Add(new Food() { Id = 109, CatagoryID = 2, Name = "Classic_5", Price = 50000, Quantity = 0 });

            MainFoodList.Add(new Food() { Id = 110, CatagoryID = 3, Name = "Drink_1", Price = 10000, Quantity = 0 });
            MainFoodList.Add(new Food() { Id = 111, CatagoryID = 3, Name = "Drink_2", Price = 20000, Quantity = 0 });
            MainFoodList.Add(new Food() { Id = 112, CatagoryID = 3, Name = "Drink_3", Price = 30000, Quantity = 0 });
            MainFoodList.Add(new Food() { Id = 113, CatagoryID = 3, Name = "Drink_4", Price = 40000, Quantity = 0 });
            MainFoodList.Add(new Food() { Id = 114, CatagoryID = 3, Name = "Drink_5", Price = 50000, Quantity = 0 });

            FoodCatagory fCatagory = new FoodCatagory() { Id = 1, Type = "فست فود"};
            FoodCatagory fCatagory_1 = new FoodCatagory() { Id = 2, Type = "کلاسیک"};
            FoodCatagory fCatagory_2 = new FoodCatagory() { Id = 3, Type = "نوشیدنی"};

            List<FoodCatagory> mainFoodCTGList = new List<FoodCatagory> {
                new FoodCatagory() { Id = 1, Type = "فست فود"},
                new FoodCatagory() { Id = 2, Type = "کلاسیک"},
                new FoodCatagory() { Id = 3, Type = "نوشیدنی"}
            };

            return Json(new { FoodList = MainFoodList, CTG = mainFoodCTGList });

        }
    }
}
