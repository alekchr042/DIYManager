using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DIYManager.Helpers
{
    public class EnumHelper
    {
        /// <summary>
        /// Gets enumerable of possible enum values
        /// </summary>
        /// <typeparam name="T">Enum type</typeparam>
        /// <returns>Enumerable of possible enum values</returns>
        public static IEnumerable<T> GetValues<T>()
        {
            return Enum.GetValues(typeof(T)).Cast<T>();
        }

        public static IEnumerable<string> GetDictionaryFromEnum<T>()
        {
            var result = new List<string>();

            var enumValues = EnumHelper.GetValues<T>();

            foreach(var value in enumValues)
            {
                result.Add(value.ToString());
            }

            return result;
        }
    }
}
