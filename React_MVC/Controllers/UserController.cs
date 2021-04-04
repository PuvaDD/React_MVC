using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;

namespace React_MVC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        readonly List<User> userList = new List<User> { 
            new User(){ ID = 1, Email = "pooyan@gmail.com", Password = "123" },
            new User(){ ID = 2, Email = "danny@gmail.com", Password = "456" },
            new User(){ ID = 3, Email = "amir@gmail.com", Password = "789" }
        };

        [HttpGet]
        public List<User> Get()
        {
            return userList;
        }

        [HttpPost]
        public ActionResult Post([FromBody] User userInfo)
        {
            // 1 = True,  0 = False
            var email = userInfo.Email;
            var pass = userInfo.Password;

            bool foundUser;
            var res = Json(new { });

            foreach(User user in userList)
            {
                if (user.Email == email) {
                    foundUser = true;
                }
                else {
                    foundUser = false;
                    res = Json(new { ReturnVal = 0, ReturnMSG = "Wrong Email" });
                    continue;
                };

                if(foundUser == true)
                {
                    if (user.Password == pass)
                    {
                        Random rand = new Random();
                        var randomNum = rand.Next(1, 1000);

                        res = Json(new { ReturnVal = 1, ReturnMSG = "Found User" });
                        break;
                    }
                    else
                    {
                        res = Json(new { ReturnVal = 0, ReturnMSG = "Wrong Pass" });
                        break;
                    }
                }
            }
            return res;
        }
    }
}
