using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using serv.Models;

namespace serv.Repositories
{
    public interface IHtmlRepository
    {
        Task<IEnumerable<Html>> Get();
        Task<Html> Get(int id);
        Task<Html> Create(Html html);
        Task Delete(int id);
        Task Update(Html anime);
    }
}
