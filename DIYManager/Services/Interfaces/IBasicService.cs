using System.Collections.Generic;

namespace DIYManager.Services.Interfaces
{
    public interface IBasicService<T>
    {
        IEnumerable<T> GetAll();

        T Get(object parameter);

        T Add(T newObject);

        void Update(T objectToUpdate);

        void Delete(T objectToDelete);
    }
}
