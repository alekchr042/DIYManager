using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DIYManager.Exceptions
{
    public class UsernameTakenException : Exception
    {
        public UsernameTakenException() : base() { }
        public UsernameTakenException(string message) : base(message) { }
    }
}
