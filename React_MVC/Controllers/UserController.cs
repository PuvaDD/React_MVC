using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.AspNetCore.Http;

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
        public ActionResult Get()
        {
            return Json( new { msg = HttpContext.Session.GetString("ID")});
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult LogIn([FromBody] User userInfo)
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

                        user.isLogedIn = true;

                        HttpContext.Session.SetString("ID", randomNum.ToString());

                        res = Json(new { ReturnVal = 1, ReturnMSG = "Found User", CookieID = randomNum, LogInStatus = user.isLogedIn, sessionID = HttpContext.Session.GetString("ID") });

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

        [HttpPost]
        [Route("[action]")]
        public ActionResult LogOut(User userInfo)
        {
            var email = userInfo.Email;
            var res = Json(new { });

            foreach(User user in userList)
            {
                if(user.Email == email)
                {
                    user.isLogedIn = false;

                    HttpContext.Session.Clear();

                    res = Json(new { ReturnVal = 1, ReturnMSG = "User Logged Out", LogInStatus = user.isLogedIn, SessionID = HttpContext.Session.GetString("ID") });
                }
            }

            return res;
        }
    }
}
