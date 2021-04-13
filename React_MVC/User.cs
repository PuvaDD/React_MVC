using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_MVC
{
    public class User
    {
        public int ID { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public bool isLogedIn { get; set; }
    }
}
