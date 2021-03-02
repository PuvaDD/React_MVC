using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_MVC
{
    public class FoodCatagory
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<Food> FoodList { get; set; }

        public FoodCatagory(List<Food> list)
        {
            FoodList = list;
        }
    }
}
