using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_MVC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        /*readonly List<User> userList = new List<User>();

        User User_1 = new User() { ID = 1, Email = "pooyan@gmail.com", Password = "123" };
        User User_2 = new User() { ID = 2, Email = "danny@gmail.com", Password = "456" };
        User User_3 = new User() { ID = 3, Email = "amir@gmail.com", Password = "789" };

        [HttpGet]
        public List<User> Get()
        {
            userList.Add(User_1);
            userList.Add(User_2);
            userList.Add(User_3);

            return userList;
        }

        [HttpPost]
        public IActionResult Post(string email, string pass)
        {
            User foundUser;

            foreach(User user in userList)
            {
                if(user.Email == email) {
                    CheckPassword(user, pass);
                }
                else
                {

                }
            }

            void CheckPassword(User user, string pass)
            {
                if (user.Password == pass)
                {
                    foundUser = user;
                }
                else
                {

                }
            }

            if(foundUser.Length)
        }*/
    }
}
